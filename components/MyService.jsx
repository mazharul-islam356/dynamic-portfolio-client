'use client';


import ChainCarousel from '@/src/components/lightswind/chain-carousel';
import GlowingCards, { GlowingCard } from '@/src/components/lightswind/glowing-cards';
import React from 'react';
import { chainsList } from './chainsList';

const MyService = () => {
  return (
    <div className="bg-black min-h-screen p-6">
      <ChainCarousel items={chainsList} />
    </div>
  );
};

export default MyService;
