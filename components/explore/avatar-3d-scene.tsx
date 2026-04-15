'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface Avatar3DSceneProps {
  avatarId: string;
}

function AvatarCharacter({ avatarId }: { avatarId: string }) {
  const groupRef = useRef<THREE.Group>(null);

  const colors = {
    '1': { primary: '#c084fc', secondary: '#e879f9', accent: '#8b5cf6' },
    '2': { primary: '#06b6d4', secondary: '#0891b2', accent: '#06d6ff' },
    '3': { primary: '#10b981', secondary: '#059669', accent: '#6ee7b7' },
    '4': { primary: '#f97316', secondary: '#ea580c', accent: '#fdba74' },
    '5': { primary: '#6366f1', secondary: '#4f46e5', accent: '#818cf8' },
  };

  const colorSet = colors[avatarId as keyof typeof colors] || colors['1'];

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <Sphere args={[1, 32, 32]} position={[0, 3, 0]}>
        <meshStandardMaterial color={colorSet.primary} metalness={0.3} roughness={0.4} />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.3, 16, 16]} position={[-0.3, 3.5, 0.95]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.3, 16, 16]} position={[0.3, 3.5, 0.95]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Body */}
      <Box args={[1.2, 2, 0.8]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color={colorSet.secondary} metalness={0.2} roughness={0.5} />
      </Box>

      {/* Left Arm */}
      <Box args={[0.5, 2, 0.5]} position={[-1.2, 1.5, 0]}>
        <meshStandardMaterial color={colorSet.primary} metalness={0.3} roughness={0.4} />
      </Box>

      {/* Right Arm */}
      <Box args={[0.5, 2, 0.5]} position={[1.2, 1.5, 0]}>
        <meshStandardMaterial color={colorSet.primary} metalness={0.3} roughness={0.4} />
      </Box>

      {/* Left Leg */}
      <Box args={[0.5, 2, 0.5]} position={[-0.4, -1, 0]}>
        <meshStandardMaterial color={colorSet.secondary} metalness={0.2} roughness={0.5} />
      </Box>

      {/* Right Leg */}
      <Box args={[0.5, 2, 0.5]} position={[0.4, -1, 0]}>
        <meshStandardMaterial color={colorSet.secondary} metalness={0.2} roughness={0.5} />
      </Box>

      {/* Accent Torus */}
      <Torus args={[1.8, 0.2, 16, 100]} position={[0, 0, 0]} rotation={[0.5, 0, 0]}>
        <meshStandardMaterial color={colorSet.accent} metalness={0.8} roughness={0.2} emissive={colorSet.accent} emissiveIntensity={0.3} />
      </Torus>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#8b5cf6" />
    </>
  );
}

export default function Avatar3DScene({ avatarId }: Avatar3DSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50 }}
      style={{ width: '100%', height: '400px' }}
    >
      <Lights />
      <AvatarCharacter avatarId={avatarId} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={4}
      />
    </Canvas>
  );
}
