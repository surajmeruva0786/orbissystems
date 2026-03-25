import { AlertTriangle, Clock, User, MapPin, X, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export interface EmergencyAlert {
  id: string;
  animalId: string;
  animalName: string;
  animalSpecies: string;
  location: string;
  severity: "Critical" | "High" | "Medium";
  reportedBy: string;
  reportedByRole: string;
  timestamp: string;
  description: string;
  type: "Medical Emergency" | "Escape Alert" | "Aggression" | "Injury" | "Other";
}

interface EmergencyAlertModalProps {
  alert: EmergencyAlert | null;
  onAcknowledge: () => void;
  onDismiss: () => void;
}

export function EmergencyAlertModal({ alert, onAcknowledge, onDismiss }: EmergencyAlertModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setIsVisible(true);
    }
  }, [alert]);

  if (!alert || !isVisible) return null;

  const getSeverityColor = () => {
    switch (alert.severity) {
      case "Critical":
        return {
          bg: "bg-red-500",
          text: "text-red-600",
          lightBg: "bg-red-50",
          border: "border-red-200",
        };
      case "High":
        return {
          bg: "bg-orange-500",
          text: "text-orange-600",
          lightBg: "bg-orange-50",
          border: "border-orange-200",
        };
      case "Medium":
        return {
          bg: "bg-amber-500",
          text: "text-amber-600",
          lightBg: "bg-amber-50",
          border: "border-amber-200",
        };
    }
  };

  const colors = getSeverityColor();

  const handleAcknowledge = () => {
    setIsVisible(false);
    setTimeout(() => onAcknowledge(), 300);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Alert Card */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-gray-100">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <div className="flex items-start gap-3">
            <div className={`${colors.bg} p-2.5 rounded-lg`}>
              <AlertTriangle className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Emergency Alert
                </h3>
                <span className={`px-2 py-0.5 ${colors.bg} text-white rounded text-xs font-medium`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {alert.type}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* Animal Info */}
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-medium text-purple-700 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Animal
              </span>
            </div>
            <p className="text-base font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {alert.animalName}
            </p>
            <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {alert.animalSpecies}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Location
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {alert.location}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Time
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {alert.timestamp}
              </p>
            </div>
          </div>

          {/* Reporter */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <User className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Reported by
              </span>
            </div>
            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {alert.reportedBy} <span className="text-gray-500 font-normal">· {alert.reportedByRole}</span>
            </p>
          </div>

          {/* Description */}
          <div className="pt-1">
            <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {alert.description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={handleAcknowledge}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6D28D9] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <CheckCircle className="w-4 h-4" />
            Acknowledge
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}