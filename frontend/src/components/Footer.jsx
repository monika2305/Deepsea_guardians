import { Link } from "react-router-dom";
import { Waves } from "lucide-react";
import { NAV_LINKS } from "../lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 md:px-12 lg:px-24 py-16" data-testid="footer">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <Waves className="h-5 w-5 text-cyan" strokeWidth={1.5} />
            <span className="font-heading text-lg text-white">DeepSea Guardian</span>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            An AI-powered intelligence platform monitoring deep-ocean pollution and biodiversity — because what we cannot see, we cannot protect.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm text-slate-400 hover:text-cyan transition-colors duration-150">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px] tracking-widest uppercase text-slate-500">
        <span>© 2025 DeepSea Guardian</span>
        <span>Ocean Intelligence Center · v1.0</span>
      </div>
    </footer>
  );
}
