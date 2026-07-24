🌊 DeepSea Guardian

An AI-powered Deep Ocean Pollution & Biodiversity Monitoring Platform — a cinematic, immersive, Awwwards-level web experience built for a national frontend hackathon. Think Apple × OceanX × BBC Blue Planet: a living 3D ocean you scroll, explore, and dive into.

Frontend-only. All data shown (species, pollution stats, discoveries, AI predictions) is realistic mock data — there is no live backend/DB/API wired up yet.

✨ Highlights
Landing — A living 3D underwater world (whale, dolphins, turtles, fish schools, jellyfish, light rays, marine snow, bubbles) with camera drift, mouse parallax, a masked hero reveal, sonar pulse, and manifesto-style storytelling.
Digital Twin — An interactive 3D ocean globe (rotate/zoom/pan) with 9 toggleable AI layers that recolor the globe, clickable region markers with glass info panels, animated sensor nodes, an orbiting satellite, and a 2020–2035 timeline driving live AI-prediction metrics.
Ocean Depth Explorer (signature feature) — Scroll = a submarine descent through 6 real ocean zones (Surface → Sunlight → Twilight → Midnight → Abyss → Hadal), packed with zone-accurate marine life (dolphin, turtle, tuna, shark, jellyfish, squid, anglerfish, eel, dumbo octopus, crab, snailfish, hydrothermal vents, amphipod swarms) that react to sonar and cursor. Includes a full Mission HUD (depth, pressure, temperature, visibility, current, ocean health, mission %, sonar status), a live discoveries feed, and a cinematic mission-summary ending.
AI Intelligence — Animated radial charts, a reasoning tree, and an interactive pollution heatmap.
Alerts — A live animated alert feed with a glowing threat map and sonar rings.
Restoration — Interactive "Hope Meter" sliders that drive a living-ocean simulation and outcome metrics.
About — An editorial manifesto page.
🛠️ Tech Stack

Frontend

React 19 (Create React App + CRACO)
React Router 7
React Three Fiber + Three.js + @react-three/drei for 3D scenes
Framer Motion + GSAP for animation, Lenis for smooth scrolling
TailwindCSS + shadcn/ui (Radix primitives) + Lucide icons
Recharts for data visualization
Synthesized WebAudio ambient sound (muted by default)
Fonts: Fraunces (headings), Inter (body), JetBrains Mono (technical/HUD readouts)

Backend (scaffolded, not currently used by the frontend)

FastAPI + Motor (async MongoDB driver)
A minimal /api router with a health check (GET /api/) and a status-check CRUD endpoint
📁 Project Structure
Deepsea_guardians/
├── backend/                  # FastAPI service (minimal scaffold, MongoDB via Motor)
│   ├── server.py
│   ├── requirements.txt
│   └── pytest.ini
├── frontend/                 # React app (the actual product)
│   ├── src/
│   │   ├── components/
│   │   │   ├── three/        # OceanCanvas, Creatures, Particles, TwinGlobe, ExplorerScene, DeepLife...
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── pages/            # Landing, DigitalTwin, DepthExplorer, AIIntelligence, Alerts, Restoration, About
│   │   ├── lib/               # data.js (mock data), utils, smooth scroll
│   │   └── App.js            # router, navigation, page transitions
│   └── package.json
├── design_guidelines.json    # Design tokens: colors, typography, glassmorphism recipes
├── memory/PRD.md             # Product requirements / architecture notes
└── tests/                    # Backend test scaffolding
🚀 Getting Started
Frontend
bash
cd frontend
yarn install        # or npm install
yarn start           # or npm start

The app runs at http://localhost:3000.

bash
yarn build           # production build
Backend (optional — not required for the frontend experience)
bash
cd backend
pip install -r requirements.txt

Create a .env file inside backend/ with:

MONGO_URL=mongodb://localhost:27017
DB_NAME=deepsea_guardian
CORS_ORIGINS=http://localhost:3000

Then run:

bash
uvicorn server:app --reload
🎨 Design System
Palette: deep navy → ocean blue → abyss blue background gradient, with bioluminescent cyan (
#00F0FF), turquoise, sea-green, amber, and coral-red accents.
Glassmorphism: frosted glass panels, floating pill navigation, and an "AI HUD" glass style with cyan glow.
Motion: custom cubic-bezier easing (0.16, 1, 0.3, 1) throughout for a cinematic feel.

Full tokens live in design_guidelines.json.

🗺️ Roadmap
Swap key creatures (whale, dolphin, turtle) for optimized GLTF/GLB models with DRACO compression for photoreal rendering.
Add <Caustics> shading and post-processing bloom for extra cinematic depth.
Persist an "expedition log" of discoveries with a shareable mission-summary image.
Wire the frontend up to a real backend/data pipeline for live ocean-monitoring data.
📄 License

No license specified yet.
