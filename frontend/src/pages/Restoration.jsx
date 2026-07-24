import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sprout, Fish, Droplets, TrendingDown, Sparkles } from "lucide-react";
import { Slider } from "../components/ui/slider";
import { RESTORATION_LEVERS } from "../lib/data";
import { FadeUp } from "../components/Reveal";

export default function Restoration() {
  const [levers, setLevers] = useState(
    Object.fromEntries(RESTORATION_LEVERS.map((l) => [l.id, 20]))
  );

  const health = useMemo(() => {
    const vals = Object.values(levers);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [levers]);

  const risk = 100 - health;
  const clarity = 30 + health * 0.7;
  const fishCount = Math.round(12 + (health / 100) * 60);
  const coralHue = 180 + (health / 100) * 20;

  const set = (id, v) => setLevers((p) => ({ ...p, [id]: v[0] }));

  return (
    <div className="relative min-h-screen bg-ocean-gradient pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <FadeUp>
        <div className="flex items-center gap-2 mb-3"><Sprout className="h-4 w-4 text-cyan" strokeWidth={1.5} style={{ color: "#10b981" }} /><span className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: "#10b981" }}>Ocean Restoration</span></div>
        <h1 className="font-heading text-4xl md:text-6xl text-white tracking-tight">The Hope Meter</h1>
        <p className="mt-4 max-w-2xl text-slate-300/80">Adjust the levers of change and watch the ocean respond. Every policy, every cleanup, every restored reef shifts the future.</p>
      </FadeUp>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEVERS */}
        <FadeUp>
          <div className="glass-panel rounded-3xl p-8">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-400 mb-8">Intervention Levers</p>
            <div className="space-y-8">
              {RESTORATION_LEVERS.map((l) => (
                <div key={l.id} data-testid={`lever-${l.id}`}>
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-slate-200">{l.label}</span>
                    <span className="font-mono text-sm text-cyan">{levers[l.id]}{l.unit}</span>
                  </div>
                  <Slider value={[levers[l.id]]} onValueChange={(v) => set(l.id, v)} max={100} step={1} data-testid={`slider-${l.id}`} />
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* LIVING OCEAN */}
        <FadeUp delay={0.1}>
          <div className="glass-panel rounded-3xl overflow-hidden relative h-full min-h-[420px]">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: `linear-gradient(180deg, hsl(${coralHue},70%,${8 + health * 0.12}%) 0%, #020617 100%)`,
                opacity: 0.35 + clarity / 200,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* fish */}
            {Array.from({ length: fishCount }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-3 rounded-full"
                style={{ background: "#00f0ff", top: `${(i * 37) % 90 + 5}%`, left: `${(i * 53) % 90}%`, opacity: 0.5 + (health / 200) }}
                animate={{ x: [0, 30, 0], y: [0, -8, 0] }}
                transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              />
            ))}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-300">Living Simulation</span>
                <span className="font-mono text-[10px] text-cyan">{fishCount} species active</span>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-slate-300 mb-1">Ocean Health</div>
                <motion.div key={health} className="font-heading text-7xl md:text-8xl text-white leading-none">{health}<span className="text-2xl text-cyan">%</span></motion.div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* OUTCOME METRICS */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Fish, label: "Species Return", val: `${fishCount}`, color: "#10b981" },
          { icon: Droplets, label: "Water Clarity", val: `${Math.round(clarity)}%`, color: "#00f0ff" },
          { icon: Sparkles, label: "Coral Vitality", val: `${health}%`, color: "#f59e0b" },
          { icon: TrendingDown, label: "Threat Risk", val: `${risk}%`, color: "#f43f5e" },
        ].map((m, i) => (
          <FadeUp key={m.label} delay={i * 0.06}>
            <div className="glass-panel rounded-3xl p-6">
              <m.icon className="h-5 w-5 mb-4" strokeWidth={1.5} style={{ color: m.color }} />
              <div className="font-mono text-3xl text-white">{m.val}</div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">{m.label}</div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <div className="mt-16 text-center">
          <h2 className="font-heading italic text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-tight">
            "The future of our oceans depends on <span className="text-cyan">today's decisions.</span>"
          </h2>
        </div>
      </FadeUp>
    </div>
  );
}
