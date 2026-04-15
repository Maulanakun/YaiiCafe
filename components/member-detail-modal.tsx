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
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  offline: 'bg-slate-500',
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="relative h-24 bg-gradient-to-r from-purple-600 to-purple-400">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-12 mb-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ${statusColors[member.status]} ring-2 ring-slate-800`} />
              </div>
            </div>

            {/* Name and role */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-1">{member.name}</h2>
              <p className="text-purple-400 font-semibold mb-1">{member.role}</p>
              <p className="text-sm text-slate-400">{statusText[member.status]}</p>
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-sm text-center mb-6 leading-relaxed">
              &ldquo;{member.bio}&rdquo;
            </p>

            {/* Info Grid */}
            <div className="space-y-4 mb-6">
              {/* Joined Date */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Bergabung
                </p>
                <p className="text-slate-200">{joinedDate}</p>
              </div>

              {/* Games */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Game Favorit
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.gamesFavorite.map((game) => (
                    <span
                      key={game}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-sm text-purple-300"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300">
                DM
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors duration-300"
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
