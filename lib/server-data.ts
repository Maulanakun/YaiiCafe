export interface ServerStats {
  totalMembers: number;
  activeMembers: number;
  onlineMembers: number;
  serverLevel: number;
  boosts: number;
  createdDate: string;
  channels: {
    text: number;
    voice: number;
    categories: number;
  };
  roles: number;
  emojis: number;
}

export interface OwnerFact {
  id: string;
  title: string;
  description: string;
  icon: string;
  value: string;
  color: string;
  backgroundColor: string;
}

export const serverStats: ServerStats = {
  totalMembers: 1250,
  activeMembers: 856,
  onlineMembers: 423,
  serverLevel: 25,
  boosts: 12,
  createdDate: '2023-01-15',
  channels: {
    text: 32,
    voice: 8,
    categories: 6,
  },
  roles: 18,
  emojis: 156,
};

export const ownerFacts: OwnerFact[] = [
  {
    id: '1',
    title: 'Server Owner',
    description: 'Maulana',
    icon: '👑',
    value: '@sigmaboyy3610',
    color: 'from-purple-500 to-pink-500',
    backgroundColor: 'from-purple-500/10 to-pink-500/10',
  },
  {
    id: '2',
    title: 'Creation Date',
    description: 'Server founded on',
    icon: '📅',
    value: 'January 15, 2023',
    color: 'from-cyan-500 to-blue-500',
    backgroundColor: 'from-cyan-500/10 to-blue-500/10',
  },
  {
    id: '3',
    title: 'Server Level',
    description: 'Current boost level',
    icon: '⭐',
    value: 'Level 25',
    color: 'from-yellow-500 to-orange-500',
    backgroundColor: 'from-yellow-500/10 to-orange-500/10',
  },
  {
    id: '4',
    title: 'Boost Count',
    description: 'Active server boosts',
    icon: '🚀',
    value: '12 Boosts',
    color: 'from-green-500 to-emerald-500',
    backgroundColor: 'from-green-500/10 to-emerald-500/10',
  },
];
