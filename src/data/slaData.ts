export interface ResinMaterial {
  id: string;
  name: string;
  category: 'Standard' | 'Engineering' | 'High-Temp & Ceramic' | 'Elastomeric' | 'Biocompatible' | 'Castable';
  chemistry: string;
  tensileStrengthMPa: number;
  youngsModulusGPa: number;
  elongationAtBreakPct: number;
  hdtAt045MPaC: number;
  viscosityCps: number;
  penetrationDepthDpUm: number;
  criticalExposureEcMjCm2: number;
  shrinkagePct: number;
  isoStandard: string;
  keyCharacteristics: string;
  typicalUseCases: string[];
  limitations: string;
}

export const RESIN_MATERIALS: ResinMaterial[] = [
  {
    id: 'std-acrylate',
    name: 'Standard Rigid Acrylate (Draft / Prototyping)',
    category: 'Standard',
    chemistry: 'Di-functional urethane dimethacrylate + multifunctional acrylate monomers',
    tensileStrengthMPa: 62.5,
    youngsModulusGPa: 2.75,
    elongationAtBreakPct: 6.2,
    hdtAt045MPaC: 58.4,
    viscosityCps: 420,
    penetrationDepthDpUm: 135,
    criticalExposureEcMjCm2: 8.4,
    shrinkagePct: 1.85,
    isoStandard: 'ASTM D638 / ISO 527',
    keyCharacteristics: 'Fast free-radical polymerization kinetics, ultra-low viscosity for rapid recoating, matte or optical clarity finish with sub-micron Ra.',
    typicalUseCases: [
      'Form and fit validation assemblies',
      'Wind tunnel aerodynamic scale models',
      'Optical light-pipe and lens prototypes'
    ],
    limitations: 'Low impact toughness (Izod notched < 25 J/m), susceptible to ambient UV yellowing and moisture-induced creep under sustained load.'
  },
  {
    id: 'tough-abs-hybrid',
    name: 'Tough ABS-Like Hybrid (Epoxy-Acrylate IPN)',
    category: 'Engineering',
    chemistry: 'Cycloaliphatic epoxy + urethane acrylate interpenetrating polymer network (IPN)',
    tensileStrengthMPa: 55.8,
    youngsModulusGPa: 2.30,
    elongationAtBreakPct: 24.5,
    hdtAt045MPaC: 68.0,
    viscosityCps: 890,
    penetrationDepthDpUm: 118,
    criticalExposureEcMjCm2: 11.2,
    shrinkagePct: 0.92,
    isoStandard: 'ISO 527 / ISO 179-1',
    keyCharacteristics: 'Dual cationic/free-radical cure mechanism reduces internal polymerization stress and curling; simulates injection-molded ABS cyclic snap-fit resilience.',
    typicalUseCases: [
      'Snap-fit functional enclosures and housings',
      'Automated assembly line jigs and fixtures',
      'Consumer electronics structural brackets'
    ],
    limitations: 'Moderate thermal ceiling; cationic dark-cure continues for 24–48 hours post-print, requiring controlled humidity (<40% RH) during exposure.'
  },
  {
    id: 'durable-pp-like',
    name: 'Low-Friction Durable (Polypropylene-Mimetic)',
    category: 'Engineering',
    chemistry: 'Aliphatic urethane oligomer with high-molecular-weight mono-acrylate diluents',
    tensileStrengthMPa: 31.4,
    youngsModulusGPa: 1.15,
    elongationAtBreakPct: 49.0,
    hdtAt045MPaC: 46.5,
    viscosityCps: 1120,
    penetrationDepthDpUm: 145,
    criticalExposureEcMjCm2: 12.8,
    shrinkagePct: 1.40,
    isoStandard: 'ASTM D638 / ASTM D256',
    keyCharacteristics: 'High impact absorption, low surface coefficient of friction (μ ≈ 0.18), high strain-to-failure suitable for living hinges and threaded couplings.',
    typicalUseCases: [
      'Living hinges and squeeze-bottle prototypes',
      'Low-load bushings, bearings, and wear guides',
      'Pneumatic tube routing manifolds'
    ],
    limitations: 'Low flexural modulus and low heat deflection temperature make it unsuitable for structural cantilevers or warm operating environments.'
  },
  {
    id: 'high-temp-cyanate',
    name: 'High-Temp Thermoset (289 °C HDT)',
    category: 'High-Temp & Ceramic',
    chemistry: 'Crosslinked bismaleimide-acrylate / cyanate ester hybrid thermoset network',
    tensileStrengthMPa: 78.2,
    youngsModulusGPa: 3.65,
    elongationAtBreakPct: 2.4,
    hdtAt045MPaC: 289.0,
    viscosityCps: 1650,
    penetrationDepthDpUm: 92,
    criticalExposureEcMjCm2: 15.6,
    shrinkagePct: 0.65,
    isoStandard: 'ASTM D648 / UL 94 V-0',
    keyCharacteristics: 'Exceptional thermal stability and dimensional rigidity under pressure; withstands autoclave sterilization, vulcanization, and short-run injection molding.',
    typicalUseCases: [
      'Low-volume thermoplastic injection mold inserts',
      'Carbon-fiber prepreg autoclave layup tooling',
      'Under-the-hood automotive sensor housings & hot-gas ducts'
    ],
    limitations: 'Brittle fracture behavior (low elongation at break); requires stepped programmable thermal post-cure cycle up to 160 °C to reach peak HDT.'
  },
  {
    id: 'ceramic-silica-composite',
    name: 'Ceramic-Filled Composite (65 wt% Fused Silica)',
    category: 'High-Temp & Ceramic',
    chemistry: 'Sub-micron SiO2 / Al2O3 ceramic suspension in low-viscosity diacrylate binder',
    tensileStrengthMPa: 84.0,
    youngsModulusGPa: 9.80,
    elongationAtBreakPct: 1.4,
    hdtAt045MPaC: 265.0,
    viscosityCps: 3400,
    penetrationDepthDpUm: 68,
    criticalExposureEcMjCm2: 19.4,
    shrinkagePct: 0.38,
    isoStandard: 'ISO 178 / NASA ASTM E595 (Low Outgassing)',
    keyCharacteristics: 'Ultra-high stiffness (9.8 GPa), stone-like matte finish, ultra-low coefficient of thermal expansion (CTE), can be debound and sintered into pure ceramic.',
    typicalUseCases: [
      'RF and microwave waveguide insulators',
      'Semiconductor wafer handling chucks',
      'Investment casting cores for hollow turbine blades'
    ],
    limitations: 'High suspension viscosity requires heated vat (35–45 °C) and active doctor-blade wiper; refractive index mismatch between particle and monomer scatters UV laser.'
  },
  {
    id: 'elastomer-tpu',
    name: 'Resilient Silicone-Urethane Elastomer (Shore 50A–80A)',
    category: 'Elastomeric',
    chemistry: 'Siloxane-modified aliphatic polyurethane acrylate oligomer',
    tensileStrengthMPa: 8.9,
    youngsModulusGPa: 0.04,
    elongationAtBreakPct: 165.0,
    hdtAt045MPaC: 42.0,
    viscosityCps: 2150,
    penetrationDepthDpUm: 160,
    criticalExposureEcMjCm2: 14.1,
    shrinkagePct: 1.75,
    isoStandard: 'ISO 37 / ASTM D2240 (Shore A)',
    keyCharacteristics: 'True elastomeric energy return, high tear strength (32 kN/m), survives >50,000 compression cycles without permanent compression set.',
    typicalUseCases: [
      'Custom pneumatic and vacuum end-of-arm soft robotics grippers',
      'Conformal acoustic and environmental gaskets',
      'Patient-specific anatomical vascular pulse phantoms'
    ],
    limitations: 'Requires thick support struts and reduced peel speeds to prevent elastic deformation during Z-axis layer separation.'
  },
  {
    id: 'biomed-class-iia',
    name: 'Biocompatible Surgical & Dental Resin (Class IIa)',
    category: 'Biocompatible',
    chemistry: 'UDMA (Urethane Dimethacrylate) & Bis-EMA free of BPA and phthalate plasticizers',
    tensileStrengthMPa: 73.0,
    youngsModulusGPa: 2.90,
    elongationAtBreakPct: 8.5,
    hdtAt045MPaC: 112.0,
    viscosityCps: 740,
    penetrationDepthDpUm: 110,
    criticalExposureEcMjCm2: 10.5,
    shrinkagePct: 0.80,
    isoStandard: 'ISO 10993-1 / USP Class VI / FDA 510(k)',
    keyCharacteristics: 'Non-cytotoxic, non-sensitizing, resistant to steam autoclave (134 °C), gamma irradiation, and ethylene oxide sterilization.',
    typicalUseCases: [
      'Orthopedic and maxillofacial osteotomy drilling guides',
      'Microfluidic point-of-care diagnostic PCR cartridges',
      'Long-term occlusal splints and hearing aid shells'
    ],
    limitations: 'Biocompatibility certification is strictly tied to validated workflow (dedicated resin vat, fresh 99% IPA bath, and calibrated wavelength UV cure chamber).'
  },
  {
    id: 'castable-wax-80',
    name: 'Zero-Ash Investment Castable (80% Wax-Filled)',
    category: 'Castable',
    chemistry: 'Photocurable acrylate matrix infused with 80 wt% micro-crystalline paraffin wax',
    tensileStrengthMPa: 18.5,
    youngsModulusGPa: 0.85,
    elongationAtBreakPct: 4.1,
    hdtAt045MPaC: 44.0,
    viscosityCps: 980,
    penetrationDepthDpUm: 105,
    criticalExposureEcMjCm2: 9.8,
    shrinkagePct: 0.55,
    isoStandard: 'ISO 11358 (TGA Residual Ash < 0.003%)',
    keyCharacteristics: 'Sublimates cleanly between 180 °C and 680 °C with <0.003% residual ash and minimal thermal expansion prior to gypsum or ceramic shell vitrification.',
    typicalUseCases: [
      'Direct investment casting of superalloy aerospace impellers',
      'High-detail precious metal filigree jewelry production',
      'Custom dental crowns, bridges, and subperiosteal frameworks'
    ],
    limitations: 'Low green-state mechanical strength; delicate thin walls must be handled carefully prior to investment slurry dipping.'
  }
];

