import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// shared sonar flash: brightens/nudges a mesh as the pulse ring passes it
function sonarFlash(sonarRef, clock, dist) {
  if (!sonarRef?.current) return 0;
  const dt = clock.elapsedTime - sonarRef.current.t;
  if (dt < 0 || dt > 3) return 0;
  const arrival = dist * 0.08;
  const x = Math.abs(dt - arrival);
  return Math.max(0, 1 - x / 0.45);
}

function useCursor(cursorRef) {
  return useMemo(() => cursorRef || { current: { x: 0, y: 0 } }, [cursorRef]);
}

/* ---------- generic school (instanced) ---------- */
export function School({ count = 40, color = "#00f0ff", center = [0, 0, -2], spread = 3, sonarRef, cursorRef, size = 0.5 }) {
  const mesh = useRef();
  const cur = useCursor(cursorRef);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(
    () => Array.from({ length: count }, () => ({ r: 0.6 + Math.random() * spread, sp: 0.3 + Math.random() * 0.5, off: Math.random() * 6.28, y: (Math.random() - 0.5) * spread, ph: Math.random() * 6.28 })),
    [count, spread]
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const wob = Math.sin(t * 0.2) * 1.5;
    const cx = cur.current.x * 1.2;
    data.forEach((d, i) => {
      const a = t * d.sp + d.off;
      const x = center[0] + Math.cos(a) * d.r + wob - cx;
      const z = center[2] + Math.sin(a) * d.r;
      const y = center[1] + d.y + Math.sin(t * 2 + d.ph) * 0.35 - cur.current.y * 0.6;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, -a + Math.PI / 2, Math.sin(t * 3 + d.ph) * 0.4);
      dummy.scale.setScalar(size);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    const f = sonarFlash(sonarRef, state.clock, Math.hypot(center[0], center[2]));
    mesh.current.material.emissiveIntensity = 0.35 + f * 1.6;
  });
  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <coneGeometry args={[0.4, 1.2, 5]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.4} />
    </instancedMesh>
  );
}

/* ---------- dolphin ---------- */
export function Dolphin({ position = [0, 1, -3], sonarRef, cursorRef }) {
  const g = useRef();
  const cur = useCursor(cursorRef);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4 + position[0];
    if (g.current) {
      g.current.position.x = Math.cos(t) * 5 - cur.current.x;
      g.current.position.z = position[2] + Math.sin(t) * 3;
      g.current.position.y = position[1] + Math.sin(t * 2) * 1.2;
      g.current.rotation.y = -t + Math.PI / 2;
      g.current.rotation.z = Math.cos(t * 2) * 0.3;
      const f = sonarFlash(sonarRef, state.clock, 5);
      g.current.children.forEach((c) => c.material && (c.material.emissiveIntensity = 0.1 + f * 1.4));
    }
  });
  return (
    <group ref={g} scale={0.9}>
      <mesh scale={[0.6, 0.6, 2.4]}><sphereGeometry args={[0.7, 20, 16]} /><meshStandardMaterial color="#7fb4cf" emissive="#7fb4cf" emissiveIntensity={0.1} roughness={0.35} metalness={0.2} /></mesh>
      <mesh position={[0, 0.55, 0.2]} rotation={[0.5, 0, 0]} scale={[0.1, 0.7, 0.5]}><sphereGeometry args={[0.6, 12, 8]} /><meshStandardMaterial color="#5b8ba4" /></mesh>
      <mesh position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]} scale={[1.1, 0.1, 0.5]}><coneGeometry args={[0.5, 1, 4]} /><meshStandardMaterial color="#5b8ba4" /></mesh>
    </group>
  );
}

