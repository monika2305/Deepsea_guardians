import { useRef, useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  Gauge, Thermometer, Eye, Waves, Activity, Radar, ChevronDown, X, Fish,
  ScanLine, AlertTriangle, Radio, ArrowDown, Sparkles,
} from "lucide-react";
import { EXPLORER_ZONES, DISCOVERIES } from "../lib/data";

const ExplorerScene = lazy(() => import("../components/three/ExplorerScene"));
const EASE = [0.16, 1, 0.3, 1];
const N = EXPLORER_ZONES.length;

function lerp(a, b, t) { return a + (b - a) * t; }

function computeMetrics(p) {
  const cl = Math.min(0.9999, Math.max(0, p));
  const sf = cl * N;
  const i = Math.min(Math.floor(sf), N - 1);
  const frac = sf - i;
  const a = EXPLORER_ZONES[i];
  const b = EXPLORER_ZONES[Math.min(i + 1, N - 1)];
  const depth = Math.round(lerp(a.depth[0], a.depth[1], frac));
  return {
    index: i,
    zone: a,
    depth,
    temp: lerp(a.tempC, b.tempC, frac),
    visibility: Math.round(lerp(a.visibility, b.visibility, frac)),
    current: lerp(a.current, b.current, frac),
    health: Math.round(lerp(a.health, b.health, frac)),
    pressure: Math.max(1, Math.round(1 + depth / 10)),
    progress: cl,
  };
}

