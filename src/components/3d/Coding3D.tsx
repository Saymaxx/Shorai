'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Coding3DProps {
  activeCodeBlock?: string;
  isExecuting?: boolean;
  language?: 'blocks' | 'python' | 'javascript';
}

function HolographicCodeCube({ isExecuting = false }: { isExecuting: boolean }) {
  const cubeRef = useRef<THREE.Group>(null);
  const outerBoxRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const rotSpeed = isExecuting ? delta * 3 : delta * 0.5;

    if (cubeRef.current) {
      cubeRef.current.rotation.y += rotSpeed;
      cubeRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
    }

    if (outerBoxRef.current) {
      outerBoxRef.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group ref={cubeRef}>
      {/* Outer Holographic Glass Frame */}
      <mesh ref={outerBoxRef}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial
          color={isExecuting ? '#00FF66' : '#7B2DFF'}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner Glowing Distorted Logic Core */}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <MeshDistortMaterial
          color={isExecuting ? '#00FF66' : '#7B2DFF'}
          emissive={isExecuting ? '#00FF66' : '#7B2DFF'}
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={isExecuting ? 4 : 1.5}
        />
      </mesh>

      {/* Floating 3D Code Symbols on Cube Faces */}
      {[
        { pos: [0, 0, 1.15], rot: [0, 0, 0], symbol: '</>' },
        { pos: [0, 0, -1.15], rot: [0, Math.PI, 0], symbol: 'fn()' },
        { pos: [1.15, 0, 0], rot: [0, Math.PI / 2, 0], symbol: '{ }' },
        { pos: [-1.15, 0, 0], rot: [0, -Math.PI / 2, 0], symbol: 'if (AI)' },
        { pos: [0, 1.15, 0], rot: [-Math.PI / 2, 0, 0], symbol: 'def run()' },
        { pos: [0, -1.15, 0], rot: [Math.PI / 2, 0, 0], symbol: '=>' }
      ].map((face, idx) => (
        <group key={idx} position={face.pos as [number, number, number]} rotation={face.rot as [number, number, number]}>
          <Text
            fontSize={0.35}
            color={isExecuting ? '#00FF66' : '#ffffff'}
            anchorX="center"
            anchorY="middle"
          >
            {face.symbol}
          </Text>
        </group>
      ))}
    </group>
  );
}

function FloatingSyntaxNodes({ isExecuting }: { isExecuting: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 6,
        size: Math.random() * 0.15 + 0.08,
        symbol: ['01', '10', 'AI', 'bot', 'loop', 'eval', 'sync'][i % 7]
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[node.x, node.y, node.z]}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={isExecuting ? '#00FF66' : '#7B2DFF'}
              emissive={isExecuting ? '#00FF66' : '#7B2DFF'}
              emissiveIntensity={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Coding3D({
  activeCodeBlock,
  isExecuting = false,
  language = 'blocks'
}: Coding3DProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-10, -5, -5]} intensity={1.2} color="#7B2DFF" />
        <pointLight position={[0, 0, 2]} intensity={2} color={isExecuting ? '#00FF66' : '#7B2DFF'} distance={6} />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <HolographicCodeCube isExecuting={isExecuting} />
        </Float>

        <FloatingSyntaxNodes isExecuting={isExecuting} />

        <Sparkles
          count={40}
          scale={6}
          size={2}
          speed={isExecuting ? 2 : 0.6}
          opacity={0.8}
          color={isExecuting ? '#00FF66' : '#7B2DFF'}
        />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
