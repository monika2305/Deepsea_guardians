import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Menu, X, Radar } from "lucide-react";
import { NAV_LINKS } from "../lib/data";

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
      data-testid="main-navigation"
    >
      <div
        className={`glass-nav rounded-full flex items-center justify-between pl-6 pr-3 transition-all duration-400 ease-ocean ${
          scrolled ? "py-2" : "py-2.5"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 group" data-testid="nav-logo">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <Waves className="h-5 w-5 text-cyan" strokeWidth={1.5} />
            <span className="absolute inset-0 rounded-full border border-cyan/40 animate-sonar" />
          </span>
          <span className="font-heading text-lg tracking-tight text-white hidden sm:block">
            DeepSea<span className="text-cyan"> Guardian</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`relative px-3.5 py-1.5 text-[13px] tracking-wide transition-colors duration-150 ${
                  active ? "text-cyan" : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-cyan/10 border border-cyan/20 -z-10"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/digital-twin"
            data-testid="nav-launch-mission"
            className="hidden sm:flex items-center gap-2 rounded-full bg-cyan/10 border border-cyan/50 px-4 py-2 text-[12px] font-medium tracking-[0.15em] uppercase text-cyan shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:bg-cyan/20 transition-all duration-400 ease-ocean"
          >
            <Radar className="h-3.5 w-3.5" strokeWidth={1.5} />
            Launch Mission
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            data-testid="nav-mobile-toggle"
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-2 glass-nav rounded-3xl p-3 flex flex-col"
            data-testid="mobile-menu"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-3 rounded-2xl text-sm ${
                  location.pathname === l.to ? "text-cyan bg-cyan/10" : "text-slate-300"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
