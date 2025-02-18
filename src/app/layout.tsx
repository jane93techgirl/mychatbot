"use client"; // Mark this component as a Client Component

import React from "react";
import Link from "next/link";
import "./globals.css"; // Import global styles

interface LayoutProps {
  children: React.ReactNode; // Children components (pages)
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-pink-50 text-pink-900">
        {/* Header */}
        <header className="bg-pink-600 text-white py-4 shadow-lg sticky top-0 z-10">
          <nav className="container mx-auto flex justify-center">
            <ul className="flex gap-6 text-lg font-medium">
              <li>
                <Link href="/" className="hover:text-pink-300 transition">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-pink-600 text-white text-center py-4 shadow-lg">
          <p>&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
