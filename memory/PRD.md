# DeepSea Guardian — PRD

## Problem Statement
Cinematic, immersive, Awwwards-level website for "DeepSea Guardian", an AI-powered Deep Ocean
Pollution & Biodiversity Monitoring Platform. Frontend-only (no backend). Built for a national
frontend hackathon. Must feel like Apple / OceanX / BBC Blue Planet / National Geographic.

## Stack
- React (CRA + craco), React Router 7
- React Three Fiber + Three.js + @react-three/drei (3D)
- Framer Motion (motion), GSAP (available), Lenis (smooth scroll)
- TailwindCSS + shadcn/ui, Lucide icons
- Fonts: Fraunces (headings), Inter (body), JetBrains Mono (technical/HUD)

## Design System
- BG gradient #020617 → #041B2D → #062C43; glassmorphism; cyan #00f0ff accent;
  coral/amber/turquoise/sea-green accents. Motion easing cubic-bezier(0.16,1,0.3,1).
- Custom Tailwind colors registered: cyan, coral, turquoise, sea-green, amber, deep-navy, etc.

## Architecture
- `src/App.js` — router, SmoothScroll (Lenis), floating glass Navigation, Footer, AudioToggle,
  fixed -z-20 gradient backdrop, page transitions. Pages lazy-loaded.
- `src/components/Navigation.jsx`, `Footer.jsx`, `Reveal.jsx` (masked reveal/FadeUp/Marquee),
  `AudioToggle.jsx` (WebAudio ambient drone, muted by default).
- 3D: `components/three/OceanCanvas.jsx` (hero scene), `Creatures.jsx`, `Particles.jsx`,
  `TwinGlobe.jsx` (interactive globe), `ExplorerScene.jsx` + `DeepLife.jsx` (depth expedition life).
- `src/lib/data.js` — all mock data (AI layers, timeline, regions, EXPLORER_ZONES, DISCOVERIES).

## Implemented (2025-12)
- **Landing**: living 3D underwater world (whale, dolphins, turtle, fish schools, jellyfish,
  light rays, marine snow, bubbles, camera drift + mouse parallax), masked hero reveal, sonar
  pulse, marquee, manifesto chapters, capabilities, CTA.
- **Digital Twin**: interactive 3D ocean globe (rotate/zoom/pan via OrbitControls), 9 AI layer
  toggles that recolor globe, clickable region markers → glass info panel, animated sensor nodes +
  orbiting satellite, timeline 2020–2035 driving animated AI-prediction metrics.
- **Ocean Depth Explorer (signature)**: scroll = submarine descent through 6 zones
  (Surface→Sunlight→Twilight→Midnight→Abyss→Hadal). Live 3D world with zone-specific realistic
  marine life (dolphin, turtle, tuna, shark, jelly, squid, anglerfish w/ lure light, eel, dumbo
  octopus, crab, snailfish, hydrothermal vent, amphipod swarm) that react to sonar + cursor.
  Mission HUD (depth 0→11,000m, pressure→1101atm, temp, visibility, current, ocean health,
  mission %, sonar status). Sonar pulse every 10s + manual button (3D expanding ring + creature
  flash). AI scan panels (species/population/conservation/confidence/notes). Live discoveries feed
  (ghost nets, plastic, oil, coral bleaching, illegal dumping, vents, unknown species) triggered by
  depth. Cinematic mission-summary ending with closing message. Fully responsive.
- **AI Intelligence**: animated radial charts, reasoning tree, interactive pollution heatmap.
- **Alerts**: live animated alert feed + glowing threat map with sonar rings.
- **Restoration**: interactive Hope Meter sliders driving a living-ocean simulation + outcome metrics.
- **About**: editorial manifesto page.

## Notes
- Frontend-only. All data is realistic MOCK data (no backend/DB/APIs).
- Marine creatures are high-quality PROCEDURAL Three.js (stylized-realism), modular so GLTF/GLB
  models can be swapped in per creature later without changing scene wiring.
- Audio is synthesized (WebAudio), muted by default.

## Backlog / Next
- P1: Swap key creatures (whale, dolphin, turtle) with optimized GLTF/GLB + DRACO for photoreal.
- P1: Add drei <Caustics> shader + postprocessing bloom for extra cinematic depth.
- P2: Persist "expedition log" of discoveries; shareable mission summary image.
