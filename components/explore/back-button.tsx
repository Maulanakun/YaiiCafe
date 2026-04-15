'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all duration-300 font-syne font-semibold"
    >
      <ArrowLeft size={20} />
      Back
    </Link>
  );
}
