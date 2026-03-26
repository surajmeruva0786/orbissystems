export interface Animal {
  id: string;
  type: 'carnivore' | 'herbivore';
  name: string;
  nameHindi: string;
  species: string;
  speciesHindi: string;
  enclosure: string;
  age: number;
  gender: 'Male' | 'Female' | 'Mixed';
  quantity?: number;
  health: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  lastFed: string;
  morningLogStatus: 'completed' | 'pending' | 'overdue';
  eveningLogStatus: 'completed' | 'pending' | 'overdue';
  image: string;
  behavior?: string;
  diet?: string;
}

export interface DailyLog {
  id: string;
  animalId: string;
  animalName: string;
  keeperName: string;
  timestamp: string;
  type: 'morning' | 'evening';
  feeding: string;
  behavior: string;
  health: string;
  notes: string;
  audioUri?: string;
}

export interface Instruction {
  id: string;
  type: 'text' | 'voice';
  content: string;
  timestamp: string;
  sender: string;
  read: boolean;
}

export interface Reminder {
  id: number;
  animalName: string;
  shift: string;
  time: string;
  urgent: boolean;
}

export interface DailyLogFormData {
  animalHealth: {
    feedConsumed: string;
    feedQuantity: string;
    waterNormal: boolean;
    digestionProblem: boolean;
    injuryNoticed: boolean;
    weaknessNoticed: boolean;
    activityLevel: string;
    alertResponsive: boolean;
    pestsNoticed: boolean;
    safetyRisks: boolean;
    additionalNotes: string;
  };
  enclosureReport: {
    cleaningTime: string;
    wasteRemoved: boolean;
    waterTroughCleaned: boolean;
    freshWaterAvailable: boolean;
    fencingSecure: boolean;
    allSecured: boolean;
    remarks: string;
  };
}
