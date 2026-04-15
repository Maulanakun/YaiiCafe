'use client';

import { useState, useRef, useEffect } from 'react';
import { members } from '@/lib/members';
import MemberDetailModal from './member-detail-modal';

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
    <div className="w-full space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold font-syne text-white">Meet the Team</h2>
        <p className="text-purple-300">Our dedicated members making YaiiCafe amazing</p>
      </div>

      {/* Carousel */}
      <div className="relative group">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#05050f] to-transparent px-6 py-3 text-purple-400 hover:text-purple-200 transition-colors duration-300"
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
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
          }}
        >
          {members.map((member) => (
            <div
              key={member.id}
              onClick={() => handleMemberClick(member.id)}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
              className="flex-shrink-0 w-80 cursor-pointer group/card"
              style={{ scrollSnapAlign: 'center' }}
            >
              {/* Card */}
              <div className="relative h-96 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105">
                {/* Background Image Placeholder with gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20 transition-opacity duration-500`}
                  style={{
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="rgba(0,0,0,0.5)"/><rect width="100" height="100" fill="url(%23grid)" /></svg>')`,
                  }}
                />

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 ${
                    hoveredMember === member.id
                      ? `bg-gradient-to-br ${member.color} blur-3xl`
                      : 'bg-transparent'
                  }`}
                  style={{
                    filter: hoveredMember === member.id ? 'blur(30px)' : 'blur(0px)',
                    opacity: hoveredMember === member.id ? 0.15 : 0,
                  }}
                />

                {/* Border */}
                <div
                  className={`absolute inset-0 border rounded-2xl transition-all duration-500 ${
                    hoveredMember === member.id
                      ? `border-transparent bg-gradient-to-br ${member.color}`
                      : 'border-purple-500/30'
                  }`}
                  style={{
                    background:
                      hoveredMember === member.id
                        ? `linear-gradient(${member.color})`
                        : 'transparent',
                    padding: hoveredMember === member.id ? '2px' : '0px',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#05050f] to-[#1a0033] rounded-2xl" />
                </div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                  {/* Top Section */}
                  <div className="space-y-4">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-lg">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl font-bold`}
                      >
                        {member.name.charAt(0)}
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold font-syne text-white">{member.name}</h3>
                      <p className={`text-sm font-syne font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-3">
                    {/* Bio */}
                    <p className="text-sm text-purple-300 line-clamp-2">{member.bio}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 text-xs rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Click to view */}
                    <div className="pt-2">
                      <span className="inline-block text-xs font-syne font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        Click to view details →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-[#05050f] to-transparent px-6 py-3 text-purple-400 hover:text-purple-200 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberDetailModal
          member={members.find((m) => m.id === selectedMember)!}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
