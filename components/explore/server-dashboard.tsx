'use client';

import { serverStats, ownerFacts } from '@/lib/server-data';
import { useState, useEffect } from 'react';

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
    <div className="w-full space-y-12">
      {/* Title Section */}
      <div className="text-center space-y-4">
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000" />
          <h2 className="relative text-5xl font-bold font-syne text-white bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Server Dashboard
          </h2>
        </div>
        <p className="text-lg text-purple-300 font-syne">YaiiCafe Discord Server Statistics</p>
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
        <h3 className="text-2xl font-bold font-syne text-white mb-6">Server Founder & Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <div className="relative p-6 h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="text-4xl mb-3">{fact.icon}</div>
                    <p className="text-sm text-purple-300 font-syne uppercase tracking-wider">
                      {fact.title}
                    </p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold bg-gradient-to-r ${fact.color} bg-clip-text text-transparent font-syne`}>
                      {fact.value}
                    </p>
                    <p className="text-xs text-purple-300/60 mt-2">{fact.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Stats Grid */}
      <div className="relative">
        <h3 className="text-2xl font-bold font-syne text-white mb-6">Server Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <div
              key={card.id}
              style={{
                animation: `slideIn 0.6s ease-out ${index * 0.1}s backwards`,
              }}
              className="group relative"
            >
              <div
                className={`relative h-40 rounded-2xl overflow-hidden border border-purple-500/30 transition-all duration-500 hover:border-purple-500/60 hover:scale-105`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 ${card.gradient} ${card.bgColor}`} />

                {/* Animated border glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.color} blur-2xl`}
                  style={{ opacity: 0 }}
                />

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col justify-between z-10">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-purple-300 font-syne uppercase tracking-wider">
                      {card.label}
                    </p>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <div>
                    <p
                      className={`text-4xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent font-syne`}
                    >
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="col-span-1 md:col-span-2 group relative rounded-2xl overflow-hidden border border-purple-500/30 transition-all duration-500 hover:border-purple-500/60 p-8"
          style={{
            animation: `slideIn 0.6s ease-out 0.3s backwards`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl"
            style={{ opacity: 0 }}
          />
          <div className="relative z-10">
            <h4 className="text-xl font-bold font-syne text-white mb-3">Server Overview</h4>
            <div className="space-y-2 text-purple-300">
              <p className="flex justify-between">
                <span>Total Categories:</span>
                <span className="font-semibold text-white">{stats.channels.categories}</span>
              </p>
              <p className="flex justify-between">
                <span>Total Roles:</span>
                <span className="font-semibold text-white">{stats.roles}</span>
              </p>
              <p className="flex justify-between">
                <span>Custom Emojis:</span>
                <span className="font-semibold text-white">{stats.emojis}</span>
              </p>
              <p className="flex justify-between">
                <span>Boost Level:</span>
                <span className="font-semibold text-white">Level {stats.serverLevel}</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="group relative rounded-2xl overflow-hidden border border-purple-500/30 transition-all duration-500 hover:border-purple-500/60 p-8"
          style={{
            animation: `slideIn 0.6s ease-out 0.4s backwards`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500 to-blue-500 blur-3xl"
            style={{ opacity: 0 }}
          />
          <div className="relative z-10">
            <h4 className="text-xl font-bold font-syne text-white mb-3">Activity Status</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-300">Active Rate</span>
                  <span className="text-white font-semibold">
                    {Math.round((stats.activeMembers / stats.totalMembers) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-purple-500/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{
                      width: `${(stats.activeMembers / stats.totalMembers) * 100}%`,
                      animation: `slideInWidth 1.5s ease-out 0.5s backwards`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-300">Online Rate</span>
                  <span className="text-white font-semibold">
                    {Math.round((stats.onlineMembers / stats.activeMembers) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-purple-500/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    style={{
                      width: `${(stats.onlineMembers / stats.activeMembers) * 100}%`,
                      animation: `slideInWidth 1.5s ease-out 0.6s backwards`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