/* ---------- sea turtle ---------- */
export function Turtle({ position = [2, -1, -3], sonarRef }) {
  const g = useRef(); const fl = useRef(); const fr = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.position.x = position[0] + Math.sin(t * 0.15) * 6;
      g.current.position.y = position[1] + Math.sin(t * 0.3) * 0.6;
      g.current.rotation.y = Math.cos(t * 0.15) * 0.5 + Math.PI;
      const f = sonarFlash(sonarRef, state.clock, 4);
      g.current.children.forEach((c) => c.material && (c.material.emissiveIntensity = 0.08 + f * 1.2));
    }
    const flap = Math.sin(t * 1.4) * 0.6;
    if (fl.current) fl.current.rotation.z = flap;
    if (fr.current) fr.current.rotation.z = -flap;
  });
  return (
    <group ref={g} scale={1}>
      <mesh scale={[1.4, 0.5, 1.6]}><sphereGeometry args={[1, 24, 18]} /><meshStandardMaterial color="#3d8f68" emissive="#2f6b4f" emissiveIntensity={0.08} roughness={0.55} /></mesh>
      <mesh position={[0, 0.1, 1.5]} scale={[0.5, 0.4, 0.5]}><sphereGeometry args={[0.6, 16, 12]} /><meshStandardMaterial color="#49a078" /></mesh>
      <mesh ref={fl} position={[1.3, 0, 0.4]} scale={[1.3, 0.1, 0.6]}><sphereGeometry args={[0.7, 12, 8]} /><meshStandardMaterial color="#357a58" /></mesh>
      <mesh ref={fr} position={[-1.3, 0, 0.4]} scale={[1.3, 0.1, 0.6]}><sphereGeometry args={[0.7, 12, 8]} /><meshStandardMaterial color="#357a58" /></mesh>
    </group>
  );
}

/* ---------- shark ---------- */
export function Shark({ position = [-3, 0, -5], sonarRef, cursorRef }) {
  const g = useRef(); const tail = useRef(); const cur = useCursor(cursorRef);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.25;
    if (g.current) {
      g.current.position.x = Math.sin(t) * 7 - cur.current.x * 0.5;
      g.current.position.z = position[2] + Math.cos(t) * 2;
      g.current.position.y = position[1] + Math.sin(t * 1.5) * 0.6;
      g.current.rotation.y = (Math.cos(t) > 0 ? -1 : 1) * Math.PI / 2 + Math.PI / 2;
      const f = sonarFlash(sonarRef, state.clock, 7);
      g.current.children.forEach((c) => c.material && (c.material.emissiveIntensity = 0.05 + f * 1.3));
    }
    if (tail.current) tail.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.5;
  });
  return (
    <group ref={g} scale={1.1}>
      <mesh scale={[0.7, 0.8, 3]}><sphereGeometry args={[0.7, 20, 16]} /><meshStandardMaterial color="#556b7a" emissive="#556b7a" emissiveIntensity={0.05} roughness={0.5} /></mesh>
      <mesh position={[0, 0.7, 0.2]} rotation={[0.3, 0, 0]} scale={[0.09, 0.7, 0.4]}><coneGeometry args={[0.6, 1.1, 4]} /><meshStandardMaterial color="#455969" /></mesh>
      <group ref={tail} position={[0, 0, -2.6]}><mesh rotation={[0, 0, 0]} scale={[0.1, 1.1, 0.6]}><coneGeometry args={[0.5, 1.4, 4]} /><meshStandardMaterial color="#455969" /></mesh></group>
    </group>
  );
}

/* ---------- jellyfish ---------- */
export function Jelly({ position = [0, 0, -2], color = "#00f0ff", scale = 1, sonarRef }) {
  const g = useRef(); const bell = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) { g.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 1.4; g.current.position.x = position[0] + Math.sin(t * 0.2) * 0.6; }
    if (bell.current) { const s = 1 + Math.sin(t * 1.6 + position[0]) * 0.16; bell.current.scale.set(s, 1 / s, s); const f = sonarFlash(sonarRef, state.clock, 3); bell.current.material.emissiveIntensity = 0.7 + f * 1.5; }
  });
  return (
    <group ref={g} position={position} scale={scale}>
      <mesh ref={bell}><sphereGeometry args={[0.9, 24, 16, 0, 6.28, 0, Math.PI / 1.7]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={0.55} roughness={0.2} side={THREE.DoubleSide} /></mesh>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 8) * 6.28) * 0.5, -0.9, Math.sin((i / 8) * 6.28) * 0.5]}><cylinderGeometry args={[0.03, 0.01, 1.6, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} /></mesh>
      ))}
    </group>
  );
}

