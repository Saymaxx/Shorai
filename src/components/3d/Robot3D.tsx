'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Cute Sci-Fi PBR Materials ────────────────────────────────────────
const materials = {
  // Premium Cute Metallic Shells
  metallicSilver: {
    color: '#d6e2f0',
    metalness: 0.88,
    roughness: 0.16,
  },
  gunmetal: {
    color: '#1a2233',
    metalness: 0.85,
    roughness: 0.22,
  },
  darkGraphite: {
    color: '#0e1422',
    metalness: 0.80,
    roughness: 0.28,
  },
  chromeTrim: {
    color: '#ffffff',
    metalness: 0.98,
    roughness: 0.08,
  },
  screenDark: {
    color: '#060914',
    metalness: 0.92,
    roughness: 0.05,
  },

  // Cyber Neon Emissives
  cyanGlow: {
    color: '#00f0ff',
    emissive: '#00f0ff',
    emissiveIntensity: 4.6,
    roughness: 0.05,
  },
  electricBlue: {
    color: '#0066ff',
    emissive: '#0066ff',
    emissiveIntensity: 3.8,
    roughness: 0.08,
  },
  shoraiOrange: {
    color: '#ff6b00',
    emissive: '#ff6b00',
    emissiveIntensity: 3.4,
    metalness: 0.5,
    roughness: 0.20,
  },
  shoraiPurple: {
    color: '#a83aff',
    emissive: '#a83aff',
    emissiveIntensity: 2.8,
    metalness: 0.6,
    roughness: 0.25,
  },
  amberGold: {
    color: '#ffaa00',
    emissive: '#ff9900',
    emissiveIntensity: 4.0,
    metalness: 0.75,
    roughness: 0.18,
  },
};

// Global normalized mouse coordinates [-1, 1]
const globalMouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

// ─── 1. 360° Revolving 3D Planet ──────────────────────────────────────
function OrbitingPlanet({
  orbitSpeed = 0.45,
  orbitRadiusX = 2.1,
  orbitRadiusZ = 1.3,
  phaseOffset = 0,
}: {
  orbitSpeed?: number;
  orbitRadiusX?: number;
  orbitRadiusZ?: number;
  phaseOffset?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * orbitSpeed + phaseOffset;

    // 360° continuous orbital coordinates
    const orbitAngle = t;
    const rawX = Math.cos(orbitAngle) * orbitRadiusX;
    const rawZ = Math.sin(orbitAngle) * orbitRadiusZ;
    // Tilted inclination
    const rawY = -0.15 + Math.sin(orbitAngle) * 0.45 + (globalMouse.y * -0.2);

    // Mouse parallax offset
    const targetX = rawX + globalMouse.x * 0.25;
    const targetY = rawY;
    const targetZ = rawZ;

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 5.0, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 5.0, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 5.0, delta);

    // Axial spin
    groupRef.current.rotation.y += delta * 0.6;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.22;

    const targetScale = hovered ? 0.46 : 0.36;
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.0, delta));
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Core Planet */}
      <mesh>
        <sphereGeometry args={[0.55, 36, 36]} />
        <meshStandardMaterial
          color="#0c173c"
          metalness={0.82}
          roughness={0.2}
          emissive="#003888"
          emissiveIntensity={hovered ? 1.5 : 0.7}
        />
      </mesh>

      {/* Atmospheric Cloud Latitude Mesh */}
      <mesh scale={[1.015, 1.015, 1.015]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={hovered ? 0.55 : 0.30}
        />
      </mesh>

      {/* Glowing Atmosphere Outer Shell */}
      <mesh scale={[1.09, 1.09, 1.09]}>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={hovered ? 0.30 : 0.16}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Tilted Saturn-style Rings */}
      <group rotation={[1.15, 0.35, -0.2]}>
        <mesh ref={ringRef}>
          <ringGeometry args={[0.72, 1.12, 48]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={hovered ? 3.6 : 2.0}
            side={THREE.DoubleSide}
            transparent
            opacity={0.88}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[1.18, 1.30, 48]} />
          <meshStandardMaterial
            color="#a83aff"
            emissive="#a83aff"
            emissiveIntensity={hovered ? 2.8 : 1.4}
            side={THREE.DoubleSide}
            transparent
            opacity={0.68}
          />
        </mesh>
      </group>
    </group>
  );
}

