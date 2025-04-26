"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const groups = [
  {
    name: "Logistics",
    icon: "📦",
    items: [
      { label: "Courier to India", href: "/services/courier-to-india" },
      { label: "Domestic Courier", href: "/services/domestic-courier" },
      { label: "Package Storage", href: "/services/package-storage" }
    ]
  },
  {
    name: "Property Care",
    icon: "🏠",
    items: [
      { label: "Property Inspection", href: "/services/property-inspection" },
      { label: "Photo / Video Tour", href: "/services/property-media" },
      { label: "Tenant Verification", href: "/services/tenant-verification" }
    ]
  },
  // …add more groups as needed
] as const;

export default function Sidebar() {
  const [open, setOpen] = useState<string[]>([]);

  return (
    <aside className="fixed top-16 bottom-0 left-0 w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto">
      <div className="p-4 border-b border-gray-800 text-white font-bold">Console Home</div>
      {groups.map(({ name, icon, items }) => (
        <div key={name}>
          <button
            onClick={() => setOpen(o => o.includes(name) ? o.filter(n => n !== name) : [...o, name])}
            className="w-full flex justify-between items-center text-gray-300 px-4 py-2 hover:bg-gray-800"
          >
            <span><span className="mr-2">{icon}</span>{name}</span>
            {open.includes(name) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {open.includes(name) && (
            <ul className="bg-gray-800/50">
              {items.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="block px-8 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}
