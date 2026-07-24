import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Radio, MapPin } from "lucide-react";
import { ALERTS } from "../lib/data";
import { FadeUp } from "../components/Reveal";

const LEVEL_STYLE = {
  critical: { color: "#f43f5e", label: "Critical" },
  high: { color: "#f59e0b", label: "High" },
  info: { color: "#00f0ff", label: "Info" },
};

const MAP_POINTS = [
  { x: 22, y: 40 }, { x: 48, y: 30 }, { x: 70, y: 55 }, { x: 82, y: 38 },
  { x: 35, y: 65 }, { x: 60, y: 72 }, { x: 15, y: 58 }, { x: 90, y: 62 },
];

export default function Alerts() {
  const [feed, setFeed] = useState(() => ALERTS.slice(0, 4).map((a, i) => ({ ...a, id: i, t: Date.now() - i * 1000 })));
  const idRef = useRef(100);

  useEffect(() => {
    const int = setInterval(() => {
      const a = ALERTS[Math.floor(Math.random() * ALERTS.length)];
      setFeed((f) => [{ ...a, id: idRef.current++, t: Date.now() }, ...f].slice(0, 8));
    }, 3200);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="relative min-h-screen bg-ocean-gradient pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <FadeUp>
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full rounded-full bg-coral opacity-75 animate-ping" style={{ background: "#f43f5e" }} /><span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: "#f43f5e" }} /></span>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-coral" style={{ color: "#f43f5e" }}>Live Monitoring · Active</span>
        </div>
        <h1 className="font-heading text-4xl md:text-6xl text-white tracking-tight">Alert Center</h1>
        <p className="mt-4 max-w-2xl text-slate-300/80">Real-time threat detection across every monitored basin. New signals arrive as the network scans.</p>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MAP */}
        <FadeUp>
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden h-[420px]">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-4 flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /> Threat Map</p>
            <div className="absolute inset-8 top-16 rounded-2xl border border-white/5 bg-[#020617]/40 overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(0,240,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.15) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
              {MAP_POINTS.map((p, i) => {
                const lvl = ["critical", "high", "info"][i % 3];
                return (
                  <span key={i} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                    <span className="absolute -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full" style={{ background: LEVEL_STYLE[lvl].color, boxShadow: `0 0 12px ${LEVEL_STYLE[lvl].color}` }} />
                    <span className="absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border animate-sonar" style={{ borderColor: LEVEL_STYLE[lvl].color, animationDelay: `${i * 0.4}s` }} />
                  </span>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* FEED */}
        <FadeUp delay={0.1}>
          <div className="glass-panel rounded-3xl p-6 h-[420px] flex flex-col">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-4 flex items-center gap-2"><Radio className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /> Incoming Signals</p>
            <div className="flex-1 overflow-hidden space-y-2.5" data-testid="alert-feed">
              <AnimatePresence initial={false}>
                {feed.map((a) => {
                  const s = LEVEL_STYLE[a.level];
                  return (
                    <motion.div
                      key={a.id}
                      layout
                      initial={{ opacity: 0, x: 30, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${s.color}18`, color: s.color }}>
                        <AlertTriangle className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{a.type}</div>
                        <div className="font-mono text-[10px] tracking-wide text-slate-400">{a.region}</div>
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded-full" style={{ color: s.color, background: `${s.color}15` }}>{s.label}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
