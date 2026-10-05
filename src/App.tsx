/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  APPLICATION_SECTORS,
  PROCESS_COMPARISON_MATRIX,
  STRENGTHS_AND_LIMITATIONS,
  INDUSTRIAL_OUTLOOK_ROADMAP
} from './data/slaData';
import { PhotopolymerPhysicsWorkbench } from './components/PhotopolymerPhysicsWorkbench';
import { MaterialsExplorer } from './components/MaterialsExplorer';
import { IndustrialIntegrationSimulator } from './components/IndustrialIntegrationSimulator';
import {
  Printer,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Microscope,
  Cpu,
  ShieldCheck,
  Sparkles,
  BookOpen
} from 'lucide-react';

import heroImage from './assets/images/sla_vat_photopolymerization_hero_1791193246635.jpg';
import partsImage from './assets/images/sla_microfluidic_dental_parts_1791193258669.jpg';
import factoryImage from './assets/images/sla_industrial_factory_array_1791193273181.jpg';

export default function App() {
  const [activeArchitectureTab, setActiveArchitectureTab] = useState<'top-down' | 'bottom-up' | 'dead-zone'>('top-down');
  const [activeSectorId, setActiveSectorId] = useState<string>(APPLICATION_SECTORS[0].id);
  const [strengthFilter, setStrengthFilter] = useState<'All' | 'Strength' | 'Limitation'>('All');

  const activeSector =
    APPLICATION_SECTORS.find((s) => s.id === activeSectorId) || APPLICATION_SECTORS[0];

  const filteredStrengthsLimitations =
    strengthFilter === 'All'
      ? STRENGTHS_AND_LIMITATIONS
      : STRENGTHS_AND_LIMITATIONS.filter((item) => item.type === strengthFilter);

  const handlePrintMonograph = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Bar Contract: 3 Zones (Single-element Brand, 5 Nav Links, 1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-3.5 no-print">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-slate-900 font-editorial whitespace-nowrap shrink-0"
          >
            Stereolithography Monograph
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#physics"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Physics &amp; Kinetics
            </a>
            <a
              href="#materials"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Allowed Materials
            </a>
            <a
              href="#applications"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Applications
            </a>
            <a
              href="#evaluation"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Strengths &amp; Limits
            </a>
            <a
              href="#outlook"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Industrial Outlook
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintMonograph}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Monograph PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="max-w-[1380px] mx-auto px-6 py-10 space-y-20">
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-6">
            {/* Clean Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-slate-500">
              <span className="text-sky-700 font-semibold">ISO/ASTM 52900: VPP-UVL</span>
              <span aria-hidden="true">·</span>
              <span>VAT PHOTOPOLYMERIZATION TECHNICAL REVIEW</span>
              <span aria-hidden="true">·</span>
              <span>REVISED OCTOBER 2026</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-[44px] font-editorial font-medium tracking-tight text-slate-900 leading-[1.14]"
              style={{ textWrap: 'balance' }}
            >
              Stereolithography (SLA): Photochemical Physics, Engineering Resins &amp; Industrial Factory Integration
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Patented by Charles Hull in 1986 as the foundational additive manufacturing process,{' '}
              <strong className="text-slate-900 font-semibold">Stereolithography (SLA)</strong> selectively converts liquid monomers and oligomers into covalently crosslinked 3D thermoset networks via ultraviolet (355 nm – 405 nm) laser photopolymerization. Today, dual-cure polymer chemistry, ceramic slurries, and continuous dead-zone optics are transforming SLA from a visual prototyping tool into a high-precision industrial manufacturing platform.
            </p>

            {/* Quantitative Telemetry Benchmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <div className="text-[11px] font-mono-tabular text-slate-500">OPTICAL SPOT (XY)</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono-tabular font-bold text-slate-900">25–85</span>
                  <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">μm</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Galvo F-Theta focus</div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <div className="text-[11px] font-mono-tabular text-slate-500">SURFACE FINISH (Ra)</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono-tabular font-bold text-slate-900">0.4–1.2</span>
                  <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">μm</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Injection-mold grade</div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <div className="text-[11px] font-mono-tabular text-slate-500">Z-AXIS ISOTROPY</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono-tabular font-bold text-sky-700">96.4</span>
                  <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">%</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Covalent inter-layer stitch</div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <div className="text-[11px] font-mono-tabular text-slate-500">PEAK THERMAL HDT</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono-tabular font-bold text-slate-900">289</span>
                  <span className="text-xs font-mono-tabular text-slate-400 ml-1.5">°C</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">At 0.45 MPa (ASTM D648)</div>
              </div>
            </div>
          </div>

          {/* Hero Figure with Zero-Broken-Image Fallback */}
          <div className="lg:col-span-5">
            <figure className="bg-slate-900 rounded-xl overflow-hidden border border-slate-200">
              <div className="relative aspect-16/9 w-full bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center">
                <img
                  src={heroImage}
                  alt="Industrial stereolithography SLA 3D printer resin vat during 405nm UV laser photopolymerization of a micro-lattice aerospace component"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-5">
                  <div className="text-white space-y-1">
                    <div className="text-[11px] font-mono-tabular text-sky-300">
                      FIG 1.1 · SOLID-STATE 355/405 nm GALVANOMETER VAT PHOTOPOLYMERIZATION
                    </div>
                    <p className="text-xs text-slate-200 leading-snug">
                      Actinic photons initiate free-radical and cationic crosslinking at the liquid-solid interface, achieving sub-50 μm feature fidelity across complex internal lattices.
                    </p>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </section>

        {/* SECTION 01: PROCESS ARCHITECTURE & PHOTOCHEMICAL PHYSICS */}
        <section id="physics" className="space-y-10 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                01. PROCESS ARCHITECTURE &amp; PHOTOCHEMICAL KINETICS
              </div>
              <h2
                className="text-2xl sm:text-3xl font-editorial font-medium text-slate-900"
                style={{ textWrap: 'balance' }}
              >
                How Stereolithography Converts Photons into Crosslinked Solids
              </h2>
              <p className="text-[15px] text-slate-700 leading-[1.7] max-w-[70ch] first-letter:text-4xl first-letter:font-editorial first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-slate-900">
                Every stereolithography system operates through the spatial and temporal control of a liquid-to-solid phase transition known as photopolymerization. A liquid resin vat contains low-molecular-weight monomers, functional oligomers (which dictate final mechanical properties), photoinitiators (typically Type I phosphine oxides such as TPO or BAPO, or Type II diaryliodonium salts), and UV light absorbers (passive dyes that restrict photon bleed along the Z-axis).
              </p>
              <p className="text-[15px] text-slate-700 leading-[1.7] max-w-[70ch]">
                When an ultraviolet laser beam (commonly a frequency-tripled Nd:YVO₄ solid-state laser at 355 nm or a high-power GaN diode at 405 nm) scans the resin surface via twin X-Y mirror galvanometers, photoinitiators cleave into reactive free radicals or superacid cations. Polymerization proceeds rapidly until the local crosslink density reaches the <strong>gel point</strong>—the critical threshold Exposure (<em>E<sub>c</sub></em>) where the liquid becomes an insoluble viscoelastic gel.
              </p>
            </div>

            {/* Margin Technical Callout */}
            <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-slate-900 font-semibold border-b border-slate-200 pb-2.5">
                <Microscope className="w-4 h-4 text-sky-600" />
                <span>TWO REACTION PATHWAYS</span>
              </div>
              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <div>
                  <strong className="text-slate-900 block mb-0.5">1. Free-Radical (Acrylates &amp; Methacrylates)</strong>
                  Extremely rapid propagation kinetics (&lt;50 ms to gelation). However, free-radical chains are strongly inhibited by dissolved atmospheric oxygen (O₂ quenches radicals into unreactive peroxy radicals) and exhibit higher volumetric shrinkage (3–6%).
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <strong className="text-slate-900 block mb-0.5">2. Cationic Ring-Opening (Epoxies &amp; Oxetanes)</strong>
                  Photo-generated Brønsted/Lewis acids open strained epoxide rings. Insensitive to oxygen inhibition, exhibits ultra-low shrinkage (&lt;1%), and continues &ldquo;living&rdquo; dark-polymerization after the laser moves away—yielding superior dimensional accuracy in industrial SLA resins.
                </div>
              </div>
            </aside>
          </div>

          {/* 3 Optical Hardware Configurations Interactive Comparison */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Hardware Kinematics: Comparing the Three SLA Vat Configurations
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select a hardware architecture below to inspect its optical path, recoating mechanics, and industrial trade-offs.
                </p>
              </div>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setActiveArchitectureTab('top-down')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeArchitectureTab === 'top-down'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Top-Down Industrial (Right-Side-Up)
                </button>
                <button
                  onClick={() => setActiveArchitectureTab('bottom-up')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeArchitectureTab === 'bottom-up'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Bottom-Up Inverted (FEP/PDMS Window)
                </button>
                <button
                  onClick={() => setActiveArchitectureTab('dead-zone')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeArchitectureTab === 'dead-zone'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Continuous Dead-Zone (CLIP / HARP)
                </button>
              </div>
            </div>

            {activeArchitectureTab === 'top-down' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                <div className="space-y-2">
                  <div className="font-mono-tabular text-sky-700 font-semibold">KINEMATIC MECHANISM</div>
                  <h4 className="text-sm font-bold text-slate-900">Submerged Elevator &amp; Vacuum Doctor Blade</h4>
                  <p className="text-slate-600">
                    The UV laser sits above the vat and scans downward onto the free liquid surface. After each layer cures, the perforated build platform steps <em>downward</em> into the resin tank, and a precision vacuum-assisted recoater blade sweeps across the surface to establish a uniform 50–100 μm fresh liquid film.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="font-mono-tabular text-emerald-700 font-semibold">COMPETITIVE ADVANTAGES</div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li>• <strong>Zero Peel Forces:</strong> Curing occurs at the free air/nitrogen interface; parts never pull against an optical window, allowing delicate 0.3 mm walls and massive cross-sections.</li>
                    <li>• <strong>Massive Build Envelopes:</strong> Scales to 1500 × 750 × 550 mm (e.g., 3D Systems ProX / SLA 750, UnionTech RSPro).</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-mono-tabular text-amber-700 font-semibold">OPERATIONAL CONSTRAINTS</div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li>• <strong>High Capital Vat Fill:</strong> Requires 200 to 900 liters of liquid resin to fill the tank, locking up $30,000–$120,000 in working inventory per material.</li>
                    <li>• <strong>Meniscus Dwell Time:</strong> High-viscosity resins require slower blade sweeps to prevent trapped air bubbles.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeArchitectureTab === 'bottom-up' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                <div className="space-y-2">
                  <div className="font-mono-tabular text-sky-700 font-semibold">KINEMATIC MECHANISM</div>
                  <h4 className="text-sm font-bold text-slate-900">Inverted Build Platform &amp; Transparent Tank Floor</h4>
                  <p className="text-slate-600">
                    The build platform hangs upside down and lowers into a shallow resin tray (2–5 mm deep) with a transparent non-stick fluoropolymer (FEP, PFA) or silicone (PDMS) window. The laser (or LFS linear galvo module) shines <em>upward</em> through the window, and the part peels upward after every layer.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="font-mono-tabular text-emerald-700 font-semibold">COMPETITIVE ADVANTAGES</div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li>• <strong>Minimal Resin Inventory:</strong> Requires only 0.5 to 3 liters in a cartridge/tray, allowing rapid 2-minute swaps between biocompatible, ceramic, and elastomer resins.</li>
                    <li>• <strong>Gravity-Independent Z-Height:</strong> Part height can exceed the depth of the liquid tank.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-mono-tabular text-amber-700 font-semibold">OPERATIONAL CONSTRAINTS</div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li>• <strong>Hydrodynamic Stefan Peel Suction:</strong> Separating each layer from the window generates high suction forces (F ∝ R⁴/h³), requiring dense support lattices and tilt angles.</li>
                    <li>• <strong>Optical Film Fogging:</strong> Repeated polymerization gradually clouds the FEP/PDMS membrane, making tanks consumable items.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeArchitectureTab === 'dead-zone' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
                <div className="space-y-2">
                  <div className="font-mono-tabular text-sky-700 font-semibold">KINEMATIC MECHANISM</div>
                  <h4 className="text-sm font-bold text-slate-900">Oxygen-Inhibited or Liquid-Interface Dead Zone</h4>
                  <p className="text-slate-600">
                    Pioneered by Continuous Liquid Interface Production (CLIP / Carbon DLS) and High-Area Rapid Printing (HARP). An oxygen-permeable Teflon AF 2400 window (or flowing immiscible fluorinated oil) maintains a 30 μm uncurable liquid &ldquo;dead zone&rdquo; directly above the window so the curing part never adheres to the glass.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="font-mono-tabular text-emerald-700 font-semibold">COMPETITIVE ADVANTAGES</div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li>• <strong>15×–50× Continuous Z-Draw:</strong> Eliminates the stop-peel-recoat cycle, drawing parts continuously at 100–300 mm/hr with layerless isotropic exterior walls.</li>
                    <li>• <strong>Viscous Dual-Cure Processing:</strong> Enables printing high-molecular-weight polyurethane/epoxy precursors that cure thermally after printing.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <div className="font-mono-tabular text-amber-700 font-semibold">OPERATIONAL CONSTRAINTS</div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li>• <strong>Exothermic Heat Dissipation:</strong> Rapid polymerization releases 80 kJ/mol of exothermic heat; thick solid cross-sections can boil or crack unless actively cooled.</li>
                    <li>• <strong>Dead-Zone Refill Ceiling:</strong> Wide solid cross-sections still require brief pauses so fresh resin can flow inward to feed the vacuum core.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Physics Workbench */}
          <PhotopolymerPhysicsWorkbench />
        </section>

        {/* SECTION 02: ALLOWED MATERIALS & POLYMER TAXONOMY */}
        <section id="materials" className="space-y-10 scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                02. ALLOWED MATERIALS &amp; PHOTOCHEMICAL FORMULATIONS
              </div>
              <h2
                className="text-2xl sm:text-3xl font-editorial font-medium text-slate-900"
                style={{ textWrap: 'balance' }}
              >
                Allowed SLA Materials: From Pure Acrylates to Hybrid IPNs &amp; Ceramic Slurries
              </h2>
              <p className="text-[15px] text-slate-700 leading-[1.7] max-w-[70ch]">
                Unlike FDM or SLS—which melt pre-synthesized thermoplastic pellets or powders—SLA synthesizes the polymer network <em>in-situ</em> during the print. Consequently, <strong>allowed SLA materials</strong> must be formulated as liquid monomers, macromers, or stabilized colloidal suspensions capable of undergoing rapid actinic crosslinking at 355–405 nm within a manageable viscosity envelope (200–5,000 cPs).
              </p>
            </div>
            <div className="lg:col-span-4 text-xs text-slate-600 bg-white border border-slate-200 p-4 rounded-xl">
              <strong className="text-slate-900 block mb-1">Why True Thermoplastics Cannot Be Printed in SLA:</strong>
              Semi-crystalline commodity thermoplastics (such as pure Polypropylene, Nylon 12, or PEEK) cannot be dissolved into photo-reactive liquid monomers. Instead, SLA engineers formulate <em>thermally and mechanically mimetic thermosets</em> (e.g., Interpenetrating Polymer Networks of cycloaliphatic epoxies and urethane acrylates) that match thermoplastic modulus and toughness.
            </div>
          </div>

          {/* Interactive Materials Explorer */}
          <MaterialsExplorer />
        </section>

        {/* SECTION 03: INDUSTRIAL APPLICATIONS & QUANTIFIED PROOF */}
        <section id="applications" className="space-y-10 scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                03. INDUSTRIAL APPLICATIONS &amp; VALIDATED SECTOR WORKFLOWS
              </div>
              <h2
                className="text-2xl sm:text-3xl font-editorial font-medium text-slate-900"
                style={{ textWrap: 'balance' }}
              >
                Where Stereolithography Outperforms Subtractive &amp; Powder Processes
              </h2>
              <p className="text-[15px] text-slate-700 leading-[1.7] max-w-[68ch]">
                SLA dominates industrial applications where three requirements converge: <strong>(1) sub-50 μm geometric fidelity</strong>, <strong>(2) smooth optical or sealing surfaces (&lt;1 μm R<sub>a</sub>)</strong>, and <strong>(3) isotropic, pore-free hermetic walls</strong>. Explore the four core industrial sectors below to inspect end-to-end production workflows and empirical case study benchmarks.
              </p>
            </div>

            <div className="lg:col-span-5">
              <figure className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="aspect-4/3 w-full bg-slate-100 relative">
                  <img
                    src={partsImage}
                    alt="Macro engineering view of transparent SLA microfluidic manifold, Class IIa dental surgical guide, and ceramic-filled turbine blade"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <figcaption className="px-4 py-2.5 text-xs text-slate-500 border-t border-slate-200 font-editorial italic">
                  Fig 3.1 — Monolithic optical-clear microfluidic manifold, biocompatible Class IIa surgical guide, and silica-filled stator blade produced via calibrated SLA.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Interactive Sector Selector & Case Study Proof Matrix */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border-b border-slate-200 bg-slate-50">
              {APPLICATION_SECTORS.map((sec) => {
                const isSelected = sec.id === activeSectorId;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectorId(sec.id)}
                    className={`p-4 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-white border-b-2 border-b-sky-600'
                        : 'hover:bg-slate-100/80 text-slate-600'
                    }`}
                  >
                    <div className="text-[10px] font-mono-tabular text-sky-700 font-semibold">
                      {sec.code}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">{sec.sector}</div>
                  </button>
                );
              })}
            </div>

            <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Cols: Technical Narrative & Workflow */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <div className="text-xs font-mono-tabular text-slate-500">{activeSector.code}</div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{activeSector.headline}</h3>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">{activeSector.summary}</p>

                {/* 4 Quantitative Sector KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-[10px] font-mono-tabular text-slate-500">TOLERANCE</div>
                    <div className="text-xs font-mono-tabular font-bold text-slate-900 mt-1">
                      {activeSector.keyToleranceUm}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-[10px] font-mono-tabular text-slate-500">SURFACE FINISH</div>
                    <div className="text-xs font-mono-tabular font-bold text-slate-900 mt-1">
                      {activeSector.surfaceFinishRaUm}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-[10px] font-mono-tabular text-slate-500">LEAD TIME SAVED</div>
                    <div className="text-base font-mono-tabular font-bold text-emerald-700 mt-0.5">
                      -{activeSector.leadTimeReductionPct}%
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="text-[10px] font-mono-tabular text-slate-500">TOOLING SAVINGS</div>
                    <div className="text-base font-mono-tabular font-bold text-sky-700 mt-0.5">
                      -{activeSector.unitCostSavingsPct}%
                    </div>
                  </div>
                </div>

                {/* Validated Process Chain */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="text-xs font-semibold text-slate-900">
                    Validated Industrial Process Chain
                  </div>
                  <p className="text-xs font-mono-tabular text-slate-700 leading-relaxed">
                    {activeSector.technicalWorkflow}
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Qualified Resins:</span>
                    {activeSector.primaryMaterials.map((mat, i) => (
                      <React.Fragment key={mat}>
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <span>{mat}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Claim-to-Proof Empirical Case Study */}
              <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 space-y-4 border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono-tabular text-sky-400 font-semibold">
                    INDUSTRIAL BENCHMARK CASE STUDY
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-sky-400" />
                </div>

                <div>
                  <div className="text-xs text-slate-400">{activeSector.caseStudy.organizationType}</div>
                  <h4 className="text-base font-semibold text-white mt-0.5">
                    {activeSector.caseStudy.component}
                  </h4>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 bg-slate-800/70 rounded-lg border border-slate-700/80">
                    <span className="text-rose-300 font-mono-tabular font-semibold block mb-0.5">
                      BASELINE BOTTLENECK:
                    </span>
                    <p className="text-slate-300">{activeSector.caseStudy.challenge}</p>
                  </div>

                  <div className="p-3 bg-slate-800/70 rounded-lg border border-slate-700/80">
                    <span className="text-sky-300 font-mono-tabular font-semibold block mb-0.5">
                      SLA ENGINEERING IMPLEMENTATION:
                    </span>
                    <p className="text-slate-300">{activeSector.caseStudy.solution}</p>
                  </div>

                  <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-700/50">
                    <span className="text-emerald-300 font-mono-tabular font-semibold block mb-0.5">
                      VERIFIED QUANTITATIVE OUTCOME:
                    </span>
                    <p className="text-emerald-100 font-medium">
                      {activeSector.caseStudy.quantifiedOutcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: POINTS OF STRENGTH, DRAWBACKS & LIMITATIONS */}
        <section id="evaluation" className="space-y-10 scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                04. CRITICAL ENGINEERING AUDIT: STRENGTHS, DRAWBACKS &amp; LIMITATIONS
              </div>
              <h2
                className="text-2xl sm:text-3xl font-editorial font-medium text-slate-900"
                style={{ textWrap: 'balance' }}
              >
                Points of Strength vs. Physical &amp; Operational Limitations
              </h2>
              <p className="text-[15px] text-slate-700 leading-[1.7]">
                Deploying SLA in production requires an uncompromising understanding of both its unmatched strengths and its inherent physical failure modes. Below is a root-cause analysis of SLA&apos;s governing mechanics alongside a quantitative cross-process benchmark matrix.
              </p>
            </div>

            {/* Interactive Filter Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['All', 'Strength', 'Limitation'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStrengthFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    strengthFilter === tab
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'All'
                    ? 'All Factors (7)'
                    : tab === 'Strength'
                    ? 'Points of Strength (3)'
                    : 'Drawbacks & Limitations (4)'}
                </button>
              ))}
            </div>
          </div>

          {/* Strengths & Limitations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStrengthsLimitations.map((item) => {
              const isStrength = item.type === 'Strength';
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono-tabular font-semibold">
                        {isStrength ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="text-emerald-700">POINT OF STRENGTH</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="text-amber-700">DRAWBACK &amp; LIMITATION</span>
                          </>
                        )}
                      </div>
                      <span className="text-[11px] font-mono-tabular text-slate-400">
                        {item.id.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>

                    <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                      <p>
                        <strong className="text-slate-900">Physical Mechanism: </strong>
                        {item.physicsMechanism}
                      </p>
                      <p>
                        <strong className="text-slate-900">Empirical Benchmark: </strong>
                        <span className="font-mono-tabular text-slate-800">{item.quantifiedBenchmark}</span>
                      </p>
                      <p>
                        <strong className="text-slate-900">Manufacturing Impact: </strong>
                        {item.engineeringImpact}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border text-xs leading-relaxed ${
                      isStrength
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <strong className="text-slate-900">
                      {isStrength ? 'Design Leverage Rule: ' : 'Engineering Mitigation Strategy: '}
                    </strong>
                    {item.mitigationOrLeverageStrategy}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cross-Technology Quantitative Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Cross-Process Quantitative Benchmark: Laser SLA vs. DLP, SLS, FDM &amp; CNC
                </h3>
                <p className="text-xs text-slate-500">
                  Standardized comparison across resolution, surface roughness, isotropy, and lifecycle durability.
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-slate-500">ISO / ASTM 52900 Metrology Data</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-mono-tabular text-slate-500">
                    <th className="py-3 px-4 font-semibold">METROLOGY PARAMETER</th>
                    <th className="py-3 px-3 font-semibold text-sky-800 bg-sky-50/50">LASER SLA (VPP)</th>
                    <th className="py-3 px-3 font-semibold">DLP / MSLA</th>
                    <th className="py-3 px-3 font-semibold">SLS (PA12 POWDER)</th>
                    <th className="py-3 px-3 font-semibold">INDUSTRIAL FDM</th>
                    <th className="py-3 px-3 font-semibold">5-AXIS CNC</th>
                    <th className="py-3 px-4 font-semibold text-right">SLA STANDING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {PROCESS_COMPARISON_MATRIX.map((row) => (
                    <tr key={row.parameter} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {row.parameter}{' '}
                        <span className="font-mono-tabular font-normal text-slate-400">({row.unit})</span>
                      </td>
                      <td className="py-3 px-3 font-mono-tabular font-semibold text-sky-900 bg-sky-50/30">
                        {row.slaLaser}
                      </td>
                      <td className="py-3 px-3 font-mono-tabular text-slate-700">{row.dlpMsla}</td>
                      <td className="py-3 px-3 font-mono-tabular text-slate-700">{row.slsPowder}</td>
                      <td className="py-3 px-3 font-mono-tabular text-slate-700">{row.fdmExtrusion}</td>
                      <td className="py-3 px-3 font-mono-tabular text-slate-700">{row.cncMachining}</td>
                      <td className="py-3 px-4 text-right font-mono-tabular">
                        {row.slaAdvantageLevel === 'Superior' ? (
                          <span className="text-emerald-700 font-semibold">● Superior</span>
                        ) : row.slaAdvantageLevel === 'Competitive' ? (
                          <span className="text-sky-700 font-semibold">● Competitive</span>
                        ) : (
                          <span className="text-amber-700 font-semibold">▲ Constrained</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 05: FUTURE OUTLOOK FOR INDUSTRIAL MANUFACTURING INTEGRATION */}
        <section id="outlook" className="space-y-10 scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono-tabular text-sky-700 font-semibold">
                05. FUTURE OUTLOOK &amp; INDUSTRIAL FACTORY INTEGRATION (2026–2032+)
              </div>
              <h2
                className="text-2xl sm:text-3xl font-editorial font-medium text-slate-900"
                style={{ textWrap: 'balance' }}
              >
                Transitioning SLA from Standalone Lab Machines to Lights-Out Factory Cells
              </h2>
              <p className="text-[15px] text-slate-700 leading-[1.7] max-w-[68ch]">
                For its first three decades, stereolithography remained siloed inside R&amp;D prototype shops due to three industrial barriers: <strong>slow layer-peel cycle times</strong>, <strong>brittle single-network acrylate chemistry</strong>, and <strong>manual, solvent-heavy post-processing</strong>. Over the next decade, the convergence of interfacial fluid dynamics, dual-cure polymer networks, automated MES robotics, and holographic volumetric lithography is integrating SLA directly into high-throughput manufacturing lines.
              </p>

              {/* 4 Pillar Cards for Factory Integration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                    <Cpu className="w-4 h-4 text-sky-600" />
                    <span>MES, OPC-UA &amp; In-Situ Tomography</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Industrial SLA cells now stream real-time IR thermal imaging of exothermic cure heat and laser photodiode telemetry via OPC-UA to enterprise MES platforms, creating serialized digital twins for aerospace AS9100 and FDA 21 CFR Part 820 compliance.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Dual-Cure &amp; Self-Healing Thermosets</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Next-generation resins decouple shape creation from mechanical property formation: UV light forms a rapid green-state scaffold while a secondary thermal bake triggers ring-opening or polyurethane crosslinking with dynamic covalent bonds.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="aspect-4/3 w-full bg-slate-100 relative">
                  <img
                    src={factoryImage}
                    alt="Automated additive manufacturing factory floor featuring a synchronized array of industrial SLA systems and robotic post-curing stations"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <figcaption className="px-4 py-2.5 text-xs text-slate-500 border-t border-slate-200 font-editorial italic">
                  Fig 5.1 — Lights-out industrial SLA production array integrated with automated build-plate shuttle gantry, centrifugal resin recovery, and nitrogen-purged UV curing chambers.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* 3-Horizon Industrial Roadmap */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INDUSTRIAL_OUTLOOK_ROADMAP.map((milestone) => (
              <div
                key={milestone.horizon}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-slate-500 border-b border-slate-100 pb-2.5">
                    <span className="text-sky-700 font-semibold">{milestone.horizon}</span>
                    <span>{milestone.timeframe}</span>
                  </div>

                  <div className="text-[11px] font-mono-tabular text-slate-500">
                    Readiness: <strong className="text-slate-800">{milestone.trlLevel}</strong>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{milestone.title}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed">{milestone.technicalDetails}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                  <div className="p-2.5 bg-sky-50/70 border border-sky-200/70 rounded-lg">
                    <span className="text-[10px] font-mono-tabular text-sky-800 font-semibold block">
                      THROUGHPUT &amp; COST IMPACT
                    </span>
                    <span className="font-mono-tabular font-bold text-slate-900">
                      {milestone.throughputMultiplier}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Target Sectors:</span>
                    {milestone.targetIndustries.map((ind, idx) => (
                      <React.Fragment key={ind}>
                        {idx > 0 && <span aria-hidden="true">·</span>}
                        <span>{ind}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Techno-Economic Crossover Simulator */}
          <IndustrialIntegrationSimulator />
        </section>

        {/* EXECUTIVE SYNTHESIS & ENGINEERING CHECKLIST */}
        <section className="bg-slate-900 text-white rounded-xl p-8 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl font-editorial font-medium text-white">
                Executive Synthesis: When to Specify Stereolithography in Manufacturing
              </h2>
            </div>
            <span className="text-xs font-mono-tabular text-slate-400">
              DECISION MATRIX · ISO/ASTM 52900 VPP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            <div className="space-y-2 p-4 bg-slate-800/60 rounded-lg border border-slate-700">
              <div className="font-mono-tabular text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPECIFY SLA WHEN:</span>
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>• Feature tolerances require ±25–50 μm or smooth surface finishes (Rₐ &lt; 1.2 μm).</li>
                <li>• Parts demand optical transparency, complex 3D microfluidic channels, or gas/liquid hermeticity.</li>
                <li>• Production involves lot-size-of-one customization (dental arches, surgical guides, hearing aids) or sacrificial investment casting patterns.</li>
              </ul>
            </div>

            <div className="space-y-2 p-4 bg-slate-800/60 rounded-lg border border-slate-700">
              <div className="font-mono-tabular text-amber-400 font-semibold">
                ENGINEER AROUND CONSTRAINTS BY:
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>• Designing self-draining hollow cavities and 20°–45° orientation angles to minimize Stefan peel suction and support scarring.</li>
                <li>• Specifying hybrid epoxy-acrylate IPNs or dual-cure polyurethane resins instead of brittle mono-network acrylates.</li>
                <li>• Validating thermal and UV post-curing schedules to drive monomer conversion above 95%.</li>
              </ul>
            </div>

            <div className="space-y-2 p-4 bg-slate-800/60 rounded-lg border border-slate-700">
              <div className="font-mono-tabular text-rose-400 font-semibold">
                SELECT ALTERNATIVE PROCESSES WHEN:
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>• Parts require unshielded 10-year outdoor UV exposure or sustained structural creep resistance at elevated temperatures (prefer SLS PA12, FDM ULTEM, or CNC).</li>
                <li>• Annual volume of an unchanging, moldable geometry exceeds 5,000–10,000 units (transition from SLA bridge inserts to hard steel injection molding).</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 text-xs text-slate-500">
        <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            Stereolithography (SLA) Technical Review &amp; Engineering Monograph · Standard Reference ISO/ASTM 52900 (VPP-UVL)
          </div>
          <div className="flex items-center gap-4">
            <a href="#physics" className="hover:text-slate-900">Physics</a>
            <span>·</span>
            <a href="#materials" className="hover:text-slate-900">Materials</a>
            <span>·</span>
            <a href="#applications" className="hover:text-slate-900">Applications</a>
            <span>·</span>
            <a href="#evaluation" className="hover:text-slate-900">Evaluation</a>
            <span>·</span>
            <a href="#outlook" className="hover:text-slate-900">Industrial Outlook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
