'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

interface MemberDetailModalProps {
  member: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    joinedDate: string;
    gamesFavorite: string[];
    bio: string;
    status: 'online' | 'idle' | 'offline';
  };
  onClose: () => void;
}

const statusColors = {
  online: '#10b981',
  idle: '#f59e0b',
  offline: '#6b7280',
};

const statusText = {
  online: 'Online',
  idle: 'Idle',
  offline: 'Offline',
};

export default function MemberDetailModal({ member, onClose }: MemberDetailModalProps) {
  const joinedDate = new Date(member.joinedDate).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <style>{`
        .member-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 40;
          animation: backdropFade 0.3s ease;
        }

        @keyframes backdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .member-modal {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .member-modal-content {
          background: linear-gradient(135deg, rgba(30, 30, 50, 0.9) 0%, rgba(20, 20, 40, 0.9) 100%);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 20px;
          max-width: 420px;
          width: 100%;
          overflow: hidden;
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 20px 60px rgba(124, 58, 237, 0.2);
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(200, 130, 252, 0.1) 100%);
          padding: 24px;
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
          position: relative;
        }

        .modal-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .modal-body {
          padding: 32px 24px 24px;
          position: relative;
        }

        .member-avatar-large {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 20px;
          border-radius: 14px;
          overflow: hidden;
          border: 3px solid rgba(139, 92, 246, 0.4);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
        }

        .member-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .member-status-indicator {
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 4px solid rgba(20, 20, 40, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .modal-name {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          text-align: center;
          margin-bottom: 6px;
        }

        .modal-role {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(139, 92, 246, 0.8);
          text-align: center;
          margin-bottom: 16px;
        }

        .modal-bio {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          line-height: 1.5;
          margin-bottom: 20px;
          padding: 12px 0;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
          border-bottom: 1px solid rgba(139, 92, 246, 0.2);
        }

        .modal-info {
          margin-bottom: 20px;
        }

        .modal-info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          font-size: 12px;
        }

        .modal-info-label {
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.05em;
        }

        .modal-info-value {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .modal-games {
          margin-bottom: 20px;
        }

        .modal-games-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 10px;
        }

        .modal-games-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .game-tag {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.15);
          color: rgba(139, 92, 246, 0.9);
          border: 1px solid rgba(139, 92, 246, 0.3);
          font-size: 11px;
          font-family: 'Space Mono', monospace;
          transition: all 0.3s ease;
        }

        .game-tag:hover {
          background: rgba(124, 58, 237, 0.25);
          border-color: rgba(139, 92, 246, 0.5);
        }

        .modal-footer {
          padding-top: 16px;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
          display: flex;
          gap: 8px;
        }

        .modal-btn {
          flex: 1;
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-btn-close {
          background: rgba(139, 92, 246, 0.15);
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        .modal-btn-close:hover {
          background: rgba(139, 92, 246, 0.25);
          color: #fff;
          border-color: rgba(139, 92, 246, 0.5);
        }
      `}</style>

      {/* Backdrop */}
      <div className="member-modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="member-modal">
        <div className="member-modal-content">
          <div className="modal-header">
            <button onClick={onClose} className="modal-close-btn">
              <X size={16} />
            </button>
          </div>

          <div className="modal-body">
            <div className="member-avatar-large">
              <Image
                src={member.avatar}
                alt={member.name}
                width={100}
                height={100}
                className="member-avatar-img"
              />
              <div
                className="member-status-indicator"
                style={{ backgroundColor: statusColors[member.status] }}
              >
                {member.status === 'online' && '●'}
                {member.status === 'idle' && '◐'}
                {member.status === 'offline' && '○'}
              </div>
            </div>

            <h2 className="modal-name">{member.name}</h2>
            <p className="modal-role">{member.role}</p>

            <p className="modal-bio">&ldquo;{member.bio}&rdquo;</p>

            <div className="modal-info">
              <div className="modal-info-row">
                <span className="modal-info-label">Status</span>
                <span className="modal-info-value">{statusText[member.status]}</span>
              </div>
              <div className="modal-info-row">
                <span className="modal-info-label">Bergabung</span>
                <span className="modal-info-value">{joinedDate}</span>
              </div>
            </div>

            <div className="modal-games">
              <p className="modal-games-label">Game Favorit</p>
              <div className="modal-games-list">
                {member.gamesFavorite.map((game) => (
                  <span key={game} className="game-tag">
                    {game}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={onClose}
                className="modal-btn modal-btn-close"
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
