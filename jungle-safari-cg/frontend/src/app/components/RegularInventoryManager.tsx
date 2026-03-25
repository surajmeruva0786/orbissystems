import { useState } from "react";
import { Package, TrendingDown, TrendingUp, Plus, PencilLine, Trash2, X, Calendar, AlertTriangle } from "lucide-react";
import { InventoryItem, mockInventory } from "../data/mockData";
import { ExportButton, convertToCSV } from "./ExportButton";

interface RegularInventoryManagerProps {
  title?: string;
  titleHindi?: string;
}

export function RegularInventoryManager({ title = "Regular Inventory", titleHindi = "नियमित सूची" }: RegularInventoryManagerProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    nameHindi: "",
    category: "Meat" as "Meat" | "Vegetables" | "Supplies",
    quantity: 0,
    unit: "",
    lowStockThreshold: 0,
    monthlyCost: 0,
    expiryDate: "",
  });

  const totalMonthlyCost = inventory.reduce((sum, item) => sum + item.monthlyCost, 0);
  const lowStockItems = inventory.filter(item => item.quantity < item.lowStockThreshold);
  
  const getExpiryStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    if (expiry < now) return "expired";
    if (expiry <= oneMonthFromNow) return "expiring";
    return "good";
  };

  const expiringSoon = inventory.filter(item => {
    const status = getExpiryStatus(item.expiryDate);
    return status === "expiring" || status === "expired";
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      nameHindi: "",
      category: "Meat",
      quantity: 0,
      unit: "",
      lowStockThreshold: 0,
      monthlyCost: 0,
      expiryDate: "",
    });
    setShowModal(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      nameHindi: item.nameHindi,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      lowStockThreshold: item.lowStockThreshold,
      monthlyCost: item.monthlyCost,
      expiryDate: item.expiryDate,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setInventory(inventory.map(item =>
        item.id === editingItem.id ? { ...item, ...formData } : item
      ));
    } else {
      const newItem: InventoryItem = {
        id: `i${Date.now()}`,
        ...formData,
      };
      setInventory([...inventory, newItem]);
    }
    setShowModal(false);
  };

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Monthly Cost
              </p>
              <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                ₹{(totalMonthlyCost / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-[#7C3AED]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Low Stock Alert
              </p>
              <p className="text-2xl font-bold text-red-600" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {lowStockItems.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Expiring Soon
              </p>
              <p className="text-2xl font-bold text-orange-600" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {expiringSoon.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Total Items
              </p>
              <p className="text-2xl font-bold text-[#7C3AED]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {inventory.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#7C3AED]" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              {title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {titleHindi}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ExportButton
              type="csv"
              onClick={() => {
                const exportData = inventory.map(item => ({
                  Name: item.name,
                  "Name (Hindi)": item.nameHindi,
                  Category: item.category,
                  Quantity: `${item.quantity} ${item.unit}`,
                  "Low Stock Threshold": item.lowStockThreshold,
                  "Monthly Cost": `₹${item.monthlyCost}`,
                  "Expiry Date": item.expiryDate
                }));
                convertToCSV(exportData, "regular_inventory");
              }}
            />
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-medium hover:bg-[#6D28D9] transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Item
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Category
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Quantity
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Expiry Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Monthly Cost
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item) => {
                const isLowStock = item.quantity < item.lowStockThreshold;
                const expiryStatus = getExpiryStatus(item.expiryDate);

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item.nameHindi}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                        item.category === 'Meat' ? 'bg-red-50 text-red-700' :
                        item.category === 'Vegetables' ? 'bg-green-50 text-green-700' :
                        'bg-gray-50 text-gray-700'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item.quantity} {item.unit}
                        </p>
                        {isLowStock && (
                          <span className="inline-flex items-center gap-1 text-xs text-red-600 mt-1">
                            <TrendingDown className="w-3 h-3" />
                            Low Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className={`text-sm ${
                          expiryStatus === 'expired' ? 'text-red-600 font-semibold' :
                          expiryStatus === 'expiring' ? 'text-orange-600 font-semibold' :
                          'text-gray-600'
                        }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                      {expiryStatus === 'expired' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-700 mt-1">
                          <AlertTriangle className="w-3 h-3" />
                          Expired
                        </span>
                      )}
                      {expiryStatus === 'expiring' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-orange-50 text-orange-700 mt-1">
                          <AlertTriangle className="w-3 h-3" />
                          Expiring Soon
                        </span>
                      )}
                      {expiryStatus === 'good' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 mt-1">
                          Good to Use
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        ₹{item.monthlyCost.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-[#7C3AED] hover:bg-purple-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <PencilLine className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-[#F5F3FF] border-t-2 border-[#7C3AED]">
              <tr>
                <td colSpan={4} className="px-5 py-4 text-right text-sm font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Total Monthly Cost:
                </td>
                <td colSpan={2} className="px-5 py-4">
                  <p className="text-lg font-bold text-[#7C3AED]" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                    ₹{totalMonthlyCost.toLocaleString()}
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                {editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Item Name (Hindi)
                  </label>
                  <input
                    type="text"
                    value={formData.nameHindi}
                    onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                  >
                    <option value="Meat">Meat</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Supplies">Supplies</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Unit
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="kg, units, bottles"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Monthly Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyCost}
                    onChange={(e) => setFormData({ ...formData, monthlyCost: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-colors shadow-lg shadow-purple-500/30"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}