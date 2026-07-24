export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Digital Twin", to: "/digital-twin" },
  { label: "Ocean Explorer", to: "/explorer" },
  { label: "AI Intelligence", to: "/ai" },
  { label: "Alerts", to: "/alerts" },
  { label: "Restoration", to: "/restoration" },
  { label: "About", to: "/about" },
];

export const AI_LAYERS = [
  { id: "pollution", label: "Pollution", color: "#f43f5e", value: 62 },
  { id: "coral", label: "Coral Health", color: "#f59e0b", value: 48 },
  { id: "species", label: "Species", color: "#10b981", value: 74 },
  { id: "ghostnets", label: "Ghost Nets", color: "#00f0ff", value: 31 },
  { id: "dumping", label: "Illegal Dumping", color: "#f43f5e", value: 19 },
  { id: "temperature", label: "Temperature", color: "#f59e0b", value: 57 },
  { id: "salinity", label: "Salinity", color: "#14b8a6", value: 66 },
  { id: "currents", label: "Ocean Currents", color: "#00f0ff", value: 80 },
  { id: "sensors", label: "Sensor Network", color: "#10b981", value: 91 },
];

export const TIMELINE_YEARS = [2020, 2022, 2024, 2026, 2030, 2035];

export const TIMELINE_DATA = {
  2020: { pollution: 41, coral: 72, species: 78, risk: 34, health: 68 },
  2022: { pollution: 52, coral: 61, species: 71, risk: 46, health: 59 },
  2024: { pollution: 62, coral: 48, species: 64, risk: 58, health: 49 },
  2026: { pollution: 69, coral: 39, species: 57, risk: 67, health: 41 },
  2030: { pollution: 78, coral: 27, species: 44, risk: 79, health: 29 },
  2035: { pollution: 88, coral: 14, species: 31, risk: 91, health: 17 },
};

export const REGIONS = [
  { id: "pacific", name: "North Pacific Gyre", coord: "34.2°N 145.6°W", risk: "Critical", pollution: 88, note: "Largest plastic accumulation zone detected by sonar arrays." },
  { id: "coral", name: "Coral Triangle", coord: "2.1°S 120.4°E", risk: "High", pollution: 54, note: "Bleaching acceleration flagged by thermal satellite layer." },
  { id: "atlantic", name: "Mid-Atlantic Ridge", coord: "0.0°N 25.0°W", risk: "Moderate", pollution: 37, note: "Ghost net clusters tracked across current corridor." },
  { id: "arctic", name: "Arctic Shelf", coord: "78.9°N 11.9°E", risk: "High", pollution: 44, note: "Salinity anomalies correlate with ice-melt inflow." },
];

export const DEPTH_ZONES = [
  {
    id: "sunlight", name: "Sunlight Zone", subtitle: "Epipelagic", range: "0 – 200m",
    temp: "24°C", pressure: "1 – 20 atm", light: 96, color: "#00f0ff", accent: "#14b8a6",
    life: ["Sea Turtle", "Dolphins", "Tuna", "Plankton"],
    ai: "Photosynthesis-driven biomass peaks here. AI flags surface plastic film accumulation.",
    biodiversity: 92, pollution: 71,
  },
  {
    id: "reef", name: "Coral Reef", subtitle: "Neritic", range: "0 – 60m",
    temp: "26°C", pressure: "1 – 7 atm", light: 88, color: "#f59e0b", accent: "#10b981",
    life: ["Reef Fish", "Coral Polyps", "Rays", "Clownfish"],
    ai: "Coral fluorescence spectra indicate early bleaching in 34% of scanned colonies.",
    biodiversity: 98, pollution: 58,
  },
  {
    id: "twilight", name: "Twilight Zone", subtitle: "Mesopelagic", range: "200 – 1000m",
    temp: "8°C", pressure: "20 – 100 atm", light: 34, color: "#14b8a6", accent: "#00f0ff",
    life: ["Lanternfish", "Squid", "Jellyfish", "Siphonophores"],
    ai: "Bioluminescent signatures mapped. Largest daily vertical migration on Earth.",
    biodiversity: 74, pollution: 22,
  },
  {
    id: "midnight", name: "Midnight Zone", subtitle: "Bathypelagic", range: "1000 – 4000m",
    temp: "4°C", pressure: "100 – 400 atm", light: 6, color: "#062c43", accent: "#00f0ff",
    life: ["Anglerfish", "Gulper Eel", "Vampire Squid", "Amphipods"],
    ai: "Zero sunlight. Sonar detects sparse but resilient predatory life forms.",
    biodiversity: 41, pollution: 9,
  },
  {
    id: "abyss", name: "The Abyss", subtitle: "Abyssopelagic", range: "4000 – 6000m",
    temp: "2°C", pressure: "400 – 600 atm", light: 1, color: "#020617", accent: "#14b8a6",
    life: ["Sea Cucumbers", "Tripod Fish", "Brittle Stars", "Isopods"],
    ai: "Abyssal plains show microplastic sediment deposits at 4,200m depth.",
    biodiversity: 28, pollution: 14,
  },
  {
    id: "hadal", name: "Hadal Trench", subtitle: "Hadalpelagic", range: "6000 – 11000m",
    temp: "1°C", pressure: "600 – 1100 atm", light: 0, color: "#020617", accent: "#f43f5e",
    life: ["Snailfish", "Xenophyophores", "Hadal Amphipods"],
    ai: "Deepest human-made pollution recorded. Life persists under crushing pressure.",
    biodiversity: 17, pollution: 21,
  },
];

