'use client';

import { useState } from 'react';
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

const statusEmoji = {
  online: '●',
  idle: '◐',
  offline: '○',
};

export default function MembersSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectedMember = mockMembers.find(m => m.id === selectedMemberId);

  return (
    <>
      <style>{`
        .members-bubble-container {
          position: relative;
          width: 100%;
          min-height: 600px;
          margin-bottom: 60px;
          perspective: 1000px;
        }

        .members-orbit {
          position: relative;
          width: 100%;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .member-bubble {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          animation: bubbleFloat 0.8s ease forwards;
        }

        @keyframes bubbleFloat {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .member-bubble:nth-child(1) { animation-delay: 0.1s; }
        .member-bubble:nth-child(2) { animation-delay: 0.2s; }
        .member-bubble:nth-child(3) { animation-delay: 0.3s; }
        .member-bubble:nth-child(4) { animation-delay: 0.4s; }
        .member-bubble:nth-child(5) { animation-delay: 0.5s; }
        .member-bubble:nth-child(6) { animation-delay: 0.6s; }
        .member-bubble:nth-child(7) { animation-delay: 0.7s; }
        .member-bubble:nth-child(8) { animation-delay: 0.8s; }

        .bubble-avatar {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(139, 92, 246, 0.4);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(200, 130, 252, 0.1));
        }

        .member-bubble:hover .bubble-avatar {
          width: 120px;
          height: 120px;
          border-color: rgba(139, 92, 246, 0.8);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.15);
          filter: brightness(1.1);
        }

        .bubble-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .bubble-status {
          position: absolute;
          bottom: -8px;
          right: -8px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid rgba(5, 5, 15, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          background: rgba(5, 5, 15, 0.9);
        }

        .status-online { color: #10b981; }
        .status-idle { color: #f59e0b; }
        .status-offline { color: #6b7280; }

        .bubble-info {
          text-align: center;
          margin-top: 16px;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: translateY(10px);
        }

        .member-bubble:hover .bubble-info {
          opacity: 1;
          transform: translateY(0);
        }

        .bubble-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .bubble-role {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(139, 92, 246, 0.8);
        }

        .member-bubble.hovered {
          z-index: 50;
        }
      `}</style>

      <div className="members-bubble-container">
        <div className="members-orbit">
          {mockMembers.map((member, index) => {
            const totalMembers = mockMembers.length;
            const angle = (index / totalMembers) * Math.PI * 2;
            const radius = 180;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={member.id}
                className={`member-bubble ${hoveredId === member.id ? 'hovered' : ''}`}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  left: '50%',
                  top: '50%',
                }}
                onClick={() => setSelectedMemberId(member.id)}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="bubble-avatar">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={120}
                    height={120}
                    priority
                  />
                  <div className={`bubble-status status-${member.status}`}>
                    {statusEmoji[member.status as keyof typeof statusEmoji]}
                  </div>
                </div>
                <div className="bubble-info">
                  <div className="bubble-name">{member.name}</div>
                  <div className="bubble-role">{member.role}</div>
                </div>
              </div>
            );
          })}
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
