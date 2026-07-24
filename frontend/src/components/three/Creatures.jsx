import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getFishGeometry } from "./fishGeometry";

// Blue whale: crosses the screen slowly on a long loop
export function Whale() {
  const group = useRef();
  const tail = useRef();
  const period = 34; // seconds to cross
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = ((t % period) / period); // 0..1
    if (group.current) {
      group.current.position.x = -26 + p * 52;
      group.current.position.y = 2 + Math.sin(t * 0.25) * 1.2;
      group.current.position.z = -6;
      group.current.rotation.z = Math.sin(t * 0.3) * 0.05;
      group.current.rotation.y = Math.PI * 0.5 - 0.35;
    }
    if (tail.current) tail.current.rotation.y = Math.sin(t * 1.1) * 0.35;
  });

  return (
    <group ref={group} scale={2}>
      {/* body */}
      <mesh scale={[1.1, 1, 4.2]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 24]} />
        <meshStandardMaterial color="#2f6f96" roughness={0.55} metalness={0.15} emissive="#0a2f47" emissiveIntensity={0.35} />
      </mesh>
      {/* belly */}
      <mesh position={[0, -0.7, 0.6]} scale={[0.9, 0.6, 3.4]}>
        <sphereGeometry args={[1.5, 24, 16]} />
        <meshStandardMaterial color="#9fc7d6" roughness={0.7} />
      </mesh>
      {/* tail */}
      <group ref={tail} position={[0, 0, -6.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[2.6, 0.15, 1]}>
          <coneGeometry args={[1.1, 2.2, 4]} />
          <meshStandardMaterial color="#173d59" roughness={0.7} />
        </mesh>
      </group>
      {/* fins */}
      <mesh position={[1.6, -0.4, 1.4]} rotation={[0, 0, -0.6]} scale={[1.8, 0.12, 0.8]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#173d59" roughness={0.7} />
      </mesh>
      <mesh position={[-1.6, -0.4, 1.4]} rotation={[0, 0, 0.6]} scale={[1.8, 0.12, 0.8]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#173d59" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Dolphin({ offset = 0, radius = 7, y = 0 }) {
  const g = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.35 + offset;
    if (g.current) {
      g.current.position.x = Math.cos(t) * radius;
      g.current.position.z = Math.sin(t) * radius - 4;
      g.current.position.y = y + Math.sin(t * 2) * 1.4;
      g.current.rotation.y = -t + Math.PI / 2;
      g.current.rotation.z = Math.cos(t * 2) * 0.3;
    }
  });
  return (
    <group ref={g} scale={0.7}>
      <mesh scale={[0.6, 0.6, 2.2]}>
        <sphereGeometry args={[0.7, 20, 16]} />
        <meshStandardMaterial color="#5b7f94" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0.2]} rotation={[0.5, 0, 0]} scale={[0.1, 0.7, 0.5]}>
        <sphereGeometry args={[0.6, 12, 8]} />
        <meshStandardMaterial color="#48697c" />
      </mesh>
      <mesh position={[0, 0, -1.9]} rotation={[Math.PI / 2, 0, 0]} scale={[1.1, 0.1, 0.5]}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="#48697c" />
      </mesh>
    </group>
  );
}

export function Dolphins() {
  return (
    <group position={[3, 3, 0]}>
      <Dolphin offset={0} radius={6} y={2} />
      <Dolphin offset={1.1} radius={6.6} y={1} />
      <Dolphin offset={2.3} radius={5.4} y={2.6} />
    </group>
  );
}

// School of fish using instanced meshes
export function FishSchool({ count = 60, color = "#00f0ff", center = [-6, -2, -2] }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const fishGeo = useMemo(() => getFishGeometry(), []);
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        r: 1.5 + Math.random() * 2.5,
        speed: 0.4 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        yOff: (Math.random() - 0.5) * 3,
        phase: Math.random() * Math.PI * 2,
      })),
    [count]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const wander = Math.sin(t * 0.15);
    data.forEach((d, i) => {
      const a = t * d.speed + d.offset;
      const x = center[0] + Math.cos(a) * d.r + wander * 3;
      const z = center[2] + Math.sin(a) * d.r;
      const y = center[1] + d.yOff + Math.sin(t * 2 + d.phase) * 0.4;
      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.sin(t * 4 + d.phase) * 0.12, -a, Math.sin(t * 6 + d.phase) * 0.22);
      dummy.scale.set(0.5, 0.5, 0.58);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[fishGeo, null, count]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} roughness={0.4} metalness={0.15} />
    </instancedMesh>
  );
}

function Jelly({ position, color = "#00f0ff", scale = 1 }) {
  const g = useRef();
  const bell = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 1.2;
      g.current.position.x = position[0] + Math.sin(t * 0.2 + position[2]) * 0.6;
    }
    if (bell.current) {
      const s = 1 + Math.sin(t * 1.6 + position[0]) * 0.14;
      bell.current.scale.set(s, 1 / s, s);
    }
  });
  return (
    <group ref={g} position={position} scale={scale}>
      <mesh ref={bell}>
        <sphereGeometry args={[0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          transparent
          opacity={0.55}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 8) * Math.PI * 2) * 0.5, -0.9, Math.sin((i / 8) * Math.PI * 2) * 0.5]}>
          <cylinderGeometry args={[0.03, 0.01, 1.6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export function Jellyfish() {
  return (
    <group>
      <Jelly position={[8, -1, -3]} color="#00f0ff" scale={1.1} />
      <Jelly position={[-9, 1, -5]} color="#f43f5e" scale={0.8} />
      <Jelly position={[11, 3, -8]} color="#14b8a6" scale={0.9} />
    </group>
  );
}

// Sea turtle drifting
export function Turtle() {
  const g = useRef();
  const flipperL = useRef();
  const flipperR = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.position.x = Math.sin(t * 0.12) * 9;
      g.current.position.y = -3 + Math.sin(t * 0.3) * 0.8;
      g.current.position.z = -3 + Math.cos(t * 0.12) * 2;
      g.current.rotation.y = Math.cos(t * 0.12) * 0.5 + Math.PI;
    }
    const flap = Math.sin(t * 1.4) * 0.6;
    if (flipperL.current) flipperL.current.rotation.z = flap;
    if (flipperR.current) flipperR.current.rotation.z = -flap;
  });
  return (
    <group ref={g} scale={0.9}>
      <mesh scale={[1.4, 0.5, 1.6]}>
        <sphereGeometry args={[1, 24, 18]} />
        <meshStandardMaterial color="#2f6b4f" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.1, 1.5]} scale={[0.5, 0.4, 0.5]}>
        <sphereGeometry args={[0.6, 16, 12]} />
        <meshStandardMaterial color="#3d7a5c" roughness={0.6} />
      </mesh>
      <mesh ref={flipperL} position={[1.3, 0, 0.4]} rotation={[0, 0, 0]} scale={[1.3, 0.1, 0.6]}>
        <sphereGeometry args={[0.7, 12, 8]} />
        <meshStandardMaterial color="#255c43" roughness={0.6} />
      </mesh>
      <mesh ref={flipperR} position={[-1.3, 0, 0.4]} scale={[1.3, 0.1, 0.6]}>
        <sphereGeometry args={[0.7, 12, 8]} />
        <meshStandardMaterial color="#255c43" roughness={0.6} />
      </mesh>
    </group>
  );
}
