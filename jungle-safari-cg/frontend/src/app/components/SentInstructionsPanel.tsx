import { Send, Volume2, MessageSquare, Clock, Users, User } from "lucide-react";

interface Instruction {
  id: string;
  type: "text" | "voice";
  content: string;
  timestamp: string;
  sender: string;
  recipientNames?: string;
}

interface SentInstructionsPanelProps {
  instructions: Instruction[];
}

export function SentInstructionsPanel({ instructions }: SentInstructionsPanelProps) {
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

  if (instructions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            No Instructions Sent
          </h3>
          <p className="text-sm text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Instructions you send to zookeepers will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {instructions.map((instruction) => (
          <div 
            key={instruction.id} 
            className="p-5 hover:bg-gray-50 transition-colors"
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
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                    instruction.type === "voice" 
                      ? "bg-purple-100 text-purple-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {instruction.type === "voice" ? "Voice" : "Text"}
                  </span>
                  <span className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {formatTimestamp(instruction.timestamp)}
                  </span>
                </div>

                {instruction.type === "text" ? (
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {instruction.content}
                  </p>
                ) : (
                  <div className="mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-100">
                      <Volume2 className="w-4 h-4 text-[#7C3AED]" />
                      <span className="text-sm text-[#7C3AED] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {instruction.content}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <User className="w-3.5 h-3.5" />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    To: {instruction.recipientNames || "All Zookeepers"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}