// ─── 2. 360° Revolving 3D Rocket ──────────────────────────────────────
function OrbitingRocket({
  orbitSpeed = 0.55,
  orbitRadiusX = 2.4,
  orbitRadiusZ = 1.5,
  phaseOffset = (Math.PI * 2) / 3, // 120° offset from planet
}: {
  orbitSpeed?: number;
  orbitRadiusX?: number;
  orbitRadiusZ?: number;
  phaseOffset?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed * orbitSpeed + phaseOffset;

    // 360° continuous orbital coordinates
    const orbitAngle = t;
    const rawX = Math.cos(orbitAngle) * orbitRadiusX;
    const rawZ = Math.sin(orbitAngle) * orbitRadiusZ;
    // Opposite tilted orbital inclination
    const rawY = 0.10 - Math.sin(orbitAngle) * 0.50 + (globalMouse.y * -0.2);

    const targetX = rawX + globalMouse.x * 0.25;
    const targetY = rawY;
    const targetZ = rawZ;

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 5.0, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 5.0, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 5.0, delta);

    // Tangent flight banking: Point the rocket nose along its orbital velocity vector
    // Derivative of position: dx/dt = -sin(t), dz/dt = cos(t)
    const forwardX = -Math.sin(orbitAngle);
    const forwardZ = Math.cos(orbitAngle);
    const forwardY = -Math.cos(orbitAngle) * 0.35;

    const angleY = Math.atan2(forwardX, forwardZ);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, angleY + Math.PI / 2, 4.0, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, -forwardY * 1.2, 4.0, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0.25, 4.0, delta);

    if (thrusterRef.current) {
      const pulse = 1 + Math.sin(elapsed * 24) * 0.25 + (hovered ? 0.6 : 0);
      thrusterRef.current.scale.set(pulse, pulse * 1.5, pulse);
    }

    const targetScale = hovered ? 0.42 : 0.32;
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.0, delta));
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Fuselage */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 1.0, 24]} />
        <meshStandardMaterial {...materials.metallicSilver} />
      </mesh>

      {/* Nosecone */}
      <mesh position={[0, 0.80, 0]}>
        <coneGeometry args={[0.18, 0.50, 24]} />
        <meshStandardMaterial {...materials.shoraiOrange} />
      </mesh>

      {/* Cockpit Canopy */}
      <mesh position={[0, 0.34, 0.14]} rotation={[0.22, 0, 0]}>
        <capsuleGeometry args={[0.06, 0.18, 10, 16]} />
        <meshStandardMaterial {...materials.cyanGlow} />
      </mesh>

      {/* Dark Graphite Accent Band */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
        <meshStandardMaterial {...materials.darkGraphite} />
      </mesh>

      {/* Delta Stabilizer Wings */}
      <mesh position={[-0.30, -0.20, 0]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.28, 0.40, 0.04]} />
        <meshStandardMaterial {...materials.gunmetal} />
      </mesh>
      <mesh position={[-0.42, -0.25, 0]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.05, 0.30, 0.05]} />
        <meshStandardMaterial {...materials.shoraiOrange} />
      </mesh>

      <mesh position={[0.30, -0.20, 0]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[0.28, 0.40, 0.04]} />
        <meshStandardMaterial {...materials.gunmetal} />
      </mesh>
      <mesh position={[0.42, -0.25, 0]} rotation={[0, 0, -0.32]}>
        <boxGeometry args={[0.05, 0.30, 0.05]} />
        <meshStandardMaterial {...materials.shoraiOrange} />
      </mesh>

      {/* Thruster Nozzle */}
      <mesh position={[0, -0.40, 0]}>
        <cylinderGeometry args={[0.18, 0.14, 0.16, 20]} />
        <meshStandardMaterial {...materials.darkGraphite} />
      </mesh>

      {/* Plasma Flame Plume */}
      <mesh ref={thrusterRef} position={[0, -0.70, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.14, 0.55, 18]} />
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff4500"
          emissiveIntensity={hovered ? 6.0 : 4.0}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.07, 0.28, 14]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
    </group>
  );
}

