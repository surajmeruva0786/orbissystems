import { useState } from "react";
import { useNavigate } from "react-router";
import { Users, Stethoscope, Trees, ShieldCheck, Eye, EyeOff, ChevronRight } from "lucide-react";
import orbisLogoLight from "../../imports/orbis-logo-light-8.svg";
import orbisIconMark from "../../imports/orbis-icon-mark-8.svg";

const roles = [
  {
    id: "zookeeper",
    title: "Zookeeper",
    titleHindi: "चिड़ियाघर कर्मी",
    description: "Daily monitoring & animal care",
    descriptionHindi: "दैनिक पशु निगरानी और देखभाल",
    icon: Users,
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-500",
    path: "/zookeeper",
  },
  {
    id: "vet",
    title: "Veterinarian",
    titleHindi: "पशु चिकित्सक",
    description: "Medical records & treatment",
    descriptionHindi: "चिकित्सा रिकॉर्ड और उपचार",
    icon: Stethoscope,
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-500",
    path: "/vet",
  },
  {
    id: "forest-officer",
    title: "Forest Officer",
    titleHindi: "वन अधिकारी",
    description: "Analytics & inventory management",
    descriptionHindi: "विश्लेषण और सूची",
    icon: Trees,
    gradient: "from-purple-500 to-indigo-600",
    iconBg: "bg-purple-500",
    path: "/forest-officer",
  },
  {
    id: "admin",
    title: "Administrator",
    titleHindi: "प्रशासक",
    description: "System-wide management",
    descriptionHindi: "प्रणाली प्रबंधन",
    icon: ShieldCheck,
    gradient: "from-orange-500 to-red-600",
    iconBg: "bg-orange-500",
    path: "/admin",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentRole = roles.find(r => r.id === selectedRole);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const role = roles.find(r => r.id === selectedRole);
      if (role) {
        navigate(role.path);
      }
    }, 1500);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#F5F3FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mb-6 mx-auto relative">
            <img src={orbisIconMark} alt="Orbis" className="w-full h-full animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/20 to-transparent rounded-full animate-ping"></div>
          </div>
          <p className="text-sm text-[#7C3AED] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Signing you in...
          </p>
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#F5F3FF]">
      {/* Elegant Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img src={orbisLogoLight} alt="Orbis Systems" className="h-8 sm:h-9" />
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs text-gray-500 font-medium px-3 py-1.5 bg-gray-100 rounded-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Government Portal
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-5xl">
          {/* Page Title */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#7C3AED]/10 rounded-full mb-4">
              <div className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-[#7C3AED] uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Secure Access Portal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Jungle Safari Zoo Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Select your role and sign in to access the system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Role Selection */}
            <div className="space-y-3">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Select Your Role
                </h2>
                <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Choose the role that matches your credentials
                </p>
              </div>

              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`w-full bg-white rounded-2xl p-4 border transition-all duration-300 text-left group relative overflow-hidden ${
                      isSelected 
                        ? 'border-[#7C3AED] shadow-lg shadow-[#7C3AED]/20 scale-[1.02]' 
                        : 'border-gray-200/60 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {/* Background Gradient on Select */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/5 to-transparent"></div>
                    )}
                    
                    <div className="flex items-center gap-4 relative">
                      <div className={`rounded-xl p-3 transition-all duration-300 ${
                        isSelected ? role.iconBg : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {role.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {role.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {isSelected ? (
                          <div className="w-6 h-6 bg-[#7C3AED] rounded-full flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Login Form */}
            {selectedRole ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 sm:p-8 relative overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/10 to-transparent rounded-bl-full"></div>
                
                <div className="relative">
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-gradient-to-br ${currentRole?.gradient}`}>
                      {currentRole && <currentRole.icon className="w-6 h-6 text-white" strokeWidth={2} />}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {currentRole?.title} Login
                    </h2>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Enter your credentials to continue
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Employee ID / Username
                      </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your employee ID"
                        className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED] text-sm transition-all"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Password
                        </label>
                        <button type="button" className="text-xs text-[#7C3AED] hover:text-[#6D28D9] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED] text-sm pr-12 transition-all"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white py-3.5 rounded-xl text-sm font-semibold hover:from-[#6D28D9] hover:to-[#5B21B6] transition-all shadow-lg shadow-[#7C3AED]/30 hover:shadow-xl hover:shadow-[#7C3AED]/40 hover:-translate-y-0.5 duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Sign In to Dashboard
                    </button>

                    <div className="relative py-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-gray-500 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Authorized Personnel Only
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-3">
                      <p className="text-xs text-amber-800 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <strong>Security Notice:</strong> This is a government-authorized system. Unauthorized access is strictly prohibited and will be prosecuted.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center min-h-[480px]">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <ShieldCheck className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Select Your Role
                </h3>
                <p className="text-sm text-gray-600 max-w-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Please choose your designated role from the options on the left to access the login form
                </p>
              </div>
            )}
          </div>

          {/* Support Link */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Having trouble signing in?{' '}
              <button className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold hover:underline">
                Contact IT Support
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Refined Footer */}
      <footer className="border-t border-gray-200/50 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              © 2024 Orbis Systems. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <button className="text-xs text-gray-500 hover:text-gray-700 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Privacy Policy
              </button>
              <span className="text-gray-300">•</span>
              <button className="text-xs text-gray-500 hover:text-gray-700 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}