'use client';

import { useState, useEffect, useRef } from 'react';
import { Member } from '@/lib/members';

interface Props {
  member: Member;
  onSelect: (id: string) => void;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

export default function MemberCardEnhanced({
  member,
  onSelect,
  isHovered,
  onHoverChange,
}: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(member.id)}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onMouseMove={handleMouseMove}
      className="flex-shrink-0 w-80 cursor-pointer group/card relative"
      style={{ scrollSnapAlign: 'center' }}
    >
      {/* Spotlight effect on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Card Container */}
      <div className="relative h-96 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105">
        {/* Animated background layers */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20 transition-all duration-500 ${
            isHovered ? 'opacity-30' : 'opacity-20'
          }`}
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="rgba(0,0,0,0.5)"/><rect width="100" height="100" fill="url(%23grid)" /></svg>')`,
            animation: isHovered ? 'slideBackground 20s linear infinite' : 'none',
          }}
        />

        {/* Floating particle decorations */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-gradient-to-r ${member.color} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isHovered ? `bg-gradient-to-br ${member.color} blur-3xl` : 'bg-transparent'
          }`}
          style={{
            filter: isHovered ? 'blur(30px)' : 'blur(0px)',
            opacity: isHovered ? 0.15 : 0,
          }}
        />

        {/* Animated border */}
        <div
          className="absolute inset-0 rounded-2xl transition-all duration-500"
          style={{
            border: isHovered ? '2px solid transparent' : '1px solid rgba(139, 92, 246, 0.3)',
            background: isHovered
              ? `linear-gradient(rgba(5, 5, 15, 0.8), rgba(5, 5, 15, 0.8)) padding-box, linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8)) border-box`
              : 'transparent',
            padding: isHovered ? '1px' : '0px',
          }}
        >
          {isHovered && (
            <div className="absolute inset-1 bg-gradient-to-br from-[#05050f] to-[#1a0033] rounded-2xl" />
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${member.color} blur-2xl`}
            style={{ opacity: 0.1 }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <div
            className={`absolute inset-0 bg-gradient-to-tl ${member.color} blur-2xl`}
            style={{ opacity: 0.1 }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-between z-10">
          {/* Top Section */}
          <div className="space-y-4">
            {/* Avatar with animation */}
            <div
              className={`w-24 h-24 rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-lg transition-all duration-500 ${
                isHovered ? 'border-purple-400 shadow-purple-500/50 scale-110' : ''
              }`}
              style={{
                animation: isHovered ? 'pulse-avatar 2s ease-in-out infinite' : 'none',
              }}
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl font-bold relative`}
              >
                {member.name.charAt(0)}
                {isHovered && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-50`}
                    style={{
                      animation: 'shimmer 2s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
            </div>

            {/* Name & Role */}
            <div className="space-y-1">
              <h3
                className={`text-2xl font-bold font-syne text-white transition-all duration-300 ${
                  isHovered ? 'text-3xl' : ''
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`text-sm font-syne font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent transition-all duration-300 ${
                  isHovered ? 'text-base' : ''
                }`}
              >
                {member.role}
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-3">
            {/* Bio */}
            <p className="text-sm text-purple-300 line-clamp-2 transition-all duration-300">
              {member.bio}
            </p>

            {/* Specialties with animation */}
            <div className="flex flex-wrap gap-2">
              {member.specialties.slice(0, 2).map((spec, index) => (
                <span
                  key={spec}
                  className={`px-2 py-1 text-xs rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-all duration-300 ${
                    isHovered ? 'bg-purple-500/40 text-purple-100 border-purple-500/60' : ''
                  }`}
                  style={{
                    transitionDelay: isHovered ? `${index * 50}ms` : '0ms',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Click to view */}
            <div className="pt-2 h-6 overflow-hidden">
              <span
                className={`inline-block text-xs font-syne font-semibold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                Click to view details →
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideBackground {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 100px;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.2;
          }
        }

        @keyframes pulse-avatar {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