export const ORGANISMS = {
  sunlight: { name: "Loggerhead Turtle", status: "Vulnerable", threats: "Bycatch, plastic ingestion", ai: "Detected via thermal drone · 97.4% confidence" },
  reef: { name: "Staghorn Coral", status: "Critically Endangered", threats: "Bleaching, acidification", ai: "Fluorescence anomaly · 91.2% confidence" },
  twilight: { name: "Atolla Jellyfish", status: "Least Concern", threats: "Light pollution, trawling", ai: "Bioluminescent trace · 88.7% confidence" },
  midnight: { name: "Humpback Anglerfish", status: "Data Deficient", threats: "Deep-sea mining", ai: "Sonar silhouette · 79.1% confidence" },
  abyss: { name: "Abyssal Sea Cucumber", status: "Near Threatened", threats: "Sediment plumes", ai: "Sediment scan · 84.6% confidence" },
  hadal: { name: "Mariana Snailfish", status: "Data Deficient", threats: "Extreme pressure, pollution", ai: "Pressure-lander cam · 72.3% confidence" },
};

export const ALERTS = [
  { type: "Ghost Net Detected", region: "Mid-Atlantic Ridge", level: "high", color: "#00f0ff" },
  { type: "Illegal Dumping", region: "South China Sea", level: "critical", color: "#f43f5e" },
  { type: "Coral Bleaching", region: "Great Barrier Reef", level: "high", color: "#f59e0b" },
  { type: "Blue Whale Migration", region: "Monterey Bay", level: "info", color: "#14b8a6" },
  { type: "Oil Spill", region: "Gulf of Mexico", level: "critical", color: "#f43f5e" },
  { type: "Plastic Accumulation", region: "North Pacific Gyre", level: "high", color: "#f59e0b" },
  { type: "Sonar Anomaly", region: "Mariana Trench", level: "info", color: "#00f0ff" },
  { type: "Thermal Spike", region: "Coral Triangle", level: "high", color: "#f43f5e" },
];

export const RESTORATION_LEVERS = [
  { id: "plastic", label: "Plastic Reduction", unit: "%" },
  { id: "mpa", label: "Marine Protected Areas", unit: "%" },
  { id: "fishing", label: "Fishing Regulation", unit: "%" },
  { id: "cleanup", label: "Cleanup Missions", unit: "%" },
  { id: "coral", label: "Coral Restoration", unit: "%" },
];


