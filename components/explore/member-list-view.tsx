'use client';

import { useState } from 'react';
import { members } from '@/lib/members';
import MemberDetailModal from './member-detail-modal';
import MemberCardEnhanced from './member-card-enhanced';

interface Props {
  onSelectMember: (memberId: string) => void;
}

export default function MemberListView({ onSelectMember }: Props) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const handleMemberClick = (memberId: string) => {
    setSelectedMember(memberId);
  };

  return (
    <div className="w-full space-y-12">
      {/* Title Section with enhanced styling */}
      <div className="text-center space-y-4">
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000" />
          <h2 className="relative text-5xl font-bold font-syne text-white bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Meet the Team
          </h2>
        </div>
        <p className="text-lg text-purple-300 font-syne">Our dedicated members making YaiiCafe amazing</p>
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Members Grid with Responsive Scroll */}
      <div className="relative">
        {/* Desktop Grid / Mobile Horizontal Scroll */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div
              key={member.id}
              style={{
                animation: `slideIn 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >
              <MemberCardEnhanced
                member={member}
                onSelect={handleMemberClick}
                isHovered={hoveredMember === member.id}
                onHoverChange={(hovered) =>
                  setHoveredMember(hovered ? member.id : null)
                }
              />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="lg:hidden flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="flex-shrink-0 w-80 snap-center"
              style={{
                animation: `slideIn 0.6s ease-out ${index * 0.1}s backwards`,
              }}
            >
              <MemberCardEnhanced
                member={member}
                onSelect={handleMemberClick}
                isHovered={hoveredMember === member.id}
                onHoverChange={(hovered) =>
                  setHoveredMember(hovered ? member.id : null)
                }
              />
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 left-1/4 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute -bottom-40 right-1/4 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberDetailModal
          member={members.find((m) => m.id === selectedMember)!}
          onClose={() => setSelectedMember(null)}
        />
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
