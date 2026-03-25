import { Animal } from "../data/mockData";
import { PawPrint } from "lucide-react";

interface AnimalDisplayProps {
  animal: Animal;
  showQuantity?: boolean;
}

export function AnimalDisplay({ animal, showQuantity = true }: AnimalDisplayProps) {
  if (animal.type === "herbivore") {
    return (
      <div className="flex items-center gap-2">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {animal.species}
            </p>
            {showQuantity && animal.quantity && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                <PawPrint className="w-3 h-3" strokeWidth={2} />
                {animal.quantity}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {animal.speciesHindi}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {animal.name}
      </p>
      <p className="text-xs text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {animal.nameHindi}
      </p>
    </div>
  );
}

export function getAnimalDisplayName(animal: Animal): string {
  if (animal.type === "herbivore") {
    return `${animal.species} (Group of ${animal.quantity})`;
  }
  return animal.name;
}