export default function DepthExplorer() {
  const zonesRef = useRef(null);
  const progressRef = useRef(0);
  const sonarRef = useRef({ t: -10 });
  const clockRef = useRef({ v: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const firedRef = useRef(new Set());
  const lenis = useLenis();

  const [metrics, setMetrics] = useState(() => computeMetrics(0));
  const [activeId, setActiveId] = useState(EXPLORER_ZONES[0].id);
  const [sonarActive, setSonarActive] = useState(false);
  const [scan, setScan] = useState(null);
  const [discoveries, setDiscoveries] = useState([]);
  const [started, setStarted] = useState(false);

  const { scrollYProgress } = useScroll({ target: zonesRef, offset: ["start start", "end end"] });

  // link scene clock to page for sonar timing
  const attachClock = useCallback((v) => { clockRef.current.v = v; }, []);

  const triggerSonar = useCallback(() => {
    sonarRef.current = { t: clockRef.current.v };
    setSonarActive(true);
    setTimeout(() => setSonarActive(false), 2600);
    // AI auto-scans a nearby species
    const zone = computeMetrics(progressRef.current).zone;
    const sp = zone.species[Math.floor(Math.random() * zone.species.length)];
    setScan({ ...sp, zone: zone.name });
  }, []);

  useEffect(() => {
    const id = setInterval(() => { if (progressRef.current > 0.001) triggerSonar(); }, 10000);
    return () => clearInterval(id);
  }, [triggerSonar]);

  useEffect(() => {
    if (!scan) return;
    const t = setTimeout(() => setScan(null), 6500);
    return () => clearTimeout(t);
  }, [scan]);

  useEffect(() => {
    const onMove = (e) => {
      cursorRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      cursorRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    const m = computeMetrics(v);
    setMetrics(m);
    if (m.zone.id !== activeId) setActiveId(m.zone.id);
    if (v > 0.001 && !started) setStarted(true);
    // trigger discoveries
    DISCOVERIES.forEach((d, i) => {
      if (v >= d.at && !firedRef.current.has(i)) {
        firedRef.current.add(i);
        setDiscoveries((prev) => [{ ...d, id: i }, ...prev].slice(0, 3));
      }
    });
  });

  const beginDive = () => {
    const el = document.getElementById("zone-surface");
    if (lenis && el) lenis.scrollTo(el, { offset: -1 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scanSpecies = (sp, zoneName) => setScan({ ...sp, zone: zoneName });

  return (
    <div className="relative">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-ocean-gradient" />}>
        <ExplorerScene progressRef={progressRef} activeId={activeId} sonarRef={sonarRef} cursorRef={cursorRef} onClock={attachClock} />
      </Suspense>

      {/* ---------- MISSION HUD ---------- */}
      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2 w-52"
            data-testid="mission-hud"
          >
            <div className="glass-hud rounded-2xl px-4 py-3">
              <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-400 mb-1">Depth</div>
              <div className="font-mono text-3xl text-cyan tabular-nums leading-none">{metrics.depth.toLocaleString()}<span className="text-xs text-slate-500 ml-1">m</span></div>
            </div>
            <div className="glass-hud rounded-2xl px-4 py-3 grid grid-cols-2 gap-y-3 gap-x-2">
              <HudStat icon={Gauge} label="Pressure" value={`${metrics.pressure}`} unit="atm" />
              <HudStat icon={Thermometer} label="Temp" value={metrics.temp.toFixed(1)} unit="°C" />
              <HudStat icon={Eye} label="Visibility" value={`${metrics.visibility}`} unit="%" />
              <HudStat icon={Waves} label="Current" value={metrics.current.toFixed(2)} unit="kn" />
            </div>
            <div className="glass-hud rounded-2xl px-4 py-3">
              <div className="flex justify-between items-center mb-1.5"><span className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-400">Ocean Health</span><span className="font-mono text-sm text-white">{metrics.health}%</span></div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-sea-green to-cyan" animate={{ width: `${metrics.health}%` }} transition={{ duration: 0.4 }} /></div>
              <div className="flex justify-between items-center mt-3 mb-1.5"><span className="font-mono text-[9px] tracking-[0.3em] uppercase text-slate-400">Mission</span><span className="font-mono text-sm text-white">{Math.round(metrics.progress * 100)}%</span></div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden"><motion.div className="h-full rounded-full bg-cyan" animate={{ width: `${metrics.progress * 100}%` }} transition={{ duration: 0.4 }} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- SONAR STATUS + CONTROL ---------- */}
      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3"
          >
            <div className="glass-hud rounded-2xl px-4 py-3 flex items-center gap-3">
              <span className={`relative flex h-2.5 w-2.5 ${sonarActive ? "" : "opacity-40"}`}>
                {sonarActive && <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75 animate-ping" />}
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
              </span>
              <div><div className="font-mono text-[9px] tracking-[0.25em] uppercase text-slate-400">Sonar</div><div className="font-mono text-xs text-cyan">{sonarActive ? "SCANNING" : "STANDBY"}</div></div>
            </div>
            <button
              onClick={triggerSonar}
              data-testid="sonar-trigger"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full glass-hud text-cyan hover:bg-cyan/10 transition-colors duration-150"
              aria-label="Emit sonar pulse"
            >
              <Radar className="h-6 w-6" strokeWidth={1.5} />
              <span className="absolute inset-0 rounded-full border border-cyan/40 animate-sonar" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- AI SCAN PANEL ---------- */}
      <AnimatePresence>
        {scan && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm glass-hud rounded-3xl p-5"
            data-testid="ai-scan-panel"
          >
            <button onClick={() => setScan(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white" data-testid="scan-close"><X className="h-4 w-4" /></button>
            <div className="flex items-center gap-2 mb-3"><ScanLine className="h-4 w-4 text-cyan animate-pulse-glow" strokeWidth={1.5} /><span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan">AI Scan · {scan.zone}</span></div>
            <h3 className="font-heading text-2xl text-white leading-tight">{scan.name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ScanStat label="Population" value={scan.population} />
              <ScanStat label="Conservation" value={scan.conservation} />
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-1.5"><span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">AI Confidence</span><span className="font-mono text-xs text-white">{scan.confidence}%</span></div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden"><motion.div className="h-full rounded-full bg-cyan" initial={{ width: 0 }} animate={{ width: `${scan.confidence}%` }} transition={{ duration: 1, ease: EASE }} /></div>
            </div>
            <p className="mt-4 text-xs text-slate-300/80 leading-relaxed border-t border-white/10 pt-3">{scan.note}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- LIVE DISCOVERIES ---------- */}
      <div className="fixed top-24 right-4 z-30 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-xs pointer-events-none">
        <AnimatePresence>
          {discoveries.map((d) => (
            <motion.div
              key={d.id} layout
              initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="glass-panel rounded-2xl p-4 pointer-events-auto"
              data-testid={`discovery-${d.id}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: d.color }} />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: d.color }}>{d.severity}</span>
                <span className="ml-auto font-mono text-[9px] text-slate-500">{d.confidence}%</span>
              </div>
              <div className="text-sm text-white font-medium">{d.title}</div>
              <div className="mt-1 text-[11px] text-slate-400 leading-snug">{d.impact}</div>
              <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] text-cyan"><ArrowDown className="h-3 w-3 rotate-[-90deg]" /> {d.action}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ---------- INTRO ---------- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-cyan">Autonomous Submarine · DSV-Guardian</span>
          <h1 className="mt-6 font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[0.92] tracking-tight">
            Ocean Depth<br /><span className="italic text-cyan/90">Explorer</span>
          </h1>
          <p className="mt-8 max-w-lg mx-auto text-slate-300/85 leading-relaxed">
            Descend from the sunlit surface to the crushing dark of the Hadal Trench. Scroll to dive — the AI scans every lifeform, current and threat it finds along the way.
          </p>
          <button onClick={beginDive} data-testid="begin-dive" className="mt-10 inline-flex items-center gap-3 rounded-full bg-cyan text-[#020617] px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_50px_rgba(0,240,255,0.55)] transition-all duration-400 ease-ocean">
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} /> Begin Dive
          </button>
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-12 text-slate-400"><ChevronDown className="h-6 w-6" strokeWidth={1.5} /></motion.div>
      </section>

      {/* ---------- ZONE NARRATIVE SECTIONS ---------- */}
      <div ref={zonesRef}>
        {EXPLORER_ZONES.map((z, i) => (
          <section key={z.id} id={`zone-${z.id}`} className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-28" data-testid={`explorer-zone-${z.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-30%" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm" style={{ color: z.accent }}>0{i + 1}</span>
                <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-slate-400">{z.subtitle}</span>
              </div>
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-none tracking-tight">{z.name}</h2>
              <p className="mt-6 text-lg text-slate-200/85 leading-relaxed font-heading italic">{z.narrative}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {z.species.map((sp) => (
                  <button
                    key={sp.name}
                    onClick={() => scanSpecies(sp, z.name)}
                    data-testid={`species-${z.id}-${sp.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-200 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300"
                  >
                    <Fish className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan transition-colors" strokeWidth={1.5} style={{ color: sp.color }} />
                    {sp.name}
                    <ScanLine className="h-3 w-3 opacity-0 group-hover:opacity-100 text-cyan transition-opacity" strokeWidth={1.5} />
                  </button>
                ))}
              </div>

              <div className="mt-8 flex gap-8">
                <MiniStat icon={Thermometer} label="Temp" value={`${z.tempC}°C`} />
                <MiniStat icon={Gauge} label="Pressure" value={z.pressure} />
                <MiniStat icon={Eye} label="Visibility" value={`${z.visibility}%`} />
              </div>
            </motion.div>
          </section>
        ))}
      </div>

      {/* ---------- MISSION SUMMARY ---------- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24" data-testid="mission-summary">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }} className="w-full max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass-hud px-4 py-1.5 mb-8"><Sparkles className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /><span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan">Mission Complete</span></div>
          <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight tracking-tight">We surfaced with the truth.</h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { v: "18", l: "Species Observed" },
              { v: "1", l: "Ghost Nets" },
              { v: "3", l: "Pollution Hotspots" },
              { v: "34%", l: "Coral Health" },
              { v: "41", l: "Ocean Health Index" },
            ].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }} className="glass-panel rounded-2xl p-5">
                <div className="font-mono text-3xl text-cyan">{s.v}</div>
                <div className="mt-2 font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400">{s.l}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-14 font-heading italic text-2xl md:text-3xl text-white max-w-2xl mx-auto leading-snug">
            "Every discovery beneath the surface is a step toward <span className="text-cyan">protecting our planet.</span>"
          </p>
        </motion.div>
      </section>
    </div>
  );
}

function HudStat({ icon: Icon, label, value, unit }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase text-slate-400 mb-0.5"><Icon className="h-3 w-3" strokeWidth={1.5} /> {label}</div>
      <div className="font-mono text-base text-white leading-none">{value}<span className="text-[9px] text-slate-500 ml-0.5">{unit}</span></div>
    </div>
  );
}

function ScanStat({ label, value }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/8 px-3 py-2">
      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400">{label}</div>
      <div className="text-xs text-white mt-0.5">{value}</div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-slate-400 mb-1"><Icon className="h-3 w-3" strokeWidth={1.5} /> {label}</div>
      <div className="font-mono text-lg text-white">{value}</div>
    </div>
  );
}
