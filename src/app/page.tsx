"use client"; // Mark this component as a Client Component

import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('/api/groq', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: inputValue }
          ]
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed. Please try again.");
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content || "Received response");
      if (!data.choices || !data.choices[0]) {
        throw new Error("Invalid response format from API");
      }
    } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong.");

      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-pink-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        👗 Hi, I&apos;m your <span className="text-pink-600">StyleBot</span> ❤👌
      </h1>

      {/* Chat Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="How may I assist you today..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
          disabled={isLoading}
        />
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
        <p className="mt-4 text-red-600 font-semibold">{error}</p>
      )}

      {/* Response Display */}
      {response && (
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md text-gray-700 dark:text-gray-300">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
