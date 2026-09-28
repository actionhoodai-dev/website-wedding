'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Temple3DStageProps {
  scrollProgress: number;
  phase: string;
}

// ─── 3D Golden Sacred Dust / Sparks ──────────────────────────
function GoldenSparks({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      sc[i] = Math.random() * 0.12 + 0.04;
      sp[i] = Math.random() * 0.008 + 0.004;
    }
    return [pos, sc, sp];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle floating upward & sinusoidal drift
      array[i * 3 + 1] += speeds[i];
      array[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.003;

      if (array[i * 3 + 1] > 14) {
        array[i * 3 + 1] = -14;
        array[i * 3] = (Math.random() - 0.5) * 24;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        color="#ffd700"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── 3D Falling Flower Petals (Jasmine & Marigold) ───────────
function FallingPetals({ count = 65 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const petalData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 18,
      y: (Math.random() - 0.5) * 24,
      z: (Math.random() - 0.5) * 12,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      speedY: Math.random() * 0.015 + 0.008,
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.02,
      scale: Math.random() * 0.12 + 0.08,
      colorType: Math.random() > 0.4 ? 'marigold' : 'jasmine',
    }));
  }, [count]);

  // Color instances
  useMemo(() => {
    if (!meshRef.current) return;
    const cMarigold = new THREE.Color('#ff9900');
    const cJasmine = new THREE.Color('#fffaf0');
    for (let i = 0; i < count; i++) {
      meshRef.current.setColorAt(
        i,
        petalData[i].colorType === 'marigold' ? cMarigold : cJasmine
      );
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count, petalData]);

  useFrame((state) => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const p = petalData[i];
      p.y -= p.speedY;
      p.x += Math.sin(state.clock.elapsedTime * 0.8 + i) * 0.006;
      p.rx += p.rotSpeedX;
      p.ry += p.rotSpeedY;

      if (p.y < -12) {
        p.y = 12;
        p.x = (Math.random() - 0.5) * 18;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.set(p.scale, p.scale * 1.5, p.scale * 0.3);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <sphereGeometry args={[1, 7, 7]} />
      <meshStandardMaterial
        roughness={0.4}
        metalness={0.1}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

// ─── 3D Carved Temple Pillars with Ornate Gold Capitals ───────
function TemplePillar3D({ position, side }: { position: [number, number, number]; side: 'left' | 'right' }) {
  const group = useRef<THREE.Group>(null);

  return (
    <group ref={group} position={position}>
      {/* Pillar Base Plinth */}
      <mesh position={[0, -5, 0]}>
        <boxGeometry args={[1.4, 0.8, 1.4]} />
        <meshStandardMaterial color="#3a1e0d" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Molded Plinth Step */}
      <mesh position={[0, -4.3, 0]}>
        <cylinderGeometry args={[0.65, 0.8, 0.6, 8]} />
        <meshStandardMaterial color="#8b6914" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Main Fluted Shaft */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.52, 8, 16]} />
        <meshStandardMaterial color="#2d170a" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Ornamental Gold Rings along shaft */}
      {[-2, 0, 2].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.54, 0.08, 8, 24]} />
          <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {/* Dravidian Temple Bracket / Capital */}
      <mesh position={[0, 4.3, 0]}>
        <cylinderGeometry args={[0.85, 0.5, 0.6, 8]} />
        <meshStandardMaterial color="#8b6914" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Arch Support Beam */}
      <mesh position={[side === 'left' ? 0.4 : -0.4, 4.8, 0]}>
        <boxGeometry args={[1.2, 0.4, 1.2]} />
        <meshStandardMaterial color="#4a2510" roughness={0.7} metalness={0.3} />
      </mesh>
    </group>
  );
}

// ─── Camera Controller & Dynamic Scroll Trajectory ────────────
function CameraAndLights({ scrollProgress }: { scrollProgress: number }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    // Virtual cinematic camera path through wedding sanctum
    // Target camera Z zooms slightly forward and pans vertically
    const targetZ = 8.5 - scrollProgress * 2.8;
    const targetY = 0.5 - scrollProgress * 1.5;
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.3;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + mouseY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, -scrollProgress * 0.5, 0);

    // Kuthuvilakku flame flicker for lights
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(state.clock.elapsedTime * 9) * 0.4;
    }
    if (lightRef2.current) {
      lightRef2.current.intensity = 2.2 + Math.cos(state.clock.elapsedTime * 11) * 0.35;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#3d2010" />
      {/* Sacred Golden Flame Lights */}
      <pointLight
        ref={lightRef}
        position={[-3.5, 1, 2]}
        color="#ffaa33"
        distance={15}
        decay={2}
      />
      <pointLight
        ref={lightRef2}
        position={[3.5, 1, 2]}
        color="#ff8811"
        distance={15}
        decay={2}
      />
      <directionalLight
        position={[0, 10, 5]}
        intensity={0.6}
        color="#ffd899"
      />
    </>
  );
}

// ─── Main 3D World Canvas Component ──────────────────────────
export default function Temple3DStage({ scrollProgress, phase }: Temple3DStageProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: phase === 'loading' ? 0.3 : 1,
        transition: 'opacity 2s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <CameraAndLights scrollProgress={scrollProgress} />

        {/* Grand Temple Stage Pillars in 3D perspective */}
        <TemplePillar3D position={[-6.2, 0, -2]} side="left" />
        <TemplePillar3D position={[6.2, 0, -2]} side="right" />
        <TemplePillar3D position={[-8.5, -0.5, -6]} side="left" />
        <TemplePillar3D position={[8.5, -0.5, -6]} side="right" />

        {/* 3D Atmospheric Particles & Cascading Petals */}
        <GoldenSparks count={160} />
        <FallingPetals count={60} />
      </Canvas>
    </div>
  );
}
