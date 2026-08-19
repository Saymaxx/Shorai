'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface RobotModelProps {
  scrollProgress?: number;
  activeSection?: string;
}

// ─── Material helpers — Cute White Robot ────────────────────────────
const white      = { color: '#f0f4ff', metalness: 0.15, roughness: 0.18 };
const offWhite   = { color: '#e2e8f8', metalness: 0.20, roughness: 0.22 };
const pearl      = { color: '#ffffff', metalness: 0.10, roughness: 0.12 };
const softGray   = { color: '#c8d4e8', metalness: 0.25, roughness: 0.30 };
const cyanEmit   = { color: '#00d4ff', emissive: '#00d4ff', emissiveIntensity: 2.8, roughness: 0.05 };

function CuteRobotModel({ activeSection = 'hero' }: RobotModelProps) {
  const scaleRef     = useRef<THREE.Group>(null);
  const robotGroup   = useRef<THREE.Group>(null);
  const headGroup    = useRef<THREE.Group>(null);
  const torsoGroup   = useRef<THREE.Group>(null);
  const lArmGroup    = useRef<THREE.Group>(null);
  const rArmGroup    = useRef<THREE.Group>(null);
  const lLegGroup    = useRef<THREE.Group>(null);
  const rLegGroup    = useRef<THREE.Group>(null);
  const lEyeRef      = useRef<THREE.Mesh>(null);
  const rEyeRef      = useRef<THREE.Mesh>(null);
  const lEyeGlowRef  = useRef<THREE.Mesh>(null);
  const rEyeGlowRef  = useRef<THREE.Mesh>(null);
  const mouthRef     = useRef<THREE.Mesh>(null);
  const heartRef     = useRef<THREE.Mesh>(null);
  const antennaRef   = useRef<THREE.Mesh>(null);
  const lCheekRef    = useRef<THREE.Mesh>(null);
  const rCheekRef    = useRef<THREE.Mesh>(null);

  const { pointer } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // ── ZOOM IN / ZOOM OUT breathing scale effect ────────────────────
    if (scaleRef.current) {
      const breathe = 1 + Math.sin(t * 0.9) * 0.045 + Math.sin(t * 1.7) * 0.018;
      scaleRef.current.scale.setScalar(breathe);
    }

    if (!robotGroup.current) return;

    // ── ROAMING — robot drifts all over in a Lissajous figure-8 ─────
    const roamX = Math.sin(t * 0.22) * 1.4 + Math.sin(t * 0.37) * 0.55;
    const roamY = Math.cos(t * 0.31) * 0.55 + Math.sin(t * 0.58) * 0.22;
    robotGroup.current.position.x = THREE.MathUtils.lerp(robotGroup.current.position.x, roamX, delta * 0.9);
    robotGroup.current.position.y = THREE.MathUtils.lerp(robotGroup.current.position.y, roamY + 0.32, delta * 0.9);

    // Gentle playful tilt while roaming
    const tiltZ = Math.sin(t * 0.28) * 0.12;
    robotGroup.current.rotation.z = THREE.MathUtils.lerp(robotGroup.current.rotation.z, tiltZ, delta * 1.5);

    // ── HEAD TRACKING — tracks pointer with cute lag ────────────────
    if (headGroup.current) {
      const targetY = pointer.x * 0.75 + Math.sin(t * 0.6) * 0.15;
      const targetX = -pointer.y * 0.45 + Math.sin(t * 0.8) * 0.08;
      headGroup.current.rotation.y = THREE.MathUtils.lerp(headGroup.current.rotation.y, targetY, delta * 4.5);
      headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, targetX, delta * 4.5);
      headGroup.current.rotation.z = Math.sin(t * 1.1) * 0.06;
    }

    // ── EYES — natural blinks + sparkles ────────────────────────────
    const blinkCycle = t % 3.8;
    const isBlink    = blinkCycle > 3.55;
    const eyeScaleY  = isBlink ? 0.08 : 1 + Math.sin(t * 2.5) * 0.08;

    if (lEyeRef.current) lEyeRef.current.scale.y = THREE.MathUtils.lerp(lEyeRef.current.scale.y, eyeScaleY, delta * 20);
    if (rEyeRef.current) rEyeRef.current.scale.y = THREE.MathUtils.lerp(rEyeRef.current.scale.y, eyeScaleY, delta * 20);

    // Eye glow rings pulse
    if (lEyeGlowRef.current) {
      const glowScale = 1 + Math.sin(t * 3) * 0.12;
      lEyeGlowRef.current.scale.setScalar(glowScale);
    }
    if (rEyeGlowRef.current) {
      const glowScale = 1 + Math.sin(t * 3 + 0.5) * 0.12;
      rEyeGlowRef.current.scale.setScalar(glowScale);
    }

    // ── MOUTH — wiggles when floating ──────────────────────────────
    if (mouthRef.current) {
      mouthRef.current.rotation.z = Math.sin(t * 1.8) * 0.14;
      mouthRef.current.scale.x    = 1 + Math.sin(t * 2.2) * 0.15;
    }

    // ── CHEEKS — blush glow pulses ──────────────────────────────────
    if (lCheekRef.current && rCheekRef.current) {
      const blushOpacity = 0.25 + Math.sin(t * 1.5) * 0.15;
      (lCheekRef.current.material as THREE.MeshBasicMaterial).opacity = blushOpacity;
      (rCheekRef.current.material as THREE.MeshBasicMaterial).opacity = blushOpacity;
    }

    // ── FLOATING HEART — pops up every 6s ───────────────────────────
    if (heartRef.current) {
      const heartCycle = t % 6;
      const showHeart  = heartCycle > 4.5;
      const heartAlpha = showHeart ? Math.sin(((heartCycle - 4.5) / 1.5) * Math.PI) : 0;
      (heartRef.current.material as THREE.MeshBasicMaterial).opacity = heartAlpha * 0.9;
      heartRef.current.position.y = 2.85 + (showHeart ? (heartCycle - 4.5) * 0.4 : 0);
      heartRef.current.scale.setScalar(showHeart ? 0.6 + Math.sin((heartCycle - 4.5) * Math.PI) * 0.4 : 0.01);
    }

    // ── ANTENNA — glowing beacon sparkle ────────────────────────────
    if (antennaRef.current) {
      antennaRef.current.scale.setScalar(0.9 + Math.sin(t * 4) * 0.3);
      (antennaRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(t * 6) * 0.4;
    }

    // ── ARMS — expressive and playful depending on section ─────────
    if (lArmGroup.current && rArmGroup.current) {
      let lZ = 0.15, rZ = -0.15, lX = 0, rX = 0;

      if (activeSection === 'ai') {
        lZ = 0.55 + Math.sin(t * 2.5) * 0.10;
        rZ = -0.70 + Math.cos(t * 2.5) * 0.10;
        lX = -0.3; rX = -0.4;
      } else if (activeSection === 'drones') {
        lZ = 0.85 + Math.sin(t * 1.8) * 0.12;
        rZ = -0.85 - Math.sin(t * 1.8) * 0.12;
      } else if (activeSection === 'coding') {
        lX = -0.5 + Math.sin(t * 4) * 0.12;
        rX = -0.5 + Math.cos(t * 4) * 0.12;
        lZ = 0.2; rZ = -0.2;
      } else {
        // Hero section — continuous friendly wave!
        const wave = Math.sin(t * 3.2) * 0.45;
        rZ = -0.20 - Math.abs(wave) * 0.6;
        rX = -0.4 + Math.sin(t * 3.2) * 0.15;
        lZ = 0.15 + Math.sin(t * 1.2) * 0.08;
      }

      lArmGroup.current.rotation.z = THREE.MathUtils.lerp(lArmGroup.current.rotation.z, lZ, delta * 4);
      rArmGroup.current.rotation.z = THREE.MathUtils.lerp(rArmGroup.current.rotation.z, rZ, delta * 4);
      lArmGroup.current.rotation.x = THREE.MathUtils.lerp(lArmGroup.current.rotation.x, lX, delta * 4);
      rArmGroup.current.rotation.x = THREE.MathUtils.lerp(rArmGroup.current.rotation.x, rX, delta * 4);
    }

    // ── Leg happy bounce ────────────────────────────────────────────
    if (lLegGroup.current && rLegGroup.current) {
      lLegGroup.current.rotation.x = Math.sin(t * 1.4) * 0.04;
      rLegGroup.current.rotation.x = -Math.sin(t * 1.4) * 0.04;
    }
  });

  return (
    <group ref={scaleRef}>
      <group ref={robotGroup} position={[0, 0.32, 0]} scale={0.80}>

        {/* HEAD */}
        <group ref={headGroup} position={[0, 1.88, 0]}>
          <mesh><sphereGeometry args={[0.52, 48, 48]} /><meshStandardMaterial {...pearl} envMapIntensity={2.0} /></mesh>
          <mesh position={[0, -0.05, 0.30]}><boxGeometry args={[0.72, 0.62, 0.14]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.05, 0.34]}><boxGeometry args={[0.62, 0.52, 0.06]} /><meshStandardMaterial {...pearl} envMapIntensity={2.0} /></mesh>
          <mesh position={[-0.54, 0.05, 0]}><sphereGeometry args={[0.16, 24, 24]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
          <mesh position={[-0.54, 0.05, 0.08]}><circleGeometry args={[0.09, 20]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.5} /></mesh>
          <mesh position={[0.54, 0.05, 0]}><sphereGeometry args={[0.16, 24, 24]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
          <mesh position={[0.54, 0.05, 0.08]}><circleGeometry args={[0.09, 20]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.5} /></mesh>
          <mesh position={[0, 0.60, 0]}><cylinderGeometry args={[0.018, 0.026, 0.28, 10]} /><meshStandardMaterial {...softGray} /></mesh>
          <mesh ref={antennaRef} position={[0, 0.78, 0]}><sphereGeometry args={[0.045, 14, 14]} /><meshBasicMaterial color="#FFD700" transparent opacity={0.9} /></mesh>
          <mesh position={[0, 0.78, 0]}><sphereGeometry args={[0.065, 10, 10]} /><meshBasicMaterial color="#FF6B00" transparent opacity={0.3} /></mesh>
          <mesh position={[-0.17, 0.08, 0.37]}><circleGeometry args={[0.11, 32]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.95} /></mesh>
          <mesh ref={lEyeRef} position={[-0.17, 0.08, 0.38]}><circleGeometry args={[0.075, 32]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.95} /></mesh>
          <mesh position={[-0.16, 0.09, 0.385]}><circleGeometry args={[0.032, 20]} /><meshBasicMaterial color="#00004a" transparent opacity={0.9} /></mesh>
          <mesh position={[-0.14, 0.12, 0.39]}><circleGeometry args={[0.014, 12]} /><meshBasicMaterial color="#ffffff" transparent opacity={1} /></mesh>
          <mesh ref={lEyeGlowRef} position={[-0.17, 0.08, 0.375]}><ringGeometry args={[0.09, 0.115, 32]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>
          <mesh position={[0.17, 0.08, 0.37]}><circleGeometry args={[0.11, 32]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.95} /></mesh>
          <mesh ref={rEyeRef} position={[0.17, 0.08, 0.38]}><circleGeometry args={[0.075, 32]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.95} /></mesh>
          <mesh position={[0.18, 0.09, 0.385]}><circleGeometry args={[0.032, 20]} /><meshBasicMaterial color="#00004a" transparent opacity={0.9} /></mesh>
          <mesh position={[0.20, 0.12, 0.39]}><circleGeometry args={[0.014, 12]} /><meshBasicMaterial color="#ffffff" transparent opacity={1} /></mesh>
          <mesh ref={rEyeGlowRef} position={[0.17, 0.08, 0.375]}><ringGeometry args={[0.09, 0.115, 32]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.35} side={THREE.DoubleSide} /></mesh>
          <mesh ref={mouthRef} position={[0, -0.16, 0.38]}><torusGeometry args={[0.10, 0.016, 10, 20, Math.PI]} /><meshBasicMaterial color="#FF6B00" transparent opacity={0.85} /></mesh>
          <mesh ref={lCheekRef} position={[-0.25, -0.06, 0.37]}><circleGeometry args={[0.06, 20]} /><meshBasicMaterial color="#ff6eb4" transparent opacity={0.30} /></mesh>
          <mesh ref={rCheekRef} position={[0.25, -0.06, 0.37]}><circleGeometry args={[0.06, 20]} /><meshBasicMaterial color="#ff6eb4" transparent opacity={0.30} /></mesh>
          <mesh ref={heartRef} position={[0.25, 2.85, 0.2]}><sphereGeometry args={[0.06, 12, 12]} /><meshBasicMaterial color="#ff6eb4" transparent opacity={0.0} /></mesh>
        </group>

        {/* NECK */}
        <mesh position={[0, 1.52, 0]}><cylinderGeometry args={[0.16, 0.18, 0.20, 20]} /><meshStandardMaterial {...softGray} envMapIntensity={1.4} /></mesh>
        <mesh position={[0, 1.44, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.175, 0.012, 10, 28]} /><meshStandardMaterial {...cyanEmit} /></mesh>

        {/* TORSO */}
        <group ref={torsoGroup} position={[0, 0.62, 0]}>
          <mesh position={[0, 0.18, 0]}><cylinderGeometry args={[0.50, 0.44, 0.80, 24]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, 0.22, 0.27]}><boxGeometry args={[0.58, 0.70, 0.10]} /><meshStandardMaterial {...pearl} envMapIntensity={2.0} /></mesh>
          <mesh position={[0, 0.40, 0.33]}><circleGeometry args={[0.08, 20]} /><meshBasicMaterial color="#ff6eb4" transparent opacity={0.65} /></mesh>
          <mesh position={[0, 0.40, 0.32]}><ringGeometry args={[0.08, 0.10, 20]} /><meshBasicMaterial color="#ff6eb4" transparent opacity={0.5} side={THREE.DoubleSide} /></mesh>
          <mesh position={[0, 0.10, 0.32]}><circleGeometry args={[0.12, 28]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.30} /></mesh>
          <mesh position={[0, 0.10, 0.31]}><ringGeometry args={[0.11, 0.135, 28]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.55} side={THREE.DoubleSide} /></mesh>
          <mesh position={[0, -0.08, 0.32]}><boxGeometry args={[0.38, 0.040, 0.015]} /><meshStandardMaterial color="#7B2DFF" emissive="#7B2DFF" emissiveIntensity={1.0} roughness={0.1} /></mesh>
          <mesh position={[0, -0.20, 0]}><cylinderGeometry args={[0.40, 0.36, 0.28, 20]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.6} /></mesh>
          <mesh position={[0, -0.46, 0]}><boxGeometry args={[0.68, 0.22, 0.36]} /><meshStandardMaterial {...white} envMapIntensity={1.6} /></mesh>
          <mesh position={[-0.36, -0.46, 0]}><boxGeometry args={[0.08, 0.18, 0.30]} /><meshStandardMaterial {...softGray} envMapIntensity={1.5} /></mesh>
          <mesh position={[0.36, -0.46, 0]}><boxGeometry args={[0.08, 0.18, 0.30]} /><meshStandardMaterial {...softGray} envMapIntensity={1.5} /></mesh>
          <mesh position={[-0.56, 0.50, 0]}><sphereGeometry args={[0.16, 20, 20]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
          <mesh position={[0.56, 0.50, 0]}><sphereGeometry args={[0.16, 20, 20]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
        </group>

        {/* LEFT ARM */}
        <group ref={lArmGroup} position={[-0.72, 1.10, 0]}>
          <mesh position={[0, -0.22, 0]}><capsuleGeometry args={[0.09, 0.28, 8, 16]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.48, 0]}><sphereGeometry args={[0.085, 18, 18]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.48, 0.07]}><circleGeometry args={[0.028, 14]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.7} /></mesh>
          <mesh position={[0, -0.70, 0]}><capsuleGeometry args={[0.078, 0.24, 8, 14]} /><meshStandardMaterial {...pearl} envMapIntensity={2.0} /></mesh>
          <mesh position={[0, -0.96, 0]}><sphereGeometry args={[0.10, 18, 18]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[-0.09, -0.90, 0.04]} rotation={[0, 0, 0.5]}><capsuleGeometry args={[0.028, 0.06, 4, 8]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.6} /></mesh>
        </group>

        {/* RIGHT ARM */}
        <group ref={rArmGroup} position={[0.72, 1.10, 0]}>
          <mesh position={[0, -0.22, 0]}><capsuleGeometry args={[0.09, 0.28, 8, 16]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.48, 0]}><sphereGeometry args={[0.085, 18, 18]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.48, 0.07]}><circleGeometry args={[0.028, 14]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.7} /></mesh>
          <mesh position={[0, -0.70, 0]}><capsuleGeometry args={[0.078, 0.24, 8, 14]} /><meshStandardMaterial {...pearl} envMapIntensity={2.0} /></mesh>
          <mesh position={[0, -0.96, 0]}><sphereGeometry args={[0.10, 18, 18]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0.09, -0.90, 0.04]} rotation={[0, 0, -0.5]}><capsuleGeometry args={[0.028, 0.06, 4, 8]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.6} /></mesh>
        </group>

        {/* LEFT LEG */}
        <group ref={lLegGroup} position={[-0.22, 0.08, 0]}>
          <mesh position={[0, 0, 0]}><sphereGeometry args={[0.125, 18, 18]} /><meshStandardMaterial {...softGray} envMapIntensity={1.5} /></mesh>
          <mesh position={[0, -0.28, 0]}><capsuleGeometry args={[0.105, 0.30, 8, 16]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.56, 0]}><sphereGeometry args={[0.095, 18, 18]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.56, 0.08]}><circleGeometry args={[0.030, 14]} /><meshBasicMaterial color="#7B2DFF" transparent opacity={0.6} /></mesh>
          <mesh position={[0, -0.80, 0]}><capsuleGeometry args={[0.088, 0.30, 8, 14]} /><meshStandardMaterial {...pearl} envMapIntensity={2.0} /></mesh>
          <mesh position={[0, -1.06, 0]}><sphereGeometry args={[0.072, 14, 14]} /><meshStandardMaterial {...softGray} envMapIntensity={1.4} /></mesh>
          <mesh position={[0, -1.18, 0.08]}><boxGeometry args={[0.20, 0.09, 0.28]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -1.18, 0.22]}><sphereGeometry args={[0.075, 14, 14]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.6} /></mesh>
        </group>

        {/* RIGHT LEG */}
        <group ref={rLegGroup} position={[0.22, 0.08, 0]}>
          <mesh position={[0, 0, 0]}><sphereGeometry args={[0.125, 18, 18]} /><meshStandardMaterial {...softGray} envMapIntensity={1.5} /></mesh>
          <mesh position={[0, -0.28, 0]}><capsuleGeometry args={[0.105, 0.30, 8, 16]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.56, 0]}><sphereGeometry args={[0.095, 18, 18]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -0.56, 0.08]}><circleGeometry args={[0.030, 14]} /><meshBasicMaterial color="#7B2DFF" transparent opacity={0.6} /></mesh>
          <mesh position={[0, -0.80, 0]}><capsuleGeometry args={[0.088, 0.30, 8, 14]} /><meshStandardMaterial {...pearl} envMapIntensity={2.0} /></mesh>
          <mesh position={[0, -1.06, 0]}><sphereGeometry args={[0.072, 14, 14]} /><meshStandardMaterial {...softGray} envMapIntensity={1.4} /></mesh>
          <mesh position={[0, -1.18, 0.08]}><boxGeometry args={[0.20, 0.09, 0.28]} /><meshStandardMaterial {...white} envMapIntensity={1.8} /></mesh>
          <mesh position={[0, -1.18, 0.22]}><sphereGeometry args={[0.075, 14, 14]} /><meshStandardMaterial {...offWhite} envMapIntensity={1.6} /></mesh>
        </group>

        {/* GROUND GLOW */}
        <mesh position={[0, -1.28, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.55, 40]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.05} /></mesh>
        <mesh position={[0, -1.27, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.42, 0.46, 48]} /><meshBasicMaterial color="#00d4ff" transparent opacity={0.28} side={THREE.DoubleSide} /></mesh>
        <mesh position={[0, -1.265, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.58, 0.60, 48]} /><meshBasicMaterial color="#ff6eb4" transparent opacity={0.18} side={THREE.DoubleSide} /></mesh>
      </group>
    </group>
  );
}

// ─── Lighting — warm & soft for white robot ──────────────────────────
function Lighting() {
  return (
    <>
      <directionalLight position={[-4, 7, 5]} intensity={2.8} color="#fff8f0" />
      <directionalLight position={[5, 2, 4]} intensity={2.0} color="#d0eeff" />
      <directionalLight position={[0, 5, -6]} intensity={2.4} color="#aaddff" />
      <pointLight position={[0, 1.2, 3.5]} intensity={4.0} color="#00d4ff" distance={10} />
      <pointLight position={[0, -1.5, 2.5]} intensity={1.8} color="#ff6eb4" distance={6} />
      <pointLight position={[-2, 0, 2]} intensity={1.0} color="#FF9040" distance={5} />
      <ambientLight intensity={1.2} />
    </>
  );
}

// ─── Canvas Export ───────────────────────────────────────────────────
export default function Robot3DCanvas({
  activeSection = 'hero',
}: {
  activeSection?: string;
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0.5, 6.5], fov: 40 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <Lighting />
        <CuteRobotModel activeSection={activeSection} />
      </Canvas>
    </div>
  );
}
