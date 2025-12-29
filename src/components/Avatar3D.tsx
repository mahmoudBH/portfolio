import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  OrbitControls,
  Sparkles,
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';

/* =====================================================
   Avatar3D – VIRTUAL 3D HEAD (NO MODEL NEEDED)
   • Procedural head (geometry-based)
   • Professional / clean / immersive
   • Perfect for Hero section
===================================================== */

function VirtualHead() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.6) * 0.25;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.1;
  });

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      {/* Head */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshPhysicalMaterial
          color="#cbd5f5"
          roughness={0.35}
          metalness={0.05}
          clearcoat={0.2}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -1.1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.6, 32]} />
        <meshStandardMaterial color="#cbd5f5" roughness={0.4} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.25, 0.1, 0.78]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
      <mesh position={[0.25, 0.1, 0.78]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, -0.05, 0.85]}>
        <coneGeometry args={[0.07, 0.25, 32]} />
        <meshStandardMaterial color="#cbd5f5" />
      </mesh>
    </group>
  );
}

export default function Avatar3D() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
      {/* Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-chart-blue via-chart-cyan to-chart-violet opacity-25 blur-2xl animate-pulse" />

      <Canvas
        shadows
        camera={{ position: [0, 0.4, 4], fov: 38 }}
        className="relative z-10"
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.1}
          castShadow
        />
        <pointLight position={[-3, 1, 4]} intensity={0.6} color="#38bdf8" />

        <Suspense fallback={null}>
          <Environment preset="city" />

          <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.9}>
            <VirtualHead />
          </Float>

          <Sparkles
            count={40}
            scale={3.5}
            size={3}
            speed={0.4}
            opacity={0.6}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.3}
        />
      </Canvas>

      {/* Glass frame */}
      <div className="absolute inset-3 rounded-full border border-white/10 backdrop-blur-sm pointer-events-none" />
    </div>
  );
}

/* =====================================================
   NOTES
------------------------------------------------------
• This version uses NO external 3D model
• 100% procedural geometry (safe & fast)
• Can be replaced later with real GLB head easily
===================================================== */
