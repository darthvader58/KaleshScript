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
      className="min-h-screen bg-dark-bg relative overflow-hidden flex items-center justify-center px-4"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingWords.map(word => (
          <div
            key={word.id}
            className="absolute font-mono font-bold text-neon-yellow transition-all duration-300 ease-out hidden sm:block"
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

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl w-full">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="inline-block text-center">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-neon-yellow mb-4 font-righteous" style={{ 
              textShadow: '4px 4px 0px rgba(0, 0, 0, 0.3), 6px 6px 0px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.02em',
              transform: 'rotate(-2deg)'
            }}>
              KaleshScript
            </h1>
          </div>
        </div>

        
        
        <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
          Yeh language dilli se hai bc. Maze karo, aur baap se bakchodi nahi. Intended ONLY for entertainment purposes!
        </p>


        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
          <Link
            href="/kalesh"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-neon-yellow text-dark-bg font-bold text-lg sm:text-xl rounded-xl border-2 border-neon-yellow hover:bg-dark-bg hover:text-neon-yellow transition-all duration-300 text-center"
          >
            Kalesh Kar
          </Link>
          
          <a
            href="https://github.com/darthvader58/kaleshscript"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-dark-elevated border-2 border-dark-border text-text-primary font-semibold text-base sm:text-lg rounded-lg hover:border-neon-yellow hover:bg-dark-hover transition-all text-center"
          >
            View Source
          </a>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-neon-yellow mb-2">16+</div>
            <div className="text-xs sm:text-sm text-text-tertiary">Examples</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-neon-yellow mb-2">100%</div>
            <div className="text-xs sm:text-sm text-text-tertiary">Delhi Slang</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-neon-yellow mb-2">1000%</div>
            <div className="text-xs sm:text-sm text-text-tertiary">Bakchodi</div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 max-w-xl mx-auto px-4">
          <div className="bg-dark-elevated/50 border border-neon-yellow/30 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
            <p className="text-text-secondary text-xs sm:text-sm text-center mb-2">Install globally:</p>
            <div className="bg-dark-bg/80 rounded px-3 py-2">
              <code className="text-neon-yellow text-xs sm:text-sm font-mono block text-center">
                npm i -g kaleshscript
              </code>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-text-tertiary text-xs sm:text-sm px-4">
          <p>Tere baap ne banayi hai, pyaar se ❤️. Entertainment purpose only! NOT FOR KIDS.</p>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-16 sm:w-20 h-16 sm:h-20 border-4 border-neon-yellow/20 rounded-full animate-pulse-glow hidden sm:block"></div>
      <div className="absolute bottom-10 right-10 w-24 sm:w-32 h-24 sm:h-32 border-4 border-street-purple/20 rounded-full animate-pulse-glow hidden sm:block" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-12 sm:w-16 h-12 sm:h-16 bg-neon-yellow/10 rounded-lg rotate-45 animate-pulse-glow hidden sm:block" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-20 w-20 sm:w-24 h-20 sm:h-24 border-4 border-neon-yellow/20 rounded-lg animate-pulse-glow hidden sm:block" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
}
