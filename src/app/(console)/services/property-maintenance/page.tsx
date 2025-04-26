"use client";

import { useState } from "react";
import { Hammer, Shield, Clock, Check, Wrench, Zap, Paintbrush } from "lucide-react";
import Link from "next/link";

// Remove metadata export with "use client" directive
// Next.js requires metadata to be defined in a separate file or in a server component

const maintenanceServices = [
  {
    id: "emergency",
    title: "Emergency Repairs",
    description: "Immediate response for critical issues that pose safety risks or can cause significant damage",
    price: "Starting at ₹1,999",
    responseTime: "2-4 hours",
    features: [
      "24/7 availability",
      "Plumbing emergencies",
      "Electrical failures",
      "Gas leaks",
      "Water damage control",
      "Urgent lock/security issues"
    ]
  },
  {
    id: "standard",
    title: "Standard Repairs",
    description: "Regular maintenance and repairs for non-urgent property issues",
    price: "Starting at ₹999",
    responseTime: "24-48 hours",
    features: [
      "Plumbing repairs",
      "Electrical fixes",
      "Appliance repairs",
      "Furniture assembly",
      "Door and window repairs",
      "Handyman services"
    ]
  },
  {
    id: "renovation",
    title: "Renovation Projects",
    description: "Comprehensive home improvement and renovation services",
    price: "Custom quote",
    responseTime: "Based on project scope",
    features: [
      "Kitchen remodeling",
      "Bathroom renovation",
      "Painting services",
      "Flooring installation",
      "Custom carpentry",
      "Interior design consultations"
    ]
  }
];

