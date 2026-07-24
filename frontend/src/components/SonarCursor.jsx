import { useEffect, useRef, useState } from "react";

export default function SonarCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const raf = useRef(0);
  const [ripples, setRipples] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const t = e.target;
      hovering.current = !!(t && t.closest && t.closest("a, button, [role='button'], input, [data-cursor='hover']"));
    };
    const onDown = () => {
      const id = idRef.current++;
      setRipples((r) => [...r, { id, x: pos.current.x, y: pos.current.y }]);
      setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 900);
    };
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        const s = hovering.current ? 2.1 : 1;
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${s})`;
        ringRef.current.style.borderColor = hovering.current ? "rgba(0,240,255,0.9)" : "rgba(0,240,255,0.45)";
        ringRef.current.style.opacity = hovering.current ? "1" : "0.8";
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      {/* precise glowing dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
        style={{ boxShadow: "0 0 12px 2px rgba(0,240,255,0.8)", willChange: "transform" }}
      />
      {/* lagging sonar ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-9 w-9 rounded-full border"
        style={{ borderColor: "rgba(0,240,255,0.45)", boxShadow: "0 0 18px rgba(0,240,255,0.25) inset", transition: "opacity 200ms", willChange: "transform" }}
      />
      {/* click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border border-cyan/60"
          style={{ left: r.x, top: r.y, width: 12, height: 12, transform: "translate(-50%,-50%)", animation: "cursor-ripple 0.9s cubic-bezier(0.16,1,0.3,1) forwards" }}
        />
      ))}
    </div>
  );
}
