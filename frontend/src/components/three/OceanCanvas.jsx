import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { MarineSnow, Bubbles, LightRays } from "./Particles";
import { Whale, Dolphins, FishSchool, Jellyfish, Turtle } from "./Creatures";

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // gentle drift + mouse parallax
    const px = pointer.x * 2.5;
    const py = pointer.y * 1.5;
    target.current.set(px + Math.sin(t * 0.1) * 1.2, py + Math.cos(t * 0.13) * 0.8, 14);
    camera.position.lerp(target.current, 1 - Math.pow(0.001, delta));
    camera.lookAt(0, 0, -4);
  });
  return null;
}

export default function OceanCanvas({ className = "" }) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`} data-testid="ocean-canvas">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 58 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor("#04283c");
          scene.fog = new THREE.FogExp2("#0a4363", 0.009);
        }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.75} color="#6fb4d6" />
          <directionalLight position={[4, 12, 6]} intensity={1.6} color="#bfeeff" />
          <spotLight position={[0, 18, 4]} angle={0.6} penumbra={1} intensity={3.2} color="#9fe4ff" distance={50} />
          <pointLight position={[-10, -6, -4]} intensity={1.1} color="#00f0ff" />
          <pointLight position={[10, 4, 2]} intensity={0.8} color="#7fd8ff" />

          <LightRays />
          <Whale />
          <Dolphins />
          <Turtle />
          <FishSchool count={60} color="#00f0ff" center={[3, 0, -1]} />
          <FishSchool count={50} color="#f59e0b" center={[6, -3, -2]} />
          <FishSchool count={40} color="#10b981" center={[1, -4, -1]} />
          <Jellyfish />
          <MarineSnow count={600} area={44} />
          <Bubbles count={140} />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#020617]/20 via-transparent to-[#020617]/70" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#020617]/60 via-transparent to-transparent" />
    </div>
  );
}