// ============ OCEAN DEPTH EXPLORER — signature expedition ============
// progress 0..1 maps across 6 layers. Each has cinematic atmosphere + species.
export const EXPLORER_ZONES = [
  {
    id: "surface", name: "Surface", subtitle: "The Threshold", depth: [0, 50],
    tempC: 24, pressure: "1 atm", visibility: 98, current: 1.2, health: 71,
    fog: "#0e6a8f", ambient: "#4fb8dd", accent: "#7fe9ff", lightZone: "#bff2ff", intensity: 2.4,
    narrative: "We break the surface tension. Sunlight floods the water and life is everywhere.",
    species: [
      { name: "Bottlenose Dolphin", kind: "dolphin", population: "Stable", conservation: "Least Concern", confidence: 98.2, note: "Highly social apex forager. Echolocation active.", color: "#8fd6f0" },
      { name: "Green Sea Turtle", kind: "turtle", population: "Recovering", conservation: "Endangered", confidence: 96.7, note: "Migratory grazer. Plastic ingestion risk elevated.", color: "#4fd6a0" },
      { name: "Atlantic Mackerel", kind: "school", population: "Abundant", conservation: "Least Concern", confidence: 94.1, note: "Dense schooling baitfish. Sonar reflective.", color: "#7fe9ff" },
    ],
  },
  {
    id: "sunlight", name: "Sunlight Zone", subtitle: "Epipelagic · 0–200m", depth: [50, 200],
    tempC: 20, pressure: "20 atm", visibility: 84, current: 0.9, health: 64,
    fog: "#0a5c86", ambient: "#2f9dc4", accent: "#00f0ff", lightZone: "#8fe4ff", intensity: 1.9,
    narrative: "Photosynthesis fuels the richest biomass on Earth. The blue grows deeper.",
    species: [
      { name: "Yellowfin Tuna", kind: "school", population: "Declining", conservation: "Near Threatened", confidence: 92.4, note: "Fast pelagic predator. Overfishing pressure high.", color: "#f5c542" },
      { name: "Moon Jellyfish", kind: "jelly", population: "Increasing", conservation: "Least Concern", confidence: 90.1, note: "Blooms indicate warming and nutrient shift.", color: "#9fd8ff" },
      { name: "Reef Shark", kind: "shark", population: "Declining", conservation: "Vulnerable", confidence: 88.9, note: "Keystone predator. Fin-trade threatened.", color: "#5b7f94" },
    ],
  },
  {
    id: "twilight", name: "Twilight Zone", subtitle: "Mesopelagic · 200–1000m", depth: [200, 1000],
    tempC: 8, pressure: "100 atm", visibility: 41, current: 0.6, health: 58,
    fog: "#063a52", ambient: "#0e6a8f", accent: "#14b8a6", lightZone: "#2a8fb0", intensity: 0.9,
    narrative: "Sunlight fades to a bruise of blue. Bioluminescence becomes the only language.",
    species: [
      { name: "Humboldt Squid", kind: "squid", population: "Stable", conservation: "Data Deficient", confidence: 85.3, note: "Aggressive shoaling cephalopod. Chromatophore signalling.", color: "#f26a8d" },
      { name: "Atolla Jellyfish", kind: "jelly", population: "Stable", conservation: "Least Concern", confidence: 87.6, note: "Emits burglar-alarm bioluminescence when attacked.", color: "#f43f5e" },
      { name: "Lanternfish", kind: "school", population: "Abundant", conservation: "Least Concern", confidence: 83.2, note: "Largest vertical migration of biomass on Earth.", color: "#00f0ff" },
    ],
  },
  {
    id: "midnight", name: "Midnight Zone", subtitle: "Bathypelagic · 1000–4000m", depth: [1000, 4000],
    tempC: 4, pressure: "400 atm", visibility: 8, current: 0.3, health: 49,
    fog: "#021a28", ambient: "#063348", accent: "#00f0ff", lightZone: "#0a4a66", intensity: 0.35,
    narrative: "Absolute darkness. Every point of light is a hunter, a lure, or a warning.",
    species: [
      { name: "Humpback Anglerfish", kind: "anglerfish", population: "Unknown", conservation: "Data Deficient", confidence: 78.4, note: "Bioluminescent lure via symbiotic bacteria.", color: "#00f0ff" },
      { name: "Vampire Squid", kind: "squid", population: "Stable", conservation: "Least Concern", confidence: 80.9, note: "Living fossil. Feeds on marine snow, not blood.", color: "#a03050" },
      { name: "Gulper Eel", kind: "eel", population: "Unknown", conservation: "Data Deficient", confidence: 74.7, note: "Enormous expandable jaw for scarce prey.", color: "#123a52" },
    ],
  },
  {
    id: "abyss", name: "The Abyss", subtitle: "Abyssopelagic · 4000–6000m", depth: [4000, 6000],
    tempC: 2, pressure: "600 atm", visibility: 4, current: 0.15, health: 41,
    fog: "#010e16", ambient: "#04222f", accent: "#14b8a6", lightZone: "#063040", intensity: 0.22,
    narrative: "The abyssal plain — a cold desert of sediment older than the mountains above.",
    species: [
      { name: "Dumbo Octopus", kind: "octopus", population: "Stable", conservation: "Least Concern", confidence: 81.5, note: "Deepest-living octopus. Flaps ear-like fins to hover.", color: "#e07a9a" },
      { name: "Deep-Sea Crab", kind: "crab", population: "Stable", conservation: "Least Concern", confidence: 84.0, note: "Scavenger of the abyssal floor. Pressure adapted.", color: "#c65a3a" },
      { name: "Tripod Fish", kind: "school", population: "Stable", conservation: "Least Concern", confidence: 79.2, note: "Stands on elongated fins, faces the current to feed.", color: "#6fae9a" },
    ],
  },
  {
    id: "hadal", name: "Hadal Trench", subtitle: "Hadalpelagic · 6000–11000m", depth: [6000, 11000],
    tempC: 1, pressure: "1100 atm", visibility: 2, current: 0.05, health: 33,
    fog: "#02060d", ambient: "#0a1c26", accent: "#f59e0b", lightZone: "#0a2230", intensity: 0.3,
    narrative: "The deepest scar on the planet. Life here defies everything we thought possible.",
    species: [
      { name: "Mariana Snailfish", kind: "snailfish", population: "Unknown", conservation: "Data Deficient", confidence: 72.3, note: "Deepest fish ever filmed. Translucent, boneless-soft.", color: "#f4d6c0" },
      { name: "Hydrothermal Vent Tubeworm", kind: "vent", population: "Endemic", conservation: "Protected Habitat", confidence: 88.1, note: "Chemosynthetic ecosystem. No sunlight required.", color: "#f59e0b" },
      { name: "Hadal Amphipod", kind: "amphipod", population: "Abundant", conservation: "Least Concern", confidence: 76.8, note: "Swarming scavenger. Aluminium shell resists pressure.", color: "#c9d6dd" },
    ],
  },
];

