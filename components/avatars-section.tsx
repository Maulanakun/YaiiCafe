'use client';

import { useState } from 'react';
import Image from 'next/image';
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
    avatarName: 'Casual Gamer',
    modelUrl: '/avatars/casual.glb',
    thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c006ae49?w=400&h=400&fit=crop',
    description: 'Avatar casual tapi stylish untuk daily gaming',
  },
];

export default function AvatarsSection() {
  const [selectedAvatar, setSelectedAvatar] = useState<typeof mockAvatars[0] | null>(null);

  return (
    <>
      <style>{`
        .avatars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }

        .avatar-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          animation: fadeInScale 0.5s ease forwards;
          opacity: 0;
          height: 360px;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .avatar-item:nth-child(1) { animation-delay: 0.05s; }
        .avatar-item:nth-child(2) { animation-delay: 0.1s; }
        .avatar-item:nth-child(3) { animation-delay: 0.15s; }
        .avatar-item:nth-child(4) { animation-delay: 0.2s; }
        .avatar-item:nth-child(5) { animation-delay: 0.25s; }
        .avatar-item:nth-child(6) { animation-delay: 0.3s; }

        .avatar-thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .avatar-item:hover .avatar-thumbnail {
          transform: scale(1.12) rotate(2deg);
        }

        .avatar-content {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.9) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .avatar-item:hover .avatar-content {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.95) 100%);
        }

        .avatar-member {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(139, 92, 246, 0.8);
          margin-bottom: 6px;
        }

        .avatar-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .avatar-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 16px;
          line-height: 1.4;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .avatar-item:hover .avatar-desc {
          opacity: 1;
        }

        .avatar-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: rgba(255, 255, 255, 0.8);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
        }

        .avatar-item:hover .avatar-action {
          opacity: 1;
          transform: translateY(0);
          background: rgba(124, 58, 237, 0.35);
          border-color: rgba(139, 92, 246, 0.6);
        }

        .avatar-action:hover {
          background: rgba(124, 58, 237, 0.5);
          border-color: rgba(139, 92, 246, 0.8);
          transform: translateY(-2px);
        }

        .avatar-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .avatar-item:hover .avatar-badge {
          opacity: 1;
        }
      `}</style>

      <div className="avatars-grid">
        {mockAvatars.map((avatar) => (
          <div key={avatar.id} className="avatar-item" onClick={() => setSelectedAvatar(avatar)}>
            <Image
              src={avatar.thumbnail}
              alt={avatar.avatarName}
              width={400}
              height={400}
              className="avatar-thumbnail"
            />

            <div className="avatar-badge">3D Model</div>

            <div className="avatar-content">
              <p className="avatar-member">{avatar.memberName}</p>
              <h3 className="avatar-name">{avatar.avatarName}</h3>
              <p className="avatar-desc">{avatar.description}</p>
              <button className="avatar-action">View 3D →</button>
            </div>
          </div>
        ))}
      </div>

      {selectedAvatar && (
        <AvatarViewer avatar={selectedAvatar} onClose={() => setSelectedAvatar(null)} />
      )}
    </>
  );
}