/* ---------- squid ---------- */
export function Squid({ position = [1, 0, -3], color = "#f26a8d", sonarRef, cursorRef }) {
  const g = useRef(); const cur = useCursor(cursorRef);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.position.x = position[0] + Math.sin(t * 0.4) * 3 - cur.current.x * 0.4;
      g.current.position.y = position[1] + Math.cos(t * 0.5) * 1.2;
      g.current.rotation.z = Math.sin(t * 0.6) * 0.3;
      g.current.rotation.x = Math.PI + Math.sin(t) * 0.1;
      const f = sonarFlash(sonarRef, state.clock, 3);
      g.current.children.forEach((c) => c.material && (c.material.emissiveIntensity = 0.25 + f * 1.6));
    }
  });
  return (
    <group ref={g} scale={0.9}>
      <mesh scale={[0.5, 1.3, 0.5]}><coneGeometry args={[0.5, 1.8, 12]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} roughness={0.3} /></mesh>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 8) * 6.28) * 0.22, 0.9, Math.sin((i / 8) * 6.28) * 0.22]} rotation={[0.2, (i / 8) * 6.28, 0]}><cylinderGeometry args={[0.04, 0.01, 1.3, 5]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} /></mesh>
      ))}
    </group>
  );
}

/* ---------- anglerfish (with lure light) ---------- */
export function Anglerfish({ position = [0, 0, -3], sonarRef, cursorRef }) {
  const g = useRef(); const lure = useRef(); const cur = useCursor(cursorRef);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.position.x = position[0] + Math.sin(t * 0.2) * 2 - cur.current.x * 0.3;
      g.current.position.y = position[1] + Math.sin(t * 0.35) * 0.8;
      g.current.rotation.z = Math.sin(t * 0.5) * 0.12;
      const f = sonarFlash(sonarRef, state.clock, 3);
      g.current.children.forEach((c) => c.name === "body" && c.material && (c.material.emissiveIntensity = 0.04 + f * 1.4));
    }
    if (lure.current) lure.current.material.emissiveIntensity = 1.6 + Math.sin(t * 4) * 0.6;
  });
  return (
    <group ref={g} scale={1}>
      <mesh name="body" scale={[1.1, 1, 1.2]}><sphereGeometry args={[0.8, 20, 16]} /><meshStandardMaterial color="#0e2530" emissive="#08313f" emissiveIntensity={0.04} roughness={0.7} /></mesh>
      <mesh position={[0, 0.9, 0.5]} scale={[0.03, 0.9, 0.03]}><cylinderGeometry args={[1, 1, 1, 6]} /><meshStandardMaterial color="#0e2530" /></mesh>
      <mesh ref={lure} position={[0, 1.4, 0.7]}><sphereGeometry args={[0.1, 12, 12]} /><meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1.6} /></mesh>
      <pointLight position={[0, 1.4, 0.7]} intensity={0.8} distance={5} color="#00f0ff" />
    </group>
  );
}

/* ---------- gulper eel ---------- */
export function Eel({ position = [-2, 0, -4], color = "#123a52", sonarRef }) {
  const g = useRef();
  const segs = 8;
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.position.x = position[0] + Math.sin(t * 0.2) * 3;
      g.current.position.y = position[1] + Math.cos(t * 0.25) * 1;
      g.current.children.forEach((c, i) => { c.position.x = Math.sin(t * 1.5 - i * 0.5) * 0.4; const f = sonarFlash(sonarRef, state.clock, 4); c.material && (c.material.emissiveIntensity = 0.1 + f * 1.2); });
    }
  });
  return (
    <group ref={g}>
      {[...Array(segs)].map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 0.45]} scale={[1 - i * 0.09, 1 - i * 0.09, 1]}><sphereGeometry args={[0.35, 12, 10]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.6} /></mesh>
      ))}
    </group>
  );
}

/* ---------- dumbo octopus ---------- */
export function Octopus({ position = [0, 0, -3], color = "#e07a9a", sonarRef, cursorRef }) {
  const g = useRef(); const cur = useCursor(cursorRef);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.position.x = position[0] + Math.sin(t * 0.3) * 2 - cur.current.x * 0.3;
      g.current.position.y = position[1] + Math.sin(t * 0.6) * 0.9;
      g.current.rotation.y = t * 0.2;
      const f = sonarFlash(sonarRef, state.clock, 3);
      g.current.children.forEach((c) => c.material && (c.material.emissiveIntensity = 0.2 + f * 1.5));
    }
  });
  return (
    <group ref={g} scale={0.9}>
      <mesh><sphereGeometry args={[0.7, 20, 16]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.4} /></mesh>
      <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -0.6]} scale={[0.6, 0.08, 0.4]}><sphereGeometry args={[0.6, 12, 8]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} /></mesh>
      <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, 0.6]} scale={[0.6, 0.08, 0.4]}><sphereGeometry args={[0.6, 12, 8]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} /></mesh>
      {[...Array(6)].map((_, i) => (<mesh key={i} position={[Math.cos((i / 6) * 6.28) * 0.3, -0.7, Math.sin((i / 6) * 6.28) * 0.3]}><cylinderGeometry args={[0.08, 0.02, 0.9, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} /></mesh>))}
    </group>
  );
}

