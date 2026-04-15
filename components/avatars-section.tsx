'use client';

import { useState } from 'react';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAvatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar)}
            className="group rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          >
            {/* Thumbnail */}
            <div className="relative h-56 overflow-hidden bg-slate-700">
              <img
                src={avatar.thumbnail}
                alt={avatar.avatarName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Member name */}
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                {avatar.memberName}
              </p>

              {/* Avatar name */}
              <h3 className="text-xl font-bold text-white mb-2">
                {avatar.avatarName}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                {avatar.description}
              </p>

              {/* View button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAvatar(avatar);
                }}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Lihat 3D Model
              </button>
            </div>
          </button>
        ))}
      </div>

      {/* Avatar Viewer Modal */}
      {selectedAvatar && (
        <AvatarViewer
          avatar={selectedAvatar}
          onClose={() => setSelectedAvatar(null)}
        />
      )}
    </>
  );
}
