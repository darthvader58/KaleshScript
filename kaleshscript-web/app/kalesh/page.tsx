'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
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
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-1 h-12 bg-neon-yellow rounded-full"></div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                  KaleshScript
                </h1>
                <p className="text-sm text-neon-yellow font-medium">Delhi ki apni coding language</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab('playground')}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === 'playground'
                    ? 'bg-neon-yellow text-dark-bg'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-hover'
                }`}
              >
                Playground
              </button>
              <a
                href="/paddhai"
                className="px-5 py-2.5 rounded-lg font-medium transition-all text-text-secondary hover:text-text-primary hover:bg-dark-hover"
              >
                Paddhai (Docs)
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto">
        {activeTab === 'playground' ? (
          <div className="flex h-[calc(100vh-88px)]">
            {/* Examples Sidebar with street style */}
            <div className="w-72 bg-dark-surface border-r border-dark-border overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-street rounded-full"></div>
                  <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Examples
                  </h2>
                </div>
                <div className="space-y-2">
                  {examples.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => loadExample(example.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all border ${
                        selectedExample === example.id
                          ? 'bg-dark-elevated border-neon-yellow text-text-primary shadow-md'
                          : 'bg-dark-bg border-dark-border text-text-secondary hover:bg-dark-hover hover:border-dark-border hover:text-text-primary'
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{example.title}</div>
                      <div className="text-xs text-text-tertiary">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor and Output */}
            <div className="flex-1 flex flex-col">
              {/* Editor */}
              <div className="flex-1 flex flex-col border-b border-dark-border">
                <div className="bg-dark-surface px-5 py-3 flex justify-between items-center border-b border-dark-border">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="font-medium text-text-primary text-sm ml-2">code.ks</span>
                  </div>
                  <button
                    onClick={runCode}
                    className="bg-neon-yellow hover:bg-neon-yellow/80 px-6 py-2 rounded-lg font-semibold text-dark-bg text-sm transition-all shadow-md hover:shadow-lg"
                  >
                    Run Code
                  </button>
                </div>
                <div className="flex-1 bg-[#1e1e1e]">
                  <Editor
                    height="100%"
                    defaultLanguage="plaintext"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
                      padding: { top: 16, bottom: 16 },
                      lineHeight: 24,
                      fontLigatures: true,
                    }}
                  />
                </div>
              </div>

              {/* Output Console */}
              <div className="h-64 flex flex-col bg-dark-surface">
                <div className="bg-dark-elevated px-5 py-3 border-b border-dark-border flex items-center space-x-3">
                  <div className="w-1 h-5 bg-neon-yellow rounded-full"></div>
                  <span className="font-semibold text-text-primary text-sm">Console Output</span>
                </div>
                <div className="flex-1 p-4 overflow-auto bg-dark-bg">
                  {output ? (
                    <pre className="text-text-primary font-mono text-sm whitespace-pre-wrap leading-relaxed">{output}</pre>
                  ) : (
                    <div className="text-text-tertiary text-sm italic">Run your code to see output...</div>
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
