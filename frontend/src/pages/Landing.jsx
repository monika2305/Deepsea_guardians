import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Satellite, Radar, Cpu, Waves, ShieldCheck } from "lucide-react";
import { RevealLines, FadeUp, Marquee } from "../components/Reveal";

const OceanCanvas = lazy(() => import("../components/three/OceanCanvas"));

const EASE = [0.16, 1, 0.3, 1];

const CHAPTERS = [
  { n: "01", title: "Sense the unseen", body: "Autonomous drones, sonar arrays and IoT sensors form a living nervous system across the abyss — streaming millions of readings from places sunlight never reaches." },
  { n: "02", title: "Understand with AI", body: "Neural models translate raw acoustics, thermal spectra and satellite imagery into explainable intelligence: pollution plumes, ghost nets, coral stress and species movement." },
  { n: "03", title: "Predict the tide", body: "A living Digital Twin simulates the ocean forward in time — revealing how today's choices ripple into 2035, so we can act before ecosystems collapse." },
  { n: "04", title: "Restore what remains", body: "From plastic interception to coral seeding, every intervention is measured, verified and visualised — turning conservation into a system we can steer." },
];

const CAPABILITIES = [
  { icon: Radar, title: "Sonar Mapping", desc: "Multi-beam acoustic imaging of the seafloor and water column." },
  { icon: Satellite, title: "Satellite Link", desc: "Orbital thermal & optical layers fused with in-situ readings." },
  { icon: Cpu, title: "Explainable AI", desc: "Confidence-scored detections with transparent reasoning." },
  { icon: Waves, title: "Digital Twin", desc: "A real-time simulated ocean you can rotate, scrub and query." },
];

export default function Landing() {
  return (
    <div className="relative">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-ocean-gradient" />}>
        <OceanCanvas />
      </Suspense>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        {/* sonar pulse behind title */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20 animate-sonar"
              style={{ animationDelay: `${i * 1.3}s` }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass-hud px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan">Ocean Intelligence · Live</span>
          </motion.div>

          <h1 className="font-heading text-white leading-[0.95] tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            <RevealLines lines={["DeepSea", "Guardian"]} delay={0.5} />
          </h1>

          <div className="mt-6 overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: EASE, delay: 0.85 }}
              className="font-heading italic text-xl md:text-2xl text-cyan/90"
            >
              AI-powered Ocean Intelligence Platform
            </motion.p>
          </div>

          <FadeUp delay={1.1} className="mt-8 max-w-xl">
            <p className="text-base md:text-lg leading-relaxed text-slate-300/90">
              Protecting deep-sea ecosystems using AI, underwater drones, IoT sensors,
              sonar, satellite imagery, and Digital Twin technology.
            </p>
          </FadeUp>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/explorer"
              data-testid="hero-begin-journey"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan text-[#020617] px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_50px_rgba(0,240,255,0.55)] transition-all duration-400 ease-ocean"
            >
              Begin Ocean Journey
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            </Link>
            <Link
              to="/digital-twin"
              data-testid="hero-explore-twin"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase text-white hover:bg-white/10 hover:border-white transition-all duration-400 ease-ocean"
            >
              <Compass className="h-4 w-4" strokeWidth={1.5} />
              Explore Digital Twin
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-6 md:left-12 lg:left-24 font-mono text-[11px] tracking-[0.3em] uppercase text-slate-400 flex items-center gap-3"
        >
          <span className="inline-block h-8 w-px bg-gradient-to-b from-cyan to-transparent" />
          Scroll to dive
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative z-10 py-10 border-y border-white/5 bg-[#020617]/40 backdrop-blur-sm">
        <Marquee items={["Pollution", "Coral Health", "Ghost Nets", "Biodiversity", "Ocean Currents", "Illegal Dumping", "Species Migration", "Restoration"]} />
      </section>

      {/* STATS */}
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {[
            { v: "11,034m", l: "Deepest Scan" },
            { v: "2.4M", l: "Daily Readings" },
            { v: "97.4%", l: "Detection Accuracy" },
            { v: "6", l: "Ocean Layers" },
          ].map((s, i) => (
            <FadeUp key={s.l} delay={i * 0.08}>
              <div className="glass-panel rounded-3xl p-6 md:p-8">
                <div className="font-mono text-3xl md:text-4xl text-white font-light">{s.v}</div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400">{s.l}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* MANIFESTO CHAPTERS */}
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-16">
        <FadeUp>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan mb-4">The Mission</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-3xl">
            An intelligence layer for the last unexplored frontier.
          </h2>
        </FadeUp>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.n} delay={(i % 2) * 0.1}>
              <div className="flex gap-6">
                <span className="font-mono text-sm text-cyan/70 pt-2">{c.n}</span>
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl text-white mb-3">{c.title}</h3>
                  <p className="text-slate-300/80 leading-relaxed max-w-md">{c.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.08}>
              <div className="group glass-panel rounded-3xl p-8 h-full hover:border-cyan/30 transition-colors duration-400 ease-ocean">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 border border-cyan/20 text-cyan mb-6 group-hover:scale-110 transition-transform duration-400 ease-ocean">
                  <c.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-heading text-xl text-white mb-2">{c.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-32">
        <FadeUp>
          <div className="glass-panel rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-3xl" />
            <ShieldCheck className="h-8 w-8 text-cyan mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-heading text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-tight">
              The future of our oceans depends on today's decisions.
            </h2>
            <Link
              to="/restoration"
              data-testid="cta-launch-mission"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-cyan text-[#020617] px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_50px_rgba(0,240,255,0.55)] transition-all duration-400 ease-ocean"
            >
              Launch Mission
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
