'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial, MeshTransmissionMaterial, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RobotCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, -0.5, 0]}>
        <octahedronGeometry args={[1.5, 1]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          color="#141B2D"
        />
        {/* Core Glow */}
        <pointLight color="#00D9FF" intensity={2} distance={5} />
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial color="#00D9FF" wireframe />
        </mesh>
      </mesh>
    </Float>
  );
}

function AIBrain() {
  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <MeshDistortMaterial 
          color="#FF6B00" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8} 
          roughness={0.2} 
          distort={0.4} 
          speed={2} 
        />
        <pointLight color="#FF6B00" intensity={3} distance={4} />
      </mesh>
    </Float>
  );
}

function AnimatedDrone() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.x = Math.cos(t * 0.5) * 4;
      groupRef.current.position.z = Math.sin(t * 0.5) * 4;
      groupRef.current.position.y = Math.sin(t * 1.5) * 1;
      groupRef.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Rotors */}
      {[[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]].map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.1, pos[1]]}>
          <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.5} />
        </mesh>
      ))}
      <pointLight color="#00D9FF" intensity={0.5} distance={2} />
    </group>
  );
}

function NeuralNetwork() {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const lines = useMemo(() => {
    const points = [];
    for (let i = 0; i < count; i += 3) {
      points.push(
        new THREE.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2]),
        new THREE.Vector3(positions[(i+1)*3], positions[(i+1)*3+1], positions[(i+1)*3+2])
      );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [positions]);

  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#00D9FF" transparent opacity={0.6} />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#FF6B00" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

function HolographicPlatform() {
  return (
    <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2, 2.2, 64]} />
      <meshBasicMaterial color="#00D9FF" side={THREE.DoubleSide} transparent opacity={0.5} wireframe />
      <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.05} />
      </mesh>
    </mesh>
  );
}

function Scene() {
  const { mouse, camera } = useThree();
  
  useFrame(() => {
    // Parallax effect on camera based on mouse
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00D9FF" />
      
      <RobotCore />
      <AIBrain />
      <AnimatedDrone />
      <NeuralNetwork />
      <HolographicPlatform />
      
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
      
      <Environment preset="city" />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
}
