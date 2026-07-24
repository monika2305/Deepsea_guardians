import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// convert lat/lon to 3D on sphere
function toVec(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

const REGION_COORDS = {
  pacific: [34, -145],
  coral: [-2, 120],
  atlantic: [0, -25],
  arctic: [78, 12],
};

function Marker({ region, active, onSelect, layerColor }) {
  const ref = useRef();
  const pos = useMemo(() => toVec(REGION_COORDS[region.id][0], REGION_COORDS[region.id][1], 2.05), [region.id]);
  useFrame((state) => {
    if (ref.current) {
      const s = active ? 1.6 : 1 + Math.sin(state.clock.elapsedTime * 3 + pos.x) * 0.2;
      ref.current.scale.setScalar(s * 0.06);
    }
  });
  return (
    <group position={pos}>
      <mesh
        ref={ref}
        onClick={(e) => { e.stopPropagation(); onSelect(region); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={active ? "#ffffff" : layerColor} />
      </mesh>
      <mesh scale={0.13}>
        <ringGeometry args={[0.7, 1, 32]} />
        <meshBasicMaterial color={layerColor} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Satellite() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * 3.2, Math.sin(t * 0.7) * 1.5, Math.sin(t) * 3.2);
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.12, 0.06, 0.06]} />
      <meshBasicMaterial color="#f59e0b" />
    </mesh>
  );
}

function Globe({ layerColor, selected, onSelect, regions }) {
  const globe = useRef();
  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * 0.04;
  });
  const sensorPts = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lon = (Math.random() - 0.5) * 360;
      pts.push(toVec(lat, lon, 2.03));
    }
    return pts;
  }, []);

  return (
    <group>
      <group ref={globe}>
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial color="#0e517a" roughness={0.85} metalness={0.15} emissive="#0a3d5c" emissiveIntensity={0.75} />
        </mesh>
        <mesh scale={1.008}>
          <sphereGeometry args={[2, 40, 40]} />
          <meshBasicMaterial color={layerColor} wireframe transparent opacity={0.28} />
        </mesh>
        {sensorPts.map((p, i) => (
          <mesh key={i} position={p} scale={0.012}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        ))}
        {regions.map((r) => (
          <Marker key={r.id} region={r} active={selected?.id === r.id} onSelect={onSelect} layerColor={layerColor} />
        ))}
      </group>
      <mesh scale={1.18}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={layerColor} transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.28}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={layerColor} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <Satellite />
    </group>
  );
}

export default function TwinGlobe({ layerColor = "#00f0ff", selected, onSelect, regions }) {
  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 45 }} dpr={[1, 1.6]} data-testid="twin-globe">
      <Suspense fallback={null}>
        <ambientLight intensity={0.9} />
        <pointLight position={[5, 5, 5]} intensity={2.2} color="#bfeeff" />
        <pointLight position={[-5, -3, -5]} intensity={1.2} color={layerColor} />
        <directionalLight position={[3, 4, 6]} intensity={1.4} color="#ffffff" />
        <Globe layerColor={layerColor} selected={selected} onSelect={onSelect} regions={regions} />
        <OrbitControls enablePan enableZoom minDistance={3.5} maxDistance={10} autoRotate={false} enableDamping dampingFactor={0.05} />
      </Suspense>
    </Canvas>
  );
}
