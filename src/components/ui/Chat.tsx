"use client";

import { useState } from "react";

export function Chat() {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 w-full h-full bg-pink-50 dark:bg-pink-950 transition-colors duration-300">
      <div className="h-full flex flex-col">
        <div className="p-4 bg-pink-600 dark:bg-pink-900 flex justify-between items-center">
          <h3 className="font-semibold text-white">Stylebot Chat</h3>
          <button 
            className="p-2 rounded-full bg-pink-700 dark:bg-pink-800 hover:bg-pink-800 dark:hover:bg-pink-900 transition-colors"
            onClick={() => {
              const isDark = document.documentElement.classList.toggle('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-pink-900">
          <div className="space-y-2">
            <div className="text-right">
              <div className="inline-block bg-pink-100 dark:bg-pink-900 rounded-lg px-4 py-2">
                Hello! How can I help you today?
              </div>
            </div>
            <div className="text-left">
              <div className="inline-block bg-pink-600 dark:bg-pink-700 text-pink-500 rounded-lg px-4 py-2">
                User message
              </div>
            </div>
            <div className="text-left">
              <div className="inline-block bg-pink-600 dark:bg-pink-700 text-pink-500 rounded-lg px-4 py-2">
                User message
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-pink-600 dark:bg-pink-900">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border border-pink-300 dark:border-pink-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-pink-800 dark:text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-pink-700 text-white px-4 py-2 rounded-lg hover:bg-pink-800 transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
