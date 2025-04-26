"use client";

import { useState } from "react";
import { Home, MapPin, Calendar, AlertTriangle, ArrowRight, Plus, Pencil, Trash2, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const propertyData = [
  {
    id: "prop1",
    name: "Lake View Apartment",
    address: "42 Lake View Road, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
    type: "Apartment",
    status: "Good",
    lastInspection: "2025-03-15",
    nextInspection: "2025-04-15",
    issues: 0,
    image: "/api/placeholder/400/250"
  },
  {
    id: "prop2",
    name: "Family Villa",
    address: "8 Palm Avenue, Juhu",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400049",
    type: "Villa",
    status: "Attention",
    lastInspection: "2025-03-05",
    nextInspection: "2025-04-05",
    issues: 2,
    image: "/api/placeholder/400/250"
  },
  {
    id: "prop3",
    name: "Heritage Home",
    address: "15 Garden Street, Adyar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600020",
    type: "House",
    status: "Good",
    lastInspection: "2025-02-20",
    nextInspection: "2025-05-20",
    issues: 0,
    image: "/api/placeholder/400/250"
  },
  {
    id: "prop4",
    name: "Commercial Office",
    address: "78 Business Park, Sector 15",
    city: "Gurgaon",
    state: "Haryana",
    pincode: "122001",
    type: "Commercial",
    status: "Urgent",
    lastInspection: "2025-03-25",
    nextInspection: "2025-04-10",
    issues: 3,
    image: "/api/placeholder/400/250"
  }
];

export default function PropertiesDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  // Filter properties based on search and filters
  const filteredProperties = propertyData.filter(property => {
    const matchesSearch = 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus ? property.status === filterStatus : true;
    const matchesType = filterType ? property.type === filterType : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Attention":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Properties</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and monitor your properties in India
              </p>
            </div>
            <Link 
              href="/dashboard/properties/add" 
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Add Property
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <select
                  value={filterStatus || ""}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">All Statuses</option>
                  <option value="Good">Good</option>
                  <option value="Attention">Needs Attention</option>
                  <option value="Urgent">Urgent Issues</option>
                </select>
                
                <select
                  value={filterType || ""}
                  onChange={(e) => setFilterType(e.target.value || null)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{property.name}</h3>
                    <div className="relative">
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MoreHorizontal size={18} />
                      </button>
                      {/* Dropdown menu would go here */}
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-2">
                    <MapPin size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {property.address}, {property.city}, {property.state} - {property.pincode}
                    </p>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Home size={16} className="text-gray-400 mr-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">{property.type}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Last Inspection</p>
                      <div className="flex items-center">
                        <Calendar size={14} className="text-gray-400 mr-2" />
                        <p className="text-sm">{new Date(property.lastInspection).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Next Inspection</p>
                      <div className="flex items-center">
                        <Calendar size={14} className="text-gray-400 mr-2" />
                        <p className="text-sm">{new Date(property.nextInspection).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {property.issues > 0 && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-md">
                      <div className="flex items-center">
                        <AlertTriangle size={16} className="text-red-500 mr-2" />
                        <p className="text-sm text-red-600 dark:text-red-400">
                          {property.issues} {property.issues === 1 ? 'issue' : 'issues'} need attention
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Pencil size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <Link href={`/dashboard/properties/${property.id}`} className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium text-sm">
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Home size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No properties found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                {searchTerm || filterStatus || filterType 
                  ? "No properties match your search criteria. Try adjusting your filters." 
                  : "You haven't added any properties yet. Add your first property to get started."}
              </p>
              {!searchTerm && !filterStatus && !filterType && (
                <Link 
                  href="/dashboard/properties/add" 
                  className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Add Your First Property
                </Link>
              )}
            </div>
          )}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Inspections</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {propertyData
                    .sort((a, b) => new Date(a.nextInspection).getTime() - new Date(b.nextInspection).getTime())
                    .slice(0, 3)
                    .map(property => (
                      <tr key={property.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 mr-3">
                              <img className="h-10 w-10 rounded-md object-cover" src={property.image} alt="" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{property.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{property.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{property.city}, {property.state}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">{new Date(property.nextInspection).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">Standard Inspection</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(property.status)}`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/services/property-inspection`} className="text-orange-500 hover:text-orange-600">Reschedule</Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <Link href="/services/property-inspection" className="text-orange-500 hover:text-orange-600 font-medium flex items-center justify-center md:justify-end">
                Schedule New Inspection
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">Property Management Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-orange-500" size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2">Regular Inspections</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Schedule recurring inspections to monitor your property's condition.
              </p>
              <Link href="/services/property-inspection" className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
                Learn More
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="text-orange-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Property Maintenance</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Handle repairs, renovations, and regular maintenance tasks.
              </p>
              <Link href="/services/property-maintenance" className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
                Learn More
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="text-orange-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Tenant Management</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Verification, rent collection, and tenant communication services.
              </p>
              <Link href="/services/tenant-verification" className="text-orange-500 hover:text-orange-600 font-medium flex items-center">
                Learn More
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}