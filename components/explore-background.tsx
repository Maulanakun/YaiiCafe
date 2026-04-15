'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ExploreBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulaRef = useRef<THREE.Points | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 3;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    const handleResize = () => {
      const w = canvasRef.current?.clientWidth || 0;
      const h = canvasRef.current?.clientHeight || 0;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create stars
    const starCount = 1200;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeo, starMat);
    starsRef.current = stars;
    scene.add(stars);

    // Create nebula
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaCount = 600;
    const nebulaPosArray = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount; i++) {
      nebulaPosArray[i * 3] = (Math.random() - 0.5) * 10;
      nebulaPosArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      nebulaPosArray[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPosArray, 3));
    const nebulaMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.08,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: true,
    });

    const nebula = new THREE.Points(nebulaGeo, nebulaMat);
    nebulaRef.current = nebula;
    scene.add(nebula);

    // Create animated particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 300;
    const particlePosArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePosArray[i * 3] = (Math.random() - 0.5) * 15;
      particlePosArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
      particlePosArray[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePosArray, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
        mouseRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
      }
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate stars
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.00015;
        starsRef.current.rotation.x += 0.00008;
      }

      // Rotate nebula
      if (nebulaRef.current) {
        nebulaRef.current.rotation.y -= 0.0003;
        nebulaRef.current.rotation.z += 0.00015;
      }

      // Animate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0001;
        particlesRef.current.rotation.y += 0.0002;

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(Date.now() * 0.0001 + i) * 0.0008;
          positions[i] += Math.cos(Date.now() * 0.00015 + i) * 0.0005;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Mouse parallax
      if (cameraRef.current) {
        cameraRef.current.position.x +=
          (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.03;
        cameraRef.current.position.y +=
          (-mouseRef.current.y * 0.3 - cameraRef.current.position.y) * 0.03;
        cameraRef.current.lookAt(scene.position);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Nebula glow effects */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          top: '-80px',
          left: '-80px',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          bottom: '-50px',
          right: '-50px',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(200, 130, 252, 0.08) 0%, transparent 70%)',
          top: '35%',
          left: '65%',
          filter: 'blur(80px)',
        }}
      />
    </>
  );
}