// ─── 3. 360° Revolving 3D Innovation Light Bulb ───────────────────────
function OrbitingLightBulb({
  orbitSpeed = 0.38,
  orbitRadiusX = 1.9,
  orbitRadiusZ = 1.2,
  phaseOffset = (Math.PI * 4) / 3, // 240° offset
}: {
  orbitSpeed?: number;
  orbitRadiusX?: number;
  orbitRadiusZ?: number;
  phaseOffset?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const filamentRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed * orbitSpeed + phaseOffset;

    // 360° continuous orbital coordinates around upper/middle orbit
    const orbitAngle = t;
    const rawX = Math.cos(orbitAngle) * orbitRadiusX;
    const rawZ = Math.sin(orbitAngle) * orbitRadiusZ;
    // Higher elevation orbit across the top
    const rawY = 0.65 + Math.cos(orbitAngle) * 0.40 + (globalMouse.y * -0.15);

    const targetX = rawX + globalMouse.x * 0.20;
    const targetY = rawY;
    const targetZ = rawZ;

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 5.0, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 5.0, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 5.0, delta);

    groupRef.current.rotation.z = Math.sin(elapsed * 1.1) * 0.08;
    groupRef.current.rotation.y += delta * (hovered ? 2.4 : 0.8);

    if (filamentRef.current) {
      filamentRef.current.rotation.x += delta * 1.5;
      filamentRef.current.rotation.z += delta * 1.8;
    }

    const targetScale = hovered ? 0.38 : 0.30;
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.0, delta));
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Glass Bulb Globe */}
      <mesh position={[0, 0.20, 0]}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial
          color="#d8f4ff"
          roughness={0.06}
          metalness={0.12}
          transparent
          opacity={0.38}
        />
      </mesh>

      {/* Internal Glowing AI Neural Filament Core */}
      <group ref={filamentRef} position={[0, 0.20, 0]}>
        <mesh>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ff9900"
            emissiveIntensity={hovered ? 5.8 : 3.8}
          />
        </mesh>
        <mesh rotation={[0.6, 0.8, 0]}>
          <torusGeometry args={[0.26, 0.018, 10, 28]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={hovered ? 5.0 : 3.0}
          />
        </mesh>
        <mesh rotation={[-0.7, 0.5, 0.4]}>
          <torusGeometry args={[0.26, 0.018, 10, 28]} />
          <meshStandardMaterial
            color="#a83aff"
            emissive="#a83aff"
            emissiveIntensity={hovered ? 4.5 : 2.6}
          />
        </mesh>
      </group>

      {/* Metallic Base Collar */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.14, 20]} />
        <meshStandardMaterial {...materials.metallicSilver} />
      </mesh>

      {/* Gold/Brass Screw Base */}
      <mesh position={[0, -0.34, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.20, 20]} />
        <meshStandardMaterial {...materials.amberGold} />
      </mesh>

      {/* Contact Point */}
      <mesh position={[0, -0.46, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial {...materials.darkGraphite} />
      </mesh>
    </group>
  );
}

