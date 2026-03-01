'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { examples } from '@/lib/examples';
import { KaleshScriptInterpreter } from '@/lib/interpreter';
import Documentation from '../components/Documentation';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function KaleshPage() {
  const [code, setCode] = useState(examples[0].code);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState<'playground' | 'docs'>('playground');
  const [selectedExample, setSelectedExample] = useState(examples[0].id);

  const runCode = () => {
    const interpreter = new KaleshScriptInterpreter();
    const result = interpreter.execute(code);
    
    if (result.error) {
      setOutput(result.output + '\n\n' + result.error);
    } else {
      setOutput(result.output || 'Program executed successfully!');
    }
  };

  const loadExample = (exampleId: string) => {
    const example = examples.find(e => e.id === exampleId);
    if (example) {
      setCode(example.code);
      setSelectedExample(exampleId);
      setOutput('');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header with Delhi street vibes */}
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
              <button
                onClick={() => setActiveTab('playground')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-sm ${
                  activeTab === 'playground'
                    ? 'bg-neon-yellow text-dark-bg'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-hover'
                }`}
              >
                Console
              </button>
              <a
                href="/paddhai"
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-text-secondary hover:text-text-primary hover:bg-dark-hover text-sm"
              >
                Docs
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto">
        {activeTab === 'playground' ? (
          <div className="flex flex-col lg:flex-row h-[calc(100vh-88px)] lg:h-[calc(100vh-88px)]">
            {/* Examples Sidebar with street style */}
            <div className="w-full lg:w-72 bg-dark-surface border-b lg:border-b-0 lg:border-r border-dark-border overflow-y-auto max-h-48 lg:max-h-none">
              <div className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div className="w-1 h-5 sm:h-6 bg-gradient-street rounded-full"></div>
                  <h2 className="text-xs sm:text-sm font-bold text-text-primary uppercase tracking-wider">
                    Examples
                  </h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {examples.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => loadExample(example.id)}
                      className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all border text-xs sm:text-sm ${
                        selectedExample === example.id
                          ? 'bg-dark-elevated border-neon-yellow text-text-primary shadow-md'
                          : 'bg-dark-bg border-dark-border text-text-secondary hover:bg-dark-hover hover:border-dark-border hover:text-text-primary'
                      }`}
                    >
                      <div className="font-semibold mb-1">{example.title}</div>
                      <div className="text-xs text-text-tertiary hidden sm:block">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor and Output */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Editor */}
              <div className="flex-1 flex flex-col border-b border-dark-border min-h-0">
                <div className="bg-dark-surface px-3 sm:px-5 py-2 sm:py-3 flex justify-between items-center border-b border-dark-border">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex space-x-1 sm:space-x-1.5">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="font-medium text-text-primary text-xs sm:text-sm ml-2">code.ks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setOutput('')}
                      className="bg-dark-elevated hover:bg-dark-hover border border-dark-border px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-text-secondary hover:text-text-primary text-xs sm:text-sm transition-all"
                    >
                      Reset
                    </button>
                    <button
                      onClick={runCode}
                      className="bg-neon-yellow hover:bg-neon-yellow/80 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-dark-bg text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
                    >
                      Run
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-[#1e1e1e] min-h-0">
                  <Editor
                    height="100%"
                    defaultLanguage="plaintext"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 12,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
                      padding: { top: 12, bottom: 12 },
                      lineHeight: 20,
                      fontLigatures: true,
                    }}
                  />
                </div>
              </div>

              {/* Output Console */}
              <div className="h-48 sm:h-64 flex flex-col bg-dark-surface">
                <div className="bg-dark-elevated px-3 sm:px-5 py-2 sm:py-3 border-b border-dark-border flex items-center space-x-2 sm:space-x-3">
                  <div className="w-1 h-4 sm:h-5 bg-neon-yellow rounded-full"></div>
                  <span className="font-semibold text-text-primary text-xs sm:text-sm">Console Output</span>
                </div>
                <div className="flex-1 p-3 sm:p-4 overflow-auto bg-dark-bg">
                  {output ? (
                    <pre className="text-text-primary font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">{output}</pre>
                  ) : (
                    <div className="text-text-tertiary text-xs sm:text-sm italic">Run your code to see output...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Documentation />
        )}
      </main>
    </div>
  );
}
