'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, Play } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulaRef = useRef<THREE.Points | null>(null);
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
    const starCount = 1800;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(geo, mat);
    starsRef.current = stars;
    scene.add(stars);

    // Create nebula
    const nebulaGeo = new THREE.BufferGeometry();
    const nb = 400;
    const nbPos = new Float32Array(nb * 3);

    for (let i = 0; i < nb; i++) {
      nbPos[i * 3] = (Math.random() - 0.5) * 8;
      nbPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      nbPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nbPos, 3));
    const nebulaMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.12,
      transparent: true,
      opacity: 0.18,
      sizeAttenuation: true,
    });

    const nebula = new THREE.Points(nebulaGeo, nebulaMat);
    nebulaRef.current = nebula;
    scene.add(nebula);

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

      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0003;
        starsRef.current.rotation.x += 0.0001;
      }

      if (nebulaRef.current) {
        nebulaRef.current.rotation.y -= 0.0005;
      }

      if (cameraRef.current) {
        cameraRef.current.position.x +=
          (mouseRef.current.x * 0.6 - cameraRef.current.position.x) * 0.04;
        cameraRef.current.position.y +=
          (-mouseRef.current.y * 0.4 - cameraRef.current.position.y) * 0.04;
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

  const [members, setMembers] = useState(0);
  const [online, setOnline] = useState(0);
  const [channels, setChannels] = useState(0);

  useEffect(() => {
    // Auto-enter on mount
    setEntered(true);

    const countUp = (id: number, target: number) => {
      let current = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        if (id === 1) setMembers(current);
        if (id === 2) setOnline(current);
        if (id === 3) setChannels(current);
        if (current >= target) clearInterval(interval);
      }, 30);
    };

    setTimeout(() => {
      countUp(1, 247);
      countUp(2, 38);
      countUp(3, 12);
    }, 800);
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-screen" style={{backgroundColor: '#05050f' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

        .enter-overlay {
          position: absolute;
          inset: 0;
          background: #05050f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 20;
          cursor: pointer;
          transition: opacity 0.8s ease;
        }
        
        .enter-overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .enter-ring {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1.5px solid rgba(139, 92, 246, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulseRing 2s ease-in-out infinite;
          position: relative;
          margin-bottom: 20px;
        }

        .enter-ring::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(139, 92, 246, 0.2);
          animation: pulseRing 2s ease-in-out infinite 0.5s;
        }

        .enter-ring svg {
          width: 22px;
          height: 22px;
        }

        .enter-text {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        @keyframes pulseRing {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

.hero-content {
  position: absolute;
  inset: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  padding: 0 24px;

  pointer-events: none; /* 🔥 ini penting */

  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s ease, transform 0.9s ease;
}

        .hero-content.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .server-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(139, 92, 246, 0.9);
          border: 1px solid rgba(139, 92, 246, 0.3);
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 28px;
          background: rgba(139, 92, 246, 0.07);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c3aed;
          box-shadow: 0 0 8px #7c3aed;
          animation: blink 1.4s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .hero-title {
          font-size: clamp(38px, 7vw, 68px);
          font-weight: 800;
          line-height: 1;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
          font-family: 'Syne', sans-serif;
        }

        .hero-title .accent {
          background: linear-gradient(135deg, #8b5cf6, #c084fc, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(13px, 2vw, 16px);
          color: rgba(255, 255, 255, 0.35);
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.04em;
          margin-bottom: 44px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-join {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          letter-spacing: 0.03em;
          box-shadow: 0 0 28px rgba(124, 58, 237, 0.4);
          transition: transform 0.18s, box-shadow 0.18s;
          text-decoration: none;
        }

        .btn-join:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(124, 58, 237, 0.65);
        }

        .btn-join svg {
          width: 18px;
          height: 18px;
        }

        .btn-explore {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 12px;
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          border: 1px solid rgba(255, 255, 255, 0.12);
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: color 0.18s, border-color 0.18s;
        }

        .btn-explore:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .stats-row {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 32px;
          z-index: 10;
          opacity: 0;
          transition: opacity 1s ease 0.5s;
        }

        .stats-row.visible {
          opacity: 1;
        }

        .stat {
          text-align: center;
        }

        .stat-num {
          font-family: 'Space Mono', monospace;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          display: block;
        }

        .stat-label {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.3);
          text-transform: uppercase;
          font-family: 'Space Mono', monospace;
        }

        .audio-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 30;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          color: rgba(255, 255, 255, 0.5);
          opacity: 0;
          animation: fadeIn 0.5s ease 1s forwards;
        }

        .audio-btn:hover {
          background: rgba(255, 255, 255, 0.13);
          color: #fff;
        }

        .audio-btn svg {
          width: 15px;
          height: 15px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Nebula effects */}
      <div
        className="nebula"
        style={{
          width: '320px',
          height: '320px',
          background: 'rgba(124, 58, 237, 0.12)',
          top: '-60px',
          left: '-60px',
        }}
      />
      <div
        className="nebula"
        style={{
          width: '280px',
          height: '280px',
          background: 'rgba(168, 85, 247, 0.08)',
          bottom: '-40px',
          right: '-40px',
        }}
      />
      <div
        className="nebula"
        style={{
          width: '200px',
          height: '200px',
          background: 'rgba(232, 121, 249, 0.07)',
          top: '40%',
          left: '60%',
        }}
      />



      {/* Audio button */}
      <button
        className="audio-btn"
        title="Toggle musik"
        onClick={() => setMuted(!muted)}
      >
        {muted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>

      {/* Hero content */}
      <div className={`hero-content ${entered ? 'visible' : ''}`}>
        <div className="server-badge">
          <span className="badge-dot" />
          Discord Server
        </div>
        <h1 className="hero-title">
          Selamat datang di
          <br />
          <span className="accent">YaiiCafe</span>
        </h1>
        <p className="hero-sub">
          Tempat ngobrol, berbagi, dan bersenang-senang.
          <br />
          Komunitas kita, dunia kita.
        </p>
        <div className="hero-actions">
          <a className="btn-join" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            Join Server
          </a>
          <Link href="/explore" className="btn-explore">Explore ↓</Link>
        </div>
      </div>

      {/* Stats row */}
      <div className={`stats-row ${entered ? 'visible' : ''}`}>
        <div className="stat">
          <span className="stat-num">{members}</span>
          <span className="stat-label">Members</span>
        </div>
        <div
          className="stat"
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            paddingLeft: '32px',
          }}
        >
          <span className="stat-num">{online}</span>
          <span className="stat-label">Online</span>
        </div>
        <div
          className="stat"
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            paddingLeft: '32px',
          }}
        >
          <span className="stat-num">{channels}</span>
          <span className="stat-label">Channels</span>
        </div>
      </div>
    </div>
  );
}
