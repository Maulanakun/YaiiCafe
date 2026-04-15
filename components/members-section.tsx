'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import MemberDetailModal from './member-detail-modal';

const mockMembers = [
  {
    id: '1',
    name: 'Reza Wijaya',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1535713566aaf00e55a6430fdf62fd0d9c4fae90?w=400&h=400&fit=crop',
    joinedDate: '2023-01-15',
    gamesFavorite: ['Roblox', 'Minecraft'],
    bio: 'Founder dan admin YaiiCafe. Passionate tentang gaming dan komunitas.',
    status: 'online',
  },
  {
    id: '2',
    name: 'Aditya Kusuma',
    role: 'Moderator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    joinedDate: '2023-02-20',
    gamesFavorite: ['Roblox', 'Valorant'],
    bio: 'Moderator YaiiCafe. Suka membantu member baru.',
    status: 'online',
  },
  {
    id: '3',
    name: 'Siti Rahma',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    joinedDate: '2023-03-10',
    gamesFavorite: ['Roblox'],
    bio: 'Pemain Roblox casual. Suka roleplay dan membangun.',
    status: 'idle',
  },
  {
    id: '4',
    name: 'Budi Santoso',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    joinedDate: '2023-04-05',
    gamesFavorite: ['Minecraft', 'Roblox'],
    bio: 'Programmer dan gamer. Suka open-world games.',
    status: 'online',
  },
  {
    id: '5',
    name: 'Dina Putri',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1517070213202-1fab34e91249?w=400&h=400&fit=crop',
    joinedDate: '2023-05-12',
    gamesFavorite: ['Roblox', 'Among Us'],
    bio: 'Content creator muda. Streaming gaming di YouTube.',
    status: 'online',
  },
  {
    id: '6',
    name: 'Eko Prasetya',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    joinedDate: '2023-06-20',
    gamesFavorite: ['Roblox', 'CS:GO'],
    bio: 'Gamers sejati. Kompetitif dan supportive.',
    status: 'offline',
  },
  {
    id: '7',
    name: 'Fathia Zahra',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    joinedDate: '2023-07-08',
    gamesFavorite: ['Roblox', 'Sims 4'],
    bio: 'Fashion enthusiast. Suka customize avatar.',
    status: 'idle',
  },
  {
    id: '8',
    name: 'Ganda Mawardi',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1492562892205-81342ee5ff30?w=400&h=400&fit=crop',
    joinedDate: '2023-08-15',
    gamesFavorite: ['Roblox'],
    bio: 'Casual gamer. Suka quest dan adventure games.',
    status: 'online',
  },
];

export default function MembersSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedMember = mockMembers.find(m => m.id === selectedMemberId);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        .members-container {
          position: relative;
          width: 100%;
          padding: 40px 0;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          position: relative;
          z-index: 2;
        }

        .member-item {
          position: relative;
          cursor: pointer;
          group: hover;
        }

        .member-content {
          position: relative;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(139, 92, 246, 0.2);
          background: rgba(30, 30, 50, 0.3);
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
        }

        .member-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(200, 130, 252, 0.05));
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .member-item:hover .member-content {
          border-color: rgba(139, 92, 246, 0.6);
          background: rgba(30, 30, 50, 0.5);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.25), inset 0 0 30px rgba(139, 92, 246, 0.05);
          transform: translateY(-8px);
        }

        .member-item:hover .member-content::before {
          opacity: 1;
        }

        .member-avatar-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 16px;
          flex-shrink: 0;
        }

        .member-avatar {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid rgba(139, 92, 246, 0.3);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .member-item:hover .member-avatar {
          border-color: rgba(139, 92, 246, 0.8);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          transform: scale(1.08) rotate(2deg);
        }

        .member-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .member-status {
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid rgba(5, 5, 15, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          background: rgba(5, 5, 15, 0.95);
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1); }
        }

        .status-online { color: #10b981; }
        .status-idle { color: #f59e0b; }
        .status-offline { color: #6b7280; }

        .member-info {
          position: relative;
          z-index: 2;
        }

        .member-name {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 4px;
          letter-spacing: -0.01em;
        }

        .member-role {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(139, 92, 246, 0.7);
          margin-bottom: 12px;
        }

        .member-games {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }

        .game-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(124, 58, 237, 0.15);
          color: rgba(139, 92, 246, 0.8);
          font-size: 10px;
          font-family: 'Space Mono', monospace;
          border: 1px solid rgba(139, 92, 246, 0.2);
          transition: all 0.3s ease;
        }

        .member-item:hover .game-badge {
          background: rgba(124, 58, 237, 0.25);
          border-color: rgba(139, 92, 246, 0.4);
        }

        .member-click-hint {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          font-family: 'Space Mono', monospace;
          opacity: 0;
          transition: opacity 0.4s ease;
          margin-top: 8px;
        }

        .member-item:hover .member-click-hint {
          opacity: 1;
        }

        .glow-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
          width: 100%;
          opacity: 0;
          transition: opacity 0.4s ease;
          top: 0;
          left: 0;
        }

        .member-item:hover .glow-line {
          opacity: 1;
          animation: glowPulse 1s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .member-item:nth-child(1) { animation: slideIn 0.5s ease 0s forwards; }
        .member-item:nth-child(2) { animation: slideIn 0.5s ease 0.1s forwards; }
        .member-item:nth-child(3) { animation: slideIn 0.5s ease 0.2s forwards; }
        .member-item:nth-child(4) { animation: slideIn 0.5s ease 0.3s forwards; }
        .member-item:nth-child(5) { animation: slideIn 0.5s ease 0.4s forwards; }
        .member-item:nth-child(6) { animation: slideIn 0.5s ease 0.5s forwards; }
        .member-item:nth-child(7) { animation: slideIn 0.5s ease 0.6s forwards; }
        .member-item:nth-child(8) { animation: slideIn 0.5s ease 0.7s forwards; }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="members-container" ref={containerRef}>
        <div className="members-grid">
          {mockMembers.map((member) => (
            <div
              key={member.id}
              className="member-item"
              onClick={() => setSelectedMemberId(member.id)}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="member-content">
                <div className="glow-line" />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <div className="member-avatar-wrapper">
                    <div className="member-avatar">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={80}
                        height={80}
                        priority
                      />
                    </div>
                    <div className={`member-status status-${member.status}`}>
                      {member.status === 'online' && '●'}
                      {member.status === 'idle' && '◐'}
                      {member.status === 'offline' && '○'}
                    </div>
                  </div>
                  <div className="member-info" style={{ flex: 1 }}>
                    <div className="member-name">{member.name}</div>
                    <div className="member-role">{member.role}</div>
                  </div>
                </div>
                
                <div className="member-games">
                  {member.gamesFavorite.map((game) => (
                    <span key={game} className="game-badge">
                      {game}
                    </span>
                  ))}
                </div>
                
                <div className="member-click-hint">
                  Klik untuk melihat detail →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMemberId(null)}
        />
      )}
    </>
  );
}
