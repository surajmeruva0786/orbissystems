import { useState, useEffect } from "react";
import { X, Mic, ChevronRight, ChevronLeft, Check, Volume2 } from "lucide-react";

interface DailyLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  animalName: string;
  shift: string;
}

// Question sections for voice recording
const animalHealthQuestions = [
  { id: "feeding", question: "Feeding & Drinking", hint: "Feed consumed %, quantity, water intake, vomiting/diarrhoea?" },
  { id: "health", question: "Health & Physical Condition", hint: "Any injury, swelling, wounds, discharge, limping, weakness?" },
  { id: "behaviour", question: "Behaviour & Activity", hint: "Activity level? Alert and responsive?" },
  { id: "reproductive", question: "Reproductive Status", hint: "Mating, heat signs, pregnancy, birth observed?" },
  { id: "mortality", question: "Mortality / Critical Condition", hint: "Any death, serious injury, critical illness?" },
  { id: "hygiene", question: "Hygiene, Pest & Safety", hint: "Flies, rodents, pests, broken fence, safety risks?" },
  { id: "additional", question: "Additional Observations", hint: "Any unusual or noteworthy observations?" },
];

const enclosureQuestions = [
  { id: "cleanliness", question: "Cleanliness & Waste", hint: "Cleaning time? Waste removed? Water area cleaned?" },
  { id: "water", question: "Water & Sanitation", hint: "Water trough cleaned? Fresh water available?" },
  { id: "fencing", question: "Fencing & Locking", hint: "All fences, cages, doors, locks secure?" },
  { id: "moat", question: "Moat Condition", hint: "Dry, Wet, Partially Filled, or Not Applicable?" },
  { id: "pest", question: "Pest Control", hint: "Flies, mosquitoes, rodents, insects noticed?" },
  { id: "safety", question: "Final Safety", hint: "All cells, cages, gates secured before closing?" },
  { id: "remarks", question: "Remarks", hint: "Unusual observation, pending repair, urgent action?" },
  { id: "kraal", question: "Kraal / Night Shelter", hint: "Night shelter condition and security?" },
];

