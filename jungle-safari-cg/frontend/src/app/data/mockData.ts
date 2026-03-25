export interface Animal {
  id: string;
  type: "carnivore" | "herbivore"; // New field to distinguish
  name: string; // For carnivores, empty/auto-generated for herbivores
  nameHindi: string; // For carnivores, empty/auto-generated for herbivores
  species: string;
  speciesHindi: string;
  enclosure: string;
  age: number; // Average age for herbivore groups
  gender: "Male" | "Female" | "Mixed"; // Mixed for herbivore groups
  quantity?: number; // For herbivore groups only
  health: "Excellent" | "Good" | "Fair" | "Poor" | "Critical";
  lastFed: string;
  morningLogStatus: "completed" | "pending" | "overdue";
  eveningLogStatus: "completed" | "pending" | "overdue";
  image: string;
  medicalHistory?: MedicalRecord[];
  behavior?: string;
  diet?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  condition: string;
  treatment: string;
  vetName: string;
  notes: string;
  medication?: string;
}

export interface DailyLog {
  id: string;
  animalId: string;
  animalName: string;
  keeperName: string;
  timestamp: string;
  type: "morning" | "evening";
  feeding: string;
  behavior: string;
  health: string;
  notes: string;
  audioTranscript?: string;
}

export interface EmergencyAlert {
  id: string;
  animalId: string;
  animalName: string;
  animalSpecies: string;
  location: string;
  severity: "Critical" | "High" | "Medium";
  reportedBy: string;
  reportedByRole: string;
  timestamp: string;
  description: string;
  type: "Medical Emergency" | "Escape Alert" | "Aggression" | "Injury" | "Other";
  acknowledged: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  nameHindi: string;
  category: "Meat" | "Vegetables" | "Supplies";
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  monthlyCost: number;
  expiryDate: string;
}

export interface MedicinalInventoryItem {
  id: string;
  name: string;
  nameHindi: string;
  category: "Antibiotic" | "Painkiller" | "Vitamin" | "Vaccine" | "Anesthesia" | "Antiseptic";
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  monthlyCost: number;
  expiryDate: string;
  manufacturer: string;
}

