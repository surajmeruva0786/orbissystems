import { useState } from "react";
import { X, UserPlus, Briefcase } from "lucide-react";

interface Animal {
  id: string;
  name: string;
  species: string;
}

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: any) => void;
  animals: Animal[];
}

export function AddStaffModal({ isOpen, onClose, onSave, animals }: AddStaffModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "Zookeeper",
    department: "",
    active: true,
    assignedAnimals: [] as string[],
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      name: "",
      role: "Zookeeper",
      department: "",
      active: true,
      assignedAnimals: [],
    });
  };

  const toggleAnimal = (id: string) => {
    setFormData(prev => ({
      ...prev,
      assignedAnimals: prev.assignedAnimals.includes(id)
        ? prev.assignedAnimals.filter(aid => aid !== id)
        : [...prev.assignedAnimals, id]
    }));
  };

  const showAnimalAssignment = formData.role === "Zookeeper";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
              Add Staff Member
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
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-sm"
                  placeholder="e.g., John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Role *
                </label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value, assignedAnimals: []})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-sm"
                >
                  <option>Zookeeper</option>
                  <option>Veterinarian</option>
                  <option>Forest Officer</option>
                  <option>Administrator</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Department *
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-sm"
                  placeholder="e.g., Mammal Care"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Status *
                </label>
                <select 
                  value={formData.active ? "active" : "inactive"}
                  onChange={(e) => setFormData({...formData, active: e.target.value === "active"})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Assign Animals - only for Zookeepers */}
            {showAnimalAssignment && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-5 h-5 text-[#7C3AED]" />
                  <label className="block text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Assign Animals
                  </label>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-48 overflow-y-auto">
                  {animals.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      No animals available
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {animals.map((animal) => (
                        <label
                          key={animal.id}
                          className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.assignedAnimals.includes(animal.id)}
                            onChange={() => toggleAnimal(animal.id)}
                            className="w-4 h-4 text-[#7C3AED] border-gray-300 rounded focus:ring-[#7C3AED]"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {animal.name}
                            </p>
                            <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                              {animal.species}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
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
              Add Staff Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}