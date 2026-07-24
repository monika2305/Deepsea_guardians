import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Synthesized ambient underwater drone (no external asset). Muted by default.
export default function AudioToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);

  const stop = () => {
    nodesRef.current.forEach((n) => {
      try { n.stop && n.stop(); n.disconnect && n.disconnect(); } catch (e) { /* node already stopped */ }
    });
    nodesRef.current = [];
  };

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = ctxRef.current || new AC();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);

    const freqs = [55, 82.5, 110];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.4 / (i + 1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.2;
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      osc.connect(g);
      g.connect(filter);
      filter.connect(master);
      osc.start();
      lfo.start();
      nodesRef.current.push(osc, lfo);
    });
    nodesRef.current.push(master);
    setOn(true);
  };

  return (
    <button
      onClick={toggle}
      data-testid="audio-toggle"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-nav text-slate-300 hover:text-cyan transition-colors duration-150"
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
    >
      {on ? <Volume2 className="h-4 w-4 text-cyan" strokeWidth={1.5} /> : <VolumeX className="h-4 w-4" strokeWidth={1.5} />}
      {on && <span className="absolute inset-0 rounded-full border border-cyan/40 animate-sonar" />}
    </button>
  );
}
