import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { EXPLORER_ZONES } from "../../lib/data";
import {
  School, Dolphin, Turtle, Shark, Jelly, Squid, Anglerfish, Eel, Octopus, Crab, Snailfish, Vent, Amphipods,
} from "./DeepLife";

const ZONE = Object.fromEntries(EXPLORER_ZONES.map((z) => [z.id, z]));

function lerpColor(a, b, t) {
  return new THREE.Color(a).lerp(new THREE.Color(b), t);
}

/* particles that drift; density/speed tuned for "descent" feel */
function Snow({ count = 700, speed = 0.5, size = 0.06, color = "#cdeeff", area = 46, up = true }) {
  const ref = useRef();
  const { positions, sp } = useMemo(() => {
    const positions = new Float32Array(count * 3); const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) { positions[i * 3] = (Math.random() - 0.5) * area; positions[i * 3 + 1] = (Math.random() - 0.5) * area; positions[i * 3 + 2] = (Math.random() - 0.5) * area; sp[i] = 0.4 + Math.random(); }
    return { positions, sp };
  }, [count, area]);
  useFrame((_, delta) => {
    const g = ref.current; if (!g) return; const arr = g.attributes.position.array;
    for (let i = 0; i < count; i++) { arr[i * 3 + 1] += (up ? 1 : -1) * sp[i] * speed * delta; arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.3 + i) * delta * 0.04; if (up && arr[i * 3 + 1] > area / 2) arr[i * 3 + 1] = -area / 2; if (!up && arr[i * 3 + 1] < -area / 2) arr[i * 3 + 1] = area / 2; }
    g.attributes.position.needsUpdate = true;
  });
  return (<points><bufferGeometry ref={ref}><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial size={size} color={color} transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} /></points>);
}

function LightRays({ progressRef }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
    const p = progressRef.current || 0;
    const op = Math.max(0, 0.09 * (1 - p * 3)); // fade out below sunlight
    group.current.children.forEach((c) => (c.material.opacity = op));
  });
  return (
    <group ref={group} position={[0, 10, -8]}>
      {[-8, -4, 0, 4, 8, 12].map((x, i) => (
        <mesh key={i} position={[x, 0, i % 2 ? -2 : 0]} rotation={[0, 0, 0.12 * (i - 2.5)]}>
          <planeGeometry args={[1.8, 34]} />
          <meshBasicMaterial color="#aef0ff" transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/* expanding sonar rings driven by sonarRef.current.t */
function Sonar({ sonarRef }) {
  const ref = useRef(); const last = useRef(-1);
  useFrame((state) => {
    const g = ref.current; if (!g || !sonarRef.current) return;
    const dt = state.clock.elapsedTime - sonarRef.current.t;
    const active = dt >= 0 && dt < 3;
    g.visible = active;
    if (active) {
      const s = 1 + dt * 14;
      g.scale.set(s, s, s);
      g.children.forEach((m) => (m.material.opacity = Math.max(0, 0.5 * (1 - dt / 3))));
    }
  });
  return (
    <group ref={ref} position={[0, 0, -3]} visible={false}>
      <mesh rotation={[Math.PI / 2, 0, 0]}><ringGeometry args={[0.9, 1, 64]} /><meshBasicMaterial color="#00f0ff" transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} /></mesh>
      <mesh><ringGeometry args={[0.9, 1, 64]} /><meshBasicMaterial color="#00f0ff" transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} /></mesh>
    </group>
  );
}

function ZoneLife({ id, sonarRef, cursorRef }) {
  switch (id) {
    case "surface":
      return (<group><Dolphin position={[0, 2, -4]} sonarRef={sonarRef} cursorRef={cursorRef} /><Dolphin position={[3, 1, -6]} sonarRef={sonarRef} cursorRef={cursorRef} /><Turtle position={[2, -1, -4]} sonarRef={sonarRef} /><School count={45} color="#7fe9ff" center={[-3, -1, -3]} spread={3} sonarRef={sonarRef} cursorRef={cursorRef} /></group>);
    case "sunlight":
      return (<group><School count={55} color="#f5c542" center={[2, 0, -3]} spread={3.5} sonarRef={sonarRef} cursorRef={cursorRef} /><Jelly position={[-4, 1, -5]} color="#9fd8ff" scale={1.1} sonarRef={sonarRef} /><Shark position={[-2, 0, -6]} sonarRef={sonarRef} cursorRef={cursorRef} /></group>);
    case "twilight":
      return (<group><Squid position={[2, 1, -4]} color="#f26a8d" sonarRef={sonarRef} cursorRef={cursorRef} /><Jelly position={[-3, 0, -4]} color="#f43f5e" scale={0.9} sonarRef={sonarRef} /><School count={50} color="#00f0ff" center={[0, -2, -3]} spread={3} size={0.35} sonarRef={sonarRef} cursorRef={cursorRef} /></group>);
    case "midnight":
      return (<group><Anglerfish position={[0, 0, -3]} sonarRef={sonarRef} cursorRef={cursorRef} /><Squid position={[-3, 1, -5]} color="#a03050" sonarRef={sonarRef} cursorRef={cursorRef} /><Eel position={[3, -1, -5]} sonarRef={sonarRef} /></group>);
    case "abyss":
      return (<group><Octopus position={[0, 1, -3]} sonarRef={sonarRef} cursorRef={cursorRef} /><Crab position={[2, -3, -3]} sonarRef={sonarRef} /><School count={30} color="#6fae9a" center={[-3, -2, -4]} spread={2.5} size={0.4} sonarRef={sonarRef} cursorRef={cursorRef} /></group>);
    case "hadal":
      return (<group><Snailfish position={[0, 0, -3]} sonarRef={sonarRef} cursorRef={cursorRef} /><Vent position={[3, -4, -5]} sonarRef={sonarRef} /><Amphipods count={70} sonarRef={sonarRef} cursorRef={cursorRef} /></group>);
    default:
      return null;
  }
}

function Rig({ cursorRef, onClock }) {
  const target = useRef(new THREE.Vector3());
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (onClock) onClock(t);
    const cx = cursorRef.current.x * 1.6;
    const cy = cursorRef.current.y * 1.0;
    target.current.set(cx + Math.sin(t * 0.1) * 0.8, cy + Math.cos(t * 0.13) * 0.5, 9);
    state.camera.position.lerp(target.current, 1 - Math.pow(0.002, delta));
    state.camera.lookAt(0, 0, -4);
  });
  return null;
}

