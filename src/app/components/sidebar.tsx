// src/app/components/sidebar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

// Service categories for USA-to-India assistance platform
const serviceCategories = [
  {
    name: "Logistics",
    icon: "📦",
    services: [
      { name: "Courier to India", path: "/services/courier-to-india" },
      { name: "Courier within India", path: "/services/domestic-courier" },
      { name: "Package Storage", path: "/services/package-storage" }
    ]
  },
  {
    name: "Property Care",
    icon: "🏠",
    services: [
      { name: "Property Inspection", path: "/services/property-inspection" },
      { name: "Photo / Video Tour", path: "/services/property-media" },
      { name: "Tenant Verification", path: "/services/tenant-verification" }
    ]
  },
  {
    name: "Document Services",
    icon: "📑",
    services: [
      { name: "Apostille & Attestation", path: "/services/apostille" },
      { name: "PAN / Aadhaar Help", path: "/services/identity-help" },
      { name: "Legal Docs Retrieval", path: "/services/legal-docs" }
    ]
  },
  {
    name: "Finance & Bills",
    icon: "💳",
    services: [
      { name: "Utility Bill Payment", path: "/services/bill-payment" },
      { name: "Tax Filing Support", path: "/services/tax-filing" },
      { name: "Money Transfer", path: "/services/money-transfer" }
    ]
  },
  {
    name: "Personal Concierge",
    icon: "🤝",
    services: [
      { name: "Gift Delivery", path: "/services/gift-delivery" },
      { name: "Medicine Delivery", path: "/services/medicine-delivery" },
      { name: "Appointment Scheduling", path: "/services/appointment-scheduling" }
    ]
  }
];

export default function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string>("");

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prevState =>
      prevState.includes(categoryName)
        ? prevState.filter(name => name !== categoryName)
        : [...prevState, categoryName]
    );
  };

  return (
    <aside className="sidebar flex flex-col bg-gray-900 dark:bg-gray-950 border-r border-gray-800 text-white w-64 h-screen fixed overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="font-bold text-lg flex items-center text-white">
          <span className="bg-indigo-600 p-1 mr-2 rounded text-xs">Services</span>
          Console Home
        </h2>
      </div>

      {/* Recently visited */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm text-gray-400 mb-3">Recently visited</h3>
        <div className="space-y-2 text-sm">
          <Link href="/services/courier-to-india" className="flex items-center text-gray-300 hover:text-white">
            <span className="mr-2">📦</span> Courier to India
          </Link>
          <Link href="/services/property-inspection" className="flex items-center text-gray-300 hover:text-white">
            <span className="mr-2">🏠</span> Property Inspection
          </Link>
        </div>
      </div>

      {/* All services */}
      <nav className="py-2 flex-1">
        <h3 className="px-4 text-sm text-gray-400 mb-2 mt-2">All services</h3>
        <ul>
          {serviceCategories.map(category => (
            <li key={category.name} className="mb-1">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <span className="flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </span>
                {expandedCategories.includes(category.name) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedCategories.includes(category.name) && (
                <ul className="bg-gray-800/50 pl-4">
                  {category.services.map(service => (
                    <li key={service.name}>
                      <Link
                        href={service.path}
                        className={`flex items-center px-4 py-2 text-sm transition-colors ${
                          activePath === service.path
                            ? "bg-indigo-800/30 text-indigo-300 border-l-2 border-indigo-400"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`}
                        onClick={() => setActivePath(service.path)}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Resource groups */}
      <div className="mt-auto p-4 border-t border-gray-800">
        <h3 className="text-sm text-gray-400 mb-3">Resource groups</h3>
        <Link href="/resource-groups" className="flex items-center text-sm text-gray-300 hover:text-white py-1">
          <span className="mr-2">📁</span> My resources
        </Link>
        <div className="mt-4">
          <Link
            href="/support"
            className="text-xs w-full text-center px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded inline-block transition-colors"
          >
            Support Center
          </Link>
        </div>
      </div>
    </aside>
  );
}
