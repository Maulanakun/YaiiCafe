'use client';

import { useEffect, useState } from 'react';
import { Member } from '@/lib/members';
import { X } from 'lucide-react';

interface Props {
  member: Member;
  onClose: () => void;
}

export default function MemberDetailModal({ member, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`relative w-full max-w-2xl rounded-3xl overflow-hidden transition-all duration-300 transform ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Background with gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-10`}
            style={{
              animation: isOpen ? 'pulse 4s ease-in-out infinite' : 'none',
            }}
          />

          {/* Border with gradient */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-clip-padding" style={{
            borderImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5), rgba(139, 92, 246, 0.5)) 1`,
          }} />

          {/* Content */}
          <div className="relative bg-gradient-to-br from-[#05050f] via-[#1a0033] to-[#05050f] p-8 md:p-12">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-purple-500/20 transition-colors duration-300 text-purple-400 hover:text-purple-200"
            >
              <X size={24} />
            </button>

            {/* Header Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Left: Avatar and Basic Info */}
              <div className="md:col-span-1">
                <div className="space-y-4">
                  {/* Large Avatar */}
                  <div className={`w-full aspect-square rounded-2xl overflow-hidden border-3 border-purple-500/50 shadow-2xl shadow-purple-500/20 bg-gradient-to-br ${member.color} flex items-center justify-center text-6xl font-bold`}>
                    {member.name.charAt(0)}
                  </div>

                  {/* Join Date */}
                  <div className="text-center space-y-1">
                    <p className="text-sm text-purple-400">Member Since</p>
                    <p className="text-lg font-syne font-semibold text-white">
                      {new Date(member.joinDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle: Name, Role, Bio */}
              <div className="md:col-span-2 space-y-6">
                {/* Name & Role */}
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-syne text-white">{member.name}</h1>
                  <p className={`text-xl font-syne font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <h3 className="text-sm font-syne font-semibold text-purple-300 uppercase">About</h3>
                  <p className="text-base text-purple-200 leading-relaxed">{member.bio}</p>
                </div>

                {/* Roblox Username */}
                {member.robloxUsername && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-syne font-semibold text-purple-300 uppercase">Roblox Profile</h3>
                    <div className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 inline-block">
                      <p className="text-white font-semibold">@{member.robloxUsername}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-8" />

            {/* Details Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Specialties */}
              <div className="space-y-4">
                <h3 className="text-lg font-syne font-bold text-white">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((spec, index) => (
                    <div
                      key={spec}
                      className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${member.color} opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer group relative`}
                      style={{
                        animation: `slideInSpec 0.5s ease-out ${index * 0.1}s backwards`,
                      }}
                    >
                      {spec}
                      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {member.achievements && (
                <div className="space-y-4">
                  <h3 className="text-lg font-syne font-bold text-white">Achievements</h3>
                  <div className="space-y-2">
                    {member.achievements.map((achievement) => (
                      <div key={achievement} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <span className="text-lg">⭐</span>
                        <span className="text-purple-200">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 10%; }
          50% { opacity: 20%; }
        }

        @keyframes slideInSpec {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmerBg {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </>
  );
}
