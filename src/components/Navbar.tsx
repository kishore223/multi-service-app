"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const h = () => setShadow(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 h-16 bg-gray-900 transition-shadow ${shadow && "shadow-lg"}`}>
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          <span className="text-orange-400">Trust</span>Route
        </Link>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-300">
          <span className="sr-only">Menu</span>
          <svg className="w-5 h-5" viewBox="0 0 17 14" fill="none">
            <path d="M1 1h15M1 7h15M1 13h15" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        <ul className={`${open ? "block" : "hidden"} md:flex gap-6 text-gray-300`}>
          <li className="relative group">
            <button className="flex items-center md:hover:text-white">
              Services <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg">
              <Link className="block px-4 py-2 hover:bg-gray-700 text-sm" href="/services/compute">Compute</Link>
              <Link className="block px-4 py-2 hover:bg-gray-700 text-sm" href="/services/storage">Storage</Link>
              <Link className="block px-4 py-2 hover:bg-gray-700 text-sm" href="/services/database">Database</Link>
            </div>
          </li>
          <li><Link className="md:hover:text-white" href="/pricing">Pricing</Link></li>
          <li><Link className="md:hover:text-white" href="/support">Support</Link></li>
          <li><Link className="border px-3 py-1 rounded border-orange-500 md:hover:bg-orange-500" href="/login">Sign in</Link></li>
          <li><Link className="px-3 py-1 rounded bg-orange-500 md:hover:bg-orange-600 text-white" href="/register">Create account</Link></li>
        </ul>
      </div>
    </nav>
  );
}
