import { useState } from "react";
import { useNavigate } from "react-router";
import { Activity, AlertCircle, FileText, Pill, Stethoscope, Plus, X, Calendar, Clock, Syringe, ClipboardList, FolderOpen, FilePlus, Package, Send } from "lucide-react";
import { mockAnimals, mockDailyLogs, mockMedicalRecords } from "../data/mockData";
import { MedicinalInventoryManager } from "../components/MedicinalInventoryManager";
import { SendInstructionsModal } from "../components/SendInstructionsModal";
import { SentInstructionsPanel } from "../components/SentInstructionsPanel";
import { SubmittedLogsViewer } from "../components/SubmittedLogsViewer";
import { ExportButton, convertToCSV } from "../components/ExportButton";

const animalImages: Record<string, string> = {
  "bengal-tiger": "https://images.unsplash.com/photo-1659879622193-f61183e74a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5nYWwlMjB0aWdlciUyMG9yYW5nZXxlbnwxfHx8fDE3NzQxNzk2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "indian-elephant": "https://images.unsplash.com/photo-1588014307509-1ef94e20955f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBlbGVwaGFudCUyMHdhbGtpbmd8ZW58MXx8fHwxNzc0MTc5NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "sloth-bear": "https://images.unsplash.com/photo-1760640018928-94f1a834a74f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbG90aCUyMGJlYXIlMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzQxNzk2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "asiatic-lion": "https://images.unsplash.com/photo-1758144761848-1e03ab8cd6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhdGljJTIwbGlvbiUyMG1hbGV8ZW58MXx8fHwxNzc0MTc5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "peacock": "https://images.unsplash.com/photo-1592698369473-509578e7d8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjb2NrJTIwY29sb3JmdWwlMjBmZWF0aGVyc3xlbnwxfHx8fDE3NzQwOTcxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "leopard": "https://images.unsplash.com/photo-1763306734254-b2100d490dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsZW9wYXJkJTIwc3BvdHRlZHxlbnwxfHx8fDE3NzQxNzk2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

// Mock ongoing treatments
const mockTreatments = [
  { id: "t1", animalId: "6", animalName: "Bagheera", medication: "Antibiotics", dosage: "500mg", frequency: "2x daily", startDate: "2026-03-15", endDate: "2026-03-25", status: "active" },
  { id: "t2", animalId: "3", animalName: "Mowgli", medication: "Pain Relief", dosage: "250mg", frequency: "3x daily", startDate: "2026-03-18", endDate: "2026-03-22", status: "active" },
  { id: "t3", animalId: "1", animalName: "Raja", medication: "Vitamins", dosage: "1 tablet", frequency: "1x daily", startDate: "2026-03-01", endDate: "2026-03-31", status: "active" },
];

export function VetDashboard() {
  const navigate = useNavigate();
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showMedicalRecordModal, setShowMedicalRecordModal] = useState(false);
  const [showMedicationTrackerModal, setShowMedicationTrackerModal] = useState(false);
  const [showEditTreatmentModal, setShowEditTreatmentModal] = useState(false);
  const [showEndTreatmentModal, setShowEndTreatmentModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"records" | "medications" | "inventory" | "logs" | "instructions">("logs");
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [sentInstructions, setSentInstructions] = useState<any[]>([]);
  const [treatments, setTreatments] = useState(mockTreatments);

  const criticalAnimals = mockAnimals.filter(a => a.health === "Critical" || a.health === "Poor");
  const recentAlerts = mockDailyLogs.filter(log => 
    log.health.includes("ALERT") || log.health.includes("concern")
  );
  const totalPatients = mockAnimals.length;
  const healthyAnimals = mockAnimals.filter(a => a.health === "Excellent" || a.health === "Good").length;
  const activeTreatments = treatments.filter(t => t.status === "active").length;

  // Mock zookeepers data for instructions
  const zookeepers = [
    { id: "1", name: "Ramesh Kumar", department: "Mammal Care" },
    { id: "2", name: "Sunita Devi", department: "Elephant Care" },
    { id: "3", name: "Vikram Singh", department: "Carnivore Care" },
  ];

  const handlePrescribe = (animalId: string) => {
    setSelectedAnimal(animalId);
    setShowPrescriptionModal(true);
  };

  const handleAddMedicalRecord = (animalId: string) => {
    setSelectedAnimal(animalId);
    setShowMedicalRecordModal(true);
  };

  const handleSendInstructions = (instruction: any) => {
    setSentInstructions([instruction, ...sentInstructions]);
  };

  const handleEditTreatment = (treatment: any) => {
    setSelectedTreatment(treatment);
    setShowEditTreatmentModal(true);
  };

  const handleEndTreatment = (treatment: any) => {
    setSelectedTreatment(treatment);
    setShowEndTreatmentModal(true);
  };

  const handleEndTreatmentConfirm = () => {
    if (selectedTreatment) {
      const updatedTreatments = treatments.map(t => 
        t.id === selectedTreatment.id ? { ...t, status: "completed" } : t
      );
      setTreatments(updatedTreatments);
      setShowEndTreatmentModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Welcome Section */}
        <div className="mb-4 sm:mb-6">
          <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Welcome Back, Veterinarian
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Medical Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            पशु चिकित्सक डैशबोर्ड
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Total Patients
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {totalPatients}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Activity className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Critical Cases
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {criticalAnimals.length}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Active Treatments
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {activeTreatments}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Pill className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Healthy Rate
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {Math.round((healthyAnimals / totalPatients) * 100)}%
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
            <button
              onClick={() => setActiveTab("records")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "records"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <ClipboardList className="w-4 h-4" />
                <span className="hidden sm:inline">Hospital Records</span>
                <span className="sm:hidden">Records</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("medications")}
              className={`flex-shrink-0 px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "medications"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] bg-purple-50/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="flex items-center justify-center gap-2">
                <Pill className="w-4 h-4" />
                <span className="hidden sm:inline">Medication Tracker</span>
                <span className="sm:hidden">Medications</span>
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
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Medicinal Inventory</span>
                <span className="sm:hidden">Inventory</span>
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
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Daily Logs</span>
                <span className="sm:hidden">Logs</span>
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
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send Instructions</span>
                <span className="sm:hidden">Instructions</span>
              </span>
            </button>
          </div>

          {/* Hospital Records Tab */}
          {activeTab === "records" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Medical History & Records
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Complete hospital records for all animals
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ExportButton
                    type="csv"
                    onClick={() => {
                      const exportData = mockMedicalRecords.map(record => ({
                        Date: record.date,
                        Condition: record.condition,
                        Treatment: record.treatment,
                        "Vet Name": record.vetName,
                        Medication: record.medication || "N/A",
                        Notes: record.notes
                      }));
                      convertToCSV(exportData, "medical_records");
                    }}
                  />
                  <button
                    onClick={() => setShowMedicalRecordModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-all hover:shadow-md"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Plus className="w-4 h-4" />
                    New Record
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {mockAnimals.map((animal) => (
                  <div key={animal.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#7C3AED] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          {animal.diet === "Carnivore" 
                            ? `${animal.name} (${animal.nameHindi})`
                            : animal.species
                          }
                        </h4>
                        <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {animal.diet === "Carnivore" 
                            ? `${animal.species} • ${animal.age} years • ${animal.gender}`
                            : `${animal.speciesHindi} • Count: ${animal.count || 0}`
                          }
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddMedicalRecord(animal.id)}
                          className="px-3 py-1.5 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Add Record
                        </button>
                        <button
                          onClick={() => navigate(`/app/animal/${animal.id}`)}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          View Full History
                        </button>
                      </div>
                    </div>

                    {/* Recent Medical Records */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockMedicalRecords.slice(0, 2).map((record) => (
                        <div key={record.id} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="flex items-start gap-2 mb-2">
                            <History className="w-4 h-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                {record.condition}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                {record.treatment}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {record.date}
                            </span>
                            <span>Dr. {record.vetName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medication Tracker Tab */}
          {activeTab === "medications" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Active Medications & Treatments
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Track ongoing treatments and dosage schedules
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ExportButton
                    type="csv"
                    onClick={() => {
                      const exportData = treatments.map(treatment => ({
                        Animal: treatment.animalName,
                        Medication: treatment.medication,
                        Dosage: treatment.dosage,
                        Frequency: treatment.frequency,
                        "Start Date": treatment.startDate,
                        "End Date": treatment.endDate,
                        Status: treatment.status
                      }));
                      convertToCSV(exportData, "active_treatments");
                    }}
                  />
                  <button
                    onClick={() => setShowMedicationTrackerModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-all hover:shadow-md"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Plus className="w-4 h-4" />
                    New Treatment
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {treatments.filter(t => t.status === "active").map((treatment) => (
                  <div key={treatment.id} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-[#7C3AED]/30 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#6366F1] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Pill className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-base font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                                {treatment.animalName}
                              </h4>
                              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                Active
                              </span>
                            </div>
                            <p className="text-sm font-medium text-[#7C3AED]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {treatment.medication}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditTreatment(treatment)}
                              className="px-3.5 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-100 hover:border-gray-300 transition-colors"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleEndTreatment(treatment)}
                              className="px-3.5 py-1.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 hover:border-red-300 transition-colors"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              End
                            </button>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 flex items-center gap-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              <Pill className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                              Dosage
                            </p>
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {treatment.dosage}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 flex items-center gap-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              <Clock className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                              Frequency
                            </p>
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {treatment.frequency}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 flex items-center gap-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              <Calendar className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                              Start Date
                            </p>
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {treatment.startDate}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 flex items-center gap-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              <Calendar className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                              End Date
                            </p>
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {treatment.endDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {treatments.filter(t => t.status === "active").length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Pill className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      No Active Treatments
                    </h3>
                    <p className="text-xs text-gray-500 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Start tracking medications by adding a new treatment
                    </p>
                    <button
                      onClick={() => setShowMedicationTrackerModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Treatment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Medicinal Inventory Tab */}
          {activeTab === "inventory" && (
            <div className="p-6">
              <MedicinalInventoryManager />
            </div>
          )}

          {/* Daily Logs Tab */}
          {activeTab === "logs" && (
            <div className="p-6">
              <SubmittedLogsViewer />
            </div>
          )}

          {/* Send Instructions Tab */}
          {activeTab === "instructions" && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Sent Instructions
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Track instructions sent to zookeepers
                  </p>
                </div>
                <button
                  onClick={() => setShowInstructionsModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6366F1] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Plus className="w-4 h-4" />
                  New Instruction
                </button>
              </div>

              <SentInstructionsPanel instructions={sentInstructions} />
            </div>
          )}
        </div>
      </main>

      {/* Add Medical Record Modal */}
      {showMedicalRecordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Add Medical Record
                </h2>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Document examination findings and diagnosis
                </p>
              </div>
              <button 
                onClick={() => setShowMedicalRecordModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Select Animal *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option value="">Choose an animal...</option>
                  {mockAnimals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} - {animal.species}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Examination Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Veterinarian Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Name"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Condition / Diagnosis *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Respiratory infection, Dental checkup"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Treatment Provided *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the treatment administered..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Medication (if prescribed)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Antibiotics - 500mg 2x daily for 7 days"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Any additional observations or follow-up instructions..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowMedicalRecordModal(false)}
                  className="flex-1 px-5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowMedicalRecordModal(false)}
                  className="flex-1 px-5 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Save Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Prescribe Medication
                </h2>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Create a new prescription for the animal
                </p>
              </div>
              <button 
                onClick={() => setShowPrescriptionModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Select Animal *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option value="">Choose an animal...</option>
                  {mockAnimals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} - {animal.species}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Medication Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Amoxicillin, Ivermectin"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Dosage *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 500mg, 10ml"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Frequency *
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>Every 12 hours</option>
                    <option>Every 8 hours</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Special Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Administer with food, avoid direct sunlight after administration"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowPrescriptionModal(false)}
                  className="flex-1 px-5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPrescriptionModal(false)}
                  className="flex-1 px-5 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Save Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Treatment Modal */}
      {showMedicationTrackerModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Start New Treatment
                </h2>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Add to active medication tracker
                </p>
              </div>
              <button 
                onClick={() => setShowMedicationTrackerModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Select Animal *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option value="">Choose an animal...</option>
                  {mockAnimals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} - {animal.species}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Treatment Type *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option>Medication</option>
                  <option>Physical Therapy</option>
                  <option>Dietary Supplement</option>
                  <option>Wound Care</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Medication/Treatment Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Antibiotics, Vitamin B12"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Dosage *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 250mg"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Frequency *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2x daily"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowMedicationTrackerModal(false)}
                  className="flex-1 px-5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowMedicationTrackerModal(false)}
                  className="flex-1 px-5 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Start Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Treatment Modal */}
      {showEditTreatmentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Edit Treatment
                </h2>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Update treatment details
                </p>
              </div>
              <button 
                onClick={() => setShowEditTreatmentModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Select Animal *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option value="">Choose an animal...</option>
                  {mockAnimals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} - {animal.species}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Treatment Type *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option>Medication</option>
                  <option>Physical Therapy</option>
                  <option>Dietary Supplement</option>
                  <option>Wound Care</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Medication/Treatment Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Antibiotics, Vitamin B12"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Dosage *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 250mg"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Frequency *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2x daily"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowEditTreatmentModal(false)}
                  className="flex-1 px-5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEditTreatmentModal(false)}
                  className="flex-1 px-5 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Update Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* End Treatment Modal */}
      {showEndTreatmentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  End Treatment
                </h2>
                <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Confirm ending the treatment
                </p>
              </div>
              <button 
                onClick={() => setShowEndTreatmentModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Select Animal *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option value="">Choose an animal...</option>
                  {mockAnimals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} - {animal.species}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Treatment Type *
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm">
                  <option>Medication</option>
                  <option>Physical Therapy</option>
                  <option>Dietary Supplement</option>
                  <option>Wound Care</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Medication/Treatment Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Antibiotics, Vitamin B12"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Dosage *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 250mg"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Frequency *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2x daily"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    End Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowEndTreatmentModal(false)}
                  className="flex-1 px-5 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEndTreatmentConfirm}
                  className="flex-1 px-5 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  End Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Instructions Modal */}
      <SendInstructionsModal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
        onSend={handleSendInstructions}
        zookeepers={zookeepers}
        senderRole="Veterinarian"
      />
    </div>
  );
}