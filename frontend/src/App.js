import { Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/App.css";

import SmoothScroll from "./lib/SmoothScroll";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AudioToggle from "./components/AudioToggle";
import SonarCursor from "./components/SonarCursor";
import Landing from "./pages/Landing";

const DigitalTwin = lazy(() => import("./pages/DigitalTwin"));
const DepthExplorer = lazy(() => import("./pages/DepthExplorer"));
const AIIntelligence = lazy(() => import("./pages/AIIntelligence"));
const Alerts = lazy(() => import("./pages/Alerts"));
const Restoration = lazy(() => import("./pages/Restoration"));
const About = lazy(() => import("./pages/About"));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <span className="h-10 w-10 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin" />
      <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-slate-400">Establishing link…</span>
    </div>
  </div>
);

function Transition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Transition><Landing /></Transition>} />
          <Route path="/digital-twin" element={<Transition><DigitalTwin /></Transition>} />
          <Route path="/explorer" element={<Transition><DepthExplorer /></Transition>} />
          <Route path="/ai" element={<Transition><AIIntelligence /></Transition>} />
          <Route path="/alerts" element={<Transition><Alerts /></Transition>} />
          <Route path="/restoration" element={<Transition><Restoration /></Transition>} />
          <Route path="/about" element={<Transition><About /></Transition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App min-h-screen text-white">
      <div className="fixed inset-0 -z-20 bg-ocean-gradient" />
      <div className="grain" />
      <BrowserRouter>
        <SmoothScroll>
          <Navigation />
          <AnimatedRoutes />
          <Footer />
        </SmoothScroll>
      </BrowserRouter>
      <AudioToggle />
      <SonarCursor />
    </div>
  );
}

export default App;
