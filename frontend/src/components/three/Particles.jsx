import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Slowly rising marine snow / plankton
export function MarineSnow({ count = 500, area = 40 }) {
  const ref = useRef();
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * area;
      positions[i * 3 + 1] = (Math.random() - 0.5) * area;
      positions[i * 3 + 2] = (Math.random() - 0.5) * area;
      speeds[i] = 0.15 + Math.random() * 0.4;
    }
    return { positions, speeds };
  }, [count, area]);

  useFrame((_, delta) => {
    const geo = ref.current;
    if (!geo) return;
    const arr = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.6;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.3 + i) * delta * 0.05;
      if (arr[i * 3 + 1] > area / 2) arr[i * 3 + 1] = -area / 2;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={ref}>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#bfeaff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Rising bubbles
export function Bubbles({ count = 120 }) {
  const ref = useRef();
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i] = 0.6 + Math.random() * 1.2;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const geo = ref.current;
    if (!geo) return;
    const arr = geo.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 2 + i) * delta * 0.15;
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={ref}>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#ffffff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Volumetric-ish god rays using thin transparent planes
export function LightRays() {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
    }
  });
  return (
    <group ref={group} position={[0, 6, -6]}>
      {[-6, -3, 0, 3, 6, 9].map((x, i) => (
        <mesh key={i} position={[x, 0, i % 2 ? -2 : 0]} rotation={[0, 0, 0.12 * (i - 2.5)]}>
          <planeGeometry args={[1.4, 26]} />
          <meshBasicMaterial
            color="#8fe4ff"
            transparent
            opacity={0.05}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
