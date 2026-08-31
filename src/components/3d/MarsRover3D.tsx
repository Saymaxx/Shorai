'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export interface MarsRover3DProps {
  status?: 'idle' | 'scanning' | 'sampling';
  speed?: number;
}

function RoverModel({ status = 'scanning', speed = 1 }: MarsRover3DProps) {
  const roverGroup = useRef<THREE.Group>(null);
  const mastRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle rover chassis bounce & floating vibration
    if (roverGroup.current) {
      roverGroup.current.position.y = Math.sin(t * 2) * 0.05 - 0.2;
      roverGroup.current.rotation.z = Math.sin(t * 1.5) * 0.02;
    }

    // Mast / Camera head scanning movement
    if (mastRef.current) {
      if (status === 'scanning') {
        mastRef.current.rotation.y = Math.sin(t * 1.2) * 0.7;
        mastRef.current.rotation.x = Math.sin(t * 2) * 0.15;
      } else {
        mastRef.current.rotation.y = 0;
      }
    }

    // Robotic arm animation
    if (armRef.current) {
      if (status === 'sampling') {
        armRef.current.rotation.x = -0.6 + Math.sin(t * 2) * 0.3;
        armRef.current.rotation.y = Math.sin(t * 1.5) * 0.2;
      } else {
        armRef.current.rotation.x = -0.2;
        armRef.current.rotation.y = 0;
      }
    }

    // Communication dish rotation
    if (dishRef.current) {
      dishRef.current.rotation.y = t * 0.5;
    }

    // Rotate wheels
    wheelsRef.current.forEach((w) => {
      if (w) w.rotation.x += delta * 4 * speed;
    });
  });

  return (
    <group ref={roverGroup} position={[0, -0.2, 0]}>
      
      {/* ── Main Chassis Body ── */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.6, 0.5, 2.0]} />
        <meshStandardMaterial
          color="#D97706"
          roughness={0.3}
          metalness={0.7}
          emissive="#78350F"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Top Solar Deck */}
      <mesh position={[0, 0.66, 0]}>
        <boxGeometry args={[1.7, 0.05, 2.1]} />
        <meshStandardMaterial
          color="#1E293B"
          roughness={0.1}
          metalness={0.9}
          emissive="#0284C7"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Solar Panel Cells Grid (Top) */}
      <mesh position={[0, 0.7, 0]}>
        <planeGeometry args={[1.5, 1.9]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* ── Sensor Mast / Pan-Tilt Camera Head ── */}
      <group ref={mastRef} position={[0.4, 0.7, 0.7]}>
        {/* Mast Pole */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 16]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Camera Head Box */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.25]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Dual Laser Lenses */}
        <mesh position={[-0.08, 0.9, 0.13]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0.08, 0.9, 0.13]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#FF6B00" emissive="#FF6B00" emissiveIntensity={1.5} />
        </mesh>

        {/* Forward Scanning Light Cone */}
        {status === 'scanning' && (
          <mesh position={[0, 0.9, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.4, 1.0, 16, 1, true]} />
            <meshBasicMaterial color="#FF6B00" transparent opacity={0.15} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>

      {/* ── Front Robotic Sample Collection Arm ── */}
      <group ref={armRef} position={[-0.4, 0.4, 1.0]}>
        <mesh position={[0, -0.2, 0.3]} rotation={[-0.5, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
          <meshStandardMaterial color="#64748B" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.4, 0.5]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#E11D48" emissive="#E11D48" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ── High-Gain Communications Dish ── */}
      <group ref={dishRef} position={[-0.4, 0.75, -0.6]}>
        <mesh rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.02, 0.08, 24]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* ── 6 Wheels on Rocker-Bogie System ── */}
      {[
        [-0.95, 0.1, 0.7],  // Front Left
        [0.95, 0.1, 0.7],   // Front Right
        [-1.0, 0.1, 0],     // Mid Left
        [1.0, 0.1, 0],      // Mid Right
        [-0.95, 0.1, -0.7], // Rear Left
        [0.95, 0.1, -0.7],  // Rear Right
      ].map((pos, idx) => (
        <group
          key={idx}
          position={pos as [number, number, number]}
          ref={(el) => {
            if (el) wheelsRef.current[idx] = el;
          }}
        >
          {/* Wheel Hub & Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.18, 20]} />
            <meshStandardMaterial
              color="#0F172A"
              metalness={0.9}
              roughness={0.4}
            />
          </mesh>
          {/* Wheel Rim Accent */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.2, 12]} />
            <meshStandardMaterial
              color="#FF6B00"
              emissive="#FF6B00"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Rocker-Bogie Suspension Bars */}
      <mesh position={[-0.9, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.08, 1.5]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>
      <mesh position={[0.9, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.08, 1.5]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>

    </group>
  );
}

export default function MarsRover3D({ status = 'scanning', speed = 1 }: MarsRover3DProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [2.8, 2.2, 3.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFEDD5" />
        <pointLight position={[-4, 3, -4]} intensity={1.2} color="#00D4FF" />
        <pointLight position={[2, -2, 2]} intensity={0.8} color="#FF6B00" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <RoverModel status={status} speed={speed} />
        </Float>

        {/* Mars Dust & Glow Particles */}
        <Sparkles count={35} scale={4} size={2.5} speed={0.4} color="#FF6B00" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
