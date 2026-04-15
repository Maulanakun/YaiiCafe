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

export default function MembersSection() {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const selectedMember = mockMembers.find(m => m.id === selectedMemberId);

  return (
    <>
      <style>{`
        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }

        .member-item {
          position: relative;
          cursor: pointer;
          animation: slideUp 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .member-item:nth-child(1) { animation-delay: 0.05s; }
        .member-item:nth-child(2) { animation-delay: 0.1s; }
        .member-item:nth-child(3) { animation-delay: 0.15s; }
        .member-item:nth-child(4) { animation-delay: 0.2s; }
        .member-item:nth-child(5) { animation-delay: 0.25s; }
        .member-item:nth-child(6) { animation-delay: 0.3s; }
        .member-item:nth-child(7) { animation-delay: 0.35s; }
        .member-item:nth-child(8) { animation-delay: 0.4s; }

        .member-item::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(200, 130, 252, 0.2));
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          blur: blur(10px);
        }

        .member-item:hover::before {
          opacity: 1;
        }

        .member-inner {
          position: relative;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .member-item:hover .member-inner {
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.05);
          transform: translateY(-6px);
        }

        .member-avatar-container {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 16px;
          margin-bottom: 20px;
        }

        .member-avatar {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .member-item:hover .member-avatar {
          transform: scale(1.05);
        }

        .member-status-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid rgba(5, 5, 15, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .member-status-badge.online {
          background: #10b981;
        }

        .member-status-badge.idle {
          background: #f59e0b;
        }

        .member-status-badge.offline {
          background: #6b7280;
        }

        .member-name {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          text-align: center;
          margin-bottom: 4px;
        }

        .member-role {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(139, 92, 246, 0.7);
          text-align: center;
          margin-bottom: 16px;
        }

        .member-games {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
          justify-content: center;
        }

        .game-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(124, 58, 237, 0.15);
          color: rgba(139, 92, 246, 0.9);
          font-size: 10px;
          font-family: 'Space Mono', monospace;
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .member-item:hover .game-badge {
          background: rgba(124, 58, 237, 0.25);
          border-color: rgba(139, 92, 246, 0.4);
        }

        .member-joined {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.3);
          text-align: center;
          font-family: 'Space Mono', monospace;
        }

        .member-action-hint {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(139, 92, 246, 0.6);
          font-size: 14px;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .member-item:hover .member-action-hint {
          opacity: 1;
          background: rgba(124, 58, 237, 0.2);
        }
      `}</style>

      <div className="members-grid">
        {mockMembers.map((member) => (
          <div
            key={member.id}
            className="member-item"
            onClick={() => setSelectedMemberId(member.id)}
          >
            <div className="member-inner">
              <div className="member-action-hint">→</div>
              <div className="member-avatar-container">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="member-avatar"
                />
                <div className={`member-status-badge ${member.status}`}>
                  {member.status === 'online' && '●'}
                  {member.status === 'idle' && '◐'}
                  {member.status === 'offline' && '○'}
                </div>
              </div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <div className="member-games">
                {member.gamesFavorite.map((game) => (
                  <span key={game} className="game-badge">
                    {game}
                  </span>
                ))}
              </div>
              <p className="member-joined">Joined {member.joinedDate}</p>
            </div>
          </div>
        ))}
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
