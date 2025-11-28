'use client';


import GlowingCards, { GlowingCard } from '@/src/components/lightswind/glowing-cards';
import React from 'react';

const MyService = () => {
  return (
    <div className="bg-black min-h-screen p-6">
      <GlowingCards enableGlow enableHover className="gap-6">
        <GlowingCard glowColor="#10b981">
          <h3 className="text-white text-xl font-bold">Performance</h3>
          <p className="text-white/80">Lightning-fast components...</p>
        </GlowingCard>
        <GlowingCard glowColor="#8b5cf6">
          <h3 className="text-white text-xl font-bold">Design</h3>
          <p className="text-white/80">Beautiful, accessible components...</p>
        </GlowingCard>
      </GlowingCards>
    </div>
  );
};

export default MyService;
