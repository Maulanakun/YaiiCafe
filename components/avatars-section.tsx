'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AvatarViewer from './avatar-viewer';

const mockAvatars = [
  {
    id: '1',
    memberName: 'Reza Wijaya',
    avatarName: 'Royal Knight',
    modelUrl: '/avatars/knight.glb',
    thumbnail: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop',
    description: 'Avatar premium dengan costume knight yang elegan',
  },
  {
    id: '2',
    memberName: 'Aditya Kusuma',
    avatarName: 'Galaxy Explorer',
    modelUrl: '/avatars/explorer.glb',
    thumbnail: 'https://images.unsplash.com/photo-1511715282099-6a88e0a4ec1c?w=400&h=400&fit=crop',
    description: 'Avatar futuristik dengan tema space explorer',
  },
  {
    id: '3',
    memberName: 'Siti Rahma',
    avatarName: 'Fairy Princess',
    modelUrl: '/avatars/princess.glb',
    thumbnail: 'https://images.unsplash.com/photo-1524046115990-6a48dc0da17f?w=400&h=400&fit=crop',
    description: 'Avatar cantik dengan tema fairy tale',
  },
  {
    id: '4',
    memberName: 'Budi Santoso',
    avatarName: 'Tech Geek',
    modelUrl: '/avatars/geek.glb',
    thumbnail: 'https://images.unsplash.com/photo-1508700295703-52671f50a94a?w=400&h=400&fit=crop',
    description: 'Avatar dengan costume developer profesional',
  },
  {
    id: '5',
    memberName: 'Dina Putri',
    avatarName: 'Pop Star',
    modelUrl: '/avatars/popstar.glb',
    thumbnail: 'https://images.unsplash.com/photo-1488426862026-56bde33da037?w=400&h=400&fit=crop',
    description: 'Avatar dengan costume artis pop terpopuler',
  },
  {
    id: '6',
    memberName: 'Eko Prasetya',
    avatarName: 'Cyber Ninja',
    modelUrl: '/avatars/ninja.glb',
    thumbnail: 'https://images.unsplash.com/photo-1518611505868-48abc8a8d084?w=400&h=400&fit=crop',
    description: 'Avatar dengan costume ninja futuristik',
  },
];

export default function AvatarsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex((index + mockAvatars.length) % mockAvatars.length);
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  const getVisibleAvatars = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      visible.push(mockAvatars[(currentIndex + i + mockAvatars.length) % mockAvatars.length]);
    }
    return visible;
  };

  const visibleAvatars = getVisibleAvatars();

  return (
    <>
      <style>{`
        .avatars-carousel-container {
          position: relative;
          width: 100%;
          margin-bottom: 60px;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 40px 20px;
          perspective: 1000px;
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.1);
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 20;
        }

        .carousel-btn:hover {
          background: rgba(139, 92, 246, 0.25);
          border-color: rgba(139, 92, 246, 0.5);
          color: #fff;
        }

        .carousel-btn.prev {
          left: 0;
        }

        .carousel-btn.next {
          right: 0;
        }

        .carousel-track {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          flex: 1;
          max-width: 1000px;
        }

        .avatar-slide {
          position: relative;
          width: 240px;
          height: 380px;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0.4;
          transform: scale(0.85) translateZ(-50px);
          cursor: pointer;
        }

        .avatar-slide.center {
          opacity: 1;
          transform: scale(1) translateZ(0);
          z-index: 10;
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
        }

        .avatar-slide-image {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(200, 130, 252, 0.1) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          overflow: hidden;
        }

        .avatar-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .avatar-slide.center:hover img {
          transform: scale(1.1);
        }

        .avatar-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 5;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
        }

        .avatar-slide.center .avatar-overlay {
          opacity: 1;
        }

        .avatar-info-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .avatar-info-member {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(200, 130, 252, 0.9);
          margin-bottom: 12px;
        }

        .avatar-description {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .avatar-view-btn {
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(139, 92, 246, 0.3);
          border: 1px solid rgba(139, 92, 246, 0.5);
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
        }

        .avatar-view-btn:hover {
          background: rgba(139, 92, 246, 0.5);
          border-color: rgba(139, 92, 246, 0.8);
          color: #fff;
        }

        .carousel-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: rgba(139, 92, 246, 0.8);
          border-color: rgba(139, 92, 246, 1);
          width: 24px;
          border-radius: 4px;
        }

        .indicator:hover {
          background: rgba(139, 92, 246, 0.4);
        }
      `}</style>

      <div className="avatars-carousel-container">
        <div className="carousel-wrapper">
          <button className="carousel-btn prev" onClick={prevSlide}>
            <ChevronLeft size={20} />
          </button>

          <div className="carousel-track">
            {visibleAvatars.map((avatar, index) => (
              <div
                key={avatar.id}
                className={`avatar-slide ${index === 1 ? 'center' : ''}`}
                onClick={() => {
                  if (index === 1) {
                    setSelectedAvatar(avatar.id);
                  } else if (index === 0) {
                    prevSlide();
                  } else {
                    nextSlide();
                  }
                }}
              >
                <div className="avatar-slide-image">
                  <Image
                    src={avatar.thumbnail}
                    alt={avatar.avatarName}
                    fill
                    className="avatar-image"
                    sizes="240px"
                  />
                  <div className="avatar-overlay">
                    <h3 className="avatar-info-title">{avatar.avatarName}</h3>
                    <p className="avatar-info-member">{avatar.memberName}</p>
                    <p className="avatar-description">{avatar.description}</p>
                    <button className="avatar-view-btn">View 3D</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="carousel-indicators">
          {mockAvatars.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {selectedAvatar && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedAvatar(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90vh',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAvatar(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                zIndex: 10,
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              ✕
            </button>
            <AvatarViewer avatarId={selectedAvatar} />
          </div>
        </div>
      )}
    </>
  );
}