export const mockAnimals: Animal[] = [
  {
    id: "1",
    type: "carnivore",
    name: "Raja",
    nameHindi: "राजा",
    species: "Bengal Tiger",
    speciesHindi: "बंगाल टाइगर",
    enclosure: "Tiger Habitat A",
    age: 8,
    gender: "Male",
    health: "Excellent",
    lastFed: "2 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "bengal-tiger",
    behavior: "Active and alert",
    diet: "Carnivore - 15kg meat daily",
  },
  {
    id: "2",
    type: "herbivore",
    name: "", // Auto-generated for herbivores
    nameHindi: "", // Auto-generated for herbivores
    species: "Indian Elephant",
    speciesHindi: "भारतीय हाथी",
    enclosure: "Elephant Sanctuary",
    age: 25,
    gender: "Mixed",
    quantity: 10, // Assuming a group of 10 elephants
    health: "Good",
    lastFed: "4 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "indian-elephant",
    behavior: "Calm and social",
    diet: "Herbivore - 150kg fodder daily",
  },
  {
    id: "3",
    type: "carnivore",
    name: "Mowgli",
    nameHindi: "मोगली",
    species: "Sloth Bear",
    speciesHindi: "भालू",
    enclosure: "Bear Den B",
    age: 5,
    gender: "Male",
    health: "Fair",
    lastFed: "1 hour ago",
    morningLogStatus: "overdue",
    eveningLogStatus: "pending",
    image: "sloth-bear",
    behavior: "Playful but showing signs of lethargy",
    diet: "Omnivore - Fruits, honey, insects",
  },
  {
    id: "4",
    type: "carnivore",
    name: "Simba",
    nameHindi: "सिम्बा",
    species: "Asiatic Lion",
    speciesHindi: "एशियाई शेर",
    enclosure: "Lion Pride Area",
    age: 6,
    gender: "Male",
    health: "Excellent",
    lastFed: "3 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "asiatic-lion",
    behavior: "Dominant and territorial",
    diet: "Carnivore - 12kg meat daily",
  },
  {
    id: "5",
    type: "carnivore",
    name: "Chandni",
    nameHindi: "चांदनी",
    species: "Peacock",
    speciesHindi: "मोर",
    enclosure: "Aviary Section C",
    age: 3,
    gender: "Female",
    health: "Good",
    lastFed: "5 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "peacock",
    behavior: "Active and vocal",
    diet: "Omnivore - Seeds, insects, grains",
  },
  {
    id: "6",
    type: "carnivore",
    name: "Bagheera",
    nameHindi: "बघीरा",
    species: "Indian Leopard",
    speciesHindi: "भारतीय तेंदुआ",
    enclosure: "Leopard Habitat D",
    age: 7,
    gender: "Male",
    health: "Critical",
    lastFed: "6 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "leopard",
    behavior: "Lethargic, refusing food",
    diet: "Carnivore - 8kg meat daily",
  },
  {
    id: "7",
    type: "herbivore",
    name: "",
    nameHindi: "",
    species: "Spotted Deer",
    speciesHindi: "चीतल",
    enclosure: "Deer Sanctuary A",
    age: 4,
    gender: "Mixed",
    quantity: 35,
    health: "Excellent",
    lastFed: "3 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "peacock", // Will need proper image
    behavior: "Active, grazing normally",
    diet: "Herbivore - Grass, leaves, fruits",
  },
  {
    id: "8",
    type: "herbivore",
    name: "",
    nameHindi: "",
    species: "Blackbuck",
    speciesHindi: "काला हिरण",
    enclosure: "Grassland Habitat B",
    age: 3,
    gender: "Mixed",
    quantity: 25,
    health: "Good",
    lastFed: "2 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "peacock", // Will need proper image
    behavior: "Calm, group cohesion good",
    diet: "Herbivore - Grass, grains",
  },
  {
    id: "9",
    type: "herbivore",
    name: "",
    nameHindi: "",
    species: "Indian Bison",
    speciesHindi: "गौर",
    enclosure: "Bison Enclosure C",
    age: 6,
    gender: "Mixed",
    quantity: 12,
    health: "Good",
    lastFed: "5 hours ago",
    morningLogStatus: "completed",
    eveningLogStatus: "pending",
    image: "sloth-bear", // Will need proper image
    behavior: "Peaceful, herd moving together",
    diet: "Herbivore - Grass, bamboo shoots",
  },
];

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "m1",
    date: "2026-03-20",
    condition: "Dental checkup",
    treatment: "Routine examination - all teeth healthy",
    vetName: "Dr. Sharma",
    notes: "No issues found. Continue regular diet.",
  },
  {
    id: "m2",
    date: "2026-03-15",
    condition: "Minor wound on left paw",
    treatment: "Cleaned and bandaged. Antibiotic ointment applied.",
    vetName: "Dr. Patel",
    notes: "Monitor for infection. Wound healing well.",
    medication: "Neosporin topical - 2x daily for 5 days",
  },
];

export const mockDailyLogs: DailyLog[] = [
  {
    id: "l1",
    animalId: "1",
    animalName: "Raja",
    keeperName: "Ramesh Kumar",
    timestamp: "2026-03-22 07:30",
    type: "morning",
    feeding: "Consumed full portion (15kg beef)",
    behavior: "Very active, roaming territory",
    health: "Excellent condition, no concerns",
    notes: "Tiger is in peak health. Exhibiting normal territorial behavior.",
  },
  {
    id: "l2",
    animalId: "2",
    animalName: "Lakshmi",
    keeperName: "Sunita Devi",
    timestamp: "2026-03-22 08:00",
    type: "morning",
    feeding: "Consumed 140kg of fodder and fruits",
    behavior: "Calm, interacting well with keeper",
    health: "Good overall health",
    notes: "Elephant enjoyed morning bath. Trunk movement normal.",
    audioTranscript: "लक्ष्मी आज बहुत शांत है। उसने सुबह का भोजन अच्छे से खाया।",
  },
  {
    id: "l3",
    animalId: "6",
    animalName: "Bagheera",
    keeperName: "Vikram Singh",
    timestamp: "2026-03-22 07:45",
    type: "morning",
    feeding: "Refused food - only consumed 2kg",
    behavior: "Lethargic, staying in corner",
    health: "ALERT: Not eating properly, low energy",
    notes: "URGENT: Leopard showing concerning behavior. Vet attention needed.",
  },
];

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: "alert-001",
    animalId: "6",
    animalName: "Bagheera",
    animalSpecies: "Indian Leopard",
    location: "Carnivore Enclosure - Section B",
    severity: "Critical",
    reportedBy: "Vikram Singh",
    reportedByRole: "Zookeeper",
    timestamp: "Today, 2:34 PM",
    description: "Animal showing signs of severe distress and labored breathing. Immediate veterinary attention required.",
    type: "Medical Emergency",
    acknowledged: false,
  },
];

