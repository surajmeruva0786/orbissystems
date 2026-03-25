import { Bell, LogOut, Settings, User, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  role: string;
  roleHindi: string;
  userName?: string;
}

export function DashboardHeader({ title, subtitle, role, roleHindi, userName = "User" }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Branding & Title */}
          <div className="flex items-center gap-6">
            {/* Orbis Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4"/>
                  <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="hidden md:block">
                <h1 className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  ORBIS SYSTEMS
                </h1>
                <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Zoo Management
                </p>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            {/* Page Title */}
            <div>
              <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-50 rounded-xl transition-colors group">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#7C3AED] transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Settings */}
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors group">
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-[#7C3AED] transition-colors" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 pl-3 pr-4 py-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {role}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-elegant-lg border border-gray-100 py-2 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {roleHindi}
                    </p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <div className="h-px bg-gray-100 my-2"></div>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
