"use client";

import { useState } from "react";
import { CalendarDays, Clock, Home, Check, Clipboard, Camera, FileText, MapPin } from "lucide-react";
import Link from "next/link";



const inspectionTypes = [
  {
    id: "standard",
    title: "Standard Inspection",
    description: "Monthly check of property condition with photos",
    price: "₹1,499",
    frequency: "Monthly",
    duration: "45-60 min",
    features: [
      "Exterior condition assessment",
      "Interior walkthrough",
      "Utility check (electricity, water, gas)",
      "Basic security check",
      "10 high-resolution photos",
      "PDF report within 24 hours"
    ]
  },
  {
    id: "comprehensive",
    title: "Comprehensive Inspection",
    description: "Detailed property assessment with video tour",
    price: "₹2,999",
    frequency: "Quarterly recommended",
    duration: "90-120 min",
    features: [
      "All Standard Inspection features",
      "Detailed structural assessment",
      "Appliance functionality testing",
      "Plumbing & electrical system check",
      "Moisture & pest detection",
      "20 high-resolution photos",
      "10-minute video walkthrough",
      "Interactive report with annotations"
    ]
  },
  {
    id: "tenant",
    title: "Tenant Check-in/out",
    description: "Property condition documentation for rental purposes",
    price: "₹3,499",
    frequency: "Per tenant change",
    duration: "120-150 min",
    features: [
      "All Comprehensive Inspection features",
      "Inventory documentation",
      "Utility meter readings",
      "Tenant interview",
      "Document collection & verification",
      "Rent collection setup",
      "30 high-resolution photos",
      "Legal compliance assessment"
    ]
  }
];

export default function PropertyInspectionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactName: "",
    contactPhone: "",
    notes: "",
    preferredDate: "",
    preferredTime: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowScheduleForm(true);
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById("schedule-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    alert("Your inspection has been scheduled! We'll contact you shortly to confirm the details.");
    
    // Reset form
    setShowScheduleForm(false);
    setSelectedPlan(null);
    setFormData({
      address: "",
      city: "",
      state: "",
      pincode: "",
      contactName: "",
      contactPhone: "",
      notes: "",
      preferredDate: "",
      preferredTime: ""
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Property Inspection Services</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Regular inspections of your property in India while you're in the USA. 
            Get peace of mind with professional documentation and timely updates.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center">
              <Home className="text-orange-500 mr-2" size={20} />
              <span>All property types</span>
            </div>
            <div className="flex items-center">
              <Check className="text-orange-500 mr-2" size={20} />
              <span>Certified inspectors</span>
            </div>
            <div className="flex items-center">
              <Camera className="text-orange-500 mr-2" size={20} />
              <span>Photo/video documentation</span>
            </div>
            <div className="flex items-center">
              <FileText className="text-orange-500 mr-2" size={20} />
              <span>Detailed reports</span>
            </div>
          </div>
          <Link href="#plans" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            View Inspection Plans
          </Link>
        </header>

        <section id="how-it-works" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your inspection plan and schedule a date. Our team will confirm the appointment.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inspection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our certified inspector visits your property and conducts a thorough assessment with documentation.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Report</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive a detailed report with photos, assessment findings, and recommendations within 24 hours.
              </p>
            </div>
          </div>
        </section>

        <section id="plans" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Inspection Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {inspectionTypes.map(plan => (
              <div 
                key={plan.id}
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 transition-all ${
                  selectedPlan === plan.id 
                    ? "border-orange-500 transform scale-[1.02]" 
                    : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
                <div className="text-2xl font-bold text-orange-500 mb-4">{plan.price}</div>
                
                <div className="flex items-center mb-3 text-sm">
                  <CalendarDays className="text-gray-400 mr-2" size={16} />
                  <span>{plan.frequency}</span>
                </div>
                <div className="flex items-center mb-6 text-sm">
                  <Clock className="text-gray-400 mr-2" size={16} />
                  <span>{plan.duration}</span>
                </div>
                
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-2 rounded-lg font-medium ${
                    selectedPlan === plan.id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {showScheduleForm && (
          <section id="schedule-form" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-16">
            <h2 className="text-2xl font-bold mb-6">Schedule Your Inspection</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              You've selected: <span className="font-medium">{inspectionTypes.find(p => p.id === selectedPlan)?.title}</span>
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Property Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address Line
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      {/* Add more states as needed */}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      pattern="[0-9]{6}"
                      maxLength={6}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Clipboard className="mr-2" size={20} />
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                      Local Contact Name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Person who can provide access"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <CalendarDays className="mr-2" size={20} />
                  Scheduling
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
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
                      <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                      <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Any specific concerns or access instructions..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowScheduleForm(false);
                    setSelectedPlan(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg"
                >
                  Schedule Inspection
                </button>
              </div>
            </form>
          </section>
        )}

        <section id="faq" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">How long does an inspection take?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Depending on the inspection type and property size, it can take between 45 minutes to 2.5 hours. 
                Our inspector will be thorough while respecting your time.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Do I need to be present during the inspection?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, you don't need to be present. You can designate a local contact person who can provide access 
                to the property. We'll coordinate directly with them.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">How will I receive the inspection report?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You'll receive a detailed digital report via email within 24 hours of the inspection. 
                The report includes photos, observations, and recommendations. You can also access all reports 
                in your TrustRoute dashboard.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">What if issues are discovered during inspection?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our inspector will document all issues with photos and detailed descriptions. For urgent issues, 
                we'll notify you immediately. We can also coordinate repairs through our maintenance services if you choose.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Can I set up recurring inspections?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer monthly, quarterly, and semi-annual inspection plans with discounted rates. 
                You can set up a recurring schedule to ensure regular monitoring of your property.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to secure your property?</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Schedule an inspection today or contact us to discuss custom inspection requirements.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#plans" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg">
              Schedule Inspection
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