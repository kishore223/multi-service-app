// src/app/components/navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl w-full flex items-center justify-between mx-auto px-4 h-full">
        <Link href="/" className="flex items-center h-full">
          <span className="self-center text-2xl font-bold tracking-tight text-white transition-colors">
            <span className="text-orange-400">Trust</span>Route
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 rounded-full text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop & mobile menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:block w-full md:w-auto transition-all duration-300 ease-in-out`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-4 md:p-0 mt-4 md:mt-0 border border-gray-700 md:border-0 rounded-lg bg-gray-800 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {/* Services dropdown */}
            <li className="relative group">
              <button className="flex items-center py-2 px-3 text-gray-300 rounded md:p-0 md:hover:text-white">
                Services <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                <div className="py-1">
                  <Link href="/services/compute" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    Compute
                  </Link>
                  <Link href="/services/storage" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    Storage
                  </Link>
                  <Link href="/services/database" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    Database
                  </Link>
                </div>
              </div>
            </li>

            {/* Simple nav links */}
            <li>
              <Link href="/pricing" className="inline-flex items-center justify-center py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/documentation" className="inline-flex items-center justify-center py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-white">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/support" className="inline-flex items-center justify-center py-2 px-3 text-gray-300 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-white">
                Support
              </Link>
            </li>

            {/* Action buttons */}
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center py-2 px-4 border border-orange-500 text-gray-300 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="inline-flex items-center justify-center py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Create Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