function Atmosphere({ progressRef }) {
  useFrame(({ scene }) => {
    const p = Math.min(0.9999, Math.max(0, progressRef.current || 0));
    const sf = p * EXPLORER_ZONES.length;
    const i = Math.min(Math.floor(sf), EXPLORER_ZONES.length - 1);
    const frac = sf - i;
    const a = EXPLORER_ZONES[i];
    const b = EXPLORER_ZONES[Math.min(i + 1, EXPLORER_ZONES.length - 1)];
    const col = lerpColor(a.fog, b.fog, frac);
    if (scene.fog) { scene.fog.color.copy(col); scene.fog.density = 0.02 + p * 0.05; }
    scene.background = col;
  });
  return null;
}

export default function ExplorerScene({ progressRef, activeId, sonarRef, cursorRef, onClock }) {
  return (
    <div className="fixed inset-0 -z-10" data-testid="explorer-scene">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl, scene }) => { gl.setClearColor("#0e6a8f"); scene.fog = new THREE.FogExp2("#0e6a8f", 0.02); }}
      >
        <Suspense fallback={null}>
          <Rig cursorRef={cursorRef} onClock={onClock} />
          <Atmosphere progressRef={progressRef} />
          <ambientLight intensity={0.7} color="#7fc4e0" />
          <directionalLight position={[3, 14, 6]} intensity={1.4} color="#cdefff" />
          <spotLight position={[0, 16, 4]} angle={0.6} penumbra={1} intensity={2.4} color="#aef0ff" distance={60} />
          <pointLight position={[-8, -4, -4]} intensity={0.8} color="#00f0ff" />

          <LightRays progressRef={progressRef} />
          <ZoneLife id={activeId} sonarRef={sonarRef} cursorRef={cursorRef} />
          <Sonar sonarRef={sonarRef} />
          <Snow count={700} speed={0.55} size={0.06} color="#cdeeff" up />
          <Snow count={220} speed={0.25} size={0.12} color="#8fb8c8" up={false} area={40} />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#020617]/20 via-transparent to-[#020617]/70" />
    </div>
  );
}
