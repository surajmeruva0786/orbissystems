import { useState } from "react";
import { Users, PawPrint, ShieldAlert, ClipboardList, Plus, PencilLine, Trash2, Package, Pill, Send, FileText } from "lucide-react";
import { mockAnimals, mockEmergencyAlerts } from "../data/mockData";
import { RegularInventoryManager } from "../components/RegularInventoryManager";
import { MedicinalInventoryManager } from "../components/MedicinalInventoryManager";
import { AddAnimalModal } from "../components/AddAnimalModal";
import { AddStaffModal } from "../components/AddStaffModal";
import { EditAnimalModal } from "../components/EditAnimalModal";
import { EditStaffModal } from "../components/EditStaffModal";
import { SendInstructionsModal } from "../components/SendInstructionsModal";
import { SentInstructionsPanel } from "../components/SentInstructionsPanel";
import { SubmittedLogsViewer } from "../components/SubmittedLogsViewer";
import { EmergencyAlertModal } from "../components/EmergencyAlertModal";
import { ExportButton, convertToCSV, exportToPDF } from "../components/ExportButton";
import { AnimalDisplay, getAnimalDisplayName } from "../components/AnimalDisplay";

const staffMembers = [
  { id: "1", name: "Ramesh Kumar", role: "Zookeeper", department: "Mammal Care", active: true },
  { id: "2", name: "Sunita Devi", role: "Zookeeper", department: "Elephant Care", active: true },
  { id: "3", name: "Vikram Singh", role: "Zookeeper", department: "Carnivore Care", active: true },
  { id: "4", name: "Dr. Sharma", role: "Veterinarian", department: "Medical", active: true },
  { id: "5", name: "Dr. Patel", role: "Veterinarian", department: "Medical", active: true },
  { id: "6", name: "Raj Malhotra", role: "Forest Officer", department: "Administration", active: true },
  { id: "7", name: "Admin User", role: "Administrator", department: "Management", active: true },
];

