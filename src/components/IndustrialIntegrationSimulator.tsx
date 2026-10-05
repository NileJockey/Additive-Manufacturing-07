import React, { useState, useMemo } from 'react';
import { Calculator, Factory, Clock, DollarSign, Wind } from 'lucide-react';

export const IndustrialIntegrationSimulator: React.FC = () => {
  const [annualVolume, setAnnualVolume] = useState<number>(2500);
  const [partMassGrams, setPartMassGrams] = useState<number>(45);
  const [partHeightMm, setPartHeightMm] = useState<number>(85);
  const [partsPerBuildPlate, setPartsPerBuildPlate] = useState<number>(18);
  const [slaArchitecture, setSlaArchitecture] = useState<'galvo-top-down' | 'continuous-dls'>('continuous-dls');
  const [washingWorkflow, setWashingWorkflow] = useState<'manual-ipa' | 'automated-centrifuge'>('automated-centrifuge');

  const analysis = useMemo(() => {
    // Resin cost per kg ($85/kg for industrial production dual-cure / engineering resin)
    const resinCostPerKg = 85;
    const supportWasteFactor = slaArchitecture === 'continuous-dls' ? 1.15 : 1.28;
    const materialCostPerPart = ((partMassGrams * supportWasteFactor) / 1000) * resinCostPerKg;

    // Z-draw speed: Top-Down Galvo ~ 18 mm/hr, Continuous Dead-Zone (CLIP/HARP) ~ 110 mm/hr
    const zDrawSpeedMmHr = slaArchitecture === 'continuous-dls' ? 110 : 22;
    const buildTimeHours = partHeightMm / zDrawSpeedMmHr + 0.35; // +21 min warmup/drain

    // Machine amortization & energy ($14/hr)
    const machineHourlyRate = slaArchitecture === 'continuous-dls' ? 18.5 : 12.0;
    const machineCostPerPart = (buildTimeHours * machineHourlyRate) / partsPerBuildPlate;

    // Post-processing labor & solvent cost per batch
    const postProcessCostPerBatch = washingWorkflow === 'automated-centrifuge' ? 16.0 : 58.0;
    const postProcessCostPerPart = postProcessCostPerBatch / partsPerBuildPlate;

    // Solvent waste in mL per part
    const solventWasteMlPerPart = washingWorkflow === 'automated-centrifuge' ? 2.4 : 28.0;

    const totalSlaUnitCost = materialCostPerPart + machineCostPerPart + postProcessCostPerPart;

    // Compare against Injection Molding (Hard Steel Tooling ~$24,000 + $2.10/shot)
    const injectionMoldToolingCost = 24000;
    const injectionShotCost = 2.1;
    const injectionUnitCost = injectionMoldToolingCost / annualVolume + injectionShotCost;

    // Compare against 5-Axis CNC Machining ($42 setup per batch + $34 machine time per complex geometry)
    const cncUnitCost = 36.5 + 450 / Math.max(50, annualVolume);

    // Crossover threshold volume (where SLA unit cost == Injection Molding unit cost)
    const unitDeltaVsShot = Math.max(0.5, totalSlaUnitCost - injectionShotCost);
    const crossoverVolumeUnits = Math.round(injectionMoldToolingCost / unitDeltaVsShot);

    // Annual fleet requirement (assuming 6,000 operational hours/year per printer)
    const totalBatchesPerYear = Math.ceil(annualVolume / partsPerBuildPlate);
    const totalPrintHoursPerYear = totalBatchesPerYear * buildTimeHours;
    const printersRequired = Math.max(1, Math.ceil(totalPrintHoursPerYear / 5500));

    return {
      materialCostPerPart,
      machineCostPerPart,
      postProcessCostPerPart,
      totalSlaUnitCost,
      injectionUnitCost,
      cncUnitCost,
      crossoverVolumeUnits,
      buildTimeHours,
      totalBatchesPerYear,
      printersRequired,
      solventWasteMlPerPart
    };
  }, [annualVolume, partMassGrams, partHeightMm, partsPerBuildPlate, slaArchitecture, washingWorkflow]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-sky-400">
            <span>TECHNO-ECONOMIC FACTORY MODEL</span>
            <span aria-hidden="true">·</span>
            <span>INDUSTRY 4.0 PRODUCTION INTEGRATION</span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-white mt-0.5">
            Additive SLA Cell vs. Injection Molding Crossover Estimator
          </h3>
        </div>
        <div className="text-xs font-mono-tabular text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          Break-Even Lot Threshold: <strong className="text-sky-400">{analysis.crossoverVolumeUnits.toLocaleString()} units</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-50/60 space-y-5">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Annual Production Lot Volume</span>
                <span className="font-mono-tabular font-semibold text-slate-900">
                  {annualVolume.toLocaleString()} <span className="text-slate-400 font-normal">units/yr</span>
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={annualVolume}
                onChange={(e) => setAnnualVolume(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-tabular text-slate-400">
                <span>100 (Bridge)</span>
                <span>2,500 (Mid-Series)</span>
                <span>10,000 (Mass)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Part Mass</span>
                  <span className="font-mono-tabular font-semibold text-slate-900">{partMassGrams}g</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={250}
                  step={5}
                  value={partMassGrams}
                  onChange={(e) => setPartMassGrams(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Z-Height</span>
                  <span className="font-mono-tabular font-semibold text-slate-900">{partHeightMm}mm</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={300}
                  step={5}
                  value={partHeightMm}
                  onChange={(e) => setPartHeightMm(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">Nesting / Plate</span>
                  <span className="font-mono-tabular font-semibold text-slate-900">{partsPerBuildPlate}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={64}
                  step={2}
                  value={partsPerBuildPlate}
                  onChange={(e) => setPartsPerBuildPlate(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Architecture Selector */}
            <div className="pt-2 border-t border-slate-200">
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                SLA Optical Engine Architecture
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSlaArchitecture('galvo-top-down')}
                  className={`p-2.5 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    slaArchitecture === 'galvo-top-down'
                      ? 'bg-sky-50 border-sky-600 text-slate-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>Laser Galvo SLA</div>
                  <div className="text-[10px] font-mono-tabular text-slate-500 mt-0.5">~22 mm/hr Z-draw</div>
                </button>
                <button
                  onClick={() => setSlaArchitecture('continuous-dls')}
                  className={`p-2.5 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    slaArchitecture === 'continuous-dls'
                      ? 'bg-sky-50 border-sky-600 text-slate-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>Dead-Zone Continuous</div>
                  <div className="text-[10px] font-mono-tabular text-slate-500 mt-0.5">~110 mm/hr (CLIP/HARP)</div>
                </button>
              </div>
            </div>

            {/* Post-Processing Workflow Selector */}
            <div className="pt-2 border-t border-slate-200">
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                Post-Processing &amp; Resin Recovery Line
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setWashingWorkflow('manual-ipa')}
                  className={`p-2.5 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    washingWorkflow === 'manual-ipa'
                      ? 'bg-sky-50 border-sky-600 text-slate-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>Manual IPA Ultrasonic</div>
                  <div className="text-[10px] font-mono-tabular text-slate-500 mt-0.5">High Labor &amp; VOC Waste</div>
                </button>
                <button
                  onClick={() => setWashingWorkflow('automated-centrifuge')}
                  className={`p-2.5 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                    washingWorkflow === 'automated-centrifuge'
                      ? 'bg-sky-50 border-sky-600 text-slate-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div>Robotic Spin-Wash Cell</div>
                  <div className="text-[10px] font-mono-tabular text-slate-500 mt-0.5">Closed-Loop Reclamation</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Metrics (7 cols) */}
        <div className="lg:col-span-7 p-6 space-y-6 bg-white flex flex-col justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-sky-600" />
                <span>SLA UNIT COST</span>
              </div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-sky-700">
                  ${analysis.totalSlaUnitCost.toFixed(2)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1">/pt</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                Zero Tooling Amortization
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500 flex items-center gap-1">
                <Calculator className="w-3 h-3 text-slate-600" />
                <span>INJECTION MOLD</span>
              </div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-slate-900">
                  ${analysis.injectionUnitCost.toFixed(2)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1">/pt</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                Incl. $24k Hard Steel Mold
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-600" />
                <span>BATCH CYCLE</span>
              </div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-slate-900">
                  {analysis.buildTimeHours.toFixed(1)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">hrs</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                {partsPerBuildPlate} nested parts / cycle
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[11px] font-mono-tabular text-slate-500 flex items-center gap-1">
                <Wind className="w-3 h-3 text-emerald-600" />
                <span>SOLVENT LOSS</span>
              </div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono-tabular font-bold text-slate-900">
                  {analysis.solventWasteMlPerPart.toFixed(1)}
                </span>
                <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">mL/pt</span>
              </div>
              <div className="text-[11px] font-mono-tabular text-slate-500 mt-1">
                {washingWorkflow === 'automated-centrifuge' ? '-91% VOC reduction' : 'Standard IPA bath'}
              </div>
            </div>
          </div>

          {/* Cost Breakdown & Process Comparison Bar Chart */}
          <div className="space-y-4 border border-slate-200 rounded-lg p-4 bg-slate-50/40">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">
                Unit Economics at {annualVolume.toLocaleString()} Annual Parts
              </span>
              <span className="font-mono-tabular text-slate-500">
                Fleet Required: {analysis.printersRequired} SLA Cell{analysis.printersRequired > 1 ? 's' : ''} ({analysis.totalBatchesPerYear} batches/yr)
              </span>
            </div>

            {/* Horizontal Bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-sky-900">
                    Industrial SLA ({slaArchitecture === 'continuous-dls' ? 'Continuous Dead-Zone' : 'Galvo Laser'})
                  </span>
                  <span className="font-mono-tabular font-bold text-sky-700">
                    ${analysis.totalSlaUnitCost.toFixed(2)} / unit
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, (analysis.materialCostPerPart / 50) * 100)}%` }}
                    className="bg-sky-600 h-full"
                    title="Photopolymer Resin Cost"
                  />
                  <div
                    style={{ width: `${Math.min(100, (analysis.machineCostPerPart / 50) * 100)}%` }}
                    className="bg-sky-400 h-full"
                    title="Machine Depreciation"
                  />
                  <div
                    style={{ width: `${Math.min(100, (analysis.postProcessCostPerPart / 50) * 100)}%` }}
                    className="bg-amber-400 h-full"
                    title="Washing & Post-Cure"
                  />
                </div>
                <div className="flex flex-wrap gap-4 mt-1.5 text-[11px] font-mono-tabular text-slate-500">
                  <span>■ Resin: ${analysis.materialCostPerPart.toFixed(2)}</span>
                  <span>■ Machine: ${analysis.machineCostPerPart.toFixed(2)}</span>
                  <span>■ Post-Cure/Wash: ${analysis.postProcessCostPerPart.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">
                    Thermoplastic Injection Molding (Hard Steel Mold Amortized)
                  </span>
                  <span className="font-mono-tabular font-semibold text-slate-900">
                    ${analysis.injectionUnitCost.toFixed(2)} / unit
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, (analysis.injectionUnitCost / 50) * 100)}%` }}
                    className="bg-slate-600 h-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">5-Axis Subtractive CNC Machining</span>
                  <span className="font-mono-tabular font-semibold text-slate-900">
                    ${analysis.cncUnitCost.toFixed(2)} / unit
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, (analysis.cncUnitCost / 50) * 100)}%` }}
                    className="bg-slate-400 h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Decision Summary */}
          <div className="p-3.5 rounded-lg bg-slate-900 text-slate-200 text-xs flex items-start gap-3">
            <Factory className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              {annualVolume <= analysis.crossoverVolumeUnits ? (
                <span>
                  <strong className="text-emerald-400">SLA Economically Superior at {annualVolume.toLocaleString()} Units/Yr:</strong>{' '}
                  Direct additive production saves{' '}
                  <strong className="text-white">
                    ${((analysis.injectionUnitCost - analysis.totalSlaUnitCost) * annualVolume).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </strong>{' '}
                  annually compared to cutting hard injection tooling, while enabling immediate geometry revisions and internal lattice/fluidic features impossible to demold.
                </span>
              ) : (
                <span>
                  <strong className="text-amber-400">Above Crossover Volume ({analysis.crossoverVolumeUnits.toLocaleString()} Units):</strong>{' '}
                  At {annualVolume.toLocaleString()} identical parts/year, hard-tooled injection molding achieves a lower unit cost (${analysis.injectionUnitCost.toFixed(2)} vs. ${analysis.totalSlaUnitCost.toFixed(2)}). Use SLA here for <strong>conformal-cooled bridge mold inserts</strong> or mass-customized lot-size-of-one variants.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
