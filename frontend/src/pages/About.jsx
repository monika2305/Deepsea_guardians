import { Link } from "react-router-dom";
import { ArrowRight, Waves } from "lucide-react";
import { RevealLines, FadeUp, Marquee } from "../components/Reveal";

const PILLARS = [
  { n: "01", t: "Drones & Sensors", d: "Autonomous underwater vehicles and IoT arrays collect continuous data from the deep." },
  { n: "02", t: "Sonar & Satellite", d: "Acoustic mapping fused with orbital thermal and optical imagery for full coverage." },
  { n: "03", t: "Explainable AI", d: "Transparent neural models turn signals into confidence-scored intelligence." },
  { n: "04", t: "Digital Twin", d: "A simulated ocean that lets us predict, plan and protect before it's too late." },
];

export default function About() {
  return (
    <div className="relative min-h-screen bg-ocean-gradient pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-cyan">About the Mission</span>
        <h1 className="mt-6 font-heading text-5xl md:text-7xl text-white leading-[0.95] tracking-tight">
          <RevealLines lines={["We map the", "unmapped ocean."]} />
        </h1>
        <FadeUp delay={0.4}>
          <p className="mt-8 text-lg text-slate-300/85 leading-relaxed max-w-2xl">
            More than 80% of the ocean remains unexplored. DeepSea Guardian exists to change that — building an
            intelligence layer over the planet's largest, least understood ecosystem so that conservation can be
            driven by data, not guesswork.
          </p>
        </FadeUp>
      </div>

      <section className="my-20 py-8 border-y border-white/5">
        <Marquee items={["Explore", "Understand", "Predict", "Restore", "Protect"]} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
        {PILLARS.map((p, i) => (
          <FadeUp key={p.n} delay={(i % 2) * 0.1}>
            <div className="flex gap-6">
              <span className="font-mono text-sm text-cyan/70 pt-1">{p.n}</span>
              <div>
                <h3 className="font-heading text-2xl text-white mb-2">{p.t}</h3>
                <p className="text-slate-300/80 leading-relaxed max-w-md">{p.d}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <div className="mt-24 glass-panel rounded-[2.5rem] p-12 md:p-16 text-center">
          <Waves className="h-8 w-8 text-cyan mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="font-heading text-3xl md:text-4xl text-white max-w-2xl mx-auto">Ready to enter the Ocean Intelligence Center?</h2>
          <Link to="/digital-twin" className="mt-8 inline-flex items-center gap-3 rounded-full bg-cyan text-[#020617] px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_50px_rgba(0,240,255,0.55)] transition-all duration-400 ease-ocean" data-testid="about-cta">
            Launch Mission <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </FadeUp>
    </div>
  );
}
