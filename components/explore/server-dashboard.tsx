'use client';

import { serverStats, ownerFacts } from '@/lib/server-data';
import { useState, useEffect } from 'react';
import MemberListView from './member-list-view';
import MomentsCarousel from './moments-carousel';

export default function ServerDashboard() {
  const [stats, setStats] = useState(serverStats);
  const [animatedValues, setAnimatedValues] = useState({
    totalMembers: 0,
    activeMembers: 0,
    onlineMembers: 0,
    serverLevel: 0,
  });

  // Animate numbers on mount
  useEffect(() => {
    const animationDuration = 2000;
    const startTime = Date.now();

    const animateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimatedValues({
        totalMembers: Math.floor(stats.totalMembers * progress),
        activeMembers: Math.floor(stats.activeMembers * progress),
        onlineMembers: Math.floor(stats.onlineMembers * progress),
        serverLevel: Math.floor(stats.serverLevel * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    animateValue();
  }, [stats]);

  const dashboardCards = [
    {
      id: 'total',
      label: 'Total Members',
      value: animatedValues.totalMembers,
      icon: '👥',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      gradient: 'bg-gradient-to-br',
    },
    {
      id: 'active',
      label: 'Active Members',
      value: animatedValues.activeMembers,
      icon: '✨',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-500/10 to-blue-500/10',
      gradient: 'bg-gradient-to-br',
    },
    {
      id: 'online',
      label: 'Online Now',
      value: animatedValues.onlineMembers,
      icon: '🟢',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      gradient: 'bg-gradient-to-br',
    },
    {
      id: 'level',
      label: 'Server Level',
      value: animatedValues.serverLevel,
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      gradient: 'bg-gradient-to-br',
    },
    {
      id: 'channels',
      label: 'Text Channels',
      value: stats.channels.text,
      icon: '#️⃣',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-500/10 to-purple-500/10',
      gradient: 'bg-gradient-to-br',
    },
    {
      id: 'voice',
      label: 'Voice Channels',
      value: stats.channels.voice,
      icon: '🎙️',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-500/10 to-pink-500/10',
      gradient: 'bg-gradient-to-br',
    },
    {
      id: 'roles',
      label: 'Roles',
      value: stats.roles,
      icon: '🏷️',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      gradient: 'bg-gradient-to-br',
    },
    {
      id: 'emojis',
      label: 'Custom Emojis',
      value: stats.emojis,
      icon: '😊',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-500/10 to-rose-500/10',
      gradient: 'bg-gradient-to-br',
    },
  ];

  return (
    <div className="w-full space-y-8 sm:space-y-10 md:space-y-12 px-4 sm:px-6 lg:px-8">
      {/* Moments Carousel Section */}
      <div className="relative">
        <MomentsCarousel />
      </div>

      {/* Title Section */}
      <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000" />
          <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold font-syne text-white bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            About YaiiCafe Server
          </h2>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-purple-300 font-syne">Discover what makes YaiiCafe special</p>
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
          <div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>

      {/* Owner Facts Section */}
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-bold font-syne text-white mb-4 sm:mb-6">Server Founder & Facts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {ownerFacts.map((fact, index) => (
            <div
              key={fact.id}
              style={{
                animation: `slideIn 0.6s ease-out ${index * 0.1}s backwards`,
              }}
              className="group relative"
            >
              <div
                className={`relative h-full rounded-2xl overflow-hidden border border-purple-500/30 transition-all duration-500 hover:border-purple-500/60`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${fact.backgroundColor}`} />

                {/* Hover glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${fact.color} blur-2xl`}
                  style={{ opacity: 0 }}
                />

                {/* Content */}
                <div className="relative p-4 sm:p-6 h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">{fact.icon}</div>
                    <p className="text-xs sm:text-sm text-purple-300 font-syne uppercase tracking-wider">
                      {fact.title}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${fact.color} bg-clip-text text-transparent font-syne`}>
                      {fact.value}
                    </p>
                    <p className="text-xs text-purple-300/60 mt-1 sm:mt-2">{fact.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Server Features Section */}
      <div className="relative">
        <h3 className="text-xl sm:text-2xl font-bold font-syne text-white mb-4 sm:mb-6">What's Inside YaiiCafe?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            {
              id: 'community',
              label: 'Vibrant Community',
              description: 'Join thousands of passionate members sharing ideas and collaborating',
              icon: '👥',
              color: 'from-purple-500 to-pink-500',
              bgColor: 'from-purple-500/10 to-pink-500/10',
            },
            {
              id: 'events',
              label: 'Regular Events',
              description: 'Participate in community events, contests, and giveaways',
              icon: '🎉',
              color: 'from-cyan-500 to-blue-500',
              bgColor: 'from-cyan-500/10 to-blue-500/10',
            },
            {
              id: 'support',
              label: '24/7 Support',
              description: 'Get help from experienced moderators and community members anytime',
              icon: '🤝',
              color: 'from-green-500 to-emerald-500',
              bgColor: 'from-green-500/10 to-emerald-500/10',
            },
            {
              id: 'learning',
              label: 'Learning Resources',
              description: 'Access tutorials, guides, and educational content curated for you',
              icon: '📚',
              color: 'from-yellow-500 to-orange-500',
              bgColor: 'from-yellow-500/10 to-orange-500/10',
            },
            {
              id: 'showcase',
              label: 'Project Showcase',
              description: 'Show off your creations and get feedback from the community',
              icon: '🚀',
              color: 'from-indigo-500 to-purple-500',
              bgColor: 'from-indigo-500/10 to-purple-500/10',
            },
            {
              id: 'collaboration',
              label: 'Collaboration Spaces',
              description: 'Find teammates and work together on exciting projects',
              icon: '💡',
              color: 'from-red-500 to-pink-500',
              bgColor: 'from-red-500/10 to-pink-500/10',
            },
            {
              id: 'exclusive',
              label: 'Exclusive Perks',
              description: 'Unlock special roles and benefits as an active community member',
              icon: '⭐',
              color: 'from-blue-500 to-cyan-500',
              bgColor: 'from-blue-500/10 to-cyan-500/10',
            },
            {
              id: 'growth',
              label: 'Personal Growth',
              description: 'Develop new skills and expand your network with like-minded people',
              icon: '📈',
              color: 'from-pink-500 to-rose-500',
              bgColor: 'from-pink-500/10 to-rose-500/10',
            },
          ].map((feature, index) => (
            <div
              key={feature.id}
              style={{
                animation: `slideIn 0.6s ease-out ${index * 0.1}s backwards`,
              }}
              className="group relative"
            >
              <div
                className={`relative h-full min-h-48 rounded-2xl overflow-hidden border border-purple-500/30 transition-all duration-500 hover:border-purple-500/60 hover:scale-105`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor}`} />

                {/* Animated border glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} blur-2xl`}
                  style={{ opacity: 0 }}
                />

                {/* Content */}
                <div className="relative p-4 sm:p-6 h-full flex flex-col justify-between z-10">
                  <div>
                    <span className="text-2xl sm:text-4xl block mb-2 sm:mb-3">{feature.icon}</span>
                    <p className={`text-base sm:text-lg font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent font-syne`}>
                      {feature.label}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Members Section */}
      <div className="relative">
        <MemberListView onSelectMember={() => {}} />
      </div>

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

        @keyframes slideInWidth {
          from {
            width: 0;
          }
          to {
            width: var(--tw-translate-x);
          }
        }
      `}</style>
    </div>
  );
}