// discoveries surface as the sub descends (progress 0..1)
export const DISCOVERIES = [
  { at: 0.14, title: "Plastic Accumulation", severity: "High", confidence: 93, impact: "Microplastics entering surface food web", action: "Deploy skimmer drone grid", color: "#f59e0b" },
  { at: 0.30, title: "Ghost Fishing Net", severity: "Critical", confidence: 89, impact: "Entangling migratory species", action: "Dispatch autonomous cutter", color: "#f43f5e" },
  { at: 0.44, title: "Coral Bleaching", severity: "High", confidence: 91, impact: "Thermal stress collapsing reef nursery", action: "Flag for restoration seeding", color: "#f59e0b" },
  { at: 0.60, title: "Illegal Dumping", severity: "Critical", confidence: 86, impact: "Heavy-metal plume in water column", action: "Log evidence · alert authorities", color: "#f43f5e" },
  { at: 0.74, title: "Oil Leakage", severity: "Critical", confidence: 84, impact: "Hydrocarbon film smothering benthos", action: "Map source · contain plume", color: "#f43f5e" },
  { at: 0.88, title: "Hydrothermal Vent Field", severity: "Discovery", confidence: 95, impact: "New chemosynthetic ecosystem", action: "Protect · begin biodiversity survey", color: "#00f0ff" },
  { at: 0.96, title: "Unknown Marine Species", severity: "Discovery", confidence: 68, impact: "Unclassified hadal organism", action: "Capture imagery · DNA sample", color: "#14b8a6" },
];
