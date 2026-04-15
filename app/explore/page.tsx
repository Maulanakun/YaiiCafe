'use client';

import { useState } from 'react';
import MembersSection from '@/components/members-section';
import MomentsSection from '@/components/moments-section';
import AvatarsSection from '@/components/avatars-section';
import ExploreBackground from '@/components/explore-background';

export default function ExplorePage() {
  const [activeSection, setActiveSection] = useState<'members' | 'moments' | 'avatars'>('members');

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: '#05050f' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

        .explore-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 24px;
          background: rgba(5, 5, 15, 0.5);
        }

        .explore-nav-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .explore-logo {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #8b5cf6, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .explore-tabs {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          padding: 6px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .explore-tab {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
          text-decoration: none;
        }

        .explore-tab.active {
          background: rgba(124, 58, 237, 0.25);
          color: #fff;
          box-shadow: 0 0 16px rgba(124, 58, 237, 0.3);
        }

        .explore-tab:hover {
          color: #fff;
          background: rgba(124, 58, 237, 0.15);
        }

        .explore-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 100px 24px 60px;
          z-index: 10;
        }

        .explore-content {
          max-width: 1400px;
          margin: 0 auto;
          animation: fadeInUp 0.6s ease 0.2s forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 6vw, 52px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .section-title .accent {
          background: linear-gradient(135deg, #8b5cf6, #c084fc, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 48px;
          letter-spacing: 0.05em;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          background: rgba(124, 58, 237, 0.1);
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          border: 1px solid rgba(124, 58, 237, 0.2);
          margin-bottom: 32px;
          transition: all 0.3s ease;
          cursor: pointer;
          position: absolute;
          top: 80px;
          left: 24px;
          z-index: 45;
        }

        .back-btn:hover {
          background: rgba(124, 58, 237, 0.2);
          color: #fff;
          border-color: rgba(124, 58, 237, 0.4);
        }
      `}</style>

      <ExploreBackground />

      {/* Back Button */}
      <a href="/" className="back-btn">
        ← Back to Home
      </a>

      {/* Navigation */}
      <nav className="explore-nav">
        <div className="explore-nav-content">
          <div className="explore-logo">YaiiCafe Explore</div>
          <div className="explore-tabs">
            <button
              className={`explore-tab ${activeSection === 'members' ? 'active' : ''}`}
              onClick={() => setActiveSection('members')}
            >
              👥 Members
            </button>
            <button
              className={`explore-tab ${activeSection === 'moments' ? 'active' : ''}`}
              onClick={() => setActiveSection('moments')}
            >
              📸 Moments
            </button>
            <button
              className={`explore-tab ${activeSection === 'avatars' ? 'active' : ''}`}
              onClick={() => setActiveSection('avatars')}
            >
              🎭 Avatars
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="explore-container">
        <div className="explore-content">
          {activeSection === 'members' && (
            <>
              <h2 className="section-title">
                Meet the <span className="accent">Community</span>
              </h2>
              <p className="section-subtitle">Discover members dan explore their profiles</p>
              <MembersSection />
            </>
          )}
          {activeSection === 'moments' && (
            <>
              <h2 className="section-title">
                Gaming <span className="accent">Moments</span>
              </h2>
              <p className="section-subtitle">Tangkap momen terbaik dari setiap sesi mabar</p>
              <MomentsSection />
            </>
          )}
          {activeSection === 'avatars' && (
            <>
              <h2 className="section-title">
                3D <span className="accent">Avatars</span>
              </h2>
              <p className="section-subtitle">Lihat avatar Roblox dan karakter gaming member</p>
              <AvatarsSection />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
