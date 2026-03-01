'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
}

export default function LandingPage() {
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);

  const delhiWords = [
    'bsdk', 'bc', 'chutiye', 'lawde', 'bhauk', 'kaand', 
    'nikal', 'lafda', 'sahi', 'bekaar', 'agar', 'warna',
    'jab tak', 'maa', 'ruk jaa', 'aage baddh', 'mood dekh',
    'pakad', 'try kar', 'dimag', 'bakchodi'
  ];

  useEffect(() => {
    const words: FloatingWord[] = [];
    for (let i = 0; i < 40; i++) { // Increased from 25 to 40
      words.push({
        id: i,
        text: delhiWords[Math.floor(Math.random() * delhiWords.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 12,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.3, // Increased to 0.3-0.8 range
        offsetX: 0,
        offsetY: 0,
      });
    }
    setFloatingWords(words);

    const interval = setInterval(() => {
      setFloatingWords(prev =>
        prev.map(word => ({
          ...word,
          y: word.y > 100 ? -10 : word.y + word.speed,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    setFloatingWords(prev =>
      prev.map(word => {
        const dx = x - word.x;
        const dy = y - word.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 20) {
          const force = (20 - distance) / 20;
          const angle = Math.atan2(dy, dx);
          return {
            ...word,
            offsetX: -Math.cos(angle) * force * 5,
            offsetY: -Math.sin(angle) * force * 5,
          };
        } else {
          return {
            ...word,
            offsetX: word.offsetX * 0.95,
            offsetY: word.offsetY * 0.95,
          };
        }
      })
    );
  };

  return (
    <div 
      className="min-h-screen bg-dark-bg relative overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingWords.map(word => (
          <div
            key={word.id}
            className="absolute font-mono font-bold text-neon-yellow transition-all duration-300 ease-out"
            style={{
              left: `${word.x + word.offsetX}%`,
              top: `${word.y + word.offsetY}%`,
              fontSize: `${word.size}px`,
              opacity: word.opacity,
              transform: 'rotate(-15deg)',
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/30 via-dark-bg/60 to-dark-bg/80 pointer-events-none"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="mb-8 flex justify-center">
          <div className="inline-block text-center">
            <h1 className="text-7xl md:text-9xl font-black text-neon-yellow mb-4 font-righteous" style={{ 
              textShadow: '4px 4px 0px rgba(0, 0, 0, 0.3), 6px 6px 0px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.02em',
              transform: 'rotate(-2deg)'
            }}>
              KaleshScript
            </h1>
          </div>
        </div>

        <p className="text-2xl md:text-3xl text-neon-yellow font-bold mb-4">
          Dear Dilli waalon ke liye personal relatable fun toy programming language
        </p>
        
        <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Yeh language dilli se hai behenchod. Baap se bakchodi nahi
        </p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/kalesh"
            className="px-10 py-5 bg-neon-yellow text-dark-bg font-bold text-xl rounded-xl border-2 border-neon-yellow hover:bg-dark-bg hover:text-neon-yellow transition-all duration-300"
          >
            Kalesh Kar
          </Link>
          
          <a
            href="https://github.com/darthvader58/kaleshscript"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-dark-elevated border-2 border-dark-border text-text-primary font-semibold text-lg rounded-lg hover:border-neon-yellow hover:bg-dark-hover transition-all"
          >
            View Source
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow mb-2">16+</div>
            <div className="text-sm text-text-tertiary">Examples</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow mb-2">100%</div>
            <div className="text-sm text-text-tertiary">Delhi Slang</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow mb-2">1000%</div>
            <div className="text-sm text-text-tertiary">Bakchodi</div>
          </div>
        </div>

        <div className="mt-16 text-text-tertiary text-sm">
          <p>Tere baap ne banaya hai, pyaar se.</p>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-neon-yellow/20 rounded-full animate-pulse-glow"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-street-purple/20 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-neon-yellow/10 rounded-lg rotate-45 animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-20 w-24 h-24 border-4 border-neon-yellow/20 rounded-lg animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}