export interface ApplicationSector {
  id: string;
  sector: string;
  code: string;
  headline: string;
  summary: string;
  keyToleranceUm: string;
  surfaceFinishRaUm: string;
  leadTimeReductionPct: number;
  unitCostSavingsPct: number;
  primaryMaterials: string[];
  technicalWorkflow: string;
  caseStudy: {
    organizationType: string;
    component: string;
    challenge: string;
    solution: string;
    quantifiedOutcome: string;
  };
}

export const APPLICATION_SECTORS: ApplicationSector[] = [
  {
    id: 'aerospace-investment',
    sector: 'Aerospace & Turbomachinery',
    code: 'SEC-01 · INVESTMENT CASTING & WIND TUNNEL',
    headline: 'Internal Cooling Serpentine Cores & Sacrificial Investment Patterns',
    summary: 'SLA replaced multi-piece CNC-machined wax tooling for complex single-crystal nickel superalloy turbine blades and monolithic structural brackets. By printing hollow hexagonal internal build structures (QuickCast™ geometry), patterns collapse inward during autoclave burnout without cracking the ceramic shell.',
    keyToleranceUm: '±35 μm (or ±0.0015 in/in)',
    surfaceFinishRaUm: '0.45 – 0.80 μm Ra',
    leadTimeReductionPct: 78,
    unitCostSavingsPct: 64,
    primaryMaterials: ['Zero-Ash Investment Castable', 'Ceramic-Filled Composite (SiO2)', 'High-Temp Thermoset (289 °C HDT)'],
    technicalWorkflow: 'CAD Core/Pattern Design → Hollow Hex-Drain Topology Generation → 50 μm Laser SLA Exposure → Solvent Vapor Wash → Ceramic Slurry Dipping → Flash Autoclave Dewaxing (750 °C) → Vacuum Superalloy Pour.',
    caseStudy: {
      organizationType: 'Tier-1 Propulsion OEM (Munich / Derby Turbine Division)',
      component: 'High-Pressure Turbine Stator Vane with Trailing-Edge Film Cooling Slots',
      challenge: 'Conventional hard wax injection tooling required 22 weeks and $185,000 per iteration to validate internal serpentine cooling channels.',
      solution: 'Direct SLA fabrication of sacrificial hollow patterns combined with silica-filled SLA ceramic cores printed at 25 μm Z-resolution.',
      quantifiedOutcome: 'Reduced tooling lead time from 22 weeks to 9 days (-94% time) and decreased prototype casting validation cost by $142,000 per geometry revision.'
    }
  },
  {
    id: 'medical-dental',
    sector: 'Dental, Craniofacial & Clinical Devices',
    code: 'SEC-02 · PATIENT-SPECIFIC BIOMEDICAL',
    headline: 'CBCT-Driven Surgical Osteotomy Guides & High-Throughput Orthodontics',
    summary: 'Stereolithography is the clinical backbone of digital dentistry and maxillofacial reconstruction. Because every patient anatomy is unique (lot-size-of-one), SLA enables mass customization of Class IIa surgical drill guides, clear thermoforming aligner arches, and custom-contoured hearing aid shells.',
    keyToleranceUm: '±25 μm across full dental arch',
    surfaceFinishRaUm: '0.35 – 0.60 μm Ra',
    leadTimeReductionPct: 85,
    unitCostSavingsPct: 71,
    primaryMaterials: ['Biocompatible Surgical & Dental Resin (Class IIa)', 'Tough ABS-Like Hybrid', 'Resilient Silicone-Urethane Elastomer'],
    technicalWorkflow: 'Intraoral Optical Scan + CBCT DICOM Segmentation → Virtual Implant Planning → Automated Support Generation → 385/405 nm SLA Print → Dual Ultrasonic 99% IPA Bath → Nitrogen-Purged UV Post-Cure → Steam Autoclave (134 °C).',
    caseStudy: {
      organizationType: 'University Craniofacial Surgical Center & Orthodontics Lab',
      component: 'Mandibular Fibula Free-Flap Reconstruction Cutting Guide',
      challenge: 'Freehand osteotomy shaping during microvascular fibula flap surgery resulted in extended ischemia times and ±2.4 mm occlusal deviation.',
      solution: 'Patient-matched ISO 10993 certified SLA cutting guides with integrated titanium drill-sleeve bosses printed 24 hours prior to surgery.',
      quantifiedOutcome: 'Reduced operating room ischemia time by 68 minutes (-38%) and improved bony segment angular accuracy to within ±0.32 mm.'
    }
  },
  {
    id: 'microfluidics-optics',
    sector: 'Microfluidics, Optics & Lab-on-a-Chip',
    code: 'SEC-03 · FLUIDIC MANIFOLDS & PHOTONICS',
    headline: 'Monolithic 3D Micro-Valves, Capillary Channels & Optical Waveguides',
    summary: 'Unlike fused filament (FDM) which suffers from inter-layer capillary leaks, or powder bed fusion (SLS) which cannot evacuate trapped powder from sub-millimeter channels, SLA produces fully dense, optically transparent monolithic fluidic manifolds with complex 3D routing without gasketed lamination.',
    keyToleranceUm: '±15 μm channel width (Micro-SLA)',
    surfaceFinishRaUm: '0.15 – 0.40 μm Ra (Post-Coated)',
    leadTimeReductionPct: 90,
    unitCostSavingsPct: 82,
    primaryMaterials: ['Standard Rigid Acrylate (Optical Clear)', 'Biocompatible Surgical & Dental Resin (Class IIa)', 'High-Temp Thermoset'],
    technicalWorkflow: 'CFD Channel Optimization → UV Absorber Doping Calibration (to prevent Z-overcure) → 25 μm Micro-SLA Print → Pressurized Capillary Solvent Flush → Refractive Index Matching Dip Coating → Optical Inspection.',
    caseStudy: {
      organizationType: 'Point-of-Care Genomics & Hematology Diagnostics Developer',
      component: '7-Layer Monolithic Pneumatic Micro-Mixer & Droplet Generator Cartridge',
      challenge: 'Diffusion-bonded 7-layer CNC-machined PMMA manifold suffered a 28% scrap rate due to adhesive channel occlusion and delamination at 4 bar.',
      solution: 'Consolidated 7 laminated acrylic plates into a single monolithic clear SLA manifold with internal 180 μm helical mixing channels.',
      quantifiedOutcome: 'Eliminated delamination failures (burst pressure > 12 bar), cut unit manifold cost from $410 to $24 (-94%), and compressed iteration cycles to 6 hours.'
    }
  },
  {
    id: 'injection-tooling',
    sector: 'Bridge Tooling & Rapid Injection Molding',
    code: 'SEC-04 · RAPID THERMOSET TOOLING',
    headline: 'Conformal-Cooled Bridge Mold Inserts for Low-Volume Thermoplastics',
    summary: 'High-temperature cyanate-ester and ceramic-filled SLA resins possess glass transition temperatures exceeding 260 °C and compressive strengths >120 MPa. Printed mold cores and cavities fitted into standard Master Unit Die (MUD) steel bases allow injection molding of 50 to 500 functional parts in real PP, PE, ABS, or PA6.',
    keyToleranceUm: '±40 μm cavity tolerance',
    surfaceFinishRaUm: '0.50 – 0.90 μm Ra',
    leadTimeReductionPct: 80,
    unitCostSavingsPct: 76,
    primaryMaterials: ['High-Temp Thermoset (289 °C HDT)', 'Ceramic-Filled Composite (65 wt% Fused Silica)'],
    technicalWorkflow: 'Moldflow Gate & Vent Simulation → Split Core/Cavity CAD with 2.5° Draft Angles → 50 μm SLA Print on Planar Base → Stepped Thermal Cure (up to 160 °C) → Backside Surface Grinding → Clamping in Steel MUD Frame → Injection Molding.',
    caseStudy: {
      organizationType: 'Industrial Sensor & Enclosure Manufacturer',
      component: 'IP67 Glass-Filled Polyamide (PA6-GF15) Field Sensor Housing',
      challenge: 'Required 250 functional production-material units for UL certification and field trials prior to committing $65,000 to multi-cavity H13 tool steel.',
      solution: 'Printed silica-filled SLA core/cavity inserts with air-blast cooling channels and injected 310 shots of PA6 at 245 °C barrel temperature.',
      quantifiedOutcome: 'Delivered 310 UL-testable parts in 4 days at $1,450 total tooling cost, identifying a critical boss sink-mark before cutting hard steel.'
    }
  }
];

