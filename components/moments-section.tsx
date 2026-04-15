'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const mockMoments = [
  {
    id: '1',
    title: 'Epic Roblox Adventure',
    image: 'https://images.unsplash.com/photo-1538391846015-35def9ae949f?w=600&h=400&fit=crop',
    author: 'Reza Wijaya',
    likes: 128,
    comments: 24,
    date: '2024-04-10',
    description: 'Jelajahi dunia fantasi bersama teman-teman di Roblox Adventure',
  },
  {
    id: '2',
    title: 'Minecraft Building Challenge',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop',
    author: 'Budi Santoso',
    likes: 245,
    comments: 42,
    date: '2024-04-09',
    description: 'Tantangan membangun struktur paling keren dalam waktu terbatas',
  },
  {
    id: '3',
    title: 'Squad Gaming Session',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=400&fit=crop',
    author: 'Dina Putri',
    likes: 189,
    comments: 35,
    date: '2024-04-08',
    description: 'Sesi bermain bareng yang seru dengan squad favorit',
  },
  {
    id: '4',
    title: 'Roblox Fashion Show',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    author: 'Fathia Zahra',
    likes: 312,
    comments: 56,
    date: '2024-04-07',
    description: 'Showcase avatar fashion terbaik dari komunitas YaiiCafe',
  },
  {
    id: '5',
    title: 'Hide and Seek Tournament',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop',
    author: 'Aditya Kusuma',
    likes: 156,
    comments: 28,
    date: '2024-04-06',
    description: 'Turnamen hide and seek seru dengan prize pool menarik',
  },
  {
    id: '6',
    title: 'Roleplay Story Quest',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    author: 'Siti Rahma',
    likes: 201,
    comments: 38,
    date: '2024-04-05',
    description: 'Adventure roleplay dengan alur cerita yang menarik',
  },
];

export default function MomentsSection() {
  const [likedMoments, setLikedMoments] = useState<Set<string>>(new Set());

  const toggleLike = (momentId: string) => {
    const newLiked = new Set(likedMoments);
    if (newLiked.has(momentId)) {
      newLiked.delete(momentId);
    } else {
      newLiked.add(momentId);
    }
    setLikedMoments(newLiked);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockMoments.map((moment) => (
        <div
          key={moment.id}
          className="group rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
        >
          {/* Image */}
          <div className="relative h-40 overflow-hidden bg-slate-700">
            <Image
              src={moment.image}
              alt={moment.title}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title and author */}
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
              {moment.title}
            </h3>
            <p className="text-sm text-slate-400 mb-3">{moment.author}</p>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-4 line-clamp-2">
              {moment.description}
            </p>

            {/* Date */}
            <p className="text-xs text-slate-500 mb-4">
              {new Date(moment.date).toLocaleDateString('id-ID', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            {/* Engagement stats and actions */}
            <div className="space-y-3">
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-slate-400 py-3 border-t border-slate-700">
                <span>{moment.likes + (likedMoments.has(moment.id) ? 1 : 0)} Likes</span>
                <span>{moment.comments} Comments</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleLike(moment.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                    likedMoments.has(moment.id)
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-red-400'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={likedMoments.has(moment.id) ? 'currentColor' : 'none'} />
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 font-semibold transition-colors duration-300">
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 font-semibold transition-colors duration-300">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