export function DailyLogModal({ isOpen, onClose, onSubmit, animalName, shift }: DailyLogModalProps) {
  const [step, setStep] = useState<"recording" | "review">("recording");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [currentSection, setCurrentSection] = useState<"animal" | "enclosure">("animal");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingCompleted, setRecordingCompleted] = useState(false);

  // Simulated extracted form data
  const [formData, setFormData] = useState({
    animalHealth: {
      feedConsumed: "50%",
      feedQuantity: "Not mentioned",
      waterNormal: true,
      digestionProblem: false,
      injuryNoticed: false,
      weaknessNoticed: false,
      activityLevel: "Normal",
      alertResponsive: true,
      reproductiveActivity: "None",
      mortalityCritical: "None",
      pestsNoticed: false,
      safetyRisks: false,
      additionalNotes: "",
    },
    enclosureReport: {
      cleaningTime: "08:30 AM",
      wasteRemoved: true,
      waterTroughCleaned: true,
      freshWaterAvailable: true,
      fencingSecure: true,
      moatCondition: "Not Applicable",
      pestsInEnclosure: false,
      allSecured: true,
      remarks: "",
    },
  });

  const currentQuestions = currentSection === "animal" ? animalHealthQuestions : enclosureQuestions;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          // Auto-advance every 20 seconds
          if (newTime % 20 === 0) {
            handleNextQuestion();
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, currentQuestionIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSection === "animal") {
      setCurrentSection("enclosure");
      setCurrentQuestionIndex(0);
    } else {
      setIsRecording(false);
      setRecordingCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSection === "enclosure") {
      setCurrentSection("animal");
      setCurrentQuestionIndex(animalHealthQuestions.length - 1);
    }
  };

  const handleProceedToReview = () => {
    setStep("review");
  };

  const handleSubmitFinal = () => {
    onSubmit({
      ...formData,
      recordingTime,
      shift,
      timestamp: new Date().toISOString(),
    });
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setStep("recording");
    setIsRecording(false);
    setRecordingTime(0);
    setCurrentSection("animal");
    setCurrentQuestionIndex(0);
    setRecordingCompleted(false);
  };

  if (!isOpen) return null;

  const totalQuestions = animalHealthQuestions.length + enclosureQuestions.length;
  const currentGlobalIndex = currentSection === "animal" 
    ? currentQuestionIndex 
    : animalHealthQuestions.length + currentQuestionIndex;
  const progress = ((currentGlobalIndex + 1) / totalQuestions) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Daily Log Report - {animalName}
              </h2>
              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {shift} Shift • {step === "recording" ? "Voice Recording" : "Review & Submit"}
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                resetModal();
              }}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === "recording" ? (
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Question {currentGlobalIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs font-semibold text-[#7C3AED]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7C3AED] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Section Indicator */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`px-3 py-1.5 rounded-lg border ${
                  currentSection === "animal" 
                    ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]" 
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }`}>
                  <span className="text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Animal Health
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
                <div className={`px-3 py-1.5 rounded-lg border ${
                  currentSection === "enclosure" 
                    ? "border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]" 
                    : "border-gray-200 bg-gray-50 text-gray-500"
                }`}>
                  <span className="text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Enclosure Report
                  </span>
                </div>
              </div>

              {/* Current Question Card */}
              {!recordingCompleted ? (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-[#7C3AED] text-white text-xs font-bold rounded-md">
                        Q{currentGlobalIndex + 1}
                      </span>
                      <span className="text-xs font-medium text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {currentSection === "animal" ? "Animal Health" : "Enclosure Report"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {currentQuestions[currentQuestionIndex].question}
                    </h3>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {currentQuestions[currentQuestionIndex].hint}
                    </p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentSection === "animal" && currentQuestionIndex === 0}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                      Previous
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    {isRecording && (
                      <span className="ml-auto text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Auto-advance in {20 - (recordingTime % 20)}s
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center mb-6">
                  <div className="w-14 h-14 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Recording Completed
                  </h3>
                  <p className="text-sm text-gray-600 mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Voice recording processed successfully. Duration: {formatTime(recordingTime)}
                  </p>
                  <button
                    onClick={handleProceedToReview}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:bg-[#6D28D9] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Review Form
                    <ChevronRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              )}

              {/* Recording Controls */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    Voice Recording
                  </h4>
                  {recordingTime > 0 && (
                    <span className="text-sm font-mono font-semibold text-gray-900">
                      {formatTime(recordingTime)}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleRecordToggle}
                  disabled={recordingCompleted}
                  className={`w-full py-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                    isRecording
                      ? "border-red-500 bg-red-50"
                      : recordingCompleted
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : "border-gray-200 bg-gray-50 hover:border-[#7C3AED] hover:bg-[#F5F3FF]"
                  }`}
                >
                  {recordingCompleted ? (
                    <>
                      <Volume2 className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Recording Saved - {formatTime(recordingTime)}
                      </span>
                    </>
                  ) : (
                    <>
                      <Mic className={`w-10 h-10 ${isRecording ? "text-red-500 animate-pulse" : "text-gray-400"}`} strokeWidth={1.5} />
                      <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {isRecording ? "Recording... Click to Stop" : "Click to Start Recording"}
                      </span>
                      {isRecording && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs text-red-600 font-semibold">LIVE</span>
                        </div>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            // Review & Edit Form
            <div className="p-6">
              <div className="bg-[#F5F3FF] border border-[#E9D5FF] rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      Auto-Generated from Voice Recording
                    </h4>
                    <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Review the information below and make any necessary edits before submitting. Your {formatTime(recordingTime)} voice recording will be saved with this report.
                    </p>
                  </div>
                </div>
              </div>

              {/* Animal Health Section */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Section A: Daily Animal Health
                </h3>

                <div className="space-y-4">
                  {/* 1. Feeding & Drinking */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      1. Feeding & Drinking
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Feed Consumed</label>
                        <select
                          value={formData.animalHealth.feedConsumed}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, feedConsumed: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <option>25%</option>
                          <option>50%</option>
                          <option>75%</option>
                          <option>100%</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Quantity (kg/L)</label>
                        <input
                          type="text"
                          value={formData.animalHealth.feedQuantity}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, feedQuantity: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                          placeholder="e.g., 5 kg"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.animalHealth.waterNormal}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, waterNormal: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Water consumption normal</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.animalHealth.digestionProblem}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, digestionProblem: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Digestion problem noticed</label>
                      </div>
                    </div>
                  </div>

                  {/* 2. Health & Physical Condition */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      2. Health & Physical Condition
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.animalHealth.injuryNoticed}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, injuryNoticed: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Injury/illness noticed</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.animalHealth.weaknessNoticed}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, weaknessNoticed: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Weak/lethargic</label>
                      </div>
                    </div>
                  </div>

                  {/* 3. Behaviour & Activity */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      3. Behaviour & Activity
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Activity Level</label>
                        <select
                          value={formData.animalHealth.activityLevel}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, activityLevel: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <option>Very Active</option>
                          <option>Normal</option>
                          <option>Less Active</option>
                          <option>Very Dull</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.animalHealth.alertResponsive}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, alertResponsive: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Alert and responsive</label>
                      </div>
                    </div>
                  </div>

                  {/* 4. Hygiene, Pest & Safety */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      4. Hygiene, Pest & Safety
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.animalHealth.pestsNoticed}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, pestsNoticed: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pests noticed</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.animalHealth.safetyRisks}
                          onChange={(e) => setFormData({
                            ...formData,
                            animalHealth: { ...formData.animalHealth, safetyRisks: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety risks noticed</label>
                      </div>
                    </div>
                  </div>

                  {/* 5. Additional Observations */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      5. Additional Observations
                    </h4>
                    <textarea
                      value={formData.animalHealth.additionalNotes}
                      onChange={(e) => setFormData({
                        ...formData,
                        animalHealth: { ...formData.animalHealth, additionalNotes: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none"
                      placeholder="Any unusual or important observations..."
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                </div>
              </div>

              {/* Enclosure Report Section */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Section B: Enclosure Report
                </h3>

                <div className="space-y-4">
                  {/* 1. Cleanliness */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      1. Cleanliness & Maintenance
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Cleaning Time</label>
                        <input
                          type="text"
                          value={formData.enclosureReport.cleaningTime}
                          onChange={(e) => setFormData({
                            ...formData,
                            enclosureReport: { ...formData.enclosureReport, cleaningTime: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                          placeholder="e.g., 08:30 AM"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.enclosureReport.wasteRemoved}
                          onChange={(e) => setFormData({
                            ...formData,
                            enclosureReport: { ...formData.enclosureReport, wasteRemoved: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Waste removed</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.enclosureReport.waterTroughCleaned}
                          onChange={(e) => setFormData({
                            ...formData,
                            enclosureReport: { ...formData.enclosureReport, waterTroughCleaned: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Water trough cleaned</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.enclosureReport.freshWaterAvailable}
                          onChange={(e) => setFormData({
                            ...formData,
                            enclosureReport: { ...formData.enclosureReport, freshWaterAvailable: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Fresh water available</label>
                      </div>
                    </div>
                  </div>

                  {/* 2. Security & Safety */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      2. Security & Safety
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.enclosureReport.fencingSecure}
                          onChange={(e) => setFormData({
                            ...formData,
                            enclosureReport: { ...formData.enclosureReport, fencingSecure: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>Fencing secure</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.enclosureReport.allSecured}
                          onChange={(e) => setFormData({
                            ...formData,
                            enclosureReport: { ...formData.enclosureReport, allSecured: e.target.checked }
                          })}
                          className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                        />
                        <label className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>All gates secured</label>
                      </div>
                    </div>
                  </div>

                  {/* 3. Additional Remarks */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      3. Remarks
                    </h4>
                    <textarea
                      value={formData.enclosureReport.remarks}
                      onChange={(e) => setFormData({
                        ...formData,
                        enclosureReport: { ...formData.enclosureReport, remarks: e.target.value }
                      })}
                      rows={2}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent resize-none"
                      placeholder="Any additional remarks or pending issues..."
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (step === "review") {
                  setStep("recording");
                } else {
                  onClose();
                  resetModal();
                }
              }}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {step === "review" ? "Back to Recording" : "Cancel"}
            </button>
            {step === "review" && (
              <button
                onClick={handleSubmitFinal}
                className="flex-1 px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl font-semibold hover:bg-[#6D28D9] transition-colors text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Submit Daily Log
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
