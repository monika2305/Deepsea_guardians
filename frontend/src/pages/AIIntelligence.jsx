import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, GitBranch, Activity, ShieldAlert, Radar } from "lucide-react";
import { FadeUp } from "../components/Reveal";

function Radial({ value, label, color, size = 150 }) {
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center" data-testid={`radial-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (value / 100) * c }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl text-white">{value}</span>
          <span className="font-mono text-[9px] tracking-widest text-slate-500">%</span>
        </div>
      </div>
      <span className="mt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">{label}</span>
    </div>
  );
}

const TREE = [
  { d: 0, label: "Acoustic anomaly detected", detail: "Sonar return 43dB above baseline" },
  { d: 1, label: "Object classification", detail: "Neural net → synthetic polymer 91%" },
  { d: 2, label: "Cross-reference currents", detail: "Drift vector matches ghost-net signature" },
  { d: 3, label: "Threat confirmed", detail: "Ghost Net · dispatch cleanup drone" },
];

export default function AIIntelligence() {
  const [hover, setHover] = useState(null);
  return (
    <div className="relative min-h-screen bg-ocean-gradient pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <FadeUp>
        <div className="flex items-center gap-2 mb-3"><Cpu className="h-4 w-4 text-cyan" strokeWidth={1.5} /><span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan">Explainable AI</span></div>
        <h1 className="font-heading text-4xl md:text-6xl text-white tracking-tight">AI Intelligence Center</h1>
        <p className="mt-4 max-w-2xl text-slate-300/80">Every detection is transparent. Follow the model's reasoning from raw signal to verified threat, with confidence at each step.</p>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeUp className="lg:col-span-1">
          <div className="glass-panel rounded-3xl p-8 h-full">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-8 flex items-center gap-2"><Activity className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /> Live Scores</p>
            <div className="grid grid-cols-2 gap-6">
              <Radial value={87} label="Risk Score" color="#f43f5e" />
              <Radial value={94} label="Confidence" color="#00f0ff" />
              <Radial value={62} label="Pollution" color="#f59e0b" />
              <Radial value={78} label="Prediction" color="#10b981" />
            </div>
          </div>
        </FadeUp>

        <FadeUp className="lg:col-span-2" delay={0.1}>
          <div className="glass-panel rounded-3xl p-8 h-full">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-8 flex items-center gap-2"><GitBranch className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /> Reasoning Tree</p>
            <div className="relative">
              {TREE.map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 pb-6 last:pb-0" style={{ marginLeft: n.d * 24 }}>
                  <div className="flex flex-col items-center">
                    <span className={`h-3 w-3 rounded-full ${i === TREE.length - 1 ? "bg-coral" : "bg-cyan"}`} style={{ boxShadow: `0 0 10px ${i === TREE.length - 1 ? "#f43f5e" : "#00f0ff"}` }} />
                    {i < TREE.length - 1 && <span className="w-px flex-1 bg-white/15 mt-1" />}
                  </div>
                  <div className="pb-2">
                    <div className="text-white text-sm">{n.label}</div>
                    <div className="font-mono text-xs text-slate-400 mt-0.5">{n.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Heatmap */}
      <FadeUp delay={0.1}>
        <div className="mt-6 glass-panel rounded-3xl p-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-6 flex items-center gap-2"><Radar className="h-3.5 w-3.5 text-cyan" strokeWidth={1.5} /> Pollution Density Heatmap</p>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(24, minmax(0,1fr))" }}>
            {Array.from({ length: 24 * 6 }).map((_, i) => {
              const intensity = Math.random();
              const color = intensity > 0.75 ? "#f43f5e" : intensity > 0.5 ? "#f59e0b" : intensity > 0.25 ? "#14b8a6" : "#062c43";
              return (
                <motion.div key={i} onMouseEnter={() => setHover(i)}
                  initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: (i % 24) * 0.008, duration: 0.4 }}
                  className="aspect-square rounded-[3px] cursor-crosshair"
                  style={{ background: color, opacity: hover === i ? 1 : 0.35 + intensity * 0.55, boxShadow: hover === i ? `0 0 10px ${color}` : "none" }} />
              );
            })}
          </div>
          <div className="mt-5 flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase text-slate-400">
            <span className="flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5 text-coral" strokeWidth={1.5} /> High</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-amber" /> Medium</span>
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-turquoise" style={{ background: "#14b8a6" }} /> Low</span>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
