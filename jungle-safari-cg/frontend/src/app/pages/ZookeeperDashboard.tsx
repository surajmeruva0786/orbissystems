import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Clock, AlertCircle, CheckCircle, Bell, BellRing, AlertTriangle, Check, ClipboardCheck, Plus } from "lucide-react";
import { mockAnimals } from "../data/mockData";
import { InstructionsPanel } from "../components/InstructionsPanel";
import { DailyLogModal } from "../components/DailyLogModal";

const animalImages: Record<string, string> = {
  "bengal-tiger": "https://images.unsplash.com/photo-1659879622193-f61183e74a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5nYWwlMjB0aWdlciUyMG9yYW5nZXxlbnwxfHx8fDE3NzQxNzk2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "indian-elephant": "https://images.unsplash.com/photo-1588014307509-1ef94e20955f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBlbGVwaGFudCUyMHdhbGtpbmd8ZW58MXx8fHwxNzc0MTc5NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "sloth-bear": "https://images.unsplash.com/photo-1760640018928-94f1a834a74f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbG90aCUyMGJlYXIlMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzQxNzk2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "asiatic-lion": "https://images.unsplash.com/photo-1758144761848-1e03ab8cd6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhdGljJTIwbGlvbiUyMG1hbGV8ZW58MXx8fHwxNzc0MTc5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "peacock": "https://images.unsplash.com/photo-1592698369473-509578e7d8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjb2NrJTIwY29sb3JmdWwlMjBmZWF0aGVyc3xlbnwxfHx8fDE3NzQwOTcxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "leopard": "https://images.unsplash.com/photo-1763306734254-b2100d490dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsZW9wYXJkJTIwc3BvdHRlZHxlbnwxfHx8fDE3NzQxNzk2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

// Recording prompts to guide the zookeeper
const recordingPrompts = [
  { id: 1, question: "How is the animal's overall behavior today?", hint: "Active, lethargic, normal, aggressive, etc." },
  { id: 2, question: "Has the animal eaten its full portion?", hint: "Full, partial, refused, etc." },
  { id: 3, question: "Are there any signs of illness or discomfort?", hint: "Limping, coughing, wounds, etc." },
  { id: 4, question: "How is the animal's mobility and activity level?", hint: "Running, walking, resting, playing, etc." },
  { id: 5, question: "Any unusual sounds or vocalizations observed?", hint: "Roaring, whimpering, silent, etc." },
  { id: 6, question: "Is the enclosure clean and properly maintained?", hint: "Clean, needs cleaning, damaged areas, etc." },
  { id: 7, question: "Any social interactions with other animals?", hint: "Friendly, aggressive, isolated, etc." },
  { id: 8, question: "Water intake normal?", hint: "Drinking regularly, not drinking, excessive drinking, etc." },
];

// Mock reminder notifications
const mockReminders = [
  { id: 1, animalName: "Mowgli", shift: "Morning", time: "30 mins ago", urgent: true },
  { id: 2, animalName: "Raja", shift: "Evening", time: "1 hour ago", urgent: false },
];

// Mock instructions from Admin/Vet
const mockInstructions = [
  {
    id: "1",
    type: "text" as const,
    content: "Please pay special attention to Raja's feeding patterns today. Monitor if he's eating his full portions and note any changes in appetite.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sender: "Dr. Sharma (Veterinarian)",
    read: false,
  },
  {
    id: "2",
    type: "voice" as const,
    content: "Voice message (45s): Important updates on morning feeding schedule",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    sender: "Admin",
    read: false,
  },
  {
    id: "3",
    type: "text" as const,
    content: "Reminder: All animals in Enclosure B need extra hydration monitoring due to the heat wave. Ensure water bowls are refilled every 2 hours.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    sender: "Admin",
    read: true,
  },
  {
    id: "4",
    type: "text" as const,
    content: "Mowgli requires medication at 3 PM today. Please coordinate with the veterinary team for the dosage instructions.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    sender: "Dr. Patel (Veterinarian)",
    read: false,
  },
  {
    id: "5",
    type: "voice" as const,
    content: "Voice message (1m 15s): Special care instructions for pregnant animals",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    sender: "Dr. Sharma (Veterinarian)",
    read: true,
  },
];

export function ZookeeperDashboard() {
  const navigate = useNavigate();
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<"morning" | "evening">("morning");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showReminders, setShowReminders] = useState(false);

  const currentTime = new Date().getHours();
  const isMorningShift = currentTime >= 6 && currentTime < 14;
  const currentShift = isMorningShift ? "Morning" : "Evening";

  // Check if we're in the valid time windows
  const isMorningWindow = currentTime >= 11 && currentTime < 13; // 11am-1pm
  const isEveningWindow = currentTime >= 16 && currentTime < 18; // 4pm-6pm
  const isValidLogTime = isMorningWindow || isEveningWindow;

  const pendingLogs = mockAnimals.filter(a => 
    isMorningShift ? a.morningLogStatus !== "completed" : a.eveningLogStatus !== "completed"
  );
  const criticalAnimals = mockAnimals.filter(a => a.health === "Critical" || a.health === "Poor");

  // Recording timer and prompt rotation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          // Auto-advance to next prompt every 15 seconds
          if (newTime > 0 && newTime % 15 === 0 && currentPromptIndex < recordingPrompts.length - 1) {
            setCurrentPromptIndex(prev => prev + 1);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, currentPromptIndex]);

  const handleStartLog = (animalId: string, shift: "morning" | "evening") => {
    setSelectedAnimal(animalId);
    setSelectedShift(shift);
    setShowLogModal(true);
    setRecordingTime(0);
    setCurrentPromptIndex(0);
  };

  const handleRecordAudio = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      setCurrentPromptIndex(0);
    } else {
      setIsRecording(false);
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getNextPrompt = () => {
    if (currentPromptIndex < recordingPrompts.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    }
  };

  const getPreviousPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6">
        {/* Header with Reminders */}
        <div className="flex items-start justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Welcome Back
            </p>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Hello, Zookeeper!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Current Shift: <span className="font-semibold text-[#7C3AED]">{currentShift}</span>
              {!isValidLogTime && (
                <span className="block sm:inline sm:ml-2 text-xs text-orange-600 mt-1 sm:mt-0">
                  (Logging: {isMorningShift ? '11 AM - 1 PM' : '4 PM - 6 PM'})
                </span>
              )}
            </p>
          </div>

          {/* Reminder Bell */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowReminders(!showReminders)}
              className="relative p-2 sm:p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BellRing className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              {mockReminders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {mockReminders.length}
                </span>
              )}
            </button>

            {/* Reminder Dropdown */}
            {showReminders && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-md bg-white rounded-xl shadow-2xl border border-gray-200/80 z-50 overflow-hidden">
                <div className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      Log Reminders
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                      {mockReminders.length} pending
                    </span>
                  </div>
                  <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Action required for these animals
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockReminders.map((reminder, index) => (
                    <div
                      key={reminder.id}
                      className={`px-4 sm:px-5 py-3 sm:py-4 transition-all hover:bg-gray-50 ${
                        index !== mockReminders.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          reminder.urgent ? 'bg-red-100' : 'bg-orange-100'
                        }`}>
                          <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${reminder.urgent ? 'text-red-600' : 'text-orange-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {reminder.animalName}
                            </p>
                            {reminder.urgent && (
                              <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-medium">
                                Urgent
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {reminder.shift} shift log missing
                          </p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{reminder.time}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const animal = mockAnimals.find(a => a.name === reminder.animalName);
                            if (animal) {
                              handleStartLog(animal.id, reminder.shift.toLowerCase() as "morning" | "evening");
                              setShowReminders(false);
                            }
                          }}
                          className="px-2.5 sm:px-3 py-1.5 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-all hover:shadow-md flex-shrink-0"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Log Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <button 
                    onClick={() => setShowReminders(false)}
                    className="w-full text-xs text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clean Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Total Animals
                </p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {mockAnimals.length}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Pending Logs ({currentShift})
                </p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {pendingLogs.length}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Health Alerts
                </p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {criticalAnimals.length}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Clean Animals Table */}
        <div className="mb-6">
          <InstructionsPanel instructions={mockInstructions} />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
            <h2 className="text-base sm:text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              My Animals - Daily Logs
            </h2>
            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Submit logs twice daily: Morning (11 AM - 1 PM) & Evening (4 PM - 6 PM)
            </p>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden">
            {mockAnimals.map((animal) => {
              const needsAttention = animal.morningLogStatus === "overdue" || animal.eveningLogStatus === "overdue" || animal.health === "Critical" || animal.health === "Poor";
              
              return (
                <div
                  key={animal.id}
                  className={`border-b border-gray-100 p-4 ${needsAttention ? 'bg-red-50/30' : 'bg-white'}`}
                  onClick={() => navigate(`/app/animal/${animal.id}`)}
                >
                  {/* Animal Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={animalImages[animal.image]}
                      alt={animal.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {animal.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {animal.nameHindi}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {animal.species}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {animal.enclosure}
                        </span>
                      </div>
                      <div className="mt-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                          animal.health === "Excellent" ? "bg-green-50 text-green-700" :
                          animal.health === "Good" ? "bg-blue-50 text-blue-700" :
                          animal.health === "Fair" ? "bg-yellow-50 text-yellow-700" :
                          "bg-red-50 text-red-700"
                        }`}>
                          {animal.health}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Log Status Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Morning Log */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Morning Log
                      </p>
                      {animal.morningLogStatus === "completed" ? (
                        <div className="flex items-center gap-1.5 text-green-700 mb-2">
                          <Check className="w-4 h-4" />
                          <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Completed</span>
                        </div>
                      ) : animal.morningLogStatus === "overdue" ? (
                        <>
                          <div className="flex items-center gap-1.5 text-red-700 mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Overdue</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartLog(animal.id, "morning");
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Log Now
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5 text-orange-600 mb-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pending</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartLog(animal.id, "morning");
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Log
                          </button>
                        </>
                      )}
                    </div>

                    {/* Evening Log */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-600 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Evening Log
                      </p>
                      {animal.eveningLogStatus === "completed" ? (
                        <div className="flex items-center gap-1.5 text-green-700 mb-2">
                          <Check className="w-4 h-4" />
                          <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Completed</span>
                        </div>
                      ) : animal.eveningLogStatus === "overdue" ? (
                        <>
                          <div className="flex items-center gap-1.5 text-red-700 mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Overdue</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartLog(animal.id, "evening");
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Log Now
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5 text-orange-600 mb-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pending</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartLog(animal.id, "evening");
                            }}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Log
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Animal
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Species
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Enclosure
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Health
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Morning Log
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Evening Log
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockAnimals.map((animal) => {
                  const needsAttention = animal.morningLogStatus === "overdue" || animal.eveningLogStatus === "overdue" || animal.health === "Critical" || animal.health === "Poor";

                  return (
                    <tr 
                      key={animal.id} 
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${needsAttention ? 'bg-red-50/30' : ''}`}
                      onClick={() => navigate(`/app/animal/${animal.id}`)}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={animalImages[animal.image]}
                            alt={animal.name}
                            className="w-9 h-9 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {animal.name}
                            </p>
                            <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {animal.nameHindi}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {animal.species}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {animal.enclosure}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                          animal.health === "Excellent" ? "bg-green-50 text-green-700" :
                          animal.health === "Good" ? "bg-blue-50 text-blue-700" :
                          animal.health === "Fair" ? "bg-yellow-50 text-yellow-700" :
                          "bg-red-50 text-red-700"
                        }`}>
                          {animal.health}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex flex-col items-center gap-2">
                          {animal.morningLogStatus === "completed" ? (
                            <div className="flex items-center gap-1.5 text-green-700">
                              <Check className="w-4 h-4" />
                              <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Logged</span>
                            </div>
                          ) : animal.morningLogStatus === "overdue" ? (
                            <div className="flex items-center gap-1.5 text-red-700">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Overdue</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-orange-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pending</span>
                            </div>
                          )}
                          {animal.morningLogStatus !== "completed" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartLog(animal.id, "morning");
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Log
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex flex-col items-center gap-2">
                          {animal.eveningLogStatus === "completed" ? (
                            <div className="flex items-center gap-1.5 text-green-700">
                              <Check className="w-4 h-4" />
                              <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Logged</span>
                            </div>
                          ) : animal.eveningLogStatus === "overdue" ? (
                            <div className="flex items-center gap-1.5 text-red-700">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Overdue</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-orange-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pending</span>
                            </div>
                          )}
                          {animal.eveningLogStatus !== "completed" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartLog(animal.id, "evening");
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#6366F1] text-white rounded-lg text-xs font-medium hover:bg-[#4F46E5] transition-colors"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Log
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Enhanced Log Entry Modal with Guided Prompts */}
      {showLogModal && selectedAnimal && (
        <DailyLogModal
          isOpen={showLogModal}
          onClose={() => {
            setShowLogModal(false);
            setIsRecording(false);
            setRecordingTime(0);
          }}
          onSubmit={(data) => {
            console.log("Log submitted:", data);
            // Handle log submission here
            setShowLogModal(false);
            setIsRecording(false);
            setRecordingTime(0);
          }}
          animalName={mockAnimals.find(a => a.id === selectedAnimal)?.name || "Animal"}
          shift={selectedShift.charAt(0).toUpperCase() + selectedShift.slice(1)}
        />
      )}
    </div>
  );
}