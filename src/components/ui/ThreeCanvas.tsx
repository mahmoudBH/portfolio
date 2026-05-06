"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment, Stars, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// مكون غبار الذهب المتطاير (Gold Dust)
function GoldDust() {
  const count = 150; // عدد الجزيئات
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // حركة دائرية بطيئة جداً للجزيئات
    pointsRef.current.rotation.y += 0.0005;
    pointsRef.current.rotation.x += 0.0003;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#C5A059"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // تتبع الفأرة بحركة Lerp أكثر سلاسة وفخامة
    const targetX = (state.pointer.y * Math.PI) / 10;
    const targetY = (state.pointer.x * Math.PI) / 10;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.03);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.03);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 128, 128]}>
        <MeshDistortMaterial
          color="#050505"       // أسود أعمق (Obsidian)
          distort={0.4}
          speed={2}
          roughness={0.05}      // مصقول جداً مثل المرآة
          metalness={1}         // انعكاس معدني كامل
          envMapIntensity={2}   // زيادة قوة انعكاس البيئة
          clearcoat={1}         // طبقة طلاء زجاجية إضافية
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 40 }} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        
        {/* إضاءة محيطة دافئة */}
        <ambientLight intensity={0.2} />
        
        {/* إضاءة جانبية بيضاء باردة */}
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
        
        {/* إضاءة "الذهب الشمبانيا" الرئيسية لتعزيز الانعكاسات */}
        <pointLight position={[10, -10, -5]} intensity={3} color="#C5A059" />
        <rectAreaLight
          width={10}
          height={10}
          color="#C5A059"
          intensity={5}
          position={[5, 5, 5]}
          lookAt={[0, 0, 0]}
        />

        {/* تأثير غبار الذهب في الخلفية */}
        <GoldDust />
        
        {/* البيئة لتعطي الانعكاسات الزجاجية للكرة */}
        <Environment preset="night" />
        
        <AnimatedShape />
      </Canvas>
    </div>
  );
}