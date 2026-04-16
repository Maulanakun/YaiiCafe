'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Moment {
  id: string;
  author: string;
  avatar: string;
  color: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image: string;
}

const moments: Moment[] = [
  {
    id: '1',
    author: 'Maulana',
    avatar: 'M',
    color: 'from-purple-500 to-pink-500',
    content: 'Just shipped a new 3D feature! The community feedback has been incredible. Thank you all for the support!',
    timestamp: '2 hours ago',
    likes: 234,
    comments: 45,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=500&fit=crop',
  },
  {
    id: '2',
    author: 'Cafe Manager',
    avatar: 'C',
    color: 'from-cyan-500 to-blue-500',
    content: 'YaiiCafe community event was a huge success! 200+ members participated. Can\'t wait for the next one!',
    timestamp: '4 hours ago',
    likes: 567,
    comments: 89,
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&h=500&fit=crop',
  },
  {
    id: '3',
    author: 'Dev Assistant',
    avatar: 'D',
    color: 'from-green-500 to-emerald-500',
    content: 'Database optimization is complete! We\'ve improved query performance by 60%. Smooth sailing ahead!',
    timestamp: '6 hours ago',
    likes: 345,
    comments: 67,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
  },
  {
    id: '4',
    author: 'Designer Pro',
    avatar: 'D',
    color: 'from-orange-500 to-red-500',
    content: 'Unveiling the new UI redesign next week. The team worked so hard on this. Excited to share it with you all!',
    timestamp: '1 day ago',
    likes: 456,
    comments: 92,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
  },
  {
    id: '5',
    author: 'Community Lead',
    avatar: 'C',
    color: 'from-indigo-500 to-purple-500',
    content: 'Welcome to our 1000+ new members this week! We\'re growing so fast. The community spirit is amazing!',
    timestamp: '1 day ago',
    likes: 789,
    comments: 156,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=500&fit=crop',
  },
];

export default function MomentsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [likedMoments, setLikedMoments] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % moments.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % moments.length);
    setIsAutoPlay(false);
  };

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

  const currentMoment = moments[currentIndex];

  return (
    <div className="w-full space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0">
      {/* Title */}
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-2xl sm:text-3xl font-bold font-syne text-white">Moments</h3>
        <p className="text-xs sm:text-sm text-purple-300">Latest updates from our community</p>
      </div>

      {/* Main Carousel */}
      <div className="relative group">
        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative h-48 sm:h-64 md:h-80 rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={currentMoment.image}
            alt={currentMoment.content}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

          {/* Content with animation */}
          <div
            className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between"
            style={{
              animation: `slideIn${direction === 'right' ? 'FromRight' : 'FromLeft'} 0.6s ease-out`,
            }}
          >
            {/* Top Section */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* Avatar & Author Info */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div
                  className={`w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-full bg-gradient-to-br ${currentMoment.color} flex items-center justify-center text-sm sm:text-lg md:text-xl font-bold text-white`}
                >
                  {currentMoment.avatar}
                </div>
                <div>
                  <p className="font-syne font-semibold text-white text-sm sm:text-base md:text-lg">
                    {currentMoment.author}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-200">{currentMoment.timestamp}</p>
                </div>
              </div>

              {/* Content */}
              <p className="text-purple-50 text-xs sm:text-sm md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3">
                {currentMoment.content}
              </p>
            </div>

            {/* Bottom Section - Actions */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => toggleLike(currentMoment.id)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                >
                  <Heart
                    size={16}
                    className={`sm:w-5 sm:h-5 transition-all duration-300 ${
                      likedMoments.has(currentMoment.id)
                        ? 'fill-pink-500 text-pink-500'
                        : 'text-purple-200'
                    }`}
                  />
                  <span className="text-xs sm:text-sm text-purple-200">
                    {currentMoment.likes + (likedMoments.has(currentMoment.id) ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <MessageCircle size={16} className="sm:w-5 sm:h-5 text-purple-200" />
                  <span className="text-xs sm:text-sm text-purple-200">{currentMoment.comments}</span>
                </button>

                <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <Share2 size={16} className="sm:w-5 sm:h-5 text-purple-200" />
                </button>
              </div>

              {/* Indicator */}
              <div className="text-xs sm:text-sm text-purple-300 font-mono">
                {String(currentIndex + 1).padStart(2, '0')} / {String(moments.length).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
      </div>

      {/* Thumbnail/Indicator Dots */}
      <div className="flex justify-center gap-1 sm:gap-2 px-4 flex-wrap">
        {moments.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 'right' : 'left');
              setCurrentIndex(index);
              setIsAutoPlay(false);
            }}
            className={`h-1 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6 sm:w-8'
                : 'bg-white/20 w-1 sm:w-2 hover:bg-white/40'
            }`}
            aria-label={`Go to moment ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
