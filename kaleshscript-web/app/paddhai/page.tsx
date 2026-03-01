import Link from 'next/link';
import Documentation from '../components/Documentation';

export default function PaddhaiPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <header className="bg-dark-surface border-b-2 border-neon-yellow shadow-lg">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4 hover:opacity-80 transition-opacity">
              <div className="w-1 h-8 sm:h-10 bg-neon-yellow rounded-full"></div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-text-primary tracking-tight">
                  KaleshScript
                </h1>
                <p className="text-xs text-neon-yellow font-medium">Delhi ki apni coding language</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link
                href="/kalesh"
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-text-secondary hover:text-text-primary hover:bg-dark-hover text-sm"
              >
                Console
              </Link>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium bg-neon-yellow text-dark-bg text-sm">
                Docs
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto">
        <Documentation />
      </main>
    </div>
  );
}
