'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

const mockMoments = [
  {
    id: '1',
    title: 'Epic Roblox Adventure',
    image: 'https://images.unsplash.com/photo-1538391846015-35def9ae949f?w=600&h=400&fit=crop',
    author: 'Reza Wijaya',
    likes: 128,
    date: '2024-04-10',
    height: 'tall',
  },
  {
    id: '2',
    title: 'Minecraft Building Challenge',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
    author: 'Budi Santoso',
    likes: 245,
    date: '2024-04-09',
    height: 'normal',
  },
  {
    id: '3',
    title: 'Squad Gaming Session',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=400&fit=crop',
    author: 'Dina Putri',
    likes: 189,
    date: '2024-04-08',
    height: 'normal',
  },
  {
    id: '4',
    title: 'Roblox Fashion Show',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    author: 'Fathia Zahra',
    likes: 312,
    date: '2024-04-07',
    height: 'tall',
  },
  {
    id: '5',
    title: 'Hide and Seek Tournament',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop',
    author: 'Aditya Kusuma',
    likes: 156,
    date: '2024-04-06',
    height: 'normal',
  },
  {
    id: '6',
    title: 'Roleplay Story Quest',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    author: 'Siti Rahma',
    likes: 201,
    date: '2024-04-05',
    height: 'tall',
  },
];

export default function MomentsSection() {
  const [likedMoments, setLikedMoments] = useState<Set<string>>(new Set());
  const [hoveredMoment, setHoveredMoment] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create particle effect background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx || !containerRef.current) return;

    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    canvas.style.zIndex = '1';

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    const createParticle = () => {
      if (Math.random() > 0.98) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;

        if (p.life > 0) {
          ctx.globalAlpha = p.life * 0.5;
          ctx.fillRect(p.x, p.y, 2, 2);
        } else {
          particles.splice(idx, 1);
        }
      });

      createParticle();
      requestAnimationFrame(animate);
    };

    containerRef.current.appendChild(canvas);
    animate();

    return () => {
      canvas.remove();
    };
  }, []);

  const toggleLike = (e: React.MouseEvent, momentId: string) => {
    e.preventDefault();
    const newLiked = new Set(likedMoments);
    if (newLiked.has(momentId)) {
      newLiked.delete(momentId);
    } else {
      newLiked.add(momentId);
    }
    setLikedMoments(newLiked);
  };

  return (
    <>
      <style>{`
        .moments-container {
          position: relative;
          width: 100%;
          margin-bottom: 60px;
        }

        .moments-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          position: relative;
          z-index: 2;
        }

        .moment-tile {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          animation: tileAppear 0.6s ease forwards;
          background: rgba(30, 30, 50, 0.3);
          border: 1px solid rgba(139, 92, 246, 0.2);
          backdrop-filter: blur(10px);
        }

        .moment-tile.tall {
          grid-row: span 2;
          min-height: 500px;
        }

        @media (max-width: 768px) {
          .moment-tile.tall {
            grid-row: span 1;
            min-height: auto;
          }
        }

        @keyframes tileAppear {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .moment-tile:nth-child(1) { animation-delay: 0.1s; }
        .moment-tile:nth-child(2) { animation-delay: 0.15s; }
        .moment-tile:nth-child(3) { animation-delay: 0.2s; }
        .moment-tile:nth-child(4) { animation-delay: 0.25s; }
        .moment-tile:nth-child(5) { animation-delay: 0.3s; }
        .moment-tile:nth-child(6) { animation-delay: 0.35s; }

        .moment-tile:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3), inset 0 0 30px rgba(139, 92, 246, 0.05);
          border-color: rgba(139, 92, 246, 0.6);
        }

        .moment-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 300px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(200, 130, 252, 0.05));
        }

        .moment-tile.tall .moment-image-wrapper {
          min-height: 500px;
        }

        .moment-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .moment-tile:hover .moment-image {
          transform: scale(1.12) rotate(1.5deg);
          filter: brightness(1.15) saturate(1.1);
        }

        .moment-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .moment-tile:hover .moment-overlay {
          opacity: 1;
        }

        .moment-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          z-index: 10;
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .moment-tile:hover .moment-content {
          transform: translateY(0);
          opacity: 1;
        }

        .moment-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .moment-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .moment-author {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(200, 130, 252, 0.9);
          letter-spacing: 0.05em;
        }

        .moment-like-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.3);
          border: 1px solid rgba(139, 92, 246, 0.5);
          padding: 6px 12px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 11px;
          font-family: 'Space Mono', monospace;
        }

        .moment-like-btn:hover {
          background: rgba(139, 92, 246, 0.5);
          border-color: rgba(139, 92, 246, 0.8);
          color: #fff;
          transform: scale(1.05);
        }

        .moment-like-btn.liked {
          background: rgba(239, 68, 68, 0.4);
          border-color: rgba(239, 68, 68, 0.6);
          color: #ff6b6b;
        }

        .heart-icon {
          width: 14px;
          height: 14px;
          transition: all 0.3s ease;
        }

        .moment-like-btn.liked .heart-icon {
          animation: heartBeat 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.35); }
          60% { transform: scale(1); }
        }
      `}</style>

      <div className="moments-container" ref={containerRef}>
        <div className="moments-masonry">
        {mockMoments.map((moment) => (
          <div
            key={moment.id}
            className={`moment-tile ${moment.height === 'tall' ? 'tall' : ''}`}
            onMouseEnter={() => setHoveredMoment(moment.id)}
            onMouseLeave={() => setHoveredMoment(null)}
          >
            <div className="moment-image-wrapper">
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                className="moment-image"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="moment-overlay" />
            </div>

            <div className="moment-content">
              <h3 className="moment-title">{moment.title}</h3>
              <div className="moment-meta">
                <span className="moment-author">{moment.author}</span>
                <button
                  className={`moment-like-btn ${likedMoments.has(moment.id) ? 'liked' : ''}`}
                  onClick={(e) => toggleLike(e, moment.id)}
                >
                  <Heart className="heart-icon" fill={likedMoments.has(moment.id) ? 'currentColor' : 'none'} />
                  {likedMoments.has(moment.id) ? moment.likes + 1 : moment.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
