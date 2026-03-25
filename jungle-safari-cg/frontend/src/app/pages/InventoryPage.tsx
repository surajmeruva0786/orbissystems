import { useState } from "react";
import { Header } from "../components/Header";
import { Package, Plus, PencilLine, Trash2, Search, Filter, TrendingDown, TrendingUp, Download } from "lucide-react";
import { mockInventory } from "../data/mockData";

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Meat", "Vegetables", "Medicine", "Supplies"];
  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalMonthlyCost = mockInventory.reduce((sum, item) => sum + item.monthlyCost, 0);
  const lowStockItems = mockInventory.filter(item => item.quantity < item.lowStockThreshold);

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Header role="Forest Officer" roleHindi="वन अधिकारी" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
            Inventory Management
          </h1>
          <p className="text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Track and manage zoo supplies and resources
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Total Items
                </p>
                <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {mockInventory.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Low Stock Alerts
                </p>
                <p className="text-3xl font-bold text-red-600" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  {lowStockItems.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Monthly Cost
                </p>
                <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  ₹{(totalMonthlyCost / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inventory items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline" style={{ fontFamily: "'DM Sans', sans-serif" }}>Export</span>
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>Add Item</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Monthly Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInventory.map((item) => {
                  const isLowStock = item.quantity < item.lowStockThreshold;
                  const stockPercentage = (item.quantity / item.lowStockThreshold) * 100;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {item.nameHindi}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.category === 'Meat' ? 'bg-red-100 text-red-700' :
                          item.category === 'Vegetables' ? 'bg-green-100 text-green-700' :
                          item.category === 'Medicine' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {item.quantity} {item.unit}
                          </p>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isLowStock ? 'bg-red-600' : 'bg-green-600'
                              }`}
                              style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <TrendingDown className="w-3 h-3" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <TrendingUp className="w-3 h-3" />
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          ₹{item.monthlyCost.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <PencilLine className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                  Add Inventory Item
                </h2>
                <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Fill in the details to add a new item
                </p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Item Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="e.g., Fresh Chicken"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Hindi Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="e.g., ताज़ा चिकन"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Category *
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                    <option>Meat</option>
                    <option>Vegetables</option>
                    <option>Medicine</option>
                    <option>Supplies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Unit *
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                    <option>kg</option>
                    <option>lbs</option>
                    <option>units</option>
                    <option>bottles</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Quantity *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="0"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Low Stock Threshold *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="0"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Monthly Cost (₹) *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  placeholder="0"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}