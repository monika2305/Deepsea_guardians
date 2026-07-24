import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Radio, Satellite, Cpu, MapPin } from "lucide-react";
import { AI_LAYERS, TIMELINE_YEARS, TIMELINE_DATA, REGIONS } from "../lib/data";
import { FadeUp } from "../components/Reveal";

const TwinGlobe = lazy(() => import("../components/three/TwinGlobe"));

const METRICS = [
  { key: "pollution", label: "Pollution Index", color: "#f43f5e" },
  { key: "coral", label: "Coral Health", color: "#f59e0b" },
  { key: "species", label: "Species Count", color: "#10b981" },
  { key: "risk", label: "Risk Level", color: "#f43f5e" },
  { key: "health", label: "Ocean Health", color: "#00f0ff" },
];

export default function DigitalTwin() {
  const [activeLayer, setActiveLayer] = useState(AI_LAYERS[0]);
  const [year, setYear] = useState(2024);
  const [selected, setSelected] = useState(null);
  const data = TIMELINE_DATA[year];

  return (
    <div className="relative min-h-screen bg-ocean-gradient pt-28 pb-24 px-4 md:px-8 lg:px-12">
      <FadeUp>
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan">Ocean Mission Control</span>
        </div>
        <h1 className="font-heading text-4xl md:text-6xl text-white tracking-tight leading-none">Digital Twin</h1>
        <p className="mt-4 max-w-2xl text-slate-300/80">
          A living simulation of the ocean. Rotate the planet, activate AI layers, scrub through time and click any region to interrogate the model.
        </p>
      </FadeUp>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LAYER RAIL */}
        <FadeUp className="lg:col-span-3" delay={0.1}>
          <div className="glass-panel rounded-3xl p-5">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-4 flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /> AI Layers
            </p>
            <div className="flex flex-col gap-1.5">
              {AI_LAYERS.map((l) => (
                <button
                  key={l.id}
                  data-testid={`layer-${l.id}`}
                  onClick={() => setActiveLayer(l)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-400 ease-ocean ${
                    activeLayer.id === l.id ? "bg-white/10 border border-white/15" : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-sm text-slate-200">
                    <span className="h-2 w-2 rounded-full" style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }} />
                    {l.label}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{l.value}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* GLOBE */}
        <FadeUp className="lg:col-span-6" delay={0.15}>
          <div className="glass-panel rounded-3xl overflow-hidden relative h-[420px] md:h-[560px]">
            <div className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-400">
              Layer · <span className="text-white">{activeLayer.label}</span>
            </div>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-cyan">
              <Satellite className="h-3.5 w-3.5" strokeWidth={1.5} /> 40 nodes live
            </div>
            <Suspense fallback={<div className="h-full w-full flex items-center justify-center"><span className="h-10 w-10 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin" /></div>}>
              <TwinGlobe layerColor={activeLayer.color} selected={selected} onSelect={setSelected} regions={REGIONS} />
            </Suspense>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-[0.25em] uppercase text-slate-500">
              Drag to rotate · Scroll to zoom
            </div>
          </div>
        </FadeUp>

        {/* METRICS */}
        <FadeUp className="lg:col-span-3" delay={0.2}>
          <div className="glass-panel rounded-3xl p-5 h-full">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-5 flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /> AI Prediction · {year}
            </p>
            <div className="flex flex-col gap-5">
              {METRICS.map((m) => (
                <div key={m.key}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">{m.label}</span>
                    <span className="font-mono text-lg text-white">{data[m.key]}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                      animate={{ width: `${data[m.key]}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* TIMELINE */}
      <FadeUp delay={0.1}>
        <div className="mt-6 glass-panel rounded-3xl p-6 md:p-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-8">Temporal Model · 2020 → 2035</p>
          <div className="relative flex justify-between items-center">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
            <motion.div
              className="absolute left-0 top-1/2 h-px bg-gradient-to-r from-cyan to-transparent"
              animate={{ width: `${(TIMELINE_YEARS.indexOf(year) / (TIMELINE_YEARS.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            {TIMELINE_YEARS.map((y) => (
              <button
                key={y}
                data-testid={`timeline-${y}`}
                onClick={() => setYear(y)}
                className="relative z-10 flex flex-col items-center gap-3 group"
              >
                <span
                  className={`h-3.5 w-3.5 rounded-full border transition-all duration-400 ease-ocean ${
                    year === y ? "bg-cyan border-cyan scale-125 shadow-[0_0_14px_rgba(0,240,255,0.6)]" : "bg-[#062c43] border-white/30 group-hover:border-cyan"
                  }`}
                />
                <span className={`font-mono text-sm transition-colors duration-150 ${year === y ? "text-cyan" : "text-slate-500 group-hover:text-slate-300"}`}>{y}</span>
              </button>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* REGION DETAIL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md glass-hud rounded-3xl p-6"
            data-testid="region-panel"
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white" data-testid="region-close">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-cyan" strokeWidth={1.5} />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cyan">{selected.coord}</span>
            </div>
            <h3 className="font-heading text-2xl text-white mb-1">{selected.name}</h3>
            <p className="text-sm text-slate-300/80 leading-relaxed mb-5">{selected.note}</p>
            <div className="flex gap-6">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">Risk</div>
                <div className="font-heading text-lg text-white">{selected.risk}</div>
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-1.5">Pollution</div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full bg-coral rounded-full" style={{ background: "#f43f5e" }} initial={{ width: 0 }} animate={{ width: `${selected.pollution}%` }} transition={{ duration: 0.8 }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
