import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Masked line-by-line reveal. Pass an array of lines.
export function RevealLines({ lines, className = "", delay = 0, stagger = 0.12 }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeUp({ children, delay = 0, y = 30, className = "", once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({ items, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex animate-marquee">
        {row.map((it, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 text-slate-500">
            <span className="font-heading italic text-2xl md:text-3xl text-slate-300">{it}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
        ))}
      </div>
    </div>
  );
}
