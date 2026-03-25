import { useNavigate } from "react-router";
import { LogOut, Bell } from "lucide-react";
import orbisLogoLight from "../../imports/orbis-logo-light-7.svg";

interface HeaderProps {
  userRole: string;
  userName?: string;
}

export function Header({ userRole, userName = "User" }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  const getRoleColor = () => {
    switch (userRole) {
      case "Admin":
        return "bg-[#7C3AED]";
      case "Veterinarian":
        return "bg-[#6366F1]";
      case "Zookeeper":
        return "bg-[#10B981]";
      case "Forest Officer":
        return "bg-[#F59E0B]";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <img 
              src={orbisLogoLight} 
              alt="Orbis Systems" 
              className="h-10"
            />
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <p className="text-xs font-medium text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Jungle Safari Zoo Management
              </p>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7C3AED] rounded-full" />
            </button>

            {/* User Info */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {userName}
                </p>
                <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {userRole}
                </p>
              </div>
              <div className={`w-9 h-9 ${getRoleColor()} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                {userName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors ml-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
