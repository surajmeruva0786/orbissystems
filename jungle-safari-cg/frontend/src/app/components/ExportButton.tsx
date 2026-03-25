import { Download, FileDown } from "lucide-react";

interface ExportButtonProps {
  type: "csv" | "pdf";
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

export function ExportButton({ type, onClick, label, disabled = false }: ExportButtonProps) {
  const isPdf = type === "pdf";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isPdf
          ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-300"
          : "bg-purple-50 text-[#7C3AED] border border-purple-200 hover:bg-purple-100 hover:border-[#7C3AED]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}`}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {isPdf ? (
        <FileText className="w-4 h-4" strokeWidth={1.5} />
      ) : (
        <Download className="w-4 h-4" strokeWidth={1.5} />
      )}
      {label || (isPdf ? "Export PDF" : "Export CSV")}
    </button>
  );
}

// Helper function to convert array of objects to CSV
export function convertToCSV(data: any[], filename: string) {
  if (data.length === 0) {
    alert("No data to export");
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csvContent = headers.join(",") + "\n";
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Handle values that contain commas, quotes, or newlines
      if (typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvContent += values.join(",") + "\n";
  });

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Helper function to generate PDF (simplified version using window.print)
export function exportToPDF(elementId: string, filename: string) {
  // In a real application, you would use a library like jsPDF or html2pdf
  // For now, we'll trigger a print dialog
  const printContent = document.getElementById(elementId);
  if (!printContent) {
    alert("Content not found for PDF export");
    return;
  }

  const printWindow = window.open("", "", "height=600,width=800");
  if (!printWindow) {
    alert("Please allow popups to export PDF");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body {
            font-family: 'DM Sans', sans-serif;
            padding: 20px;
            color: #111827;
          }
          h1, h2, h3, h4 {
            font-family: 'Instrument Sans', sans-serif;
            color: #7C3AED;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #E5E7EB;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background-color: #F9FAFB;
            font-weight: 600;
          }
          .header {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #7C3AED;
          }
          @media print {
            button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Orbis Systems - Jungle Safari Zoo</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
        ${printContent.innerHTML}
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
