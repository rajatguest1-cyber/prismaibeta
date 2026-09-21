'use client';

import { useChat } from '@ai-sdk/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Send } from 'lucide-react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <header className="fixed top-0 w-full flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur z-10">
        <h1 className="font-semibold text-lg text-blue-600 dark:text-blue-400">Prism AI</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-zinc-600" />}
        </button>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto pt-20 pb-32 px-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center text-zinc-500 mt-28 space-y-2">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">What can Prism AI help with today?</h2>
            <p className="text-sm">Created by Rajat Yadav</p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-white via-white dark:from-zinc-900 dark:via-zinc-900 to-transparent pt-6 pb-4 px-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <input
              className="w-full p-4 pr-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 shadow-md text-sm sm:text-base"
              value={input}
              placeholder="Ask Prism AI anything..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-3 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
