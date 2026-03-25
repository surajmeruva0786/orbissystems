import { useNavigate } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F6FA] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Page Not Found
          </h2>
          <p className="text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
