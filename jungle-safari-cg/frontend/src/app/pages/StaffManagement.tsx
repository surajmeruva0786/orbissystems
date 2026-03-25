import { useState } from "react";
import { Header } from "../components/Header";
import { Users, Plus, PencilLine, Trash2, Search, UserCheck, Mail, Phone } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  nameHindi: string;
  role: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  joinDate: string;
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    nameHindi: "राजेश कुमार",
    role: "Zookeeper",
    email: "rajesh.kumar@zoo.com",
    phone: "+91 98765 43210",
    status: "Active",
    joinDate: "2023-01-15"
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    nameHindi: "डॉ. प्रिया शर्मा",
    role: "Veterinarian",
    email: "priya.sharma@zoo.com",
    phone: "+91 98765 43211",
    status: "Active",
    joinDate: "2022-06-20"
  },
  {
    id: "3",
    name: "Amit Patel",
    nameHindi: "अमित पटेल",
    role: "Forest Officer",
    email: "amit.patel@zoo.com",
    phone: "+91 98765 43212",
    status: "Active",
    joinDate: "2023-03-10"
  },
  {
    id: "4",
    name: "Sunita Verma",
    nameHindi: "सुनीता वर्मा",
    role: "Zookeeper",
    email: "sunita.verma@zoo.com",
    phone: "+91 98765 43213",
    status: "Active",
    joinDate: "2023-05-01"
  },
  {
    id: "5",
    name: "Dr. Vikram Singh",
    nameHindi: "डॉ. विक्रम सिंह",
    role: "Veterinarian",
    email: "vikram.singh@zoo.com",
    phone: "+91 98765 43214",
    status: "Inactive",
    joinDate: "2021-09-15"
  }
];

export function StaffManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");

  const roles = ["All", "Zookeeper", "Veterinarian", "Forest Officer", "Administrator"];
  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All" || staff.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const activeStaff = mockStaff.filter(s => s.status === "Active").length;
  const totalStaff = mockStaff.length;

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Header role="Administrator" roleHindi="प्रशासक" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Staff Management
          </h1>
          <p className="text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Manage zoo staff members and their roles
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Total Staff
                </p>
                <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {totalStaff}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Active Staff
                </p>
                <p className="text-3xl font-bold text-green-600" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {activeStaff}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Departments
                </p>
                <p className="text-3xl font-bold text-purple-600" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  4
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search staff by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              {/* Role Filter */}
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              {/* Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>Add Staff</span>
              </button>
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Staff Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {staff.name}
                        </p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {staff.nameHindi}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        staff.role === 'Zookeeper' ? 'bg-blue-100 text-blue-700' :
                        staff.role === 'Veterinarian' ? 'bg-green-100 text-green-700' :
                        staff.role === 'Forest Officer' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {staff.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{staff.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{staff.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {new Date(staff.joinDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        staff.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <PencilLine className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Add Staff Member
                </h2>
                <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Fill in the details to add a new staff member
                </p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="e.g., John Doe"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Hindi Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="e.g., जॉन डो"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="john.doe@zoo.com"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="+91 98765 43210"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Role *
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                    <option>Zookeeper</option>
                    <option>Veterinarian</option>
                    <option>Forest Officer</option>
                    <option>Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Join Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Status *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status" value="active" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="status" value="inactive" className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Add Staff Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}