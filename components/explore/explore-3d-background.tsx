'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Explore3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const objectsRef = useRef<THREE.Object3D[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
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

    // Create floating particles
    const particleCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    objectsRef.current.push(particles);

    // Create floating cubes
    const cubesGroup = new THREE.Group();
    const cubeCount = 12;

    for (let i = 0; i < cubeCount; i++) {
      const size = Math.random() * 0.5 + 0.2;
      const cubeGeometry = new THREE.BoxGeometry(size, size, size);
      
      const hue = Math.random();
      const color = new THREE.Color();
      color.setHSL(hue * 0.3 + 0.65, 0.8, 0.5); // Purple to pink range

      const cubeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.7,
        roughness: 0.3,
        wireframe: Math.random() > 0.5,
      });

      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );

      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      (cube as any).velocity = {
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.003,
        rx: (Math.random() - 0.5) * 0.01,
        ry: (Math.random() - 0.5) * 0.01,
        rz: (Math.random() - 0.5) * 0.01,
      };

      cubesGroup.add(cube);
    }

    scene.add(cubesGroup);
    objectsRef.current.push(cubesGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x8b5cf6, 0.8);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe879f9, 0.6);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.x = (e.clientX - rect.left) / rect.width - 0.5;
        mouseRef.current.y = (e.clientY - rect.top) / rect.height - 0.5;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Animate particles
      const posAttr = particlesGeometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap around
        if (Math.abs(positions[i * 3]) > 10) velocities[i * 3] *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 10) velocities[i * 3 + 2] *= -1;
      }
      posAttr.needsUpdate = true;

      // Animate cubes
      cubesGroup.children.forEach((cube) => {
        const vel = (cube as any).velocity;
        cube.position.x += vel.x;
        cube.position.y += vel.y;
        cube.position.z += vel.z;
        cube.rotation.x += vel.rx;
        cube.rotation.y += vel.ry;
        cube.rotation.z += vel.rz;

        // Wrap around
        if (Math.abs(cube.position.x) > 8) vel.x *= -1;
        if (Math.abs(cube.position.y) > 8) vel.y *= -1;
        if (Math.abs(cube.position.z) > 6) vel.z *= -1;
      });

      // Camera following mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseRef.current.y * 1.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
