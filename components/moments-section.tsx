'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

const mockMoments = [
  {
    id: '1',
    title: 'Epic Roblox Adventure',
    image: 'https://images.unsplash.com/photo-1538391846015-35def9ae949f?w=600&h=400&fit=crop',
    author: 'Reza Wijaya',
    likes: 128,
    date: '2024-04-10',
  },
  {
    id: '2',
    title: 'Minecraft Building Challenge',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
    author: 'Budi Santoso',
    likes: 245,
    date: '2024-04-09',
  },
  {
    id: '3',
    title: 'Squad Gaming Session',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=400&fit=crop',
    author: 'Dina Putri',
    likes: 189,
    date: '2024-04-08',
  },
  {
    id: '4',
    title: 'Roblox Fashion Show',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    author: 'Fathia Zahra',
    likes: 312,
    date: '2024-04-07',
  },
  {
    id: '5',
    title: 'Hide and Seek Tournament',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop',
    author: 'Aditya Kusuma',
    likes: 156,
    date: '2024-04-06',
  },
  {
    id: '6',
    title: 'Roleplay Story Quest',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    author: 'Siti Rahma',
    likes: 201,
    date: '2024-04-05',
  },
];

export default function MomentsSection() {
  const [likedMoments, setLikedMoments] = useState<Set<string>>(new Set());
  const [hoveredMoment, setHoveredMoment] = useState<string | null>(null);

  const toggleLike = (e: React.MouseEvent, momentId: string) => {
    e.preventDefault();
    const newLiked = new Set(likedMoments);
    if (newLiked.has(momentId)) {
      newLiked.delete(momentId);
    } else {
      newLiked.add(momentId);
    }
    setLikedMoments(newLiked);
  };

  return (
    <>
      <style>{`
        .moments-masonry {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
          animation: staggerIn 0.6s ease forwards;
        }

        @keyframes staggerIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .moment-tile {
          position: relative;
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          group: "moment";
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          opacity: 0;
          animation: tileAppear 0.5s ease forwards;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(200, 130, 252, 0.05) 100%);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.08);
        }

        @keyframes tileAppear {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .moment-tile:nth-child(1) { animation-delay: 0.1s; }
        .moment-tile:nth-child(2) { animation-delay: 0.2s; }
        .moment-tile:nth-child(3) { animation-delay: 0.3s; }
        .moment-tile:nth-child(4) { animation-delay: 0.4s; }
        .moment-tile:nth-child(5) { animation-delay: 0.5s; }
        .moment-tile:nth-child(6) { animation-delay: 0.6s; }

        .moment-tile:hover {
          transform: translateY(-12px);
          box-shadow: 0 16px 48px rgba(139, 92, 246, 0.25), inset 0 0 20px rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.4);
        }

        .moment-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .moment-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .moment-tile:hover .moment-image {
          transform: scale(1.08) rotate(1deg);
        }

        .moment-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .moment-tile:hover .moment-overlay {
          opacity: 1;
        }

        .moment-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          z-index: 10;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .moment-tile:hover .moment-content {
          transform: translateY(0);
        }

        .moment-title {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .moment-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 12px;
        }

        .moment-author {
          font-family: 'Space Mono', monospace;
          color: rgba(200, 130, 252, 0.9);
          letter-spacing: 0.05em;
        }

        .moment-like-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.25);
          border: 1px solid rgba(139, 92, 246, 0.4);
          padding: 6px 12px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 11px;
        }

        .moment-like-btn:hover {
          background: rgba(139, 92, 246, 0.4);
          border-color: rgba(139, 92, 246, 0.6);
          color: #fff;
        }

        .moment-like-btn.liked {
          background: rgba(239, 68, 68, 0.3);
          border-color: rgba(239, 68, 68, 0.5);
          color: #ff6b6b;
        }

        .heart-icon {
          width: 14px;
          height: 14px;
          transition: all 0.3s ease;
        }

        .moment-like-btn.liked .heart-icon {
          animation: heartBeat 0.4s ease;
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1); }
        }
      `}</style>

      <div className="moments-masonry">
        {mockMoments.map((moment) => (
          <div
            key={moment.id}
            className="moment-tile"
            onMouseEnter={() => setHoveredMoment(moment.id)}
            onMouseLeave={() => setHoveredMoment(null)}
          >
            <div className="moment-image-wrapper">
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                className="moment-image"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="moment-overlay" />
            </div>

            <div className="moment-content">
              <h3 className="moment-title">{moment.title}</h3>
              <div className="moment-meta">
                <span className="moment-author">{moment.author}</span>
                <button
                  className={`moment-like-btn ${likedMoments.has(moment.id) ? 'liked' : ''}`}
                  onClick={(e) => toggleLike(e, moment.id)}
                >
                  <Heart className="heart-icon" fill={likedMoments.has(moment.id) ? 'currentColor' : 'none'} />
                  {likedMoments.has(moment.id) ? likedMoments.size > 0 ? moment.likes + 1 : moment.likes + 1 : moment.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
