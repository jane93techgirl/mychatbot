"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>(""); // User's input
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]); // Store both user and assistant messages
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  useEffect(() => {
    // Send a welcome message when the component first mounts
    const welcomeMessage = {
      role: "assistant",
      content: "👋 Welcome! I'm here to assist you with anything. How can I help you today?"
    };
    setMessages([welcomeMessage]); // Set the welcome message in the messages state
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Add user's message to the chat
    const newMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue(""); // Clear input field after sending

    try {
      // Send the full conversation history to the server (including the user's new message)
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage], // Send full history
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed. Please try again.");
      }

      const data = await res.json();
      if (!data.choices || !data.choices[0]) {
        throw new Error("Invalid response format from API");
      }

      // Add assistant's message to the chat
      // Clean up response by removing asterisks and adding proper spacing
      const cleanedContent = data.choices[0].message.content
        .replace(/\*/g, '') // Remove all asterisks
        .replace(/\n/g, '\n\n') // Add double line breaks for better spacing
        .trim();
      const assistantMessage = { role: "assistant", content: cleanedContent || "Received response" };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // If error is an instance of Error
      } else {
        setError("Something went wrong."); // Generic error message
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-pink-100">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        👗 Hi, I&apos;m your <span className="text-pink-600">StyleBot</span> ❤👌
      </h1>

      {/* Chat Display */}
      <div className="w-full max-w-md space-y-4 overflow-y-auto h-96 mb-4 px-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs whitespace-pre-wrap shadow-sm transition-all duration-200 ${
                msg.role === "user"
                  ? "bg-pink-500 text-white hover:shadow-md" // User messages in pink
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 hover:shadow-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center flex justify-center">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Chat Input and Submit Button */}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Input Field */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="How may I assist you today..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:shadow-sm"
            disabled={isLoading}
          />
          {inputValue.length > 0 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {inputValue.length}/200
            </span>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 p-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {isLoading ? "Sending..." : "Submit"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}
