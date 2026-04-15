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
        .moments-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
          margin-bottom: 60px;
        }

        .moment-item {
          position: relative;
          height: 380px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          animation: popIn 0.5s ease forwards;
          opacity: 0;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .moment-item:nth-child(1) { animation-delay: 0.05s; }
        .moment-item:nth-child(2) { animation-delay: 0.1s; }
        .moment-item:nth-child(3) { animation-delay: 0.15s; }
        .moment-item:nth-child(4) { animation-delay: 0.2s; }
        .moment-item:nth-child(5) { animation-delay: 0.25s; }
        .moment-item:nth-child(6) { animation-delay: 0.3s; }

        .moment-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .moment-item:hover .moment-image {
          transform: scale(1.08);
        }

        .moment-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.8) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .moment-item:hover .moment-overlay {
          opacity: 1;
        }

        .moment-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }

        .moment-author {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(139, 92, 246, 0.8);
          margin-bottom: 12px;
        }

        .moment-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .moment-like-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.2);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: rgba(255, 255, 255, 0.8);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .moment-like-btn:hover {
          background: rgba(124, 58, 237, 0.3);
          border-color: rgba(139, 92, 246, 0.6);
        }

        .moment-like-btn.liked {
          background: rgba(239, 68, 68, 0.25);
          border-color: rgba(239, 68, 68, 0.5);
          color: #fca5a5;
        }

        .moment-like-btn.liked svg {
          fill: currentColor;
          animation: heartBeat 0.4s ease;
        }

        @keyframes heartBeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .moment-date {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }

        .moment-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .moment-item:hover .moment-badge {
          opacity: 1;
        }
      `}</style>

      <div className="moments-gallery">
        {mockMoments.map((moment, index) => (
          <div
            key={moment.id}
            className="moment-item"
            onMouseEnter={() => setHoveredMoment(moment.id)}
            onMouseLeave={() => setHoveredMoment(null)}
          >
            <Image
              src={moment.image}
              alt={moment.title}
              width={600}
              height={400}
              className="moment-image"
            />

            <div className="moment-badge">📸 Gaming Moment</div>

            <div className="moment-overlay">
              <h3 className="moment-title">{moment.title}</h3>
              <p className="moment-author">by {moment.author}</p>
              <div className="moment-actions">
                <button
                  className={`moment-like-btn ${likedMoments.has(moment.id) ? 'liked' : ''}`}
                  onClick={(e) => toggleLike(e, moment.id)}
                >
                  <Heart size={14} />
                  <span>{moment.likes + (likedMoments.has(moment.id) ? 1 : 0)}</span>
                </button>
                <span className="moment-date">
                  {new Date(moment.date).toLocaleDateString('id-ID', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
