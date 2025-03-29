'use client'

import HomePage from "@/components/home/home-page"

export default function Home() {
  return (
    <main className="min-h-screen p-4 max-w-2xl mx-auto relative">
      <HomePage />
      <div className="absolute bottom-2 right-2 text-gray-400 text-sm">
        Precision Solutions HL™
      </div>
    </main>
  );
}

