import { useState, useEffect } from "react";
import { X, UserRoundPlus, UserPlus } from "lucide-react";

interface Zookeeper {
  id: string;
  name: string;
  department: string;
}

interface Animal {
  id: string;
  name: string;
  nameHindi?: string;
  species: string;
  age: number;
  gender: string;
  enclosure: string;
  health: string;
  assignedZookeepers?: string[];
}

interface EditAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (animal: any) => void;
  animal: Animal | null;
  zookeepers: Zookeeper[];
}

export function EditAnimalModal({ isOpen, onClose, onSave, animal, zookeepers }: EditAnimalModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    nameHindi: "",
    species: "",
    age: "",
    gender: "Male",
    enclosure: "",
    health: "Good",
    assignedZookeepers: [] as string[],
  });

  useEffect(() => {
    if (animal) {
      setFormData({
        name: animal.name,
        nameHindi: animal.nameHindi || "",
        species: animal.species,
        age: animal.age.toString(),
        gender: animal.gender,
        enclosure: animal.enclosure,
        health: animal.health,
        assignedZookeepers: animal.assignedZookeepers || [],
      });
    }
  }, [animal]);

  if (!isOpen || !animal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...animal, ...formData, age: parseInt(formData.age) });
    onClose();
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
              Edit Animal
            </h2>
            <p className="text-sm text-gray-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Update animal details
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
            {/* Basic Info */}
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
                  placeholder="e.g., Bengal Tiger"
                />
              </div>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Gender *
                </label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
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
                  Assigned Zookeepers
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}