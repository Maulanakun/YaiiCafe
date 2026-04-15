'use client';

import { useState } from 'react';
import MembersList from '@/components/members-list';
import MomentsSection from '@/components/moments-section';
import AvatarsSection from '@/components/avatars-section';

export default function ExplorePage() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-white mb-2">Explore YaiiCafe</h1>
          <p className="text-slate-400">Jelajahi anggota komunitas, moment mabar, dan avatar favorit</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Members Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Member Komunitas</h2>
            <p className="text-slate-400">Klik member untuk melihat detail lengkap mereka</p>
          </div>
          <MembersList selectedMember={selectedMember} onSelectMember={setSelectedMember} />
        </section>

        {/* Moments Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Moment Mabar</h2>
            <p className="text-slate-400">Tangkapan layar dan moment seru dari sesi bermain bersama</p>
          </div>
          <MomentsSection />
        </section>

        {/* Avatars Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Avatar 3D</h2>
            <p className="text-slate-400">Model avatar Roblox dari member komunitas</p>
          </div>
          <AvatarsSection />
        </section>
      </div>
    </main>
  );
}
