import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Mic, Camera, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import { mockAnimals } from "../data/mockData";

export function LogEntry() {
  const navigate = useNavigate();
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRecordAudio = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      const interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 5) {
            clearInterval(interval);
            setIsRecording(false);
            setTranscript("Tiger appeared lethargic during feeding time. Only consumed half portion of meat. Showing signs of reduced activity.");
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      setTranscript("Tiger appeared lethargic during feeding time. Only consumed half portion of meat. Showing signs of reduced activity.");
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/zookeeper");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Header role="Zookeeper" roleHindi="चिड़ियाघर कर्मी" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Submit Daily Log
          </h1>
          <p className="text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Record your animal observation using voice or text
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Animal Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Select Animal *
              </label>
              <select
                value={selectedAnimal}
                onChange={(e) => setSelectedAnimal(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <option value="">Choose an animal...</option>
                {mockAnimals.map(animal => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name} ({animal.species})
                  </option>
                ))}
              </select>
            </div>

            {/* Shift Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Shift *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2.5 border-2 border-indigo-600 bg-indigo-50 text-indigo-600 rounded-lg font-medium text-sm">
                  Morning (11 AM)
                </button>
                <button className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50">
                  Evening (4 PM)
                </button>
              </div>
            </div>

            {/* Voice Recording */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Voice Observation
              </label>
              <button
                onClick={handleRecordAudio}
                className={`w-full p-8 border-2 border-dashed rounded-xl transition-all flex flex-col items-center gap-3 ${
                  isRecording ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                }`}
              >
                <Mic className={`w-12 h-12 ${isRecording ? "text-red-600 animate-pulse" : "text-gray-400"}`} />
                <span className="text-sm font-medium text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {isRecording ? "Recording... Tap to stop" : "Tap to record voice observation"}
                </span>
                {isRecording && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-xs text-red-600">00:0{recordingTime}</span>
                  </div>
                )}
              </button>

              {/* Transcript */}
              {transcript && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Transcribed:</strong> {transcript}
                  </p>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Feeding Status *
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option>Full portion consumed</option>
                  <option>Partial consumption</option>
                  <option>Refused food</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Behavior *
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option>Normal/Active</option>
                  <option>Lethargic</option>
                  <option>Aggressive</option>
                  <option>Anxious</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Health Status
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                  <option>Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Activity Level
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option>Very Active</option>
                  <option>Active</option>
                  <option>Moderate</option>
                  <option>Low</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Additional Notes
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="Describe the observation in detail..."
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Photos (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-gray-50 transition-all flex flex-col items-center gap-2">
                  <Camera className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Take Photo
                  </span>
                </button>
                <button className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-gray-50 transition-all flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Upload Photo
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedAnimal}
              className="flex-1 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Submit Log
            </button>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Log Submitted Successfully!
              </h2>
              <p className="text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Your observation has been recorded and saved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
