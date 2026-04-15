export interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  joinDate: string;
  color: string;
  robloxUsername?: string;
  achievements?: string[];
}

export const members: Member[] = [
  {
    id: '1',
    name: 'Maulana',
    role: 'Founder & Lead Developer',
    image: '/members/maulana.jpg',
    bio: 'Creative developer passionate about building immersive web experiences and 3D animations.',
    specialties: ['React', '3D Graphics', 'UI/UX Design', 'Full Stack'],
    joinDate: '2023-01',
    color: 'from-purple-500 to-pink-500',
    robloxUsername: 'Maulana',
    achievements: ['3D Master', 'Code Wizard', 'Design Master'],
  },
  {
    id: '2',
    name: 'Cafe Manager',
    role: 'Operations Lead',
    image: '/members/manager.jpg',
    bio: 'Dedicated to creating the best experience for community members and ensuring smooth operations.',
    specialties: ['Community', 'Management', 'Organization', 'Support'],
    joinDate: '2023-02',
    color: 'from-cyan-500 to-blue-500',
    robloxUsername: 'CafeManager',
    achievements: ['Community Hero', 'Organizer Pro', 'Support Master'],
  },
  {
    id: '3',
    name: 'Dev Assistant',
    role: 'Backend Developer',
    image: '/members/dev.jpg',
    bio: 'Focused on building robust backend systems and databases for seamless performance.',
    specialties: ['Node.js', 'Databases', 'APIs', 'System Design'],
    joinDate: '2023-03',
    color: 'from-green-500 to-emerald-500',
    robloxUsername: 'DevWizard',
    achievements: ['Backend Master', 'Database Pro', 'API Expert'],
  },
  {
    id: '4',
    name: 'Designer Pro',
    role: 'UI/UX Designer',
    image: '/members/designer.jpg',
    bio: 'Creating beautiful and intuitive interfaces that delight users and drive engagement.',
    specialties: ['UI Design', 'UX Research', 'Animation', 'Branding'],
    joinDate: '2023-04',
    color: 'from-orange-500 to-red-500',
    robloxUsername: 'DesignMaster',
    achievements: ['Design Expert', 'Animation Pro', 'Creative Genius'],
  },
  {
    id: '5',
    name: 'Community Lead',
    role: 'Social Manager',
    image: '/members/social.jpg',
    bio: 'Engaging the community and building meaningful connections between members.',
    specialties: ['Community Engagement', 'Social Media', 'Events', 'Networking'],
    joinDate: '2023-05',
    color: 'from-indigo-500 to-purple-500',
    robloxUsername: 'SocialButterfly',
    achievements: ['Community Star', 'Event Master', 'Connector Pro'],
  },
];
