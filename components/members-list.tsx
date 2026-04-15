'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import MemberCard from './member-card';
import MemberDetailModal from './member-detail-modal';

const mockMembers = [
  {
    id: '1',
    name: 'Reza Wijaya',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1535713566aaf00e55a6430fdf62fd0d9c4fae90?w=400&h=400&fit=crop',
    joinedDate: '2023-01-15',
    gamesFavorite: ['Roblox', 'Minecraft'],
    bio: 'Founder dan admin YaiiCafe. Passionate tentang gaming dan komunitas.',
    status: 'online',
  },
  {
    id: '2',
    name: 'Aditya Kusuma',
    role: 'Moderator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    joinedDate: '2023-02-20',
    gamesFavorite: ['Roblox', 'Valorant'],
    bio: 'Moderator YaiiCafe. Suka membantu member baru.',
    status: 'online',
  },
  {
    id: '3',
    name: 'Siti Rahma',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    joinedDate: '2023-03-10',
    gamesFavorite: ['Roblox'],
    bio: 'Pemain Roblox casual. Suka roleplay dan membangun.',
    status: 'idle',
  },
  {
    id: '4',
    name: 'Budi Santoso',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    joinedDate: '2023-04-05',
    gamesFavorite: ['Minecraft', 'Roblox'],
    bio: 'Programmer dan gamer. Suka open-world games.',
    status: 'online',
  },
  {
    id: '5',
    name: 'Dina Putri',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1517070213202-1fab34e91249?w=400&h=400&fit=crop',
    joinedDate: '2023-05-12',
    gamesFavorite: ['Roblox', 'Among Us'],
    bio: 'Content creator muda. Streaming gaming di YouTube.',
    status: 'online',
  },
  {
    id: '6',
    name: 'Eko Prasetya',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    joinedDate: '2023-06-20',
    gamesFavorite: ['Roblox', 'CS:GO'],
    bio: 'Gamers sejati. Kompetitif dan supportive.',
    status: 'offline',
  },
  {
    id: '7',
    name: 'Fathia Zahra',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    joinedDate: '2023-07-08',
    gamesFavorite: ['Roblox', 'Sims 4'],
    bio: 'Fashion enthusiast. Suka customize avatar.',
    status: 'idle',
  },
  {
    id: '8',
    name: 'Ganda Mawardi',
    role: 'Member',
    avatar: 'https://images.unsplash.com/photo-1492562892205-81342ee5ff30?w=400&h=400&fit=crop',
    joinedDate: '2023-08-15',
    gamesFavorite: ['Roblox'],
    bio: 'Casual gamer. Suka quest dan adventure games.',
    status: 'online',
  },
];

interface MembersListProps {
  selectedMember: string | null;
  onSelectMember: (memberId: string | null) => void;
}

export default function MembersList({ selectedMember, onSelectMember }: MembersListProps) {
  const [detailMemberId, setDetailMemberId] = useState<string | null>(null);
  const selectedMemberData = mockMembers.find(m => m.id === detailMemberId);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            isSelected={selectedMember === member.id}
            onClick={() => setDetailMemberId(member.id)}
          />
        ))}
      </div>

      {/* Member Detail Modal */}
      {detailMemberId && selectedMemberData && (
        <MemberDetailModal
          member={selectedMemberData}
          onClose={() => setDetailMemberId(null)}
        />
      )}
    </>
  );
}