export function AdminDashboard() {
  const [showAddAnimalModal, setShowAddAnimalModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showEditAnimalModal, setShowEditAnimalModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<any>(null);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [animals, setAnimals] = useState(mockAnimals);
  const [staff, setStaff] = useState(staffMembers);
  const [sentInstructions, setSentInstructions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"animals" | "staff" | "inventory" | "medicinal" | "logs" | "instructions">("animals");
  
  // Emergency Alert State
  const [currentEmergencyAlert, setCurrentEmergencyAlert] = useState<any>(
    mockEmergencyAlerts.find(alert => !alert.acknowledged) || null
  );

  const totalAnimals = animals.length;
  const healthyAnimals = animals.filter(a => a.health === "Excellent" || a.health === "Good").length;
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.active).length;

  const speciesCount = new Set(animals.map(a => a.species)).size;
  const zookeepers = staff.filter(s => s.role === "Zookeeper");

  const handleAddAnimal = (animal: any) => {
    const newAnimal = {
      ...animal,
      id: (animals.length + 1).toString(),
      age: parseInt(animal.age),
    };
    setAnimals([...animals, newAnimal]);
  };

  const handleAddStaff = (newStaff: any) => {
    const staffMember = {
      ...newStaff,
      id: (staff.length + 1).toString(),
    };
    setStaff([...staff, staffMember]);
  };

  const handleEditAnimal = (updatedAnimal: any) => {
    setAnimals(animals.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
  };

  const handleEditStaff = (updatedStaff: any) => {
    setStaff(staff.map(s => s.id === updatedStaff.id ? updatedStaff : s));
  };

  const handleSendInstructions = (instruction: any) => {
    setSentInstructions([instruction, ...sentInstructions]);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Welcome Back, Administrator
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Management Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            प्रबंधन डैशबोर्ड
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Total Animals
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {mockAnimals.length}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Staff Members
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {staff.length}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Critical Alerts
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {mockEmergencyAlerts.length}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Pending Tasks
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  12
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            <button
              onClick={() => setActiveTab("animals")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "animals"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <PawPrint className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Animals</span>
                <span className="sm:hidden">Animals</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("staff")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "staff"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Staff</span>
                <span className="sm:hidden">Staff</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "inventory"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <Package className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Regular Inventory</span>
                <span className="sm:hidden">Regular Inventory</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("medicinal")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "medicinal"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <Pill className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Medicinal Inventory</span>
                <span className="sm:hidden">Medicinal Inventory</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("logs")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "logs"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Daily Logs</span>
                <span className="sm:hidden">Daily Logs</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("instructions")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "instructions"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">Instructions</span>
                <span className="sm:hidden">Instructions</span>
              </span>
            </button>
          </div>

          {/* Animals Tab */}
          {activeTab === "animals" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Animals Management
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    View and manage all animals in the zoo
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ExportButton
                    type="csv"
                    onClick={() => {
                      const exportData = animals.map(a => ({
                        Type: a.type,
                        Name: a.name || `${a.species} Group`,
                        Species: a.species,
                        Age: a.age,
                        Gender: a.gender,
                        Quantity: a.quantity || 1,
                        Enclosure: a.enclosure,
                        Health: a.health,
                        "Last Fed": a.lastFed
                      }));
                      convertToCSV(exportData, "zoo_animals");
                    }}
                  />
                  <button
                    onClick={() => setShowAddAnimalModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Animal
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Species
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Health
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {animals.map((animal) => (
                      <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {animal.name}
                            </p>
                            <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {animal.nameHindi}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {animal.species}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {animal.age} years
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            animal.health === "Excellent" ? "bg-green-100 text-green-800" :
                            animal.health === "Good" ? "bg-blue-100 text-blue-800" :
                            animal.health === "Fair" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {animal.health}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingAnimal(animal);
                                setShowEditAnimalModal(true);
                              }}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <PencilLine className="w-4 h-4" strokeWidth={1.5} />
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
          )}

          {/* Staff Tab */}
          {activeTab === "staff" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Staff Management
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    View and manage all staff members
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ExportButton
                    type="csv"
                    onClick={() => {
                      const exportData = staff.map(s => ({
                        Name: s.name,
                        Role: s.role,
                        Department: s.department,
                        Status: s.active ? "Active" : "Inactive"
                      }));
                      convertToCSV(exportData, "zoo_staff");
                    }}
                  />
                  <button
                    onClick={() => setShowAddStaffModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Staff
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Department
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
                    {staff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {staff.name}
                          </p>
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
                          <p className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {staff.department}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            staff.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {staff.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingStaff(staff);
                                setShowEditStaffModal(true);
                              }}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <PencilLine className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Regular Inventory Tab */}
          {activeTab === "inventory" && (
            <div className="p-6">
              <RegularInventoryManager title="Regular Inventory Management" titleHindi="नियमित सूची प्रबंधन" />
            </div>
          )}

          {/* Medicinal Inventory Tab */}
          {activeTab === "medicinal" && (
            <div className="p-6">
              <MedicinalInventoryManager title="Medicinal Inventory Management" titleHindi="औषधीय सूची प्रबंधन" />
            </div>
          )}

          {/* Daily Logs Tab */}
          {activeTab === "logs" && (
            <div className="p-6">
              <SubmittedLogsViewer title="Zookeeper Daily Logs" titleHindi="चिड़ियाघर कर्मचारी दैनिक लॉग" />
            </div>
          )}

          {/* Sent Instructions Tab */}
          {activeTab === "instructions" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Sent Instructions
                  </h2>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Track instructions sent to zookeepers
                  </p>
                </div>
                <button
                  onClick={() => setShowInstructionsModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6366F1] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Send className="w-4 h-4" />
                  New Instruction
                </button>
              </div>
              <SentInstructionsPanel instructions={sentInstructions} />
            </div>
          )}
        </div>
      </main>

      {/* Add Animal Modal */}
      <AddAnimalModal
        isOpen={showAddAnimalModal}
        onClose={() => setShowAddAnimalModal(false)}
        onSave={handleAddAnimal}
        zookeepers={zookeepers}
      />

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={showAddStaffModal}
        onClose={() => setShowAddStaffModal(false)}
        onSave={handleAddStaff}
        animals={animals}
      />

      {/* Edit Animal Modal */}
      <EditAnimalModal
        isOpen={showEditAnimalModal}
        onClose={() => setShowEditAnimalModal(false)}
        onSave={handleEditAnimal}
        animal={editingAnimal}
        zookeepers={zookeepers}
      />

      {/* Edit Staff Modal */}
      <EditStaffModal
        isOpen={showEditStaffModal}
        onClose={() => setShowEditStaffModal(false)}
        onSave={handleEditStaff}
        staff={editingStaff}
        animals={animals}
      />

      {/* Send Instructions Modal */}
      <SendInstructionsModal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
        onSend={handleSendInstructions}
        zookeepers={zookeepers}
      />

      {/* Emergency Alert Modal */}
      <EmergencyAlertModal
        alert={currentEmergencyAlert}
        onAcknowledge={() => setCurrentEmergencyAlert(null)}
        onDismiss={() => setCurrentEmergencyAlert(null)}
      />
    </div>
  );
}