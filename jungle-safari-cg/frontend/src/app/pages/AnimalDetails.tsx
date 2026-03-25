import { useParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { ArrowLeft, Calendar, Activity, FileText, AlertCircle, Pill } from "lucide-react";
import { getAnimalById, getLogsByAnimalId, mockMedicalRecords } from "../data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const animalImages: Record<string, string> = {
  "bengal-tiger": "https://images.unsplash.com/photo-1659879622193-f61183e74a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5nYWwlMjB0aWdlciUyMG9yYW5nZXxlbnwxfHx8fDE3NzQxNzk2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "indian-elephant": "https://images.unsplash.com/photo-1588014307509-1ef94e20955f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBlbGVwaGFudCUyMHdhbGtpbmd8ZW58MXx8fHwxNzc0MTc5NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "sloth-bear": "https://images.unsplash.com/photo-1760640018928-94f1a834a74f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbG90aCUyMGJlYXIlMjB3aWxkbGlmZXxlbnwxfHx8fDE3NzQxNzk2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "asiatic-lion": "https://images.unsplash.com/photo-1758144761848-1e03ab8cd6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhdGljJTIwbGlvbiUyMG1hbGV8ZW58MXx8fHwxNzc0MTc5NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "peacock": "https://images.unsplash.com/photo-1592698369473-509578e7d8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjb2NrJTIwY29sb3JmdWwlMjBmZWF0aGVyc3xlbnwxfHx8fDE3NzQwOTcxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "leopard": "https://images.unsplash.com/photo-1763306734254-b2100d490dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsZW9wYXJkJTIwc3BvdHRlZHxlbnwxfHx8fDE3NzQxNzk2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

// Mock health trend data
const healthTrendData = [
  { date: "Mar 15", score: 95 },
  { date: "Mar 16", score: 93 },
  { date: "Mar 17", score: 94 },
  { date: "Mar 18", score: 92 },
  { date: "Mar 19", score: 90 },
  { date: "Mar 20", score: 88 },
  { date: "Mar 21", score: 85 },
  { date: "Mar 22", score: 82 },
];

export function AnimalDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const animal = id ? getAnimalById(id) : undefined;
  const logs = id ? getLogsByAnimalId(id) : [];

  if (!animal) {
    return (
      <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Animal Not Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Header role="Animal Details" roleHindi="पशु विवरण" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Animal Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-1">
              <img
                src={animalImages[animal.image]}
                alt={animal.name}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {animal.name}
                  </h1>
                  <p className="text-xl text-indigo-600 font-medium mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {animal.nameHindi}
                  </p>
                  <p className="text-lg text-gray-700 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {animal.species} ({animal.speciesHindi})
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  animal.health === "Excellent" ? "bg-green-100 text-green-700" :
                  animal.health === "Good" ? "bg-blue-100 text-blue-700" :
                  animal.health === "Fair" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {animal.health}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Age
                  </p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {animal.age}
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>years</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Gender
                  </p>
                  <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {animal.gender}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                  <p className="text-xs text-gray-600 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Enclosure
                  </p>
                  <p className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    {animal.enclosure}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Behavior
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {animal.behavior}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Pill className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Diet
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {animal.diet}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Last Fed
                    </p>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {animal.lastFed}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Trend */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Health Trend (7 Days)
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif" }} stroke="#6B7280" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif" }} stroke="#6B7280" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontFamily: "'DM Sans', sans-serif" }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{ fill: '#4F46E5', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            {animal.health === "Critical" || animal.health === "Poor" ? (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Declining Health Alert
                  </p>
                  <p className="text-xs text-red-700 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    This animal's health has been declining. Immediate veterinary attention recommended.
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Medical Records */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Medical History
              </h2>
            </div>
            <div className="space-y-4">
              {mockMedicalRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      {record.condition}
                    </p>
                    <span className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {record.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Treatment:</strong> {record.treatment}
                  </p>
                  {record.medication && (
                    <p className="text-sm text-indigo-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <strong>Medication:</strong> {record.medication}
                    </p>
                  )}
                  <p className="text-xs text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Vet:</strong> {record.vetName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {record.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Logs */}
        <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Recent Daily Logs
            </h2>
          </div>
          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                        {log.type === "morning" ? "Morning Log" : "Evening Log"}
                      </h3>
                      <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        By {log.keeperName} • {log.timestamp}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {log.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Feeding
                      </p>
                      <p className="text-sm text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {log.feeding}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Behavior
                      </p>
                      <p className="text-sm text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {log.behavior}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Health
                      </p>
                      <p className={`text-sm font-medium ${log.health.includes("ALERT") ? "text-red-600" : "text-gray-900"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {log.health}
                      </p>
                    </div>
                  </div>

                  {log.notes && (
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <p className="text-sm text-indigo-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        <strong>Notes:</strong> {log.notes}
                      </p>
                    </div>
                  )}

                  {log.audioTranscript && (
                    <div className="mt-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <p className="text-xs text-blue-700 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Audio Transcript (Hindi):
                      </p>
                      <p className="text-sm text-blue-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {log.audioTranscript}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No logs available for this animal yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
