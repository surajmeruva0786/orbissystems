import { useState } from "react";
import { Bell, Volume2, Play, Pause, MessageSquare, Clock } from "lucide-react";

interface Instruction {
  id: string;
  type: "text" | "voice";
  content: string;
  timestamp: string;
  sender: string;
  read: boolean;
}

interface InstructionsPanelProps {
  instructions: Instruction[];
}

export function InstructionsPanel({ instructions }: InstructionsPanelProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMins = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMins} min${diffInMins !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
  };

  const unreadCount = instructions.filter(i => !i.read).length;

  if (instructions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            No Instructions Yet
          </h3>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Instructions from admins and vets will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Instructions
            </h3>
            <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {instructions.length} instruction{instructions.length !== 1 ? 's' : ''} received
            </p>
          </div>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>

      {/* Instructions List */}
      <div className="divide-y divide-gray-100">
        {instructions.map((instruction) => (
          <div 
            key={instruction.id} 
            className={`p-5 transition-colors ${
              !instruction.read ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                instruction.type === "voice" 
                  ? "bg-purple-100" 
                  : "bg-blue-100"
              }`}>
                {instruction.type === "voice" ? (
                  <Volume2 className="w-5 h-5 text-[#7C3AED]" />
                ) : (
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                    instruction.type === "voice" 
                      ? "bg-purple-100 text-purple-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {instruction.type === "voice" ? "Voice" : "Text"}
                  </span>
                  {!instruction.read && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                      New
                    </span>
                  )}
                  <span className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {formatTimestamp(instruction.timestamp)}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  From: <span className="font-medium text-gray-900">{instruction.sender}</span>
                </p>

                {instruction.type === "text" ? (
                  <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {instruction.content}
                  </p>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPlayingVoice(playingVoice === instruction.id ? null : instruction.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6366F1] transition-colors"
                    >
                      {playingVoice === instruction.id ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Play
                        </>
                      )}
                    </button>
                    <span className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {instruction.content}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}