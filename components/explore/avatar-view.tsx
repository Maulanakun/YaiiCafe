'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Avatar3DScene = dynamic(() => import('./avatar-3d-scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500/50 border-t-purple-500 mx-auto animate-spin" />
        <p className="text-purple-300">Loading 3D Avatar...</p>
      </div>
    </div>
  ),
});

const avatars = [
  {
    id: '1',
    name: 'Maulana Avatar',
    description: 'The founder\'s signature look',
    color: 'from-purple-500 to-pink-500',
    glbUrl: '/dayat.glb', // <-- path ke file GLB
  },
  {
    id: '2',
    name: 'Cafe Manager Avatar',
    description: 'Friendly and welcoming',
    color: 'from-cyan-500 to-blue-500',
    glbUrl: '/ucy (1).glb',
  },
  // ... dst
];

export default function AvatarView() {
  const [selectedAvatar, setSelectedAvatar] = useState('1');

  return (
    <div className="w-full space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold font-syne text-white">3D Avatar Gallery</h2>
        <p className="text-purple-300">View our team members' Roblox avatars in 3D</p>
      </div>

      {/* Main Display */}
      <div className="rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#05050f] to-[#1a0033] p-8">
      <Avatar3DScene glbUrl={avatars.find(a => a.id === selectedAvatar)?.glbUrl ?? ''} />      </div>

      {/* Selected Avatar Info */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold font-syne text-white">
          {avatars.find((a) => a.id === selectedAvatar)?.name}
        </h3>
        <p className="text-purple-300">
          {avatars.find((a) => a.id === selectedAvatar)?.description}
        </p>
      </div>

      {/* Avatar Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {avatars.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar.id)}
            className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 p-4 text-center space-y-2 ${
              selectedAvatar === avatar.id
                ? `border-purple-500 bg-gradient-to-br ${avatar.color} shadow-lg shadow-purple-500/30`
                : 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/60 hover:bg-purple-500/10'
            }`}
          >
            {/* Avatar Indicator */}
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                selectedAvatar === avatar.id
                  ? `bg-gradient-to-br ${avatar.color} text-white shadow-lg`
                  : `bg-gradient-to-br ${avatar.color} opacity-60 group-hover:opacity-100`
              }`}
            >
              {avatar.name.charAt(0)}
            </div>

            {/* Name */}
            <p className={`text-sm font-syne font-semibold truncate ${
              selectedAvatar === avatar.id ? 'text-white' : 'text-purple-300 group-hover:text-purple-200'
            }`}>
              {avatar.name.split(' ')[0]}
            </p>

            {/* Active Indicator */}
            {selectedAvatar === avatar.id && (
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Info Section */}
      <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6 text-center">
        <p className="text-purple-200">
          Click on an avatar to see their 3D Roblox character. Use your mouse to rotate and explore!
        </p>
      </div>
    </div>
  );
}