export interface ProcessComparisonMetric {
  parameter: string;
  unit: string;
  slaLaser: string;
  dlpMsla: string;
  slsPowder: string;
  fdmExtrusion: string;
  cncMachining: string;
  slaAdvantageLevel: 'Superior' | 'Competitive' | 'Constrained';
}

export const PROCESS_COMPARISON_MATRIX: ProcessComparisonMetric[] = [
  {
    parameter: 'Minimum Feature Resolution (XY)',
    unit: 'μm',
    slaLaser: '25 – 85 (Spot size)',
    dlpMsla: '18 – 50 (Pixel pitch)',
    slsPowder: '350 – 500',
    fdmExtrusion: '250 – 400 (Nozzle)',
    cncMachining: '10 – 50 (Micro-endmill)',
    slaAdvantageLevel: 'Superior'
  },
  {
    parameter: 'Minimum Layer Thickness (Z)',
    unit: 'μm',
    slaLaser: '25 – 100',
    dlpMsla: '10 – 100',
    slsPowder: '60 – 120',
    fdmExtrusion: '100 – 300',
    cncMachining: 'N/A (Subtractive)',
    slaAdvantageLevel: 'Superior'
  },
  {
    parameter: 'As-Printed Surface Roughness (Ra)',
    unit: 'μm',
    slaLaser: '0.4 – 1.6',
    dlpMsla: '0.5 – 2.2 (Voxel steps)',
    slsPowder: '6.0 – 14.5 (Grainy)',
    fdmExtrusion: '12.0 – 35.0 (Ridges)',
    cncMachining: '0.4 – 3.2',
    slaAdvantageLevel: 'Superior'
  },
  {
    parameter: 'Z-Axis Mechanical Isotropy',
    unit: '% of XY',
    slaLaser: '94% – 99% (Crosslinked)',
    dlpMsla: '92% – 98%',
    slsPowder: '80% – 90%',
    fdmExtrusion: '45% – 65% (Anisotropic)',
    cncMachining: '100% (Bulk Billet)',
    slaAdvantageLevel: 'Superior'
  },
  {
    parameter: 'Maximum Build Envelope (Industrial)',
    unit: 'mm³',
    slaLaser: '1500 × 750 × 550',
    dlpMsla: '400 × 250 × 400',
    slsPowder: '700 × 380 × 580',
    fdmExtrusion: '914 × 610 × 914',
    cncMachining: '2000+ (Gantry Mill)',
    slaAdvantageLevel: 'Superior'
  },
  {
    parameter: 'Optical Clarity & Fluid Tightness',
    unit: 'Qualitative',
    slaLaser: 'Water-clear & Hermetic',
    dlpMsla: 'Clear & Hermetic',
    slsPowder: 'Opaque & Porous',
    fdmExtrusion: 'Translucent & Micro-leaks',
    cncMachining: 'Water-clear (Polished PMMA)',
    slaAdvantageLevel: 'Superior'
  },
  {
    parameter: 'Long-Term UV & Creep Stability',
    unit: '1000h Accelerated',
    slaLaser: 'Moderate (Degrades if unshielded)',
    dlpMsla: 'Moderate to High (Dual-cure)',
    slsPowder: 'High (Sintered PA12/PA11)',
    fdmExtrusion: 'High (ULTEM / PEEK / ASA)',
    cncMachining: 'Highest (Engineering Thermoplastics)',
    slaAdvantageLevel: 'Constrained'
  },
  {
    parameter: 'Support Removal & Post-Processing',
    unit: 'Labor Intensity',
    slaLaser: 'High (Wash + UV Cure + Snip)',
    dlpMsla: 'High (Wash + UV/Thermal Cure)',
    slsPowder: 'Low (Self-supporting powder bed)',
    fdmExtrusion: 'Moderate (Soluble support)',
    cncMachining: 'Moderate (Deburring & Fixturing)',
    slaAdvantageLevel: 'Constrained'
  }
];

