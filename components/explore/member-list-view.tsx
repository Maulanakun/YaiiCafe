'use client';

import { useState, useRef, useEffect } from 'react';
import { members } from '@/lib/members';
import MemberDetailModal from './member-detail-modal';
import MemberCardEnhanced from './member-card-enhanced';

interface Props {
  onSelectMember: (memberId: string) => void;
}

export default function MemberListView({ onSelectMember }: Props) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const checkScroll = () => {
    if (containerRef.current) {
      setCanScrollLeft(containerRef.current.scrollLeft > 0);
      setCanScrollRight(
        containerRef.current.scrollLeft < containerRef.current.scrollWidth - containerRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 400;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

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

      {/* Carousel with enhanced styling */}
      <div className="relative group">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#05050f] via-purple-500/10 to-transparent px-6 py-3 text-purple-400 hover:text-purple-200 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 rounded-r-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Member Carousel */}
        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-6 px-4"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
          }}
        >
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

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-[#05050f] via-purple-500/10 to-transparent px-6 py-3 text-purple-400 hover:text-purple-200 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 rounded-l-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
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
