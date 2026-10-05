import React, { useState, useMemo } from 'react';
import { RESIN_MATERIALS } from '../data/slaData';
import { Sliders, RotateCcw, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export const PhotopolymerPhysicsWorkbench: React.FC = () => {
  const [selectedResinId, setSelectedResinId] = useState<string>(RESIN_MATERIALS[0].id);
  const selectedResin = useMemo(
    () => RESIN_MATERIALS.find((r) => r.id === selectedResinId) || RESIN_MATERIALS[0],
    [selectedResinId]
  );

  // Physics Parameters initialized from selected resin, but overrideable by user
  const [laserPowerMw, setLaserPowerMw] = useState<number>(220);
  const [scanSpeedMmS, setScanSpeedMmS] = useState<number>(1400);
  const [spotRadiusUm, setSpotRadiusUm] = useState<number>(42.5); // 85 um spot diameter
  const [layerThicknessUm, setLayerThicknessUm] = useState<number>(50);
  const [customDpUm, setCustomDpUm] = useState<number>(selectedResin.penetrationDepthDpUm);
  const [customEcMjCm2, setCustomEcMjCm2] = useState<number>(selectedResin.criticalExposureEcMjCm2);

  // Sync Dp and Ec when user changes preset resin
  const handleSelectResin = (id: string) => {
    setSelectedResinId(id);
    const found = RESIN_MATERIALS.find((r) => r.id === id);
    if (found) {
      setCustomDpUm(found.penetrationDepthDpUm);
      setCustomEcMjCm2(found.criticalExposureEcMjCm2);
    }
  };

  const handleReset = () => {
    setLaserPowerMw(220);
    setScanSpeedMmS(1400);
    setSpotRadiusUm(42.5);
    setLayerThicknessUm(50);
    setCustomDpUm(selectedResin.penetrationDepthDpUm);
    setCustomEcMjCm2(selectedResin.criticalExposureEcMjCm2);
  };

  // Jacobs Working Curve Physics Calculations:
  // Peak radiant exposure on beam centerline: E_max = sqrt(2 / pi) * P / (w0 * v)
  // P in Watts (mW * 1e-3), w0 in cm (um * 1e-4), v in cm/s (mm/s * 0.1)
  // E_max in J/cm^2 -> multiply by 1000 for mJ/cm^2
  const calculations = useMemo(() => {
    const pWatts = laserPowerMw * 1e-3;
    const w0Cm = spotRadiusUm * 1e-4;
    const vCmS = scanSpeedMmS * 0.1;

    const eMaxJcm2 = Math.sqrt(2 / Math.PI) * (pWatts / (w0Cm * vCmS));
    const eMaxMjCm2 = eMaxJcm2 * 1000;

    // Cure depth Cd = Dp * ln(E_max / Ec)
    const isCuring = eMaxMjCm2 > customEcMjCm2;
    const cdUm = isCuring ? customDpUm * Math.log(eMaxMjCm2 / customEcMjCm2) : 0;

    // Cure line width Lw = 2 * w0 * sqrt(2 * Cd / Dp) = 2 * w0 * sqrt(2 * ln(E_max / Ec))
    const lwUm = isCuring ? 2 * spotRadiusUm * Math.sqrt(2 * Math.log(eMaxMjCm2 / customEcMjCm2)) : 0;

    // Overcure ratio (Cd / LayerThickness)
    // Optimal SLA inter-layer covalent stitch requires Cd/L between 1.25 and 1.65
    const overcureRatio = cdUm / layerThicknessUm;
    const stitchDepthUm = Math.max(0, cdUm - layerThicknessUm);

    let processStatus: 'CRITICAL_UNDERCURE' | 'MARGINAL_BOND' | 'NOMINAL_ISOTROPIC' | 'OVERCURE_PRINT_THROUGH' =
      'NOMINAL_ISOTROPIC';
    if (!isCuring || overcureRatio < 1.0) {
      processStatus = 'CRITICAL_UNDERCURE';
    } else if (overcureRatio < 1.25) {
      processStatus = 'MARGINAL_BOND';
    } else if (overcureRatio > 1.85) {
      processStatus = 'OVERCURE_PRINT_THROUGH';
    }

    // Generate points for Jacobs Working Curve SVG (Semi-log plot of E0 vs Cd)
    const curvePoints: { eVal: number; cdVal: number; xPct: number; yPct: number }[] = [];
    const minE = 4;
    const maxE = 250;
    const maxCdScale = 450;

    for (let i = 0; i <= 40; i++) {
      const logMin = Math.log10(minE);
      const logMax = Math.log10(maxE);
      const currentLog = logMin + (i / 40) * (logMax - logMin);
      const eVal = Math.pow(10, currentLog);
      const cdVal = eVal > customEcMjCm2 ? customDpUm * Math.log(eVal / customEcMjCm2) : 0;
      const xPct = (i / 40) * 100;
      const yPct = Math.min(100, Math.max(0, 100 - (cdVal / maxCdScale) * 100));
      curvePoints.push({ eVal, cdVal, xPct, yPct });
    }

    // Current operating point position on semi-log SVG
    const clampedE = Math.min(maxE, Math.max(minE, eMaxMjCm2));
    const currentXPct =
      ((Math.log10(clampedE) - Math.log10(minE)) / (Math.log10(maxE) - Math.log10(minE))) * 100;
    const currentYPct = Math.min(100, Math.max(0, 100 - (cdUm / maxCdScale) * 100));
    const targetMinYPct = Math.min(100, Math.max(0, 100 - ((layerThicknessUm * 1.25) / maxCdScale) * 100));
    const targetMaxYPct = Math.min(100, Math.max(0, 100 - ((layerThicknessUm * 1.75) / maxCdScale) * 100));

    return {
      eMaxMjCm2,
      cdUm,
      lwUm,
      overcureRatio,
      stitchDepthUm,
      processStatus,
      curvePoints,
      currentXPct,
      currentYPct,
      targetMinYPct,
      targetMaxYPct
    };
  }, [laserPowerMw, scanSpeedMmS, spotRadiusUm, layerThicknessUm, customDpUm, customEcMjCm2]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Top Calibration Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5 text-xs font-mono-tabular text-sky-400">
            <span>INTERACTIVE SIMULATION</span>
            <span aria-hidden="true">·</span>
            <span>BEER-LAMBERT &amp; JACOBS WORKING CURVE EQUATION</span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-white mt-0.5">
            Photopolymerization Kinetics &amp; Voxel Cure-Depth Workbench
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg">
            {calculations.processStatus === 'NOMINAL_ISOTROPIC' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                <span className="text-xs font-mono-tabular text-emerald-300 whitespace-nowrap">
                  ● NOMINAL STITCH (Cd/L = {calculations.overcureRatio.toFixed(2)})
                </span>
              </>
            )}
            {calculations.processStatus === 'MARGINAL_BOND' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                <span className="text-xs font-mono-tabular text-amber-300 whitespace-nowrap">
                  ▲ WEAK INTER-LAYER BOND (Cd/L = {calculations.overcureRatio.toFixed(2)})
                </span>
              </>
            )}
            {calculations.processStatus === 'CRITICAL_UNDERCURE' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                <span className="text-xs font-mono-tabular text-rose-300 whitespace-nowrap">
                  ✖ DELAMINATION RISK (Cd &lt; Layer)
                </span>
              </>
            )}
            {calculations.processStatus === 'OVERCURE_PRINT_THROUGH' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 ring-4 ring-amber-400/20" />
                <span className="text-xs font-mono-tabular text-amber-300 whitespace-nowrap">
                  ▲ Z-PRINT-THROUGH / CURL RISK (Cd/L = {calculations.overcureRatio.toFixed(2)})
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title="Reset parameters to factory calibration"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Calibration</span>
          </button>
        </div>
      </div>

      {/* Asymmetric Split Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Control Column (5 cols on desktop) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/60 space-y-5">
          <div>
            <label htmlFor="resin-preset-select" className="block text-xs font-semibold text-slate-700 mb-1.5">
              1. Select Photopolymer Resin Formulation Preset
            </label>
            <select
              id="resin-preset-select"
              value={selectedResinId}
              onChange={(e) => handleSelectResin(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
            >
              {RESIN_MATERIALS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (Dp: {r.penetrationDepthDpUm} μm · Ec: {r.criticalExposureEcMjCm2} mJ/cm²)
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-sky-600" />
                <span>2. Optical &amp; Galvo Process Controls</span>
              </span>
              <span className="text-xs font-mono-tabular text-slate-500">λ = 355 / 405 nm</span>
            </div>

            {/* Slider 1: Laser Power */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Laser Source Power (P)</span>
                <span className="font-mono-tabular font-semibold text-slate-900">
                  {laserPowerMw} <span className="text-slate-400 font-normal">mW</span>
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={600}
                step={10}
                value={laserPowerMw}
                onChange={(e) => setLaserPowerMw(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-slate-400">
                <span>50 mW (Micro)</span>
                <span>300 mW</span>
                <span>600 mW (High-Speed)</span>
              </div>
            </div>

            {/* Slider 2: Scan Speed */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Galvanometer Scan Velocity (v)</span>
                <span className="font-mono-tabular font-semibold text-slate-900">
                  {scanSpeedMmS} <span className="text-slate-400 font-normal">mm/s</span>
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={4000}
                step={50}
                value={scanSpeedMmS}
                onChange={(e) => setScanSpeedMmS(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-slate-400">
                <span>200 mm/s</span>
                <span>2000 mm/s</span>
                <span>4000 mm/s</span>
              </div>
            </div>

            {/* Slider 3: Layer Thickness */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">Target Z-Layer Thickness (L)</span>
                <span className="font-mono-tabular font-semibold text-slate-900">
                  {layerThicknessUm} <span className="text-slate-400 font-normal">μm</span>
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mt-1">
                {[25, 50, 100, 150].map((thickness) => (
                  <button
                    key={thickness}
                    onClick={() => setLayerThicknessUm(thickness)}
                    className={`py-1.5 px-2 text-xs font-mono-tabular rounded-md border transition-colors cursor-pointer ${
                      layerThicknessUm === thickness
                        ? 'bg-sky-600 text-white border-sky-600 font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {thickness} μm
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 4: Resin Penetration Depth Dp & Ec */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium" title="Depth at which irradiance drops to 1/e">
                    Penetration Dp
                  </span>
                  <span className="font-mono-tabular font-semibold text-slate-900">{customDpUm} μm</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={220}
                  step={2}
                  value={customDpUm}
                  onChange={(e) => setCustomDpUm(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium" title="Threshold exposure to reach gel point">
                    Critical Ec
                  </span>
                  <span className="font-mono-tabular font-semibold text-slate-900">{customEcMjCm2} mJ/cm²</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={30}
                  step={0.5}
                  value={customEcMjCm2}
                  onChange={(e) => setCustomEcMjCm2(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Governing Equation Callout */}
          <div className="p-3.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1">
            <div className="font-mono-tabular text-slate-900 font-semibold">
              C_d = D_p · ln(E_max / E_c) &nbsp;|&nbsp; E_max = √(2/π) · P / (w_0 · v)
            </div>
            <p className="leading-relaxed text-[12px]">
              <strong>Jacobs Working Curve (1992):</strong> Because UV photon absorption follows Beer-Lambert exponential decay, cure depth (<em>C<sub>d</sub></em>) scales logarithmically with laser exposure (<em>E<sub>max</sub></em>). The slope is exclusively governed by the resin&apos;s optical penetration depth (<em>D<sub>p</sub></em>).
            </p>
          </div>
        </div>

        {/* Right Visualization & Telemetry Stage (7 cols on desktop) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-6 bg-white">
          {/* 4 Metric Readouts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500">PEAK FLUENCE (E_max)</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-slate-900">
                  {calculations.eMaxMjCm2.toFixed(1)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">mJ/cm²</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                Ec Threshold: {customEcMjCm2.toFixed(1)} mJ/cm²
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500">CURE DEPTH (C_d)</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-sky-700">
                  {calculations.cdUm.toFixed(1)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">μm</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                Layer L: {layerThicknessUm} μm
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500">INTER-LAYER STITCH</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-slate-900">
                  +{calculations.stitchDepthUm.toFixed(1)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">μm</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                Ratio Cd/L: {calculations.overcureRatio.toFixed(2)}×
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500">CURED LINE WIDTH (L_w)</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-slate-900">
                  {calculations.lwUm.toFixed(0)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">μm</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                Beam 2w₀: {(spotRadiusUm * 2).toFixed(0)} μm
              </div>
            </div>
          </div>

          {/* Dual Graphic Canvas: Left = Jacobs Semi-Log Curve, Right = Cross-Sectional Voxel Stitch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* SVG 1: Jacobs Working Curve */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/40 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-800">
                  Jacobs Semi-Log Working Curve
                </span>
                <span className="text-[11px] font-mono-tabular text-slate-500">Slope = Dp ({customDpUm} μm)</span>
              </div>

              <div className="relative h-48 w-full">
                <svg viewBox="0 0 260 160" className="w-full h-full overflow-visible">
                  {/* Optimal Overcure Window Band (1.25L to 1.75L) */}
                  <rect
                    x="32"
                    y={(calculations.targetMaxYPct / 100) * 130 + 10}
                    width="215"
                    height={Math.max(
                      4,
                      ((calculations.targetMinYPct - calculations.targetMaxYPct) / 100) * 130
                    )}
                    className="fill-emerald-500/15"
                  />
                  <line
                    x1="32"
                    y1={(calculations.targetMinYPct / 100) * 130 + 10}
                    x2="247"
                    y2={(calculations.targetMinYPct / 100) * 130 + 10}
                    className="stroke-emerald-500/50 stroke-1"
                    strokeDasharray="3 3"
                  />

                  {/* Grid Axes */}
                  <line x1="32" y1="10" x2="32" y2="140" className="stroke-slate-300 stroke-1" />
                  <line x1="32" y1="140" x2="247" y2="140" className="stroke-slate-300 stroke-1" />

                  {/* Y-axis labels (Cd in um) */}
                  <text x="26" y="16" textAnchor="end" className="text-[8px] font-mono fill-slate-400">
                    450
                  </text>
                  <text x="26" y="75" textAnchor="end" className="text-[8px] font-mono fill-slate-400">
                    225
                  </text>
                  <text x="26" y="140" textAnchor="end" className="text-[8px] font-mono fill-slate-400">
                    0 μm
                  </text>

                  {/* X-axis labels (Log E in mJ/cm2) */}
                  <text x="32" y="153" textAnchor="start" className="text-[8px] font-mono fill-slate-400">
                    4
                  </text>
                  <text x="135" y="153" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">
                    30 mJ/cm² (Log)
                  </text>
                  <text x="247" y="153" textAnchor="end" className="text-[8px] font-mono fill-slate-400">
                    250
                  </text>

                  {/* Working Curve Polyline */}
                  <polyline
                    fill="none"
                    className="stroke-sky-600 stroke-2"
                    points={calculations.curvePoints
                      .map((pt) => `${32 + (pt.xPct / 100) * 215},${10 + (pt.yPct / 100) * 130}`)
                      .join(' ')}
                  />

                  {/* Crosshair for Current Operating Point */}
                  <line
                    x1={32 + (calculations.currentXPct / 100) * 215}
                    y1="10"
                    x2={32 + (calculations.currentXPct / 100) * 215}
                    y2="140"
                    className="stroke-slate-400 stroke-1"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={32 + (calculations.currentXPct / 100) * 215}
                    cy={10 + (calculations.currentYPct / 100) * 130}
                    r="4.5"
                    className="fill-sky-600 stroke-white stroke-2"
                  />
                </svg>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/80">
                <span>Green Band: Target Process Window (1.25L–1.75L)</span>
                <span className="font-mono-tabular text-slate-700">Ec Intercept</span>
              </div>
            </div>

            {/* SVG 2: Cross-Sectional Parabolic Voxel & Covalent Stitch Diagram */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-900 text-white flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-200">
                  Gaussian Parabolic Voxel Cross-Section
                </span>
                <span className="text-[11px] font-mono-tabular text-sky-400">Z-Stitch Visualization</span>
              </div>

              <div className="relative h-48 w-full flex items-center justify-center">
                <svg viewBox="0 0 240 155" className="w-full h-full">
                  {/* Current Liquid Layer n (Top) */}
                  <rect x="15" y="25" width="210" height="50" className="fill-slate-800/80 stroke-slate-700" />
                  <text x="22" y="38" className="text-[8px] font-mono fill-slate-400">
                    LAYER n (L = {layerThicknessUm} μm)
                  </text>

                  {/* Previous Solidified Layer n-1 (Bottom) */}
                  <rect x="15" y="75" width="210" height="60" className="fill-slate-800/40 stroke-slate-700" />
                  <text x="22" y="128" className="text-[8px] font-mono fill-slate-400">
                    PREVIOUS LAYER n-1 (SOLIDIFIED)
                  </text>

                  {/* Inter-Layer Boundary Line */}
                  <line
                    x1="15"
                    y1="75"
                    x2="225"
                    y2="75"
                    className="stroke-slate-500 stroke-1"
                    strokeDasharray="4 2"
                  />

                  {/* Gaussian Parabolic Cured Voxel */}
                  {calculations.cdUm > 0 && (
                    <path
                      d={`M ${120 - Math.min(85, Math.max(18, calculations.lwUm * 0.35))} 25 Q 120 ${
                        25 + Math.min(115, (calculations.cdUm / layerThicknessUm) * 50 * 1.85)
                      } ${120 + Math.min(85, Math.max(18, calculations.lwUm * 0.35))} 25 Z`}
                      className={
                        calculations.processStatus === 'NOMINAL_ISOTROPIC'
                          ? 'fill-sky-500/45 stroke-sky-400 stroke-1.5'
                          : calculations.processStatus === 'CRITICAL_UNDERCURE'
                          ? 'fill-rose-500/45 stroke-rose-400 stroke-1.5'
                          : 'fill-amber-500/45 stroke-amber-400 stroke-1.5'
                      }
                    />
                  )}

                  {/* Incident Laser Beam */}
                  <polygon
                    points="112,2 128,2 123,25 117,25"
                    className="fill-sky-400/70"
                  />
                  <text x="134" y="15" className="text-[8px] font-mono fill-sky-300">
                    UV Laser ({laserPowerMw} mW)
                  </text>
                </svg>
              </div>

              <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-slate-800">
                <span>
                  {calculations.stitchDepthUm > 0
                    ? `Stitches ${calculations.stitchDepthUm.toFixed(1)} μm into Layer n-1`
                    : 'Zero inter-layer stitch (Delamination)'}
                </span>
                <span className="font-mono-tabular text-sky-400">Cd = {calculations.cdUm.toFixed(1)} μm</span>
              </div>
            </div>
          </div>

          {/* Engineering Diagnostic Banner */}
          <div className="p-3.5 rounded-lg border bg-slate-50 border-slate-200 flex items-start gap-3">
            {calculations.processStatus === 'NOMINAL_ISOTROPIC' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : calculations.processStatus === 'CRITICAL_UNDERCURE' ? (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs text-slate-700 leading-relaxed">
              {calculations.processStatus === 'NOMINAL_ISOTROPIC' && (
                <span>
                  <strong>Calibrated Covalent Stitching:</strong> Cure depth ({calculations.cdUm.toFixed(1)} μm) penetrates{' '}
                  <strong>{calculations.stitchDepthUm.toFixed(1)} μm</strong> into the underlying layer (n-1), forming primary crosslinked polymer chains across the Z-interface without overcuring downward overhangs.
                </span>
              )}
              {calculations.processStatus === 'CRITICAL_UNDERCURE' && (
                <span>
                  <strong>Critical Delamination Warning:</strong> Cure depth ({calculations.cdUm.toFixed(1)} μm) is shallower than the {layerThicknessUm} μm layer thickness. The solidified ribbon floats on uncured liquid monomer and will detach during the Z-axis peel cycle. Increase laser power or reduce scan speed.
                </span>
              )}
              {calculations.processStatus === 'MARGINAL_BOND' && (
                <span>
                  <strong>Marginal Z-Stitch Warning:</strong> Overcure ratio ({calculations.overcureRatio.toFixed(2)}×) provides only {calculations.stitchDepthUm.toFixed(1)} μm of inter-layer overlap. High peel forces in viscous resins (&gt;1000 cPs) may induce Z-banding or layer splitting.
                </span>
              )}
              {calculations.processStatus === 'OVERCURE_PRINT_THROUGH' && (
                <span>
                  <strong>Excessive Overcure &amp; Curl Risk:</strong> Cure depth ({calculations.cdUm.toFixed(1)} μm) exceeds {calculations.overcureRatio.toFixed(2)}× the layer thickness. Excess UV photons will bleed into downward-facing overhangs and microfluidic channels, occluding internal passages and increasing volumetric shrinkage curl.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