// ─── Holographic Orbital Guide Rings & Stardust Particles ─────────────
function HolographicOrbitalRings() {
  const particlesRef = useRef<THREE.Points>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  const [positions] = useMemo(() => {
    const count = 40;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.8 + Math.random() * 1.2;
      const y = (Math.random() - 0.5) * 2.0;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius * 0.7;
    }
    return [pos];
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.06;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* 3D Orbiting Thin Rings */}
      <group ref={ring1Ref} rotation={[0.45, 0.30, -0.15]}>
        <mesh>
          <ringGeometry args={[2.15, 2.165, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.22} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={ring2Ref} rotation={[-0.40, -0.25, 0.20]}>
        <mesh>
          <ringGeometry args={[2.55, 2.565, 64]} />
          <meshBasicMaterial color="#ff6b00" transparent opacity={0.18} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Ambient Stardust */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00f0ff"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ─── Cute Big Expressive Robotic Eye with Precision Cursor Tracking ────
function CuteExpressiveEye({
  isLeft,
  isBlinking,
}: {
  isLeft: boolean;
  isBlinking: boolean;
}) {
  const pupilGroupRef = useRef<THREE.Group>(null);
  const blinkGroupRef = useRef<THREE.Group>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);

  const xPos = isLeft ? -0.29 : 0.29;

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth eye pupil tracking cursor
    if (pupilGroupRef.current) {
      const maxOffsetX = 0.075;
      const maxOffsetY = 0.055;
      const tx = THREE.MathUtils.clamp(globalMouse.x * 0.085, -maxOffsetX, maxOffsetX);
      const ty = THREE.MathUtils.clamp(-globalMouse.y * 0.065, -maxOffsetY, maxOffsetY);

      pupilGroupRef.current.position.x = THREE.MathUtils.damp(pupilGroupRef.current.position.x, tx, 16, delta);
      pupilGroupRef.current.position.y = THREE.MathUtils.damp(pupilGroupRef.current.position.y, ty, 16, delta);
    }

    // Natural Blink animation
    if (blinkGroupRef.current) {
      const targetScaleY = isBlinking ? 0.05 : 1.0;
      blinkGroupRef.current.scale.y = THREE.MathUtils.damp(blinkGroupRef.current.scale.y, targetScaleY, 32, delta);
    }

    // Iris Pulse
    if (glowRingRef.current) {
      const pulse = 1.0 + Math.sin(t * 3.5 + (isLeft ? 0 : 0.6)) * 0.08;
      glowRingRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group position={[xPos, 0.05, 0.42]}>
      {/* Outer Chrome Socket Rim */}
      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshStandardMaterial {...materials.chromeTrim} />
      </mesh>

      {/* Recessed Dark Socket Chamber */}
      <mesh position={[0, 0, 0.010]}>
        <circleGeometry args={[0.18, 32]} />
        <meshBasicMaterial color="#02050e" />
      </mesh>

      {/* Glowing Cyber HUD Ring */}
      <mesh position={[0, 0, 0.015]}>
        <ringGeometry args={[0.155, 0.175, 28]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={3.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Blink and Tracking Pupil Sub-Assembly */}
      <group ref={blinkGroupRef} position={[0, 0, 0.022]}>
        <group ref={pupilGroupRef}>
          {/* Glowing Cyan Iris Disc */}
          <mesh position={[0, 0, 0.005]}>
            <circleGeometry args={[0.145, 32]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={5.0}
            />
          </mesh>

          {/* Electric Blue Inner Core Ring */}
          <mesh position={[0, 0, 0.008]}>
            <ringGeometry args={[0.07, 0.12, 32]} />
            <meshStandardMaterial
              color="#0055ff"
              emissive="#0066ff"
              emissiveIntensity={4.2}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Pulsing Iris Outer Halo */}
          <mesh ref={glowRingRef} position={[0, 0, 0.010]}>
            <ringGeometry args={[0.125, 0.165, 32]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>

          {/* Glossy Black Center Pupil */}
          <mesh position={[0, 0, 0.014]}>
            <circleGeometry args={[0.058, 24]} />
            <meshBasicMaterial color="#01030a" />
          </mesh>

          {/* Specular White Glint Reflection Dots (Adorable friendly expression) */}
          <mesh position={[0.036, 0.038, 0.020]}>
            <circleGeometry args={[0.026, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.030, -0.028, 0.020]}>
            <circleGeometry args={[0.014, 12]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ─── Adorable Cute Rounded Boxy Mascot 3D Robot Head ──────────────────
function CuteRobotHeadModel() {
  const headGroupRef = useRef<THREE.Group>(null);
  const floatGroupRef = useRef<THREE.Group>(null);
  const antennaOrbRef = useRef<THREE.Mesh>(null);

  const [isBlinking, setIsBlinking] = useState(false);

  // Global mouse listener attached to window
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      globalMouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth damp global mouse coords
    globalMouse.x = THREE.MathUtils.damp(globalMouse.x, globalMouse.targetX, 8, delta);
    globalMouse.y = THREE.MathUtils.damp(globalMouse.y, globalMouse.targetY, 8, delta);

    // Periodic organic blinks
    const blinkCycle = t % 4.0;
    if (blinkCycle > 3.82 && !isBlinking) setIsBlinking(true);
    if (blinkCycle <= 3.82 && isBlinking) setIsBlinking(false);

    // Antenna orb glow pulse
    if (antennaOrbRef.current) {
      const pulse = 1 + Math.sin(t * 4) * 0.15;
      antennaOrbRef.current.scale.setScalar(pulse);
    }

    // Gentle Vertical Floating Kinematics
    if (floatGroupRef.current) {
      const floatY = Math.sin(t * 1.3) * 0.06 + Math.cos(t * 2.2) * 0.018;
      const floatX = Math.sin(t * 0.8) * 0.025;
      floatGroupRef.current.position.y = THREE.MathUtils.damp(floatGroupRef.current.position.y, floatY, 4, delta);
      floatGroupRef.current.position.x = THREE.MathUtils.damp(floatGroupRef.current.position.x, floatX, 4, delta);
    }

    // Secondary Head Rotation following cursor (cute subtle tilt)
    if (headGroupRef.current) {
      const targetRotY = THREE.MathUtils.clamp(globalMouse.x * 0.30, -0.25, 0.25) + Math.sin(t * 0.7) * 0.012;
      const targetRotX = THREE.MathUtils.clamp(-globalMouse.y * 0.20, -0.16, 0.16) + Math.cos(t * 0.9) * 0.01;
      const targetRotZ = Math.sin(t * 0.9) * 0.025 - globalMouse.x * 0.035;

      headGroupRef.current.rotation.y = THREE.MathUtils.damp(headGroupRef.current.rotation.y, targetRotY, 4.0, delta);
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(headGroupRef.current.rotation.x, targetRotX, 4.0, delta);
      headGroupRef.current.rotation.z = THREE.MathUtils.damp(headGroupRef.current.rotation.z, targetRotZ, 4.0, delta);
    }
  });

  return (
    <>
      <HolographicOrbitalRings />
      {/* 360° Continuous Orbiting Elements */}
      <OrbitingPlanet />
      <OrbitingRocket />
      <OrbitingLightBulb />

      <group ref={floatGroupRef}>
        <group ref={headGroupRef} position={[0, 0.04, 0]} scale={0.96}>

          {/* ── 1. CERVICAL BASE & FLOATING MAGNETIC COLLAR ───────── */}
          {/* Hydraulic Neck Cylinder */}
          <mesh position={[0, -0.58, -0.04]}>
            <cylinderGeometry args={[0.22, 0.26, 0.20, 28]} />
            <meshStandardMaterial {...materials.gunmetal} />
          </mesh>

          {/* Floating Cyan Conduit Collar Ring */}
          <mesh position={[0, -0.50, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.28, 0.026, 16, 36]} />
            <meshStandardMaterial {...materials.cyanGlow} emissiveIntensity={3.2} />
          </mesh>

          {/* ── 2. CUTE SLEEK ROUNDED ROBOT HEAD BODY ─────────────── */}
          {/* Main Metallic Rounded Shell (Pebble/Squircle Box Shape) */}
          <mesh position={[0, 0.04, -0.04]}>
            <boxGeometry args={[1.24, 1.02, 0.76]} />
            <meshStandardMaterial {...materials.metallicSilver} />
          </mesh>

          {/* Top Skull Cap with Chrome Trim */}
          <mesh position={[0, 0.44, -0.04]}>
            <boxGeometry args={[1.16, 0.16, 0.72]} />
            <meshStandardMaterial {...materials.chromeTrim} />
          </mesh>

          {/* Top Cute Antenna with Glowing Beacon */}
          <mesh position={[0, 0.68, -0.05]}>
            <cylinderGeometry args={[0.016, 0.026, 0.28, 16]} />
            <meshStandardMaterial {...materials.chromeTrim} />
          </mesh>
          <mesh ref={antennaOrbRef} position={[0, 0.86, -0.05]}>
            <sphereGeometry args={[0.065, 20, 20]} />
            <meshStandardMaterial {...materials.cyanGlow} emissiveIntensity={4.8} />
          </mesh>

          {/* ── 3. INSET GLOSSY OBSIDIAN FACE MONITOR SCREEN ──────── */}
          {/* Outer Screen Bezel Frame */}
          <mesh position={[0, 0.04, 0.35]}>
            <boxGeometry args={[1.08, 0.80, 0.06]} />
            <meshStandardMaterial {...materials.gunmetal} />
          </mesh>

          {/* Inset Screen Glass Panel */}
          <mesh position={[0, 0.04, 0.39]}>
            <boxGeometry args={[1.00, 0.72, 0.04]} />
            <meshStandardMaterial {...materials.screenDark} />
          </mesh>

          {/* ── 4. TWO BIG EXPRESSIVE CUTE GLOWING EYES ───────────── */}
          <CuteExpressiveEye isLeft={true} isBlinking={isBlinking} />
          <CuteExpressiveEye isLeft={false} isBlinking={isBlinking} />

          {/* Cute Glowing Smile LED */}
          <mesh position={[0, -0.16, 0.42]}>
            <boxGeometry args={[0.22, 0.024, 0.02]} />
            <meshStandardMaterial {...materials.shoraiOrange} emissiveIntensity={3.2} />
          </mesh>

          {/* Cute Soft Pink Blush Dots */}
          <mesh position={[-0.38, -0.10, 0.42]}>
            <circleGeometry args={[0.045, 16]} />
            <meshBasicMaterial color="#ff3d7f" transparent opacity={0.50} />
          </mesh>
          <mesh position={[0.38, -0.10, 0.42]}>
            <circleGeometry args={[0.045, 16]} />
            <meshBasicMaterial color="#ff3d7f" transparent opacity={0.50} />
          </mesh>

          {/* ── 5. CUTE SIDE EAR HEADPHONES / PODS ────────────────── */}
          {/* Left Ear Cup */}
          <group position={[-0.66, 0.04, -0.04]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.12, 28]} />
              <meshStandardMaterial {...materials.chromeTrim} />
            </mesh>
            <mesh position={[0, 0.07, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
              <meshStandardMaterial {...materials.darkGraphite} />
            </mesh>
            <mesh position={[0, 0.10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.13, 28]} />
              <meshStandardMaterial {...materials.cyanGlow} emissiveIntensity={3.5} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Right Ear Cup */}
          <group position={[0.66, 0.04, -0.04]} rotation={[0, Math.PI / 2, 0]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.12, 28]} />
              <meshStandardMaterial {...materials.chromeTrim} />
            </mesh>
            <mesh position={[0, 0.07, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.04, 24]} />
              <meshStandardMaterial {...materials.darkGraphite} />
            </mesh>
            <mesh position={[0, 0.10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.13, 28]} />
              <meshStandardMaterial {...materials.shoraiOrange} emissiveIntensity={3.0} side={THREE.DoubleSide} />
            </mesh>
          </group>

        </group>
      </group>
    </>
  );
}

// ─── Cinematic Studio Lighting Rig ────────────────────────────────────
function CinematicLighting() {
  return (
    <>
      {/* Key Frontal Light: Crisp metallic highlights */}
      <directionalLight position={[3.5, 4.5, 5.0]} intensity={3.6} color="#ffffff" />

      {/* Soft Front Fill Light */}
      <directionalLight position={[-3.5, 2.5, 4.0]} intensity={2.4} color="#d8ebff" />

      {/* Electric Cyan Rim Light (Strikes left metallic contours) */}
      <directionalLight position={[-5.5, 2.0, -2.0]} intensity={7.0} color="#00f0ff" />

      {/* Neon Purple/Magenta Rim Light (Strikes right metallic contours) */}
      <directionalLight position={[5.5, 2.0, -2.0]} intensity={6.0} color="#a83aff" />

      {/* Warm Orange Low-Angle Accent Fill */}
      <pointLight position={[0, -2.8, 2.5]} intensity={4.5} color="#ff6b00" distance={9} />

      {/* Ambient Atmosphere */}
      <ambientLight intensity={1.2} color="#182236" />
    </>
  );
}

// ─── Main Canvas Export ───────────────────────────────────────────────
export default function Robot3DCanvas({
  activeSection = 'hero',
}: {
  activeSection?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0.20, 5.2], fov: 38 }}
          dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          <CinematicLighting />
          <CuteRobotHeadModel />
        </Canvas>
      )}
    </div>
  );
}
