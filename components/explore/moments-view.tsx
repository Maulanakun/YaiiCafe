'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface Moment {
  id: string;
  author: string;
  avatar: string;
  color: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const moments: Moment[] = [
  {
    id: '1',
    author: 'Maulana',
    avatar: 'M',
    color: 'from-purple-500 to-pink-500',
    content: 'Just shipped a new 3D feature! The community feedback has been incredible. Thank you all for the support! 🚀',
    timestamp: '2 hours ago',
    likes: 234,
    comments: 45,
  },
  {
    id: '2',
    author: 'Cafe Manager',
    avatar: 'C',
    color: 'from-cyan-500 to-blue-500',
    content: 'YaiiCafe community event was a huge success! 200+ members participated. Can\'t wait for the next one! 🎉',
    timestamp: '4 hours ago',
    likes: 567,
    comments: 89,
  },
  {
    id: '3',
    author: 'Dev Assistant',
    avatar: 'D',
    color: 'from-green-500 to-emerald-500',
    content: 'Database optimization is complete! We\'ve improved query performance by 60%. Smooth sailing ahead! ⚡',
    timestamp: '6 hours ago',
    likes: 345,
    comments: 67,
  },
  {
    id: '4',
    author: 'Designer Pro',
    avatar: 'D',
    color: 'from-orange-500 to-red-500',
    content: 'Unveiling the new UI redesign next week. The team worked so hard on this. Excited to share it with you all! 🎨',
    timestamp: '1 day ago',
    likes: 456,
    comments: 92,
  },
  {
    id: '5',
    author: 'Community Lead',
    avatar: 'C',
    color: 'from-indigo-500 to-purple-500',
    content: 'Welcome to our 1000+ new members this week! We\'re growing so fast. The community spirit is amazing! 💜',
    timestamp: '1 day ago',
    likes: 789,
    comments: 156,
  },
];

export default function MomentsView() {
  const [likedMoments, setLikedMoments] = useState<Set<string>>(new Set());
  const [displayedMoments, setDisplayedMoments] = useState<Moment[]>([]);

  useEffect(() => {
    // Staggered animation effect
    moments.forEach((_, index) => {
      setTimeout(() => {
        setDisplayedMoments((prev) => [...prev, moments[index]]);
      }, index * 100);
    });
  }, []);

  const toggleLike = (momentId: string) => {
    setLikedMoments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(momentId)) {
        newSet.delete(momentId);
      } else {
        newSet.add(momentId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Title */}
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-4xl font-bold font-syne text-white">Community Moments</h2>
        <p className="text-purple-300">Celebrate our team's achievements and milestones</p>
      </div>

      {/* Moments Feed */}
      <div className="space-y-4">
        {displayedMoments.map((moment, index) => (
          <div
            key={moment.id}
            className="group rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-6 hover:border-purple-500/40 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10 animate-fadeIn"
            style={{
              animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${moment.color} flex items-center justify-center text-lg font-bold text-white flex-shrink-0 shadow-lg`}
              >
                {moment.avatar}
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <p className="font-syne font-semibold text-white">{moment.author}</p>
                <p className="text-sm text-purple-400">{moment.timestamp}</p>
              </div>
            </div>

            {/* Content */}
            <p className="text-purple-100 leading-relaxed mb-6 text-lg">{moment.content}</p>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-500/10">
              <button
                onClick={() => toggleLike(moment.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group/btn"
                style={{
                  background: likedMoments.has(moment.id)
                    ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))'
                    : 'transparent',
                }}
              >
                <Heart
                  size={18}
                  className={`transition-all duration-300 ${
                    likedMoments.has(moment.id)
                      ? 'fill-pink-500 text-pink-500'
                      : 'text-purple-400 group-hover/btn:text-pink-400'
                  }`}
                />
                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    likedMoments.has(moment.id) ? 'text-pink-400' : 'text-purple-400'
                  }`}
                >
                  {moment.likes + (likedMoments.has(moment.id) ? 1 : 0)}
                </span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
                <MessageCircle size={18} />
                <span className="text-sm font-semibold">{moment.comments}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-purple-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-300">
                <Share2 size={18} />
                <span className="text-sm font-semibold">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
