import { useState } from "react";
import { Calendar, Clock, User, FileText, AlertCircle, CheckCircle, Filter, Search, Mic } from "lucide-react";
import { mockDailyLogs, mockAnimals } from "../data/mockData";

interface DailyLogsViewerProps {
  title?: string;
  titleHindi?: string;
}

export function DailyLogsViewer({ title = "Daily Logs", titleHindi = "दैनिक लॉग" }: DailyLogsViewerProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "morning" | "evening" | "alerts">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState<string>("all");

  // Filter logs based on selected filters
  const filteredLogs = mockDailyLogs.filter(log => {
    const matchesTypeFilter = 
      selectedFilter === "all" ? true :
      selectedFilter === "alerts" ? (log.health.includes("ALERT") || log.health.toLowerCase().includes("concern")) :
      log.type === selectedFilter;

    const matchesSearch = 
      searchQuery === "" ? true :
      log.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.keeperName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAnimalFilter = 
      selectedAnimalFilter === "all" ? true :
      log.animalId === selectedAnimalFilter;

    return matchesTypeFilter && matchesSearch && matchesAnimalFilter;
  });

  // Get health status badge color
  const getHealthStatusColor = (health: string) => {
    if (health.includes("ALERT") || health.toLowerCase().includes("concern")) {
      return "bg-red-100 text-red-700 border-red-200";
    } else if (health.toLowerCase().includes("excellent")) {
      return "bg-green-100 text-green-700 border-green-200";
    } else if (health.toLowerCase().includes("good")) {
      return "bg-blue-100 text-blue-700 border-blue-200";
    } else {
      return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {titleHindi}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Type Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === "all"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:border-[#7C3AED]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            All Logs
          </button>
          <button
            onClick={() => setSelectedFilter("morning")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === "morning"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:border-[#7C3AED]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Morning Shift
          </button>
          <button
            onClick={() => setSelectedFilter("evening")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === "evening"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:border-[#7C3AED]"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Evening Shift
          </button>
          <button
            onClick={() => setSelectedFilter("alerts")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedFilter === "alerts"
                ? "bg-red-600 text-white shadow-sm"
                : "bg-white text-gray-700 border border-gray-200 hover:border-red-500"
            }`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Alerts Only
            </span>
          </button>
        </div>

        {/* Animal Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedAnimalFilter}
            onChange={(e) => setSelectedAnimalFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <option value="all">All Animals</option>
            {mockAnimals.map(animal => (
              <option key={animal.id} value={animal.id}>
                {animal.name} - {animal.species}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Total Logs
              </p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {mockDailyLogs.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Morning Logs
              </p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {mockDailyLogs.filter(l => l.type === "morning").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Evening Logs
              </p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {mockDailyLogs.filter(l => l.type === "evening").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Alerts
              </p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {mockDailyLogs.filter(l => l.health.includes("ALERT") || l.health.toLowerCase().includes("concern")).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              No logs found matching your filters
            </p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isAlert = log.health.includes("ALERT") || log.health.toLowerCase().includes("concern");
            
            return (
              <div
                key={log.id}
                className={`bg-white rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                  isAlert 
                    ? "border-red-200 bg-red-50/30 hover:border-red-300" 
                    : "border-gray-200 hover:border-[#7C3AED]"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column - Animal Info */}
                  <div className="flex-shrink-0 lg:w-64">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        log.type === "morning" ? "bg-blue-100" : "bg-purple-100"
                      }`}>
                        <Clock className={`w-6 h-6 ${
                          log.type === "morning" ? "text-blue-600" : "text-purple-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                          {log.animalName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {mockAnimals.find(a => a.id === log.animalId)?.species}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                            log.type === "morning" 
                              ? "bg-blue-100 text-blue-700" 
                              : "bg-purple-100 text-purple-700"
                          }`}>
                            {log.type === "morning" ? "Morning Shift" : "Evening Shift"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Timestamp and Keeper */}
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 text-gray-400" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{log.keeperName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Log Details */}
                  <div className="flex-1 space-y-4">
                    {/* Feeding */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Feeding Status
                      </h4>
                      <p className="text-sm text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {log.feeding}
                      </p>
                    </div>

                    {/* Behavior */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Behavior Observation
                      </h4>
                      <p className="text-sm text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {log.behavior}
                      </p>
                    </div>

                    {/* Health Status */}
                    <div className={`rounded-lg p-4 border-2 ${
                      isAlert ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                    }`}>
                      <div className="flex items-start gap-2 mb-2">
                        {isAlert ? (
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <h4 
                            className={`text-xs font-semibold uppercase mb-2 ${isAlert ? "text-red-700" : "text-green-700"}`}
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            Health Assessment
                          </h4>
                          <p className={`text-sm font-medium ${
                            isAlert ? "text-red-900" : "text-green-900"
                          }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {log.health}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
                      <h4 className="text-xs font-semibold text-purple-700 uppercase mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Additional Notes
                      </h4>
                      <p className="text-sm text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {log.notes}
                      </p>
                    </div>

                    {/* Audio Transcript if available */}
                    {log.audioTranscript && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Mic className="w-4 h-4 text-blue-600" />
                          <h4 className="text-xs font-semibold text-blue-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            Voice Transcript (Hindi)
                          </h4>
                        </div>
                        <p className="text-sm text-gray-900 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          "{log.audioTranscript}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Results Count */}
      {filteredLogs.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Showing {filteredLogs.length} of {mockDailyLogs.length} total logs
          </p>
        </div>
      )}
    </div>
  );
}