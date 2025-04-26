"use client";

import { useState } from "react";
import { ArrowLeft, Upload, X, Home, Building, Warehouse, Building2 } from "lucide-react";
import Link from "next/link";

type PropertyType = "Apartment" | "House" | "Villa" | "Commercial" | "";

export default function AddPropertyPage() {
  const [formData, setFormData] = useState({
    name: "",
    type: "" as PropertyType,
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    yearBuilt: "",
    area: "",
    areaUnit: "sqft",
    bedrooms: "",
    bathrooms: "",
    description: "",
    occupancyStatus: "vacant",
    localContactName: "",
    localContactPhone: "",
    localContactRelation: "",
    documents: [] as File[],
    propertyImages: [] as File[]
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        [fieldName]: [...prev[fieldName as keyof typeof prev] as File[], ...fileArray]
      }));
    }
  };
  
  const removeFile = (fieldName: string, index: number) => {
    setFormData(prev => {
      const files = [...prev[fieldName as keyof typeof prev] as File[]];
      files.splice(index, 1);
      return {
        ...prev,
        [fieldName]: files
      };
    });
  };
  
  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you would redirect after successful submission
      window.location.href = "/dashboard/properties";
    }, 1500);
  };
  
  const PropertyTypeOption = ({ type, icon: Icon, label }: { type: PropertyType, icon: React.ElementType, label: string }) => (
    <label className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
      formData.type === type 
        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/10" 
        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
    }`}>
      <input
        type="radio"
        name="type"
        value={type}
        checked={formData.type === type}
        onChange={handleChange}
        className="sr-only"
      />
      <Icon size={28} className={formData.type === type ? "text-orange-500" : "text-gray-400"} />
      <span className={`mt-2 font-medium ${formData.type === type ? "text-orange-600 dark:text-orange-400" : ""}`}>
        {label}
      </span>
    </label>
  );
  
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/properties" className="mr-4 p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Add New Property</h1>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                  step >= stepNumber 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`h-1 w-16 ${
                    step > stepNumber 
                      ? "bg-orange-500" 
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span className={step >= 1 ? "text-orange-500 font-medium" : ""}>Property Details</span>
            <span className={step >= 2 ? "text-orange-500 font-medium" : ""}>Contact Information</span>
            <span className={step >= 3 ? "text-orange-500 font-medium" : ""}>Documents & Photos</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Property Name/Identifier
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Lake View Apartment, Family Villa"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <PropertyTypeOption
                      type="Apartment"
                      icon={Building}
                      label="Apartment"
                    />
                    <PropertyTypeOption
                      type="House"
                      icon={Home}
                      label="House"
                    />
                    <PropertyTypeOption
                      type="Villa"
                      icon={Building2}
                      label="Villa"
                    />
                    <PropertyTypeOption
                      type="Commercial"
                      icon={Warehouse}
                      label="Commercial"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="landmark" className="block text-sm font-medium mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="e.g. Near City Hospital"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                    placeholder="6-digit PIN code"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="yearBuilt" className="block text-sm font-medium mb-1">
                      Year Built
                    </label>
                    <input
                      type="number"
                      id="yearBuilt"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleChange}
                      placeholder="e.g. 2005"
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium mb-1">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      placeholder="e.g. 3"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium mb-1">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="area" className="block text-sm font-medium mb-1">
                      Area
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="e.g. 1200"
                      min="0"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="areaUnit" className="block text-sm font-medium mb-1">
                      Unit
                    </label>
                    <select
                      id="areaUnit"
                      name="areaUnit"
                      value={formData.areaUnit}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <option value="sqft">sq. ft.</option>
                      <option value="sqm">sq. m.</option>
                      <option value="acre">acre</option>
                      <option value="gunta">gunta</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Property Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your property, notable features, etc."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Occupancy Status
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="occupancyStatus"
                        value="vacant"
                        checked={formData.occupancyStatus === "vacant"}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2">Vacant</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="occupancyStatus"
                        value="occupied"
                        checked={formData.occupancyStatus === "occupied"}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2">Occupied</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="occupancyStatus"
                        value="family"
                        checked={formData.occupancyStatus === "family"}
                        onChange={handleChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2">Family Occupied</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg"
                  >
                    Next: Contact Information
                  </button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="pb-2 mb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold">Local Contact Information</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Provide contact details of a person in India who can provide access to your property
                  </p>
                </div>
                
                <div>
                  <label htmlFor="localContactName" className="block text-sm font-medium mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="localContactName"
                    name="localContactName"
                    required
                    value={formData.localContactName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label htmlFor="localContactPhone" className="block text-sm font-medium mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    id="localContactPhone"
                    name="localContactPhone"
                    required
                    value={formData.localContactPhone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <label htmlFor="localContactRelation" className="block text-sm font-medium mb-1">
                    Relationship to You
                  </label>
                  <select
                    id="localContactRelation"
                    name="localContactRelation"
                    required
                    value={formData.localContactRelation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Select Relationship</option>
                    <option value="Family">Family Member</option>
                    <option value="Friend">Friend</option>
                    <option value="Caretaker">Caretaker</option>
                    <option value="Neighbor">Neighbor</option>
                    <option value="Tenant">Tenant</option>
                    <option value="Property Manager">Property Manager</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="pt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-medium dark:border-gray-600 dark:text-gray-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg"
                  >
                    Next: Documents & Photos
                  </button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="pb-2 mb-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold">Property Documents & Photos</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upload relevant documents and photos of your property
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Property Documents (Optional)
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Deeds, tax documents, or other ownership proof
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Drag and drop files here, or click to browse</p>
                    <input
                      type="file"
                      id="documents"
                      name="documents"
                      onChange={(e) => handleFileChange(e, "documents")}
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <label
                      htmlFor="documents"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                    >
                      Browse Files
                    </label>
                  </div>
                  
                  {formData.documents.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Uploaded Documents ({formData.documents.length})</p>
                      <ul className="space-y-2">
                        {formData.documents.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                            <span className="text-sm truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile("documents", index)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                            >
                              <X size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Property Photos
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Photos of your property for identification and inspection reference
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Drag and drop images here, or click to browse</p>
                    <input
                      type="file"
                      id="propertyImages"
                      name="propertyImages"
                      onChange={(e) => handleFileChange(e, "propertyImages")}
                      multiple
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <label
                      htmlFor="propertyImages"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                    >
                      Browse Images
                    </label>
                  </div>
                  
                  {formData.propertyImages.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Uploaded Images ({formData.propertyImages.length})</p>
                      <div className="grid grid-cols-3 gap-3">
                        {formData.propertyImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Property ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile("propertyImages", index)}
                              className="absolute -top-2 -right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-medium dark:border-gray-600 dark:text-gray-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving Property..." : "Save Property"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        {/* Help section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">
            Our team is available to help you add and manage your property details.
          </p>
          <div className="flex gap-4">
            <Link href="/support" className="text-blue-700 dark:text-blue-400 font-medium text-sm hover:underline">
              Contact Support
            </Link>
            <Link href="/faq" className="text-blue-700 dark:text-blue-400 font-medium text-sm hover:underline">
              View FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}