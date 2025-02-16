"use client"; // Mark this component as a Client Component

import React, { useState } from "react";
import Link from "next/link";
import "./globals.css"; // Import global styles

// Define the props for the layout component
interface LayoutProps {
  children: React.ReactNode; // Children components (pages)
}

export default function RootLayout({ children }: LayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat visibility
  const [inputValue, setInputValue] = useState("find a house"); // State for user input
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]); // State for chat messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  // Function to handle sending a message to OpenAI
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return; // Ignore empty messages

    setIsLoading(true);
    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat
    setInputValue(""); // Clear input field

    try {
      // Call OpenAI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from OpenAI");
      }

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, assistantMessage]); // Add assistant response to chat
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="bg-gray-800 text-white py-4 shadow-lg">
          <nav className="container mx-auto flex justify-center">
            <ul className="flex gap-6 text-lg font-medium">
              <li>
                <Link href="/" className="hover:text-gray-300 transition">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 min-h-[80vh]">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 mt-8 shadow-lg">
          <p>&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
        </footer>

        {/* Chatbot Floating Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          💬
        </button>

        {/* Chatbot Modal */}
        {isChatOpen && (
          <div className="fixed bottom-24 right-6 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Chat with AI</h2>
              <div className="h-64 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-100 dark:bg-blue-900 text-right"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
                {isLoading && <div className="text-center">Loading...</div>}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}