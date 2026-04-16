'use client';

import { useState } from 'react';
import MemberListView from '@/components/explore/member-list-view';
import MomentsView from '@/components/explore/moments-view';
import AvatarView from '@/components/explore/avatar-view';
import BackButton from '@/components/explore/back-button';
import Explore3DBackground from '@/components/explore/explore-3d-background';

export default function ExplorePage() {
  const [activeSection, setActiveSection] = useState<'members' | 'moments' | 'avatars'>('members');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050f] via-[#1a0033] to-[#05050f] text-white overflow-hidden relative">
      {/* 3D Background */}
      <Explore3DBackground />
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-purple-500/20 bg-[#05050f]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <BackButton />
          <h1 className="text-2xl font-bold font-syne bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            YaiiCafe Members
          </h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-12">
        {/* Section Tabs */}
        <div className="fixed top-20 left-0 right-0 z-40 border-b border-purple-500/20 bg-[#05050f]/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex gap-4">
            {[
              { id: 'members', label: 'Members' },
              { id: 'moments', label: 'Moments' },
              { id: 'avatars', label: '3D Avatars' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id as any);
                  setSelectedMember(null);
                }}
                className={`px-4 py-2 rounded-lg font-syne font-semibold transition-all duration-300 ${
                  activeSection === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                    : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-4 pt-20">
          {!selectedMember ? (
            <>
              {activeSection === 'members' && <MemberListView onSelectMember={setSelectedMember} />}
              {activeSection === 'moments' && <MomentsView />}
              {activeSection === 'avatars' && <AvatarView />}
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <p className="text-purple-300">Loading member details...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
