'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface AIBrain3DProps {
  mode?: 'neural' | 'vision' | 'nlp';
  density?: number;
  speed?: number;
  onNodeClick?: (nodeId: number, info: string) => void;
}

function SynapticNodes({ mode, count = 60, speed = 1, onNodeClick }: { mode: string; count: number; speed: number; onNodeClick?: (id: number, info: string) => void }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesGroupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Generate 3D sphere positions for neural nodes
  const { positions, nodeInfos } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const infos: string[] = [];
    const radius = 2.2;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.8 + Math.random() * 0.4);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      infos.push(
        mode === 'vision'
          ? `Feature Map #${i + 1}: Conv2D Weight ${(Math.random() * 0.99).toFixed(3)}`
          : mode === 'nlp'
          ? `Token Embedding #${i + 1}: Vector Dim [${(Math.random() * 2 - 1).toFixed(2)}, ${(Math.random() * 2 - 1).toFixed(2)}]`
          : `Synaptic Neuron #${i + 1}: Bias ${(Math.random() * 0.5).toFixed(2)}, Activation ReLU`
      );
    }
    return { positions: pos, nodeInfos: infos };
  }, [count, mode]);

  // Generate connection line geometry
  const lineGeometry = useMemo(() => {
    const linePositions: number[] = [];
    const maxDist = 1.8;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    return geom;
  }, [positions, count]);

  // Animate node points & line rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.15;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (linesGroupRef.current) {
      linesGroupRef.current.rotation.y = t * 0.15;
      linesGroupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group>
      {/* Synaptic Nodes Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color={mode === 'vision' ? '#FF6B00' : mode === 'nlp' ? '#7B2DFF' : '#00BFFF'}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Connection Synaptic Lines */}
      <group ref={linesGroupRef}>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color={mode === 'vision' ? '#FF6B00' : mode === 'nlp' ? '#7B2DFF' : '#00BFFF'}
            transparent
            opacity={0.35}
          />
        </lineSegments>
      </group>
    </group>
  );
}

function AIObjectBoundingBoxes() {
  const boxRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (boxRef.current) {
      boxRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={boxRef}>
      {/* Bounding box 1 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 2.8, 2.8]} />
        <meshBasicMaterial color="#FF6B00" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Target Crosshairs */}
      <mesh position={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#FF2D7B" />
      </mesh>
      <mesh position={[-1.4, -1.4, -1.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#FF2D7B" />
      </mesh>
    </group>
  );
}

function CentralAICore({ mode, speed }: { mode: string; speed: number }) {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
      coreRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  const coreColor = mode === 'vision' ? '#FF6B00' : mode === 'nlp' ? '#7B2DFF' : '#00BFFF';

  return (
    <Float speed={2 * speed} rotationIntensity={0.8} floatIntensity={1}>
      {/* Pulsating Distorted Inner Brain Sphere */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 3]} />
        <MeshDistortMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          distort={0.45}
          speed={3 * speed}
          clearcoat={1}
        />
      </mesh>

      {/* Inner Glowing Energy Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      <pointLight color={coreColor} intensity={3} distance={6} />
    </Float>
  );
}

export default function AIBrain3D({
  mode = 'neural',
  density = 70,
  speed = 1,
  onNodeClick
}: AIBrain3DProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00BFFF" />
        
        <CentralAICore mode={mode} speed={speed} />
        <SynapticNodes mode={mode} count={density} speed={speed} onNodeClick={onNodeClick} />
        
        {mode === 'vision' && <AIObjectBoundingBoxes />}

        <Sparkles
          count={100}
          scale={7}
          size={2}
          speed={0.6 * speed}
          opacity={0.7}
          color={mode === 'vision' ? '#FF6B00' : mode === 'nlp' ? '#7B2DFF' : '#00BFFF'}
        />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1 * speed} />
      </Canvas>
    </div>
  );
}
