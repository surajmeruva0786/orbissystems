import { useState } from "react";
import { X, Send, Mic, Square, Users, User } from "lucide-react";

interface Zookeeper {
  id: string;
  name: string;
  department: string;
}

interface SendInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (instruction: any) => void;
  zookeepers: Zookeeper[];
  senderRole?: string;
}

export function SendInstructionsModal({ isOpen, onClose, onSend, zookeepers, senderRole = "Admin" }: SendInstructionsModalProps) {
  const [recipientType, setRecipientType] = useState<"all" | "specific">("all");
  const [selectedZookeepers, setSelectedZookeepers] = useState<string[]>([]);
  const [instructionType, setInstructionType] = useState<"text" | "voice">("text");
  const [textContent, setTextContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setRecordingInterval(interval);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
  };

  const toggleZookeeper = (id: string) => {
    setSelectedZookeepers(prev =>
      prev.includes(id) ? prev.filter(zid => zid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const instruction = {
      id: Date.now().toString(),
      type: instructionType,
      content: instructionType === "text" ? textContent : `Voice recording (${recordingTime}s)`,
      recipientType,
      recipients: recipientType === "all" ? "all" : selectedZookeepers,
      recipientNames: recipientType === "all" 
        ? "All Zookeepers" 
        : selectedZookeepers.map(id => zookeepers.find(z => z.id === id)?.name).filter(Boolean).join(", "),
      timestamp: new Date().toISOString(),
      sender: senderRole,
    };

    onSend(instruction);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setRecipientType("all");
    setSelectedZookeepers([]);
    setInstructionType("text");
    setTextContent("");
    setIsRecording(false);
    setRecordingTime(0);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const canSubmit = 
    (instructionType === "text" && textContent.trim().length > 0) ||
    (instructionType === "voice" && recordingTime > 0 && !isRecording);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Send Instruction
              </h2>
              <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Communicate important instructions to your team
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Recipient Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Select Recipients
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRecipientType("all")}
                  className={`p-4 border rounded-xl transition-all text-left ${
                    recipientType === "all"
                      ? "border-[#7C3AED] bg-[#F5F3FF]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <Users className={`w-5 h-5 mb-2 ${recipientType === "all" ? "text-[#7C3AED]" : "text-gray-400"}`} strokeWidth={1.5} />
                  <p className={`text-sm font-semibold mb-0.5 ${recipientType === "all" ? "text-[#7C3AED]" : "text-gray-900"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    All Zookeepers
                  </p>
                  <p className="text-xs text-gray-500">{zookeepers.length} members</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRecipientType("specific")}
                  className={`p-4 border rounded-xl transition-all text-left ${
                    recipientType === "specific"
                      ? "border-[#7C3AED] bg-[#F5F3FF]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <User className={`w-5 h-5 mb-2 ${recipientType === "specific" ? "text-[#7C3AED]" : "text-gray-400"}`} strokeWidth={1.5} />
                  <p className={`text-sm font-semibold mb-0.5 ${recipientType === "specific" ? "text-[#7C3AED]" : "text-gray-900"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Specific Members
                  </p>
                  <p className="text-xs text-gray-500">{selectedZookeepers.length} selected</p>
                </button>
              </div>
            </div>

            {/* Select Specific Zookeepers */}
            {recipientType === "specific" && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Choose Team Members
                </label>
                <div className="border border-gray-200 rounded-xl p-3 max-h-48 overflow-y-auto bg-gray-50">
                  {zookeepers.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      No zookeepers available
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {zookeepers.map((zookeeper) => (
                        <label
                          key={zookeeper.id}
                          className="flex items-center gap-3 p-2.5 hover:bg-white rounded-lg cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedZookeepers.includes(zookeeper.id)}
                            onChange={() => toggleZookeeper(zookeeper.id)}
                            className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {zookeeper.name}
                            </p>
                            <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {zookeeper.department}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Message Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                Message Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInstructionType("text")}
                  className={`p-4 border rounded-xl transition-all ${
                    instructionType === "text"
                      ? "border-[#7C3AED] bg-[#F5F3FF]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <p className={`text-sm font-semibold ${instructionType === "text" ? "text-[#7C3AED]" : "text-gray-900"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Text Message
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Type your instruction</p>
                </button>
                <button
                  type="button"
                  onClick={() => setInstructionType("voice")}
                  className={`p-4 border rounded-xl transition-all ${
                    instructionType === "voice"
                      ? "border-[#7C3AED] bg-[#F5F3FF]"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <p className={`text-sm font-semibold ${instructionType === "voice" ? "text-[#7C3AED]" : "text-gray-900"}`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Voice Message
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Record your voice</p>
                </button>
              </div>
            </div>

            {/* Text Content */}
            {instructionType === "text" && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Instruction Message
                </label>
                <textarea
                  required
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-sm resize-none bg-gray-50"
                  placeholder="Type detailed instructions for your team here..."
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>{textContent.length} characters</p>
              </div>
            )}

            {/* Voice Recording */}
            {instructionType === "voice" && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Voice Recording
                </label>
                <div className="border border-gray-200 rounded-xl p-8 bg-gray-50">
                  <div className="text-center">
                    {!isRecording && recordingTime === 0 && (
                      <div>
                        <div className="w-14 h-14 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mic className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </div>
                        <button
                          type="button"
                          onClick={handleStartRecording}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg font-semibold hover:bg-[#6D28D9] transition-colors text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <Mic className="w-4 h-4" strokeWidth={2} />
                          Start Recording
                        </button>
                        <p className="text-xs text-gray-500 mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Click to begin voice recording
                        </p>
                      </div>
                    )}

                    {isRecording && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <p className="text-3xl font-mono font-bold text-red-600">
                            {formatTime(recordingTime)}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Recording in progress...
                        </p>
                        <button
                          type="button"
                          onClick={handleStopRecording}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <Square className="w-4 h-4" strokeWidth={2} />
                          Stop Recording
                        </button>
                      </div>
                    )}

                    {!isRecording && recordingTime > 0 && (
                      <div>
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mic className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Recording Completed
                        </p>
                        <p className="text-xs text-gray-600 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Duration: {formatTime(recordingTime)}
                        </p>
                        <button
                          type="button"
                          onClick={handleStartRecording}
                          className="text-sm text-[#7C3AED] hover:text-[#6D28D9] font-semibold transition-colors"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          Record Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className={`flex-1 px-4 py-2.5 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2 text-sm ${
                  canSubmit
                    ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Send className="w-4 h-4" strokeWidth={2} />
                Send Instruction
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
