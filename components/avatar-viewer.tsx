'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { X, RotateCw } from 'lucide-react';

interface AvatarViewerProps {
  avatar: {
    id: string;
    memberName: string;
    avatarName: string;
    modelUrl: string;
    description: string;
  };
  onClose: () => void;
}

export default function AvatarViewer({ avatar, onClose }: AvatarViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resetRotation = () => {
    if (modelRef.current) {
      modelRef.current.rotation.set(0, 0, 0);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);
    scene.fog = new THREE.Fog(0x1e293b, 10, 20);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);
    camera.lookAt(0, 1, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xa855f7, 0.5);
    pointLight.position.set(-3, 2, 3);
    scene.add(pointLight);

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      avatar.modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.position.y = 0;
        model.scale.set(1, 1, 1);
        
        // Enable shadows on all meshes
        model.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        
        modelRef.current = model;
        scene.add(model);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Failed to load model:', error);
        setError('Gagal memuat model 3D. File mungkin tidak tersedia.');
        setIsLoading(false);
      }
    );

    // Mouse tracking for rotation
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      }
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
        modelRef.current.rotation.x = mouseY * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [avatar.modelUrl]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-wider">
                {avatar.memberName}
              </p>
              <h2 className="text-2xl font-bold text-white">
                {avatar.avatarName}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Canvas */}
          <div className="flex-1 relative bg-slate-900 overflow-hidden min-h-96">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: 'block' }}
            />

            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-slate-300">Memuat model 3D...</p>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-red-400 mb-2">⚠️ {error}</p>
                  <p className="text-slate-400 text-sm">
                    Pastikan file GLB tersedia di folder /public/avatars/
                  </p>
                </div>
              </div>
            )}

            {/* Controls hint */}
            {!isLoading && !error && (
              <div className="absolute top-4 left-4 text-xs text-slate-400">
                <p>💡 Gerakkan mouse untuk rotate model</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700 p-6 space-y-4">
            {/* Description */}
            <p className="text-slate-300">
              {avatar.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={resetRotation}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                <RotateCw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
