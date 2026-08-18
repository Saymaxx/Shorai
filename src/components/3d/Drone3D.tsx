'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export type DroneFlightMode = 'hover' | 'orbit' | 'scan' | 'takeoff';

interface Drone3DProps {
  flightMode?: DroneFlightMode;
  propSpeed?: number;
  laserActive?: boolean;
}

function Quadcopter({ flightMode = 'hover', propSpeed = 1, laserActive = true }: Drone3DProps) {
  const droneGroup = useRef<THREE.Group>(null);
  const gimbalRef = useRef<THREE.Group>(null);
  const laserBeamRef = useRef<THREE.Mesh>(null);

  // Propeller Mesh Refs
  const prop1 = useRef<THREE.Group>(null);
  const prop2 = useRef<THREE.Group>(null);
  const prop3 = useRef<THREE.Group>(null);
  const prop4 = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Rotate Propellers rapidly
    const propRot = delta * 35 * propSpeed;
    if (prop1.current) prop1.current.rotation.y += propRot;
    if (prop2.current) prop2.current.rotation.y -= propRot;
    if (prop3.current) prop3.current.rotation.y -= propRot;
    if (prop4.current) prop4.current.rotation.y += propRot;

    // Flight Dynamics Animations
    if (droneGroup.current) {
      if (flightMode === 'orbit') {
        // Orbit Circle Flight
        const r = 2.2;
        droneGroup.current.position.x = Math.cos(t * 1.5) * r;
        droneGroup.current.position.z = Math.sin(t * 1.5) * r;
        droneGroup.current.position.y = Math.sin(t * 3) * 0.2;
        droneGroup.current.rotation.y = -t * 1.5 - Math.PI / 2;
        droneGroup.current.rotation.z = -0.25; // Bank angle
      } else if (flightMode === 'scan') {
        // Scanning Search Grid Flight
        droneGroup.current.position.x = Math.sin(t * 2) * 1.5;
        droneGroup.current.position.z = Math.cos(t * 1) * 0.8;
        droneGroup.current.position.y = -0.3 + Math.sin(t * 4) * 0.08;
        droneGroup.current.rotation.z = Math.cos(t * 2) * 0.1;
        droneGroup.current.rotation.x = 0.1;
      } else if (flightMode === 'takeoff') {
        // Vertical Launch Sequence
        droneGroup.current.position.x = 0;
        droneGroup.current.position.z = 0;
        droneGroup.current.position.y = Math.sin(t * 2.5) * 0.8;
        droneGroup.current.rotation.x = Math.sin(t * 1.5) * 0.2;
        droneGroup.current.rotation.y = t * 1.2;
        droneGroup.current.rotation.z = 0;
      } else {
        // Stable Hover with subtle wind sway
        droneGroup.current.position.x = Math.sin(t * 0.8) * 0.15;
        droneGroup.current.position.z = Math.cos(t * 0.6) * 0.15;
        droneGroup.current.position.y = Math.sin(t * 1.8) * 0.12;
        droneGroup.current.rotation.x = Math.sin(t * 1.2) * 0.05;
        droneGroup.current.rotation.z = Math.cos(t * 1.5) * 0.05;
        droneGroup.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      }
    }

    // Gimbal Camera Tracking
    if (gimbalRef.current) {
      gimbalRef.current.rotation.x = Math.sin(t * 2) * 0.2 + 0.3;
      gimbalRef.current.rotation.y = Math.cos(t * 1.5) * 0.2;
    }

    // LiDAR Scanning Laser Beam effect
    if (laserBeamRef.current) {
      const laserMat = laserBeamRef.current.material as THREE.MeshBasicMaterial;
      if (laserMat) {
        laserMat.opacity = laserActive ? 0.4 + Math.sin(t * 8) * 0.2 : 0;
      }
    }
  });

  return (
    <group ref={droneGroup} position={[0, 0, 0]} scale={1.2}>
      
      {/* CENTRAL FUSELAGE / BODY */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.2, 0.9]} />
        <meshStandardMaterial color="#0b1326" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Top Carbon Fiber Shell Plate */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.75]} />
        <meshStandardMaterial color="#1a2538" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Status LED Strip (Cyan Glow) */}
      <mesh position={[0, 0.13, -0.1]}>
        <boxGeometry args={[0.3, 0.02, 0.4]} />
        <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={2} />
      </mesh>

      {/* X-FRAME CARBON ARMS & ROTOR MOTORS */}
      {([
        { pos: [0.9, 0, 0.9] as [number, number, number], rot: Math.PI / 4, ref: prop1, id: 'front-right', ledColor: '#00FF66' },
        { pos: [-0.9, 0, 0.9] as [number, number, number], rot: -Math.PI / 4, ref: prop2, id: 'front-left', ledColor: '#00FF66' },
        { pos: [0.9, 0, -0.9] as [number, number, number], rot: -Math.PI / 4, ref: prop3, id: 'rear-right', ledColor: '#FF2D7B' },
        { pos: [-0.9, 0, -0.9] as [number, number, number], rot: Math.PI / 4, ref: prop4, id: 'rear-left', ledColor: '#FF2D7B' }
      ]).map((arm, idx) => (
        <group key={idx}>
          {/* Carbon Fiber Arm Tube */}
          <mesh position={[arm.pos[0] / 2, 0, arm.pos[2] / 2]} rotation={[0, arm.rot, 0]}>
            <boxGeometry args={[0.1, 0.08, 1.3]} />
            <meshStandardMaterial color="#070c18" metalness={0.95} roughness={0.2} />
          </mesh>

          {/* Motor Housing Cylinders */}
          <mesh position={arm.pos}>
            <cylinderGeometry args={[0.18, 0.18, 0.18, 16]} />
            <meshStandardMaterial color="#FF6B00" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Navigation LED Light */}
          <mesh position={[arm.pos[0], -0.1, arm.pos[2]]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={arm.ledColor} />
          </mesh>

          {/* SPINNING PROPELLER BLADES */}
          <group ref={arm.ref} position={[arm.pos[0], 0.12, arm.pos[2]]}>
            {/* Blade 1 */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.85, 0.015, 0.08]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.85} metalness={0.8} />
            </mesh>
            {/* Blade 2 */}
            <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[0.85, 0.015, 0.08]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.85} metalness={0.8} />
            </mesh>
            {/* Rotor Cap */}
            <mesh position={[0, 0.02, 0]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={1} />
            </mesh>
          </group>
        </group>
      ))}

      {/* BOTTOM HD GIMBAL CAMERA */}
      <group ref={gimbalRef} position={[0, -0.18, 0.2]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial color="#0d182b" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Camera Lens */}
        <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
          <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* SCANNING LIDAR LASER BEAM */}
      {laserActive && (
        <group position={[0, -0.2, 0.2]}>
          {/* Vertical Laser Cone */}
          <mesh ref={laserBeamRef} position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[1.2, 2.4, 32, 1, true]} />
            <meshBasicMaterial color="#00FF66" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>

          {/* Terrain Scan Ring Grid */}
          <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.0, 1.2, 32]} />
            <meshBasicMaterial color="#00FF66" side={THREE.DoubleSide} transparent opacity={0.7} wireframe />
          </mesh>
        </group>
      )}

      {/* Thrust / Air Flow Sparkles */}
      <Sparkles count={60} scale={3.5} size={2.5} speed={1.2} opacity={0.6} color="#00BFFF" />
    </group>
  );
}

export default function Drone3D({
  flightMode = 'hover',
  propSpeed = 1,
  laserActive = true
}: Drone3DProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.8, 4.8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-8, -5, -4]} intensity={1.2} color="#00BFFF" />
        <pointLight position={[0, -1, 1]} intensity={2} color="#00FF66" distance={6} />

        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Quadcopter flightMode={flightMode} propSpeed={propSpeed} laserActive={laserActive} />
        </Float>

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} />
      </Canvas>
    </div>
  );
}