export const mockInventory: InventoryItem[] = [
  {
    id: "i1",
    name: "Beef (Fresh)",
    nameHindi: "गोमांस (ताज़ा)",
    category: "Meat",
    quantity: 450,
    unit: "kg",
    lowStockThreshold: 200,
    monthlyCost: 135000,
    expiryDate: "2026-04-30",
  },
  {
    id: "i2",
    name: "Chicken",
    nameHindi: "चिकन",
    category: "Meat",
    quantity: 180,
    unit: "kg",
    lowStockThreshold: 100,
    monthlyCost: 54000,
    expiryDate: "2026-05-15",
  },
  {
    id: "i3",
    name: "Vegetables Mix",
    nameHindi: "सब्जियों का मिश्रण",
    category: "Vegetables",
    quantity: 520,
    unit: "kg",
    lowStockThreshold: 300,
    monthlyCost: 26000,
    expiryDate: "2026-06-20",
  },
  {
    id: "i4",
    name: "Fodder/Hay",
    nameHindi: "चारा/घास",
    category: "Vegetables",
    quantity: 2400,
    unit: "kg",
    lowStockThreshold: 1000,
    monthlyCost: 48000,
    expiryDate: "2026-07-10",
  },
  {
    id: "i5",
    name: "Cleaning Supplies",
    nameHindi: "सफाई सामग्री",
    category: "Supplies",
    quantity: 75,
    unit: "units",
    lowStockThreshold: 30,
    monthlyCost: 9000,
    expiryDate: "2026-08-05",
  },
];

export const mockMedicinalInventory: MedicinalInventoryItem[] = [
  {
    id: "mi1",
    name: "Amoxicillin",
    nameHindi: "एमोक्सिसिलिन",
    category: "Antibiotic",
    quantity: 45,
    unit: "vials",
    lowStockThreshold: 20,
    monthlyCost: 22500,
    expiryDate: "2026-12-31",
    manufacturer: "Zoetis India",
  },
  {
    id: "mi2",
    name: "Multivitamin Complex",
    nameHindi: "मल्टीविटामिन",
    category: "Vitamin",
    quantity: 120,
    unit: "bottles",
    lowStockThreshold: 50,
    monthlyCost: 18000,
    expiryDate: "2026-11-30",
    manufacturer: "VetCare Pharma",
  },
  {
    id: "mi3",
    name: "Ketamine HCL",
    nameHindi: "केटामाइन",
    category: "Anesthesia",
    quantity: 15,
    unit: "vials",
    lowStockThreshold: 10,
    monthlyCost: 45000,
    expiryDate: "2026-10-15",
    manufacturer: "Pfizer Animal Health",
  },
  {
    id: "mi4",
    name: "Tramadol",
    nameHindi: "ट्रामाडोल",
    category: "Painkiller",
    quantity: 60,
    unit: "tablets",
    lowStockThreshold: 30,
    monthlyCost: 12000,
    expiryDate: "2027-01-20",
    manufacturer: "Sun Pharma Vet",
  },
  {
    id: "mi5",
    name: "Rabies Vaccine",
    nameHindi: "रेबीज़ वैक्सीन",
    category: "Vaccine",
    quantity: 25,
    unit: "doses",
    lowStockThreshold: 15,
    monthlyCost: 35000,
    expiryDate: "2026-09-30",
    manufacturer: "Indian Immunologicals",
  },
  {
    id: "mi6",
    name: "Betadine Solution",
    nameHindi: "बीटाडीन",
    category: "Antiseptic",
    quantity: 80,
    unit: "bottles",
    lowStockThreshold: 40,
    monthlyCost: 8000,
    expiryDate: "2027-03-15",
    manufacturer: "Win-Medicare",
  },
  {
    id: "mi7",
    name: "Ceftriaxone",
    nameHindi: "सेफ्ट्रियाक्सोन",
    category: "Antibiotic",
    quantity: 12,
    unit: "vials",
    lowStockThreshold: 20,
    monthlyCost: 18000,
    expiryDate: "2026-08-31",
    manufacturer: "Cipla Veterinary",
  },
];

export const getAnimalById = (id: string): Animal | undefined => {
  return mockAnimals.find(animal => animal.id === id);
};

export const getLogsByAnimalId = (animalId: string): DailyLog[] => {
  return mockDailyLogs.filter(log => log.animalId === animalId);
};