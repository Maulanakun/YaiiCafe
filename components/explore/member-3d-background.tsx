'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Member3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1);
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create particle system
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOptions = [
      new THREE.Color(0xa855f7), // purple-500
      new THREE.Color(0xec4899), // pink-500
      new THREE.Color(0x06b6d4), // cyan-500
      new THREE.Color(0xf97316), // orange-500
      new THREE.Color(0x4f46e5), // indigo-500
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Add some floating cubes for decoration
    const cubeCount = 5;
    for (let i = 0; i < cubeCount; i++) {
      const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const cubeMaterial = new THREE.MeshPhongMaterial({
        color: colorOptions[i % colorOptions.length],
        wireframe: true,
        emissive: colorOptions[i % colorOptions.length],
        emissiveIntensity: 0.5,
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      (cube as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
      };
      scene.add(cube);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update particles
      if (particlesRef.current) {
        const positionAttribute = particlesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
        const positions = positionAttribute.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += velocities[i * 3];
          positions[i * 3 + 1] += velocities[i * 3 + 1];
          positions[i * 3 + 2] += velocities[i * 3 + 2];

          // Wrap around
          if (positions[i * 3] > 10) positions[i * 3] = -10;
          if (positions[i * 3] < -10) positions[i * 3] = 10;
          if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10;
          if (positions[i * 3 + 1] < -10) positions[i * 3 + 1] = 10;
          if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
          if (positions[i * 3 + 2] < -10) positions[i * 3 + 2] = 10;
        }
        positionAttribute.needsUpdate = true;

        // Rotate particles
        particlesRef.current.rotation.x += 0.0001;
        particlesRef.current.rotation.y += 0.0002;
      }

      // Update floating cubes
      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh && (child.material as any).wireframe) {
          const speed = (child as any).rotationSpeed;
          child.rotation.x += speed.x;
          child.rotation.y += speed.y;
          child.rotation.z += speed.z;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, rgba(5, 5, 15, 0.8), rgba(26, 0, 51, 0.8))',
      }}
    />
  );
}
