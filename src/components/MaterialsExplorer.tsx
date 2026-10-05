import React, { useState, useMemo } from 'react';
import { RESIN_MATERIALS, ResinMaterial } from '../data/slaData';
import { ArrowUpDown, Check, Layers } from 'lucide-react';

type SortField = 'tensileStrengthMPa' | 'youngsModulusGPa' | 'elongationAtBreakPct' | 'hdtAt045MPaC' | 'viscosityCps';

export const MaterialsExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('tensileStrengthMPa');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [activeMaterialId, setActiveMaterialId] = useState<string>(RESIN_MATERIALS[1].id);
  const [compareMaterialId, setCompareMaterialId] = useState<string>(RESIN_MATERIALS[3].id);

  const categories = ['All', 'Standard', 'Engineering', 'High-Temp & Ceramic', 'Elastomeric', 'Biocompatible', 'Castable'];

  const filteredMaterials = useMemo(() => {
    const list =
      selectedCategory === 'All'
        ? [...RESIN_MATERIALS]
        : RESIN_MATERIALS.filter((m) => m.category === selectedCategory);

    return list.sort((a, b) => {
      const diff = a[sortField] - b[sortField];
      return sortAsc ? diff : -diff;
    });
  }, [selectedCategory, sortField, sortAsc]);

  const activeMaterial = useMemo(
    () => RESIN_MATERIALS.find((m) => m.id === activeMaterialId) || RESIN_MATERIALS[0],
    [activeMaterialId]
  );

  const compareMaterial = useMemo(
    () => RESIN_MATERIALS.find((m) => m.id === compareMaterialId) || RESIN_MATERIALS[3],
    [compareMaterialId]
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Normalize values for 5-axis Spider/Radar chart
  const getRadarPolygon = (mat: ResinMaterial) => {
    const norms = [
      Math.min(1, mat.tensileStrengthMPa / 90), // Axis 0: Tensile Strength (max 90 MPa)
      Math.min(1, mat.youngsModulusGPa / 10), // Axis 1: Stiffness / Modulus (max 10 GPa)
      Math.min(1, mat.elongationAtBreakPct / 170), // Axis 2: Ductility / Elongation (max 170%)
      Math.min(1, mat.hdtAt045MPaC / 300), // Axis 3: Thermal HDT (max 300 C)
      Math.min(1, Math.max(0.1, 1 - mat.shrinkagePct / 2.2)) // Axis 4: Dimensional Stability (Low Shrinkage)
    ];

    const cx = 130;
    const cy = 115;
    const radius = 78;

    return norms
      .map((val, idx) => {
        const angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
        const r = val * radius;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const radarAxesLabels = [
    { label: 'TENSILE (MPa)', x: 130, y: 22, anchor: 'middle' as const },
    { label: 'MODULUS (GPa)', x: 218, y: 88, anchor: 'start' as const },
    { label: 'DUCTILITY (%)', x: 185, y: 198, anchor: 'middle' as const },
    { label: 'THERMAL HDT (°C)', x: 75, y: 198, anchor: 'middle' as const },
    { label: 'LOW SHRINKAGE', x: 42, y: 88, anchor: 'end' as const }
  ];

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-mono-tabular">
          Showing {filteredMaterials.length} of {RESIN_MATERIALS.length} validated photopolymer classes · Click any row to inspect
        </div>
      </div>

      {/* Main Split: Left = Quantitative Data Table, Right = Radar Comparison + Deep Spec Card */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Table Column (7 cols) */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-mono-tabular text-slate-500">
                  <th className="py-3 px-4 font-semibold">RESIN CLASS &amp; CHEMISTRY</th>
                  <th className="py-3 px-3 font-semibold text-right">
                    <button
                      onClick={() => handleSort('tensileStrengthMPa')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>UTS (MPa)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-3 font-semibold text-right">
                    <button
                      onClick={() => handleSort('youngsModulusGPa')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>E (GPa)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-3 font-semibold text-right">
                    <button
                      onClick={() => handleSort('elongationAtBreakPct')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>ELONG (%)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-3 font-semibold text-right">
                    <button
                      onClick={() => handleSort('hdtAt045MPaC')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>HDT (°C)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="py-3 px-4 font-semibold text-right">
                    <button
                      onClick={() => handleSort('viscosityCps')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                    >
                      <span>VISC (cPs)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredMaterials.map((mat) => {
                  const isPrimary = mat.id === activeMaterialId;
                  const isCompare = mat.id === compareMaterialId;
                  return (
                    <tr
                      key={mat.id}
                      onClick={() => setActiveMaterialId(mat.id)}
                      className={`transition-colors cursor-pointer ${
                        isPrimary
                          ? 'bg-sky-50/70 hover:bg-sky-50'
                          : isCompare
                          ? 'bg-amber-50/40 hover:bg-amber-50/70'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span>{mat.name}</span>
                          {isPrimary && (
                            <span className="text-[10px] font-mono-tabular text-sky-700 font-semibold">
                              [PRIMARY]
                            </span>
                          )}
                          {isCompare && !isPrimary && (
                            <span className="text-[10px] font-mono-tabular text-amber-700 font-semibold">
                              [BASELINE]
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {mat.category} · {mat.isoStandard}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono-tabular font-medium text-slate-900">
                        {mat.tensileStrengthMPa.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono-tabular text-slate-700">
                        {mat.youngsModulusGPa.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono-tabular text-slate-700">
                        {mat.elongationAtBreakPct.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono-tabular text-slate-700">
                        {mat.hdtAt045MPaC.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono-tabular text-slate-600">
                        {mat.viscosityCps}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>All values reflect post-cured isotropic specimens conditioned per ASTM D638 / ISO 527-2.</span>
            <div className="flex items-center gap-2">
              <span>Overlay Baseline Comparison:</span>
              <select
                value={compareMaterialId}
                onChange={(e) => setCompareMaterialId(e.target.value)}
                className="bg-white border border-slate-300 rounded px-2 py-0.5 text-slate-800 font-medium"
              >
                {RESIN_MATERIALS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Detail & Radar Column (5 cols) */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-mono-tabular text-sky-700">
                {activeMaterial.category} · {activeMaterial.isoStandard}
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{activeMaterial.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{activeMaterial.chemistry}</p>
            </div>
          </div>

          {/* 5-Axis Spider / Radar Chart */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <span>Multi-Axis Property Envelope</span>
              </span>
              <div className="flex items-center gap-3 text-[11px] font-mono-tabular">
                <span className="text-sky-700 font-semibold">■ Selected</span>
                <span className="text-amber-600 font-semibold">■ Baseline</span>
              </div>
            </div>

            <div className="h-52 w-full flex items-center justify-center">
              <svg viewBox="0 0 260 215" className="w-full h-full">
                {/* Concentric Pentagons */}
                {[0.25, 0.5, 0.75, 1].map((scale) => {
                  const pts = [0, 1, 2, 3, 4]
                    .map((idx) => {
                      const angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
                      const r = scale * 78;
                      return `${(130 + r * Math.cos(angle)).toFixed(1)},${(115 + r * Math.sin(angle)).toFixed(1)}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={scale}
                      points={pts}
                      fill="none"
                      className="stroke-slate-300 stroke-1"
                    />
                  );
                })}

                {/* Radial Spokes */}
                {[0, 1, 2, 3, 4].map((idx) => {
                  const angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
                  const x = 130 + 78 * Math.cos(angle);
                  const y = 115 + 78 * Math.sin(angle);
                  return (
                    <line
                      key={idx}
                      x1="130"
                      y1="115"
                      x2={x}
                      y2={y}
                      className="stroke-slate-300 stroke-1"
                    />
                  );
                })}

                {/* Baseline Material Polygon */}
                <polygon
                  points={getRadarPolygon(compareMaterial)}
                  className="fill-amber-500/15 stroke-amber-500 stroke-1.5"
                  strokeDasharray="3 2"
                />

                {/* Active Material Polygon */}
                <polygon
                  points={getRadarPolygon(activeMaterial)}
                  className="fill-sky-600/25 stroke-sky-600 stroke-2"
                />

                {/* Axis Vertex Labels */}
                {radarAxesLabels.map((ax, i) => (
                  <text
                    key={i}
                    x={ax.x}
                    y={ax.y}
                    textAnchor={ax.anchor}
                    className="text-[8px] font-mono fill-slate-600 font-semibold"
                  >
                    {ax.label}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          {/* Photochemical & Physical Spec Strip */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[10px] font-mono-tabular text-slate-500">PENETRATION Dp</div>
              <div className="text-sm font-mono-tabular font-bold text-slate-900 mt-0.5">
                {activeMaterial.penetrationDepthDpUm} μm
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[10px] font-mono-tabular text-slate-500">CRITICAL Ec</div>
              <div className="text-sm font-mono-tabular font-bold text-slate-900 mt-0.5">
                {activeMaterial.criticalExposureEcMjCm2} mJ/cm²
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-[10px] font-mono-tabular text-slate-500">LINEAR SHRINKAGE</div>
              <div className="text-sm font-mono-tabular font-bold text-slate-900 mt-0.5">
                {activeMaterial.shrinkagePct.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Characteristics, Use Cases & Constraints */}
          <div className="space-y-3 text-xs">
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Polymer Network Behavior</h4>
              <p className="text-slate-600 leading-relaxed">{activeMaterial.keyCharacteristics}</p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-1.5">Validated Industrial Applications</h4>
              <ul className="space-y-1">
                {activeMaterial.typicalUseCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-slate-700">
              <span className="font-semibold text-amber-900">Engineering Constraint: </span>
              {activeMaterial.limitations}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
