import { useState } from "react";
import { FileText, Volume2, ChevronDown, ChevronUp, Calendar, Clock, User, Play, Pause } from "lucide-react";
import { ExportButton, convertToCSV, exportToPDF } from "./ExportButton";

interface SubmittedLog {
  id: string;
  animalName: string;
  animalSpecies: string;
  keeperName: string;
  shift: string;
  date: string;
  recordingDuration: string;
  animalHealth: {
    feedConsumed: string;
    feedQuantity: string;
    waterNormal: boolean;
    digestionProblem: boolean;
    injuryNoticed: boolean;
    weaknessNoticed: boolean;
    activityLevel: string;
    alertResponsive: boolean;
    pestsNoticed: boolean;
    safetyRisks: boolean;
    additionalNotes: string;
  };
  enclosureReport: {
    cleaningTime: string;
    wasteRemoved: boolean;
    waterTroughCleaned: boolean;
    freshWaterAvailable: boolean;
    fencingSecure: boolean;
    moatCondition: string;
    pestsInEnclosure: boolean;
    allSecured: boolean;
    remarks: string;
  };
}

// Mock submitted logs data
const mockSubmittedLogs: SubmittedLog[] = [
  {
    id: "log1",
    animalName: "Mowgli",
    animalSpecies: "Bengal Tiger",
    keeperName: "Rajesh Kumar",
    shift: "Morning",
    date: "2026-03-23",
    recordingDuration: "3:24",
    animalHealth: {
      feedConsumed: "75%",
      feedQuantity: "8 kg",
      waterNormal: true,
      digestionProblem: false,
      injuryNoticed: false,
      weaknessNoticed: false,
      activityLevel: "Normal",
      alertResponsive: true,
      pestsNoticed: false,
      safetyRisks: false,
      additionalNotes: "Animal is in good health. Showed normal behavior during feeding time.",
    },
    enclosureReport: {
      cleaningTime: "07:30 AM",
      wasteRemoved: true,
      waterTroughCleaned: true,
      freshWaterAvailable: true,
      fencingSecure: true,
      moatCondition: "Dry",
      pestsInEnclosure: false,
      allSecured: true,
      remarks: "All systems secure. No maintenance issues.",
    },
  },
  {
    id: "log2",
    animalName: "Raja",
    animalSpecies: "Indian Elephant",
    keeperName: "Priya Sharma",
    shift: "Evening",
    date: "2026-03-23",
    recordingDuration: "4:12",
    animalHealth: {
      feedConsumed: "100%",
      feedQuantity: "120 kg",
      waterNormal: true,
      digestionProblem: false,
      injuryNoticed: false,
      weaknessNoticed: false,
      activityLevel: "Very Active",
      alertResponsive: true,
      pestsNoticed: false,
      safetyRisks: false,
      additionalNotes: "Excellent appetite and energy levels. Interacted well with keepers.",
    },
    enclosureReport: {
      cleaningTime: "03:45 PM",
      wasteRemoved: true,
      waterTroughCleaned: true,
      freshWaterAvailable: true,
      fencingSecure: true,
      moatCondition: "Partially Filled",
      pestsInEnclosure: false,
      allSecured: true,
      remarks: "Water pool refilled. Enclosure in excellent condition.",
    },
  },
  {
    id: "log3",
    animalName: "Baloo",
    animalSpecies: "Sloth Bear",
    keeperName: "Amit Verma",
    shift: "Morning",
    date: "2026-03-22",
    recordingDuration: "2:56",
    animalHealth: {
      feedConsumed: "50%",
      feedQuantity: "Not mentioned",
      waterNormal: true,
      digestionProblem: false,
      injuryNoticed: true,
      weaknessNoticed: true,
      activityLevel: "Less Active",
      alertResponsive: false,
      pestsNoticed: false,
      safetyRisks: false,
      additionalNotes: "Minor cut on left paw. Animal seems lethargic. Veterinary consultation recommended.",
    },
    enclosureReport: {
      cleaningTime: "08:15 AM",
      wasteRemoved: true,
      waterTroughCleaned: true,
      freshWaterAvailable: true,
      fencingSecure: true,
      moatCondition: "Not Applicable",
      pestsInEnclosure: false,
      allSecured: true,
      remarks: "Enclosure cleaned and secured.",
    },
  },
];