export interface StrengthAndLimitation {
  id: string;
  type: 'Strength' | 'Limitation';
  title: string;
  physicsMechanism: string;
  quantifiedBenchmark: string;
  engineeringImpact: string;
  mitigationOrLeverageStrategy: string;
}

export const STRENGTHS_AND_LIMITATIONS: StrengthAndLimitation[] = [
  {
    id: 'str-isotropy',
    type: 'Strength',
    title: 'Covalent Inter-Layer Crosslinking & Near-True Isotropy',
    physicsMechanism: 'During laser exposure, cure depth (Cd) is calibrated to exceed layer thickness (L) by 30–50% (overcure ratio Cd/L ≈ 1.35). Unreacted acrylate/epoxy groups at the top of layer n-1 form primary covalent bonds with layer n.',
    quantifiedBenchmark: 'Z-axis tensile strength reaches 95–99% of XY plane strength; hydrostatic burst pressures >12 bar without impregnation.',
    engineeringImpact: 'Eliminates the catastrophic Z-axis delamination common in FDM/FFF. Enables pressurized pneumatic manifolds, microfluidic cartridges, and multiaxial load brackets.',
    mitigationOrLeverageStrategy: 'Leverage for complex 3D internal fluid routing where stress vectors act across build planes.'
  },
  {
    id: 'str-surface-resolution',
    type: 'Strength',
    title: 'Optical Spot Resolution & Sub-Micron Surface Finish',
    physicsMechanism: 'Galvanometer-steered solid-state Nd:YVO4 (355 nm) or diode (405 nm) lasers focus down to a Gaussian spot of 25–85 μm with continuous vector contour tracing, avoiding the rectangular voxel stair-stepping of low-resolution projectors.',
    quantifiedBenchmark: 'As-printed Ra of 0.4–1.2 μm on vertical walls; dimensional accuracy of ±0.15% (lower limit ±0.03 mm).',
    engineeringImpact: 'Allows direct printing of smooth aerodynamic airfoils, snap-fit mating interfaces, O-ring sealing grooves, and optical lenses requiring minimal polishing.',
    mitigationOrLeverageStrategy: 'Orient critical sealing surfaces at 15–30° to the build plate or vertical to eliminate meniscus stair-stepping.'
  },
  {
    id: 'str-scale-speed',
    type: 'Strength',
    title: 'Scalable Vat Volume Without Optical Pixel Dilution',
    physicsMechanism: 'Unlike DLP/MSLA where widening the build area stretches pixel pitch (reducing resolution), laser SLA decouples build area from resolution via F-Theta telecentric lenses or dynamic Z-focusing galvanometers.',
    quantifiedBenchmark: 'Industrial SLA frames reach 1500 × 750 × 550 mm while preserving an 80 μm fine contour spot and 250 μm fast infill beam.',
    engineeringImpact: 'Capable of printing full-scale automotive dashboards, bumper fascias, or 400+ nested dental arches in a single unattended overnight build.',
    mitigationOrLeverageStrategy: 'Use dual-spot variable beam optics: trace outer perimeters with an 80 μm spot for tolerance, and hatch internal volumes with a 300 μm beam for 3× volumetric throughput.'
  },
  {
    id: 'lim-peel-forces',
    type: 'Limitation',
    title: 'Hydrodynamic Stefan Adhesion & Peel Forces (Inverted SLA)',
    physicsMechanism: 'In bottom-up SLA, curing a cross-section against the PDMS/FEP optical window creates a vacuum seal. Lifting the part induces Stefan adhesion proportional to the fourth power of the cross-sectional radius (F ∝ μ · R⁴ / h³).',
    quantifiedBenchmark: 'Suction forces can exceed 50–150 N on large flat cross-sections, causing thin-wall warping, Z-banding, or support detachment.',
    engineeringImpact: 'Mandates sacrificial lattice supports on overhangs and restricts minimum unsupported wall thickness to ~0.4–0.6 mm.',
    mitigationOrLeverageStrategy: 'Hollow large cross-sections, add vent holes near the build plate to prevent hydraulic cupping, or transition to oxygen-inhibited dead-zone (CLIP) / top-down industrial SLA.'
  },
  {
    id: 'lim-shrinkage-curl',
    type: 'Limitation',
    title: 'Polymerization Shrinkage & Residual Curl Distortion',
    physicsMechanism: 'Converting van der Waals monomer spacing (~3.4 Å) into covalent C–C bond lengths (~1.54 Å) during free-radical acrylate polymerization induces 3–6% volumetric shrinkage, generating tensile bending moments on the previous layer.',
    quantifiedBenchmark: 'Linear shrinkage of 1.2–2.2% in pure acrylates; reduced to 0.4–0.9% in hybrid cationic epoxy-acrylate formulations.',
    engineeringImpact: 'Long flat cantilevers and unsupported flanges curl upward ("banana effect") if support anchors are under-designed or exposure energy is excessive.',
    mitigationOrLeverageStrategy: 'Select ring-opening cationic epoxy hybrids or ceramic-filled resins for tight tolerances; apply brick-wall staggered hatch patterns so shrinkage stresses cancel locally.'
  },
  {
    id: 'lim-uv-aging-creep',
    type: 'Limitation',
    title: 'Thermoset Brittleness, Viscoelastic Creep & Photolytic Aging',
    physicsMechanism: 'High crosslink density restricts polymer chain mobility, lowering fracture toughness. Residual photoinitiators continue absorbing ambient UV radiation over months, causing chain scission and yellowing.',
    quantifiedBenchmark: 'Unshielded standard acrylates lose up to 35% elongation-at-break after 500 hours of QUV accelerated weathering; viscoelastic creep occurs under >20% yield stress.',
    engineeringImpact: 'Historically relegated SLA to prototyping rather than 10-year outdoor or constant-load structural production.',
    mitigationOrLeverageStrategy: 'Adopt dual-cure polyurethane/epoxy chemistries (e.g., DLS/P3), apply UV-blocking clear coats or electroplated Nickel-Copper shells, and avoid sustained static cantilever loads.'
  },
  {
    id: 'lim-post-processing',
    type: 'Limitation',
    title: 'Chemical Solvent Washing, Support Scarring & Hazmat Workflow',
    physicsMechanism: 'Parts emerge coated in unpolymerized, sensitizing liquid monomers (15–30% reaches gel point during print; 70–85% conversion achieved only after solvent wash + thermal/UV post-cure).',
    quantifiedBenchmark: 'Adds 45–120 minutes of post-processing cycle time; generates VOC-laden isopropyl alcohol (IPA) or TPM waste streams.',
    engineeringImpact: 'Creates a bottleneck for high-volume lights-out factory lines and requires manual or CNC touch-sanding where support tips attach.',
    mitigationOrLeverageStrategy: 'Integrate centrifugal spin-washing (eliminating 85% of solvent usage), non-flammable Dipropylene Glycol Methyl Ether (DPM) closed-loop distillation, and soluble secondary support materials.'
  }
];

