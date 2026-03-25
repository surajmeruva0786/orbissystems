import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Bell, User, LogOut, AlertTriangle, X } from "lucide-react";
import orbisLogoLight from "../../imports/orbis-logo-light-3.svg";

export function Layout() {
  const [userRole, setUserRole] = useState<'Zookeeper' | 'Vet' | 'Forest Officer' | 'Admin'>('Zookeeper');
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current role based on URL
  const getCurrentRole = (): typeof userRole => {
    if (location.pathname.includes('zookeeper')) return 'Zookeeper';
    if (location.pathname.includes('vet')) return 'Vet';
    if (location.pathname.includes('forest-officer')) return 'Forest Officer';
    if (location.pathname.includes('admin')) return 'Admin';
    return userRole;
  };

  const currentRole = getCurrentRole();

  // Role-specific notifications
  const getNotifications = () => {
    switch (currentRole) {
      case 'Zookeeper':
        return [
          { id: 1, type: 'urgent', title: 'Morning Feeding Due', message: 'Bengal Tiger needs feeding at 11:00 AM', time: '30 mins ago', unread: true },
          { id: 2, type: 'info', title: 'Log Entry Reminder', message: 'Complete daily observation log for African Elephant', time: '1 hour ago', unread: true },
          { id: 3, type: 'warning', title: 'Enclosure Maintenance', message: 'Lion enclosure scheduled for cleaning at 2:00 PM', time: '2 hours ago', unread: false },
          { id: 4, type: 'info', title: 'Shift Update', message: 'Evening shift starts at 4:00 PM', time: '3 hours ago', unread: false },
        ];
      case 'Vet':
        return [
          { id: 1, type: 'urgent', title: 'Medical Alert', message: 'Bengal Tiger showing signs of illness - immediate checkup required', time: '15 mins ago', unread: true },
          { id: 2, type: 'warning', title: 'Vaccination Due', message: '3 animals due for vaccination this week', time: '1 hour ago', unread: true },
          { id: 3, type: 'info', title: 'Lab Results', message: 'Blood test results available for African Elephant', time: '2 hours ago', unread: false },
          { id: 4, type: 'info', title: 'Medicine Stock', message: 'Antibiotics running low - reorder required', time: '4 hours ago', unread: false },
        ];
      case 'Forest Officer':
        return [
          { id: 1, type: 'urgent', title: 'Low Stock Alert', message: 'Chicken meat inventory below threshold', time: '20 mins ago', unread: true },
          { id: 2, type: 'warning', title: 'Budget Review', message: 'Monthly cost exceeded by 15%', time: '1 hour ago', unread: true },
          { id: 3, type: 'info', title: 'Inventory Update', message: 'New shipment of vegetables arrived', time: '3 hours ago', unread: false },
          { id: 4, type: 'info', title: 'Expense Report', message: 'Weekly expense report ready for review', time: '5 hours ago', unread: false },
        ];
      case 'Admin':
        return [
          { id: 1, type: 'urgent', title: 'Staff Leave Request', message: '2 pending leave requests require approval', time: '10 mins ago', unread: true },
          { id: 2, type: 'warning', title: 'System Update', message: 'Scheduled maintenance on Sunday at 2:00 AM', time: '2 hours ago', unread: true },
          { id: 3, type: 'info', title: 'New Staff Onboarding', message: 'Dr. Sharma joins veterinary team tomorrow', time: '4 hours ago', unread: false },
          { id: 4, type: 'info', title: 'Monthly Report', message: 'March analytics report is ready', time: '1 day ago', unread: false },
        ];
      default:
        return [];
    }
  };

  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleRoleSwitch = (role: typeof userRole) => {
    setUserRole(role);
    navigate(`/${role.toLowerCase().replace(' ', '-')}`);
  };

  const handleEmergencySOS = () => {
    setShowEmergencyDialog(true);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Professional Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <img src={orbisLogoLight} alt="Orbis Systems" className="h-9" />
            <div className="hidden md:flex items-center gap-3 border-l border-gray-200 pl-4 ml-2">
              <p className="text-sm font-bold text-[#0C0714]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Jungle Safari Zoo
              </p>
              <span className="px-2 py-0.5 bg-[#F5F3FF] text-[#7C3AED] rounded-md text-xs font-semibold">
                Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Emergency SOS Button */}
            <button
              onClick={handleEmergencySOS}
              className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center gap-2 text-sm font-semibold shadow-lg shadow-red-500/30"
            >
              <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Emergency SOS</span>
            </button>

            {/* Language Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button className="px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-gray-900 shadow-sm">
                EN
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900">
                हि
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                        Notifications
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {unreadCount} unread messages
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-[#F5F3FF]' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            notification.type === 'urgent' ? 'bg-red-500' :
                            notification.type === 'warning' ? 'bg-orange-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-sm font-semibold text-gray-900 truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <span className="w-2 h-2 bg-[#7C3AED] rounded-full flex-shrink-0"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                    <button className="w-full text-center text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-xl flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-gray-900">{userRole}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)] bg-[#FAFBFC]">
        <Outlet />
      </main>

      {/* Professional Emergency SOS Dialog */}
      {showEmergencyDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0C0714]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Emergency Alert
                  </h2>
                  <p className="text-xs text-gray-500">Immediate response required</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEmergencyDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-semibold text-[#0C0714] mb-2">Emergency Type</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-sm">
                <option>Medical Emergency</option>
                <option>Animal Escape</option>
                <option>Fire</option>
                <option>Natural Disaster</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#0C0714] mb-2">Description</label>
              <textarea 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] min-h-[100px] text-sm resize-none"
                placeholder="Describe the emergency situation in detail..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEmergencyDialog(false)}
                className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEmergencyDialog(false);
                  alert('Emergency alert sent to all staff members!');
                }}
                className="flex-1 px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm font-semibold shadow-lg shadow-red-500/30"
              >
                Send Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}