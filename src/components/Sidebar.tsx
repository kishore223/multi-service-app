"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, Home, Package, Building, Users, FileText, Camera, Clock, Wrench, Key } from "lucide-react";

const groups = [
  {
    name: "Property Management",
    icon: <Building size={18} />,
    items: [
      { label: "My Properties", href: "/dashboard/properties", icon: <Home size={16} /> },
      { label: "Property Inspection", href: "/services/property-inspection", icon: <FileText size={16} /> },
      { label: "Photo/Video Tour", href: "/services/property-media", icon: <Camera size={16} /> },
      { label: "Maintenance Services", href: "/services/property-maintenance", icon: <Wrench size={16} /> },
      { label: "Tenant Verification", href: "/services/tenant-verification", icon: <Users size={16} /> }
    ]
  },
  {
    name: "Logistics",
    icon: <Package size={18} />,
    items: [
      { label: "Courier to India", href: "/services/courier-to-india", icon: <Clock size={16} /> },
      { label: "Domestic Courier", href: "/services/domestic-courier", icon: <Clock size={16} /> },
      { label: "Package Storage", href: "/services/package-storage", icon: <Key size={16} /> }
    ]
  },
] as const;

export default function Sidebar() {
  const [open, setOpen] = useState<string[]>(["Property Management"]); // Open Property Management by default

  return (
    <aside className="fixed top-16 bottom-0 left-0 w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto">
      <div className="p-4 border-b border-gray-800 text-white font-bold">Console Home</div>
      {groups.map(({ name, icon, items }) => (
        <div key={name}>
          <button
            onClick={() => setOpen(o => o.includes(name) ? o.filter(n => n !== name) : [...o, name])}
            className="w-full flex justify-between items-center text-gray-300 px-4 py-2 hover:bg-gray-800"
          >
            <span className="flex items-center">
              <span className="mr-2">{icon}</span>
              {name}
            </span>
            {open.includes(name) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {open.includes(name) && (
            <ul className="bg-gray-800/50">
              {items.map(({ label, href, icon }) => (
                <li key={href}>
                  <Link href={href} className="block px-8 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 flex items-center">
                    <span className="mr-2">{icon}</span>
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