export function SubmittedLogsViewer() {
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const handlePlayAudio = (logId: string) => {
    if (playingAudio === logId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(logId);
      // Simulate audio playback
      setTimeout(() => setPlayingAudio(null), 3000);
    }
  };

  const handleExportCSV = () => {
    const exportData = mockSubmittedLogs.map(log => ({
      Date: log.date,
      Shift: log.shift,
      Animal: log.animalName,
      Species: log.animalSpecies,
      Keeper: log.keeperName,
      "Feed Consumed": log.animalHealth.feedConsumed,
      "Feed Quantity": log.animalHealth.feedQuantity,
      "Water Normal": log.animalHealth.waterNormal ? "Yes" : "No",
      "Activity Level": log.animalHealth.activityLevel,
      "Health Issues": (log.animalHealth.injuryNoticed || log.animalHealth.weaknessNoticed || log.animalHealth.digestionProblem) ? "Yes" : "No",
      "Cleaning Time": log.enclosureReport.cleaningTime,
      "All Secured": log.enclosureReport.allSecured ? "Yes" : "No",
      "Additional Notes": log.animalHealth.additionalNotes,
      "Enclosure Remarks": log.enclosureReport.remarks
    }));
    convertToCSV(exportData, "daily_logs");
  };

  return (
    <div>
      {/* Header with Export Buttons */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Zookeeper Daily Logs
          </h3>
          <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            View submitted daily logs with voice recordings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton
            type="csv"
            onClick={handleExportCSV}
          />
        </div>
      </div>

      {/* Logs Content */}
      <div className="space-y-4" id="daily-logs-content">
        {mockSubmittedLogs.map((log) => {
          const isExpanded = expandedLog === log.id;
          const hasHealthIssues = log.animalHealth.injuryNoticed || log.animalHealth.weaknessNoticed || log.animalHealth.digestionProblem;

          return (
            <div
              key={log.id}
              className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                hasHealthIssues ? "border-orange-200" : "border-gray-200"
              }`}
            >
              {/* Log Header */}
              <div
                className={`px-6 py-4 cursor-pointer transition-colors ${
                  hasHealthIssues ? "bg-orange-50/50" : "bg-gray-50"
                }`}
                onClick={() => setExpandedLog(isExpanded ? null : log.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Animal Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          {log.animalName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          log.shift === "Morning" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                        }`}>
                          {log.shift} Shift
                        </span>
                        {hasHealthIssues && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                            ⚠️ Attention Needed
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{log.animalSpecies}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{log.keeperName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{log.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>Recorded at {log.enclosureReport.cleaningTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Voice Recording Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(log.id);
                      }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${
                        playingAudio === log.id
                          ? "bg-[#7C3AED] border-[#7C3AED] text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:border-[#7C3AED] hover:bg-purple-50"
                      }`}
                    >
                      {playingAudio === log.id ? (
                        <Pause className="w-4 h-4" strokeWidth={1.5} />
                      ) : (
                        <Play className="w-4 h-4" strokeWidth={1.5} />
                      )}
                      <div className="text-left">
                        <div className="text-xs font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Voice Recording
                        </div>
                        <div className="text-xs opacity-80" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {log.recordingDuration}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Expand Button */}
                  <button className="p-2 hover:bg-white/50 rounded-lg transition-colors ml-3">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 py-5 space-y-6 bg-white">
                  {/* Animal Health Section */}
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#7C3AED]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      Section A: Daily Animal Health
                    </h4>

                    <div className="space-y-4">
                      {/* 1. Feeding & Drinking */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          1. Feeding & Drinking
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Feed Consumed:</span>
                            <span className="ml-2 font-semibold text-gray-900">{log.animalHealth.feedConsumed}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Quantity:</span>
                            <span className="ml-2 font-semibold text-gray-900">{log.animalHealth.feedQuantity}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Water Consumption:</span>
                            <span className={`ml-2 font-semibold ${log.animalHealth.waterNormal ? "text-green-700" : "text-red-700"}`}>
                              {log.animalHealth.waterNormal ? "✓ Normal" : "✗ Abnormal"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Digestion Problem:</span>
                            <span className={`ml-2 font-semibold ${log.animalHealth.digestionProblem ? "text-red-700" : "text-green-700"}`}>
                              {log.animalHealth.digestionProblem ? "✗ Yes" : "✓ No"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Health & Physical Condition */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          2. Health & Physical Condition
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Injury/Illness:</span>
                            <span className={`ml-2 font-semibold ${log.animalHealth.injuryNoticed ? "text-red-700" : "text-green-700"}`}>
                              {log.animalHealth.injuryNoticed ? "✗ Noticed" : "✓ None"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Weakness/Lethargy:</span>
                            <span className={`ml-2 font-semibold ${log.animalHealth.weaknessNoticed ? "text-red-700" : "text-green-700"}`}>
                              {log.animalHealth.weaknessNoticed ? "✗ Noticed" : "✓ None"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Behaviour & Activity */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          3. Behaviour & Activity
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Activity Level:</span>
                            <span className="ml-2 font-semibold text-gray-900">{log.animalHealth.activityLevel}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Alert & Responsive:</span>
                            <span className={`ml-2 font-semibold ${log.animalHealth.alertResponsive ? "text-green-700" : "text-red-700"}`}>
                              {log.animalHealth.alertResponsive ? "✓ Yes" : "✗ No"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 6. Hygiene, Pest & Safety */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          6. Hygiene, Pest & Safety
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Pests:</span>
                            <span className={`ml-2 font-semibold ${log.animalHealth.pestsNoticed ? "text-red-700" : "text-green-700"}`}>
                              {log.animalHealth.pestsNoticed ? "✗ Noticed" : "✓ None"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Safety Risks:</span>
                            <span className={`ml-2 font-semibold ${log.animalHealth.safetyRisks ? "text-red-700" : "text-green-700"}`}>
                              {log.animalHealth.safetyRisks ? "✗ Noticed" : "✓ None"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 7. Additional Observations */}
                      {log.animalHealth.additionalNotes && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                            7. Additional Observations
                          </h5>
                          <p className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {log.animalHealth.additionalNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enclosure Report Section */}
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 border-[#7C3AED]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      Section B: Enclosure Report
                    </h4>

                    <div className="space-y-4">
                      {/* 1. Cleanliness & Waste */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          1. Cleanliness & Waste
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Cleaning Time:</span>
                            <span className="ml-2 font-semibold text-gray-900">{log.enclosureReport.cleaningTime}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Waste Removed:</span>
                            <span className={`ml-2 font-semibold ${log.enclosureReport.wasteRemoved ? "text-green-700" : "text-red-700"}`}>
                              {log.enclosureReport.wasteRemoved ? "✓ Yes" : "✗ No"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Water & Sanitation */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          2. Water & Sanitation
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Water Trough Cleaned:</span>
                            <span className={`ml-2 font-semibold ${log.enclosureReport.waterTroughCleaned ? "text-green-700" : "text-red-700"}`}>
                              {log.enclosureReport.waterTroughCleaned ? "✓ Yes" : "✗ No"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Fresh Water Available:</span>
                            <span className={`ml-2 font-semibold ${log.enclosureReport.freshWaterAvailable ? "text-green-700" : "text-red-700"}`}>
                              {log.enclosureReport.freshWaterAvailable ? "✓ Yes" : "✗ No"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Fencing & Locking */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          3. Fencing & Locking
                        </h5>
                        <div className="text-sm">
                          <span className="text-gray-600">All Secure:</span>
                          <span className={`ml-2 font-semibold ${log.enclosureReport.fencingSecure ? "text-green-700" : "text-red-700"}`}>
                            {log.enclosureReport.fencingSecure ? "✓ Yes" : "✗ No"}
                          </span>
                        </div>
                      </div>

                      {/* 4. Moat Condition */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          4. Moat Condition
                        </h5>
                        <div className="text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className="ml-2 font-semibold text-gray-900">{log.enclosureReport.moatCondition}</span>
                        </div>
                      </div>

                      {/* 5. Pest Control */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          5. Pest Control
                        </h5>
                        <div className="text-sm">
                          <span className="text-gray-600">Pests in Enclosure:</span>
                          <span className={`ml-2 font-semibold ${log.enclosureReport.pestsInEnclosure ? "text-red-700" : "text-green-700"}`}>
                            {log.enclosureReport.pestsInEnclosure ? "✗ Noticed" : "✓ None"}
                          </span>
                        </div>
                      </div>

                      {/* 6. Final Safety */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          6. Final Safety
                        </h5>
                        <div className="text-sm">
                          <span className="text-gray-600">All Secured:</span>
                          <span className={`ml-2 font-semibold ${log.enclosureReport.allSecured ? "text-green-700" : "text-red-700"}`}>
                            {log.enclosureReport.allSecured ? "✓ Yes" : "✗ No"}
                          </span>
                        </div>
                      </div>

                      {/* 7. Remarks */}
                      {log.enclosureReport.remarks && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                            7. Remarks
                          </h5>
                          <p className="text-sm text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {log.enclosureReport.remarks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}