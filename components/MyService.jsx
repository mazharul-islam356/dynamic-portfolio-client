"use client";

import ChainCarousel from "@/src/components/lightswind/chain-carousel";

import React from "react";
import { chainsList } from "./chainsList";

const MyService = () => {
  return (
    <div className="bg-[#0d040e] min-h-screen overflow-hidden p-6">
      <ChainCarousel items={chainsList} />
    </div>
  );
};

export default MyService;
