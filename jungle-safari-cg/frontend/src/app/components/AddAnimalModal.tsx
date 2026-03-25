import { useState } from "react";
import { X, UserRoundPlus, UserPlus } from "lucide-react";

interface Zookeeper {
  id: string;
  name: string;
  department: string;
}

interface AddAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (animal: any) => void;
  zookeepers: Zookeeper[];
}

export function AddAnimalModal({ isOpen, onClose, onSave, zookeepers }: AddAnimalModalProps) {
  const [formData, setFormData] = useState({
    type: "carnivore" as "carnivore" | "herbivore",
    name: "",
    nameHindi: "",
    species: "",
    age: "",
    gender: "Male",
    quantity: "", // For herbivores only
    enclosure: "",
    health: "Good",
    assignedZookeepers: [] as string[],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      type: "carnivore",
      name: "",
      nameHindi: "",
      species: "",
      age: "",
      gender: "Male",
      quantity: "",
      enclosure: "",
      health: "Good",
      assignedZookeepers: [],
    });
  };

  const toggleZookeeper = (id: string) => {
    setFormData(prev => ({
      ...prev,
      assignedZookeepers: prev.assignedZookeepers.includes(id)
        ? prev.assignedZookeepers.filter(zid => zid !== id)
        : [...prev.assignedZookeepers, id]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Add New Animal
            </h2>
            <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Fill in the details below
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Animal Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Animal Category *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: "carnivore", gender: "Male", quantity: ""})}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.type === "carnivore"
                      ? "border-[#7C3AED] bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${
                      formData.type === "carnivore" ? "text-[#7C3AED]" : "text-gray-700"
                    }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Carnivore
                    </p>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Individual animals with names
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: "herbivore", gender: "Mixed", name: "", nameHindi: ""})}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.type === "herbivore"
                      ? "border-[#7C3AED] bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${
                      formData.type === "herbivore" ? "text-[#7C3AED]" : "text-gray-700"
                    }`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Herbivore
                    </p>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Group tracking by quantity
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Conditional Fields Based on Type */}
            {formData.type === "carnivore" ? (
              <>
                {/* Basic Info for Carnivores */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Animal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      placeholder="e.g., Raja"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Name (Hindi)
                    </label>
                    <input
                      type="text"
                      value={formData.nameHindi}
                      onChange={(e) => setFormData({...formData, nameHindi: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      placeholder="e.g., राजा"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Info Message for Herbivores */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    ℹ️ Herbivore Group Tracking
                  </p>
                  <p className="text-xs text-blue-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Herbivores are tracked as groups without individual names. Specify the quantity below.
                  </p>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Species *
                </label>
                <input
                  type="text"
                  required
                  value={formData.species}
                  onChange={(e) => setFormData({...formData, species: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  placeholder={formData.type === "carnivore" ? "e.g., Bengal Tiger" : "e.g., Spotted Deer"}
                />
              </div>
              {formData.type === "herbivore" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="e.g., 50"
                    min="1"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="0"
                  />
                </div>
              )}
            </div>

            {formData.type === "herbivore" && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Average Age *
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  placeholder="Average age of the group"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Gender *
                </label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  disabled={formData.type === "herbivore"}
                >
                  <option>Male</option>
                  <option>Female</option>
                  {formData.type === "herbivore" && <option>Mixed</option>}
                </select>
                {formData.type === "herbivore" && (
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Default: Mixed for herbivore groups
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Health Status *
                </label>
                <select 
                  value={formData.health}
                  onChange={(e) => setFormData({...formData, health: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Enclosure *
              </label>
              <input
                type="text"
                required
                value={formData.enclosure}
                onChange={(e) => setFormData({...formData, enclosure: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="e.g., Enclosure A1"
              />
            </div>

            {/* Assign Zookeepers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <UserPlus className="w-5 h-5 text-[#7C3AED]" />
                <label className="block text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Assign Zookeepers
                </label>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-48 overflow-y-auto">
                {zookeepers.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    No zookeepers available
                  </p>
                ) : (
                  <div className="space-y-2">
                    {zookeepers.map((zookeeper) => (
                      <label
                        key={zookeeper.id}
                        className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.assignedZookeepers.includes(zookeeper.id)}
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
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2.5 bg-[#7C3AED] text-white rounded-lg font-medium hover:bg-[#6D31D4] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Add {formData.type === "carnivore" ? "Animal" : "Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}