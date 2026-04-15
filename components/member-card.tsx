'use client';

import Image from 'next/image';

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: 'online' | 'idle' | 'offline';
  };
  isSelected?: boolean;
  onClick?: () => void;
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

export default function MemberCard({ member, isSelected, onClick }: MemberCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900'
          : 'hover:ring-2 hover:ring-purple-400 hover:ring-offset-2 hover:ring-offset-slate-900'
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card content */}
      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 h-full flex flex-col items-center text-center">
        {/* Status indicator */}
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${statusColors[member.status]} ring-2 ring-slate-800`} />
        </div>

        {/* Avatar */}
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-purple-500 transition-colors duration-300">
          <Image
            src={member.avatar}
            alt={member.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and role */}
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-sm text-slate-400 mb-3">{member.role}</p>

        {/* Status badge */}
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-700/50 border border-slate-600">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColors[member.status]}`} />
          <span className="text-xs text-slate-300">{statusText[member.status]}</span>
        </div>

        {/* Click indicator */}
        <p className="text-xs text-slate-500 mt-4 group-hover:text-slate-400 transition-colors duration-300">
          Klik untuk detail lengkap
        </p>
      </div>
    </button>
  );
}
