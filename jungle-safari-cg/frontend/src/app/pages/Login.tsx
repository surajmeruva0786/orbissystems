import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight, Shield } from "lucide-react";
import orbisLogoLight from "../../imports/orbis-logo-light-7.svg";
import orbisIconMark from "../../imports/orbis-icon-mark-7.svg";

export function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const roles = [
    { 
      id: "zookeeper", 
      label: "Zookeeper", 
      labelHindi: "चिड़ियाघर कर्मचारी",
      icon: "🦁",
      description: "Animal care & daily logs"
    },
    { 
      id: "veterinarian", 
      label: "Veterinarian", 
      labelHindi: "पशु चिकित्सक",
      icon: "🩺",
      description: "Medical management"
    },
    { 
      id: "forest-officer", 
      label: "Forest Officer", 
      labelHindi: "वन अधिकारी",
      icon: "🌳",
      description: "Inventory & analytics"
    },
    { 
      id: "admin", 
      label: "Administrator", 
      labelHindi: "प्रशासक",
      icon: "⚙️",
      description: "System administration"
    },
  ];

  const handleLogin = () => {
    if (!selectedRole) return;
    const roleRoutes: Record<string, string> = {
      "zookeeper": "/zookeeper",
      "veterinarian": "/vet",
      "forest-officer": "/forest-officer",
      "admin": "/admin",
    };
    navigate(roleRoutes[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-white flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl relative">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-elegant-lg border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* Left Side - Branding */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] p-10 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 border-2 border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                {/* Orbis Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4"/>
                      <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      ORBIS
                    </h1>
                    <p className="text-xs text-purple-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      SYSTEMS
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Jungle Safari
                </h2>
                <h3 className="text-xl font-semibold text-purple-100 mb-4" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Zoo Management System
                </h3>
                <p className="text-sm text-purple-100/80 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  A comprehensive educational application with role-based access for efficient zoo operations and animal welfare management.
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-purple-100/80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Shield className="w-4 h-4" />
                  <span>Enterprise-grade security & compliance</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="md:col-span-3 p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Welcome Back
                </h3>
                <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Select your role and sign in to continue
                </p>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Select Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedRole === role.id
                          ? "border-[#7C3AED] bg-purple-50/50 shadow-md"
                          : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="text-sm font-semibold text-gray-900 mb-0.5" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                        {role.label}
                      </div>
                      <div className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {role.labelHindi}
                      </div>
                      <div className="text-xs text-gray-400 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {role.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Credentials Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Username / Email
                  </label>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all text-sm pr-12"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]" />
                    <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Remember me
                    </span>
                  </label>
                  <button className="text-sm text-[#7C3AED] hover:text-[#6D28D9] font-medium transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={!selectedRole}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedRole
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Footer */}
              <p className="text-xs text-center text-gray-500 mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Powered by <span className="font-semibold text-[#7C3AED]">Orbis Systems</span>
          </p>
        </div>
      </div>
    </div>
  );
}