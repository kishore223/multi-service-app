"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  Home, 
  MapPin, 
  FileText, 
  Camera, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  Phone, 
  MoreHorizontal, 
  Pencil, 
  Share2, 
  Download
} from "lucide-react";
import Link from "next/link";

// This would normally come from an API call based on the property ID
const propertyData = {
  id: "prop2",
  name: "Family Villa",
  address: "8 Palm Avenue, Juhu",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400049",
  type: "Villa",
  status: "Attention",
  area: "2400",
  areaUnit: "sqft",
  bedrooms: "4",
  bathrooms: "3",
  yearBuilt: "2012",
  occupancyStatus: "family",
  description: "Spacious family villa with a garden, located in the premium Juhu area. The property features modern amenities and is in a gated community with 24/7 security.",
  lastInspection: "2025-03-05",
  nextInspection: "2025-04-05",
  issues: [
    {
      id: "issue1",
      title: "Water seepage in master bathroom",
      description: "Minor water seepage observed on the ceiling of the master bathroom. Needs inspection by a plumber.",
      priority: "medium",
      dateReported: "2025-03-05",
      status: "pending"
    },
    {
      id: "issue2",
      title: "Main gate lock malfunction",
      description: "The electronic lock on the main gate is not functioning properly. Sometimes doesn't open with the key card.",
      priority: "high",
      dateReported: "2025-03-05",
      status: "pending"
    }
  ],
  localContact: {
    name: "Raj Sharma",
    phone: "+91 98765 43210",
    relation: "Family Member"
  },
  inspectionHistory: [
    {
      date: "2025-03-05",
      type: "Standard Inspection",
      findings: "Generally good condition with two issues noted",
      reportUrl: "#"
    },
    {
      date: "2024-12-05",
      type: "Standard Inspection",
      findings: "Good condition, no issues found",
      reportUrl: "#"
    },
    {
      date: "2024-09-05",
      type: "Comprehensive Inspection",
      findings: "Minor maintenance recommended for garden area",
      reportUrl: "#"
    }
  ],
  images: [
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
    "/api/placeholder/800/500"
  ]
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'inspections' | 'documents'>('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // In a real application, you would fetch the property data based on params.id
  // const { id } = params;
  
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
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <Link href="/dashboard/properties" className="mr-4 p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold">{propertyData.name}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(propertyData.status)}`}>
              {propertyData.status}
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors">
              <Pencil size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors">
              <Share2 size={18} />
            </button>
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors">
                <MoreHorizontal size={18} />
              </button>
              {/* Dropdown menu would go here */}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - left 2/3 */}
          <div className="lg:col-span-2">
            {/* Photo gallery */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative h-80">
                <img 
                  src={propertyData.images[activeImageIndex]} 
                  alt={`${propertyData.name} - Image ${activeImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                {/* Photo navigation arrows would go here */}
              </div>
              <div className="p-4 flex gap-2 overflow-x-auto">
                {propertyData.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                      activeImageIndex === index 
                        ? "border-orange-500" 
                        : "border-transparent"
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
                <button className="w-16 h-16 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <Camera size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'overview'
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('issues')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'issues'
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Issues
                    {propertyData.issues.length > 0 && (
                      <span className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded-full text-xs">
                        {propertyData.issues.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('inspections')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'inspections'
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Inspections
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'documents'
                        ? 'border-orange-500 text-orange-600 dark:text-orange-400' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Documents
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Property Type</p>
                          <p className="font-medium">{propertyData.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
                          <p className="font-medium">{propertyData.area} {propertyData.areaUnit}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Year Built</p>
                          <p className="font-medium">{propertyData.yearBuilt}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                          <p className="font-medium">{propertyData.bedrooms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                          <p className="font-medium">{propertyData.bathrooms}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Occupancy</p>
                          <p className="font-medium capitalize">{propertyData.occupancyStatus}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Description</h2>
                      <p className="text-gray-700 dark:text-gray-300">{propertyData.description}</p>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-semibold mb-4">Local Contact</h2>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-start">
                          <div className="bg-gray-200 dark:bg-gray-600 rounded-full p-3 mr-4">
                            <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{propertyData.localContact.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{propertyData.localContact.relation}</p>
                            <div className="flex items-center mt-2">
                              <Phone className="h-4 w-4 text-gray-500 mr-1" />
                              <p className="text-sm">{propertyData.localContact.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'issues' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Reported Issues</h2>
                      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm">
                        Report New Issue
                      </button>
                    </div>
                    
                    {propertyData.issues.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No issues reported</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                          Your property is in good condition. If you notice any issues, please report them.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {propertyData.issues.map(issue => (
                          <div key={issue.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{issue.title}</h3>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityColor(issue.priority)}`}>
                                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{issue.description}</p>
                            <div className="flex justify-between items-center text-sm">
                              <p className="text-gray-500 dark:text-gray-400">
                                Reported on {new Date(issue.dateReported).toLocaleDateString()}
                              </p>
                              <span className="capitalize">
                                {issue.status === 'pending' 
                                  ? <span className="text-yellow-600 dark:text-yellow-400">Pending</span> 
                                  : <span className="text-green-600 dark:text-green-400">Resolved</span>}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'inspections' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Inspection History</h2>
                      <Link 
                        href="/services/property-inspection" 
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm"
                      >
                        Schedule Inspection
                      </Link>
                    </div>
                    
                    <div className="relative">
                      {/* Timeline vertical line */}
                      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      
                      {/* Upcoming inspection */}
                      <div className="mb-6 ml-12 relative">
                        <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <p className="font-medium text-blue-700 dark:text-blue-400 mb-1">Upcoming Inspection</p>
                          <p className="text-sm text-blue-600 dark:text-blue-300">Scheduled for {new Date(propertyData.nextInspection).toLocaleDateString()}</p>
                          <div className="flex gap-3 mt-3">
                            <button className="text-sm text-blue-700 dark:text-blue-400 font-medium">Reschedule</button>
                            <button className="text-sm text-blue-700 dark:text-blue-400 font-medium">Cancel</button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Past inspections */}
                      {propertyData.inspectionHistory.map((inspection, index) => (
                        <div key={index} className="mb-6 ml-12 relative">
                          <div className="absolute -left-12 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex justify-between mb-1">
                              <p className="font-medium">{inspection.type}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(inspection.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{inspection.findings}</p>
                            <div className="flex gap-3">
                              <a href={inspection.reportUrl} className="text-sm text-orange-500 dark:text-orange-400 font-medium flex items-center">
                                <FileText className="h-4 w-4 mr-1" />
                                View Report
                              </a>
                              <button className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'documents' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Property Documents</h2>
                      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-sm">
                        Upload Document
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No documents uploaded yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                          Upload important property documents like deeds, tax papers, and ownership certificates for safekeeping.
                        </p>
                        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium rounded-lg text-sm">
                          Upload First Document
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar - right 1/3 */}
          <div>
            {/* Property address card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Location</h2>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {propertyData.address}, {propertyData.city}, {propertyData.state} - {propertyData.pincode}
                  </p>
                </div>
                <div className="mt-3 h-40 bg-gray-200 dark:bg-gray-700 rounded-lg">
                  {/* Map would go here */}
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Map preview</p>
                  </div>
                </div>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${propertyData.address}, ${propertyData.city}, ${propertyData.state}, ${propertyData.pincode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-3 text-orange-500 hover:text-orange-600 font-medium text-sm"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
            
            {/* Inspection status card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Inspection Status</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">Last Inspection</p>
                    </div>
                    <p className="font-medium">{new Date(propertyData.lastInspection).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">Next Inspection</p>
                    </div>
                    <p className="font-medium">{new Date(propertyData.nextInspection).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">Issues Reported</p>
                    </div>
                    <p className="font-medium">{propertyData.issues.length}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="/services/property-inspection"
                    className="block w-full py-2 bg-orange-500 hover:bg-orange-600 text-center text-white font-medium rounded-lg"
                  >
                    Schedule Next Inspection
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Quick actions card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link 
                    href={`/dashboard/properties/${propertyData.id}/edit`}
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Pencil className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Edit Property Details</span>
                  </Link>
                  <Link 
                    href="/services/property-maintenance"
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Request Maintenance</span>
                  </Link>
                  <Link 
                    href="/services/tenant-verification"
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Tenant Verification</span>
                  </Link>
                  <Link 
                    href="/services/property-media"
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Camera className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Request Photo/Video Tour</span>
                  </Link>
                  <button 
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors w-full text-left"
                  >
                    <Share2 className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Share Property Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}