export default function PropertyMaintenancePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    propertyId: "",
    serviceType: "",
    description: "",
    urgency: "normal",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setFormData(prev => ({
      ...prev,
      serviceType: serviceId
    }));
    setShowRequestForm(true);
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    alert("Your maintenance request has been submitted! Our team will contact you shortly to confirm the details.");
    
    // Reset form
    setShowRequestForm(false);
    setSelectedService(null);
    setFormData({
      propertyId: "",
      serviceType: "",
      description: "",
      urgency: "normal",
      preferredDate: "",
      preferredTime: "",
      additionalNotes: ""
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Property Maintenance Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Professional maintenance services for your property in India while you're in the USA.
            From emergency repairs to renovation projects, we've got you covered.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center">
              <Shield className="text-orange-500 mr-2" size={20} />
              <span>Vetted professionals</span>
            </div>
            <div className="flex items-center">
              <Check className="text-orange-500 mr-2" size={20} />
              <span>Quality guarantee</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-orange-500 mr-2" size={20} />
              <span>Timely service</span>
            </div>
            <div className="flex items-center">
              <Hammer className="text-orange-500 mr-2" size={20} />
              <span>All maintenance needs</span>
            </div>
          </div>
          <Link href="#services" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            View Maintenance Services
          </Link>
        </header>

        <section id="how-it-works" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Request</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Submit a maintenance request through your dashboard with details of the issue.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Assessment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team evaluates the request and provides a cost estimate for approval.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Service</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our professional maintenance team completes the required work at your property.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Report</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive a detailed report with before/after photos and documentation of work done.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Maintenance Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {maintenanceServices.map(service => (
              <div 
                key={service.id}
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 transition-all ${
                  selectedService === service.id 
                    ? "border-orange-500 transform scale-[1.02]" 
                    : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-orange-500 mb-4">{service.price}</div>
                
                <div className="flex items-center mb-3 text-sm">
                  <Clock className="text-gray-400 mr-2" size={16} />
                  <span>Response time: {service.responseTime}</span>
                </div>
                
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleServiceSelect(service.id)}
                  className={`w-full py-2 rounded-lg font-medium ${
                    selectedService === service.id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {selectedService === service.id ? "Selected" : "Select Service"}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Maintenance Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-blue-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Electrical Services</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Wiring and circuit repairs</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Fixture installation</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Power outage troubleshooting</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Electrical inspections</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
                  <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
                  <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
                  <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
                  <path d="M12 13.5V22"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Plumbing Services</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Leak detection & repair</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Pipe installation & replacement</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Drain cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Water heater services</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <Paintbrush className="text-blue-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Renovation Services</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Interior & exterior painting</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Flooring installation</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Kitchen & bathroom remodeling</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Custom carpentry</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <Wrench className="text-blue-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">General Handyman</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Furniture assembly</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Door & window repairs</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Lock installation & repair</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Small repairs & fixes</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">HVAC Services</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">AC installation & repair</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Heating system maintenance</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Air quality improvement</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Ventilation solutions</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <svg className="text-blue-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v8"></path>
                  <path d="M5.2 11 12 16l6.8-5"></path>
                  <path d="M3 16.5h18"></path>
                  <path d="M3 21h18"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Outdoor & Garden</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Garden maintenance</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Landscaping services</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Fence repairs & installation</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={14} />
                  <span className="text-sm">Outdoor lighting solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {showRequestForm && (
          <section id="request-form" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-16">
            <h2 className="text-2xl font-bold mb-6">Request Maintenance Service</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              You've selected: <span className="font-medium">{maintenanceServices.find(s => s.id === selectedService)?.title}</span>
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="propertyId" className="block text-sm font-medium mb-1">
                  Select Property
                </label>
                <select
                  id="propertyId"
                  name="propertyId"
                  required
                  value={formData.propertyId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="">Select a property</option>
                  <option value="prop1">Lake View Apartment, Bangalore</option>
                  <option value="prop2">Family Villa, Mumbai</option>
                  <option value="prop3">Heritage Home, Chennai</option>
                  <option value="prop4">Commercial Office, Gurgaon</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Describe the Issue/Requirement
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Please provide details about the maintenance issue or renovation requirements..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Urgency Level
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="low"
                      checked={formData.urgency === "low"}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="ml-2">Low (Can wait)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="normal"
                      checked={formData.urgency === "normal"}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="ml-2">Normal (Within a week)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="urgency"
                      value="high"
                      checked={formData.urgency === "high"}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500 h-4 w-4"
                    />
                    <span className="ml-2">High (ASAP)</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium mb-1">
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Select Time</option>
                    <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                    <option value="Afternoon (12PM-3PM)">Afternoon (12PM-3PM)</option>
                    <option value="Evening (3PM-6PM)">Evening (3PM-6PM)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Any additional information, access instructions, or specific requests..."
                ></textarea>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowRequestForm(false);
                    setSelectedService(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </section>
        )}

        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">How quickly can you respond to maintenance requests?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our response time varies based on the service type and urgency. Emergency services are addressed within 2-4 hours, standard repairs within 24-48 hours, and renovation projects are scheduled based on scope and availability.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Do I need to be present during the maintenance work?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, you don't need to be present. Our team will coordinate with your local contact person who can provide access to the property. We'll handle everything and provide you with a detailed report afterward.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">How are maintenance costs calculated?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                For emergency and standard repairs, we have base rates plus material costs. For renovation projects, we provide a detailed quote after assessing the requirements. All costs are transparently communicated before any work begins, and you'll have final approval.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">What qualifications do your maintenance professionals have?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our maintenance professionals are licensed, insured, and have undergone thorough background checks. They have a minimum of 5 years of experience in their respective fields and regularly receive training on the latest techniques and safety standards.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Do you provide a warranty for your services?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, all our repair and maintenance work comes with a 90-day warranty. Renovation projects include a 1-year warranty on workmanship. Any issues that arise within the warranty period will be addressed at no additional cost.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Can you help with urgent emergency issues outside business hours?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, our emergency service team is available 24/7, including weekends and holidays. For critical issues like water leaks, electrical failures, or security emergencies, we ensure prompt response regardless of the time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to maintain your property?</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Select a maintenance service or contact us to discuss custom requirements for your property.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#services" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg">
              View Services
            </a>
            <Link href="/support" className="px-6 py-3 border border-gray-300 rounded-lg font-medium dark:border-gray-600">
              Contact Support
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}