/* ---------- deep sea crab ---------- */
export function Crab({ position = [1, -3, -3], color = "#c65a3a", sonarRef }) {
  const g = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) { g.current.position.x = position[0] + Math.sin(t * 0.4) * 3; g.current.position.y = position[1] + Math.sin(t * 4) * 0.06; const f = sonarFlash(sonarRef, state.clock, 3); g.current.children.forEach((c) => c.material && (c.material.emissiveIntensity = 0.15 + f * 1.4)); }
  });
  return (
    <group ref={g} scale={0.8}>
      <mesh scale={[1.2, 0.5, 1]}><sphereGeometry args={[0.7, 16, 12]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} roughness={0.6} /></mesh>
      {[-1, 1].map((s) => (<mesh key={s} position={[s * 0.9, 0, 0.4]} scale={[0.4, 0.2, 0.2]}><sphereGeometry args={[0.5, 10, 8]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} /></mesh>))}
      {[...Array(6)].map((_, i) => (<mesh key={i} position={[(i < 3 ? -1 : 1) * 0.8, -0.2, (i % 3 - 1) * 0.4]} rotation={[0, 0, (i < 3 ? 1 : -1) * 0.8]} scale={[0.7, 0.05, 0.05]}><cylinderGeometry args={[1, 1, 1, 5]} /><meshStandardMaterial color={color} /></mesh>))}
    </group>
  );
}

/* ---------- mariana snailfish ---------- */
export function Snailfish({ position = [0, 0, -3], color = "#f4d6c0", sonarRef, cursorRef }) {
  const g = useRef(); const tail = useRef(); const cur = useCursor(cursorRef);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) { g.current.position.x = position[0] + Math.sin(t * 0.3) * 3 - cur.current.x * 0.3; g.current.position.y = position[1] + Math.sin(t * 0.5) * 0.7; g.current.rotation.z = Math.sin(t * 1.2) * 0.15; const f = sonarFlash(sonarRef, state.clock, 3); g.current.children.forEach((c) => c.material && (c.material.emissiveIntensity = 0.25 + f * 1.6)); }
    if (tail.current) tail.current.rotation.y = Math.sin(t * 3) * 0.5;
  });
  return (
    <group ref={g} scale={0.9}>
      <mesh scale={[0.6, 0.5, 1.8]}><sphereGeometry args={[0.7, 18, 14]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} transparent opacity={0.85} roughness={0.3} /></mesh>
      <group ref={tail} position={[0, 0, -1.5]}><mesh scale={[0.05, 0.5, 0.7]}><coneGeometry args={[0.5, 1, 4]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.8} /></mesh></group>
    </group>
  );
}

/* ---------- hydrothermal vent ---------- */
export function Vent({ position = [0, -4, -4], sonarRef }) {
  const smoke = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (smoke.current) { smoke.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.1; smoke.current.position.y = position[1] + 2 + Math.sin(t) * 0.3; }
  });
  return (
    <group position={position}>
      <mesh><cylinderGeometry args={[0.5, 0.9, 2, 12]} /><meshStandardMaterial color="#2a1a14" emissive="#5a1f10" emissiveIntensity={0.4} roughness={0.9} /></mesh>
      <mesh ref={smoke} position={[0, 2, 0]}><coneGeometry args={[0.8, 3, 12, 1, true]} /><meshStandardMaterial color="#1a1210" transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} /></mesh>
      <pointLight position={[0, 0.5, 0]} intensity={1.2} distance={6} color="#f59e0b" />
      {[...Array(5)].map((_, i) => (<mesh key={i} position={[Math.cos(i) * 0.8, -0.8, Math.sin(i) * 0.8]}><cylinderGeometry args={[0.05, 0.02, 0.8, 5]} /><meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} /></mesh>))}
    </group>
  );
}

/* ---------- amphipod swarm ---------- */
export function Amphipods({ count = 60, color = "#c9d6dd", sonarRef, cursorRef }) {
  return <School count={count} color={color} center={[0, -1, -2]} spread={4} size={0.18} sonarRef={sonarRef} cursorRef={cursorRef} />;
}