export interface RoadmapMilestone {
  horizon: string;
  timeframe: string;
  trlLevel: string;
  title: string;
  coreBreakthrough: string;
  throughputMultiplier: string;
  targetIndustries: string[];
  technicalDetails: string;
}

export const INDUSTRIAL_OUTLOOK_ROADMAP: RoadmapMilestone[] = [
  {
    horizon: 'Horizon 1 · Active Factory Deployment',
    timeframe: '2025 – 2027',
    trlLevel: 'TRL 8–9 (Commercial Scale)',
    title: 'Interfacial Dead-Zone Continuous Printing & Dual-Cure Polyurethane IPNs',
    coreBreakthrough: 'Elimination of discrete layer-by-layer mechanical peel via oxygen-permeable fluoropolymer windows (CLIP) or circulating immiscible fluorinated oil sub-layers (HARP).',
    throughputMultiplier: '15× to 50× faster vertical Z-draw rates (up to 300 mm/hr)',
    targetIndustries: ['Automotive Connectors', 'Athletic Footwear Midsoles', 'Consumer Electronics'],
    technicalDetails: 'By maintaining a 20–50 μm polymerization-inhibited liquid "dead zone" at the optical window, hydrodynamic suction forces drop to near zero. Combined with dual-cure resins (UV sets geometry; thermal bake reacts blocked isocyanates with polyols), parts achieve true thermoplastic-grade toughness and hydrolytic stability.'
  },
  {
    horizon: 'Horizon 2 · Near-Term Industrialization',
    timeframe: '2027 – 2029',
    trlLevel: 'TRL 6–8 (Pilot Production Lines)',
    title: 'Closed-Loop Robotic Post-Processing & Solvent-Free Centrifugal Recovery',
    coreBreakthrough: 'Autonomous Lights-Out SLA Cells with OPC-UA / MTConnect MES integration, AI-vision optical tomography, and supercritical CO2 or high-G centrifugal resin reclamation.',
    throughputMultiplier: '72% reduction in per-part labor cost; 90% reduction in VOC chemical waste',
    targetIndustries: ['Contract Medical Manufacturing', 'Aerospace MRO', 'Industrial Fluidics'],
    technicalDetails: 'Instead of saturating parts in flammable IPA vats, robotic arms transfer build plates directly into heated dual-axis centrifuges that spin off 96% of uncured resin for immediate filtration and reuse. In-situ infrared thermography verifies every layer’s exothermic polymerization signature against a digital twin for FAA/FDA lot traceability.'
  },
  {
    horizon: 'Horizon 3 · Next-Gen Frontier',
    timeframe: '2029 – 2032+',
    trlLevel: 'TRL 4–6 (Advanced R&D / Early Defense)',
    title: 'Computed Axial Lithography (Volumetric SLA) & Multi-Wavelength Functional Grading',
    coreBreakthrough: 'Tomographic holographic projection curing an entire 3D volume simultaneously inside a rotating photopolymer cylinder, paired with 365 nm / 405 nm wavelength-selective chemistry.',
    throughputMultiplier: '100×+ volumetric speed (complete complex parts solidified in 15–60 seconds)',
    targetIndustries: ['Bioprinting & Organ Scaffolds', 'Graded Stiffness Robotics', 'Embedded Photonics'],
    technicalDetails: 'Volumetric SLA (CAL) eliminates layers and support structures entirely because the high-viscosity resin supports the part hydrostatically from all angles.Simultáneamente, wavelength-selective photoinitiators allow 365 nm UV light to cure rigid epoxy domains while 450 nm blue light cures soft acrylate domains within the exact same vat—enabling monolithic multi-material parts.'
  }
];
