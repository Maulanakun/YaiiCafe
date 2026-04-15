'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Avatar3DSceneProps {
  glbUrl: string;
}

function AvatarModel({ glbUrl }: { glbUrl: string }) {
  const { scene } = useGLTF(glbUrl);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
  
    const model = groupRef.current;
  
    // 1. Reset dulu
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.rotation.set(0, 0, 0);
  
    // 2. Rotate biar hadap depan
    model.rotation.y = Math.PI;
  
    // 3. Hitung bounding box
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
  
    box.getSize(size);
    box.getCenter(center);
  
    // 4. Normalize tinggi (INI KUNCI)
    const targetHeight = 2; // lebih kecil biar konsisten
    const scale = targetHeight / size.y;
    model.scale.setScalar(scale);
  
    // 5. Hitung ulang setelah scale
    const box2 = new THREE.Box3().setFromObject(model);
    const center2 = new THREE.Vector3();
    box2.getCenter(center2);
  
    // 6. TARUH KAKI DI BAWAH + CENTER XZ
    model.position.set(
      -center2.x,
      -box2.min.y,
      -center2.z
    );
  
  }, [glbUrl]);
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 3]} intensity={1.5} />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color="#8b5cf6" />
    </>
  );
}

export default function Avatar3DScene({ glbUrl }: Avatar3DSceneProps) {
  return (
    <Canvas
    camera={{ position: [-1, 1, 4], fov: 10 }}
      style={{ width: '100%', height: '400px' }}
    >
      <Lights />
      <Suspense fallback={null}>
        <AvatarModel glbUrl={glbUrl} />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        target={[0, 1.5, 0]}
      />
    </Canvas>
  );
}