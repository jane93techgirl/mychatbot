import React from "react";
import Link from "next/link";
import "./globals.css"; // Import global styles

// Define the props for the layout component
interface LayoutProps {
  children: React.ReactNode; // Children components (pages)
}

export default function RootLayout({ children }: LayoutProps) {
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
              <li>
                
              </li>
            </ul>
          </nav>
        </header>

        {/* Spinner (Loading Indicator) */}
        <div id="spinner" className="hidden text-center py-4 bg-gray-200 text-gray-700">
          Loading...
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 min-h-[80vh]">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-4 mt-8 shadow-lg">
          <p>&copy; {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}