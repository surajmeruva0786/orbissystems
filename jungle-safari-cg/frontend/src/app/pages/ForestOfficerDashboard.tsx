import { RegularInventoryManager } from "../components/RegularInventoryManager";

export function ForestOfficerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <RegularInventoryManager title="Inventory Management" titleHindi="सूची प्रबंधन" />
      </main>
    </div>
  );
}