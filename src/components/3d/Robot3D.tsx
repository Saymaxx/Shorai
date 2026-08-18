'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Environment, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface RobotModelProps {
  scrollProgress?: number;
  activeSection?: string;
  isInteractive?: boolean;
}

function RobotModel({ activeSection = 'hero' }: RobotModelProps) {
  const robotGroup = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const leftArmGroup = useRef<THREE.Group>(null);
  const rightArmGroup = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const visorRef = useRef<THREE.Mesh>(null);

  const { pointer } = useThree();

  // Pose target rotations depending on active section
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle hover float offset
    if (robotGroup.current) {
      robotGroup.current.position.y = Math.sin(t * 1.8) * 0.12;

      // Smooth mouse tracking for Head
      if (headGroup.current) {
        const targetHeadY = pointer.x * 0.6;
        const targetHeadX = -pointer.y * 0.4;
        headGroup.current.rotation.y = THREE.MathUtils.lerp(headGroup.current.rotation.y, targetHeadY, delta * 4);
        headGroup.current.rotation.x = THREE.MathUtils.lerp(headGroup.current.rotation.x, targetHeadX, delta * 4);
      }

      // Smooth torso rotation
      const targetTorsoY = pointer.x * 0.25;
      robotGroup.current.rotation.y = THREE.MathUtils.lerp(robotGroup.current.rotation.y, targetTorsoY, delta * 3);
    }

    // Dynamic Arm Poses based on Active Section
    if (leftArmGroup.current && rightArmGroup.current) {
      let lArmZ = 0.2;
      let rArmZ = -0.2;
      let lArmX = 0;
      let rArmX = 0;

      if (activeSection === 'ai') {
        // AI pose: raised arms pointing to AI brain
        lArmZ = 0.6 + Math.sin(t * 3) * 0.05;
        rArmZ = -0.8 + Math.cos(t * 3) * 0.05;
        lArmX = -0.3;
        rArmX = -0.5;
      } else if (activeSection === 'drones') {
        // Drone pose: arms wide floating
        lArmZ = 1.0 + Math.sin(t * 2) * 0.1;
        rArmZ = -1.0 - Math.sin(t * 2) * 0.1;
      } else if (activeSection === 'coding') {
        // Coding pose: typing / interactive gesture
        lArmX = -0.8 + Math.sin(t * 4) * 0.1;
        rArmX = -0.8 + Math.cos(t * 4) * 0.1;
        lArmZ = 0.3;
        rArmZ = -0.3;
      } else {
        // Default waving / friendly pose
        rArmZ = -1.2 + Math.sin(t * 2.5) * 0.15; // Waving right arm
        lArmZ = 0.2 + Math.cos(t * 2) * 0.05;
      }

      leftArmGroup.current.rotation.z = THREE.MathUtils.lerp(leftArmGroup.current.rotation.z, lArmZ, delta * 3);
      rightArmGroup.current.rotation.z = THREE.MathUtils.lerp(rightArmGroup.current.rotation.z, rArmZ, delta * 3);
      leftArmGroup.current.rotation.x = THREE.MathUtils.lerp(leftArmGroup.current.rotation.x, lArmX, delta * 3);
      rightArmGroup.current.rotation.x = THREE.MathUtils.lerp(rightArmGroup.current.rotation.x, rArmX, delta * 3);
    }

    // Glowing Core animation
    if (coreRef.current) {
      const coreMat = coreRef.current.material as THREE.MeshBasicMaterial;
      if (coreMat) {
        coreMat.opacity = 0.7 + Math.sin(t * 4) * 0.3;
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={robotGroup} position={[0, -0.2, 0]} scale={1.15}>
        
        {/* --- HEAD --- */}
        <group ref={headGroup} position={[0, 1.45, 0]}>
          {/* Main Skull Helmet */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshStandardMaterial 
              color="#0d1527" 
              metalness={0.9} 
              roughness={0.15} 
              envMapIntensity={1.5} 
            />
          </mesh>

          {/* Outer Chrome Shell Accent */}
          <mesh position={[0, 0.05, -0.05]}>
            <sphereGeometry args={[0.57, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
            <meshStandardMaterial color="#1a2638" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Glowing Visor Screen */}
          <mesh ref={visorRef} position={[0, 0.08, 0.38]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.65, 0.26, 0.22]} />
            <meshStandardMaterial 
              color="#00f0ff" 
              emissive="#00BFFF" 
              emissiveIntensity={2.5} 
              roughness={0.1} 
            />
          </mesh>

          {/* Digital Eyes / Pupil Dots */}
          <mesh position={[-0.14, 0.08, 0.5]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.14, 0.08, 0.5]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Side Ears / Audio Sensors */}
          <mesh position={[-0.58, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
            <meshStandardMaterial color="#FF6B00" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.58, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />
            <meshStandardMaterial color="#FF6B00" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Antenna */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.015, 0.025, 0.25, 8]} />
            <meshStandardMaterial color="#7B2DFF" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#00BFFF" />
          </mesh>
        </group>

        {/* --- NECK JOINTS --- */}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.2, 0.22, 0.15, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* --- TORSO / CHEST --- */}
        <group position={[0, 0.2, 0]}>
          {/* Main Chest Armor */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.48, 0.38, 0.9, 16]} />
            <meshStandardMaterial color="#0c1220" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Front Armor Plate */}
          <mesh position={[0, 0.25, 0.22]}>
            <boxGeometry args={[0.55, 0.65, 0.15]} />
            <meshStandardMaterial color="#162238" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Arc Reactor / Core Energy Unit */}
          <mesh ref={coreRef} position={[0, 0.3, 0.31]}>
            <circleGeometry args={[0.14, 32]} />
            <meshBasicMaterial color="#FF6B00" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.3, 0.3]}>
            <torusGeometry args={[0.16, 0.02, 16, 32]} />
            <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={1.5} />
          </mesh>

          {/* Shorai Badge / Logo Bar */}
          <mesh position={[0, 0.05, 0.3]}>
            <boxGeometry args={[0.3, 0.06, 0.02]} />
            <meshStandardMaterial color="#7B2DFF" emissive="#7B2DFF" emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* --- ARMS & HANDS --- */}
        {/* Left Arm */}
        <group ref={leftArmGroup} position={[-0.55, 0.55, 0]}>
          {/* Shoulder Sphere */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#FF6B00" metalness={0.8} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[-0.1, -0.28, 0]} rotation={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.09, 0.08, 0.45, 16]} />
            <meshStandardMaterial color="#0c1220" metalness={0.8} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[-0.15, -0.52, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={0.5} />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.15, -0.75, 0]}>
            <cylinderGeometry args={[0.08, 0.07, 0.4, 16]} />
            <meshStandardMaterial color="#162238" metalness={0.8} />
          </mesh>
          {/* Hand */}
          <mesh position={[-0.15, -0.98, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00BFFF" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmGroup} position={[0.55, 0.55, 0]}>
          {/* Shoulder Sphere */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#FF6B00" metalness={0.8} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[0.1, -0.28, 0]} rotation={[0, 0, -0.15]}>
            <cylinderGeometry args={[0.09, 0.08, 0.45, 16]} />
            <meshStandardMaterial color="#0c1220" metalness={0.8} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[0.15, -0.52, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={0.5} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0.15, -0.75, 0]}>
            <cylinderGeometry args={[0.08, 0.07, 0.4, 16]} />
            <meshStandardMaterial color="#162238" metalness={0.8} />
          </mesh>
          {/* Hand */}
          <mesh position={[0.15, -0.98, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00BFFF" />
          </mesh>
        </group>

        {/* --- HOVER THRUSTERS & RINGS --- */}
        <group position={[0, -0.45, 0]}>
          {/* Lower Base Connector */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.15, 0.3, 16]} />
            <meshStandardMaterial color="#101828" metalness={0.9} />
          </mesh>

          {/* Plasma Thruster Cone */}
          <mesh position={[0, -0.22, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.18, 0.35, 16, 1, true]} />
            <meshBasicMaterial color="#00BFFF" transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>

          {/* Energy Ring 1 */}
          <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.42, 32]} />
            <meshBasicMaterial color="#FF6B00" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>

          {/* Energy Ring 2 */}
          <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.45, 0.5, 32]} />
            <meshBasicMaterial color="#7B2DFF" side={THREE.DoubleSide} transparent opacity={0.5} />
          </mesh>
        </group>

        {/* Particles surrounding robot */}
        <Sparkles count={50} scale={3} size={2.5} speed={0.8} opacity={0.7} color="#00BFFF" />
      </group>
    </Float>
  );
}

export default function Robot3DCanvas({ activeSection = 'hero' }: { activeSection?: string }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -2, -3]} intensity={1.2} color="#00BFFF" />
        <pointLight position={[0, 1, 2]} intensity={2} color="#FF6B00" distance={5} />
        
        <RobotModel activeSection={activeSection} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
