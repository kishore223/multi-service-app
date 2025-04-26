"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle, X, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Auto-focus the first input field when the component mounts
  useEffect(() => {
    const firstInput = document.getElementById("firstName");
    if (firstInput) firstInput.focus();
  }, []);

  // Auto-focus the password field when switching to step 2
  useEffect(() => {
    if (step === 2) {
      const passwordInput = document.getElementById("password");
      if (passwordInput) passwordInput.focus();
    }
  }, [step]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear errors on change
    if (name === "email" || name === "password" || name === "confirmPassword") {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email before proceeding
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setFormErrors(prev => ({
        ...prev,
        email: emailError
      }));
      return;
    }
    
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setFormErrors(prev => ({
        ...prev,
        confirmPassword: "Passwords don't match"
      }));
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect or show success message
      window.location.href = "/";
    }, 1500);
  };

  // Password validation
  const hasMinLength = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";
  
  // Password strength indicator
  const getPasswordStrength = () => {
    if (!formData.password) return { strength: 0, label: "" };
    
    let score = 0;
    if (hasMinLength) score += 1;
    if (hasUpperCase && hasLowerCase) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecialChar) score += 1;
    
    const labels = ["Weak", "Fair", "Good", "Strong"];
    return { 
      strength: score, 
      label: labels[score - 1] || "" 
    };
  };
  
  const passwordStrength = getPasswordStrength();
  
  const getStrengthColor = () => {
    const colors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
    return colors[passwordStrength.strength - 1] || "bg-gray-200";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">TrustRoute</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
            {step === 1 ? "Create your account" : "Set your password"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {step === 1 
              ? "Enter your information to get started" 
              : "Create a strong password to secure your account"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="relative mb-8">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full">
            <div 
              className="bg-orange-500 h-1 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Account info</span>
            <span className={step === 2 ? "font-medium" : ""}>Security</span>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleContinue} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  formErrors.email ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                }`}
                placeholder="your@email.com"
                aria-invalid={formErrors.email ? "true" : "false"}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-lg mt-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Continue
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  aria-describedby="password-strength"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              {formData.password && (
                <div id="password-strength" className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex space-x-1 w-full">
                      {[1, 2, 3, 4].map((segment) => (
                        <div 
                          key={segment}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            segment <= passwordStrength.strength 
                              ? getStrengthColor() 
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        ></div>
                      ))}
                    </div>
                    {passwordStrength.label && (
                      <span className={`text-xs ml-2 font-medium ${
                        passwordStrength.strength <= 1 ? "text-red-500" : 
                        passwordStrength.strength === 2 ? "text-yellow-500" :
                        passwordStrength.strength === 3 ? "text-blue-500" : "text-green-500"
                      }`}>
                        {passwordStrength.label}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center text-sm">
                  <span className="mr-2">
                    {hasMinLength ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-gray-400" />
                    )}
                  </span>
                  <span className={hasMinLength ? "text-green-600 dark:text-green-400" : "text-gray-500"}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="mr-2">
                    {hasUpperCase && hasLowerCase ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-gray-400" />
                    )}
                  </span>
                  <span className={hasUpperCase && hasLowerCase ? "text-green-600 dark:text-green-400" : "text-gray-500"}>
                    Upper & lowercase
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="mr-2">
                    {hasNumber ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-gray-400" />
                    )}
                  </span>
                  <span className={hasNumber ? "text-green-600 dark:text-green-400" : "text-gray-500"}>
                    At least one number
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="mr-2">
                    {hasSpecialChar ? (
                      <CheckCircle size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-gray-400" />
                    )}
                  </span>
                  <span className={hasSpecialChar ? "text-green-600 dark:text-green-400" : "text-gray-500"}>
                    Special character (!@#$%)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    formErrors.confirmPassword ? "border-red-500 bg-red-50 dark:bg-red-900/10" : ""
                  }`}
                  aria-invalid={formErrors.confirmPassword ? "true" : "false"}
                  aria-describedby={formErrors.confirmPassword ? "confirm-error" : undefined}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
                >
                  {confirmPasswordVisible ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {formErrors.confirmPassword ? (
                <p id="confirm-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.confirmPassword}
                </p>
              ) : (
                formData.confirmPassword && (
                  <div className="flex items-center mt-2 text-sm">
                    <span className="mr-2">
                      {passwordsMatch ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : (
                        <X size={14} className="text-gray-400" />
                      )}
                    </span>
                    <span className={passwordsMatch ? "text-green-600 dark:text-green-400" : "text-gray-500"}>
                      Passwords match
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="mt-4">
              <label className="flex items-start text-sm">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <Link href="/terms" className="text-orange-500 hover:underline font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-orange-500 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/3 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms || !passwordsMatch || passwordStrength.strength < 3}
                className="w-2/3 flex items-center justify-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center text-sm border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} TrustRoute. All rights reserved.</p>
      </div>
    </div>
  );
}