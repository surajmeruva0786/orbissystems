// Mock data for the zoo management system

export interface Animal {
  id: string;
  name: string;
  species: string;
  enclosure: string;
  age: number;
  gender: 'Male' | 'Female';
  healthStatus: 'Healthy' | 'Under Observation' | 'Critical' | 'Recovering';
  lastFed: string;
  morningLogStatus: 'Pending' | 'Completed';
  eveningLogStatus: 'Pending' | 'Completed';
  imageUrl?: string;
  description?: string;
  weight?: number;
  dietPlan?: string;
}

export interface LogEntry {
  id: string;
  animalId: string;
  animalName: string;
  date: string;
  time: string;
  type: 'Morning' | 'Evening' | 'Emergency';
  observations: string;
  feedingStatus: string;
  healthNotes: string;
  behaviorNotes: string;
  temperature?: number;
  createdBy: string;
  transcription?: string;
}

export interface Medication {
  id: string;
  animalId: string;
  animalName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
  status: 'Active' | 'Completed' | 'Discontinued';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Meat' | 'Vegetables' | 'Fruits' | 'Supplements' | 'Medical' | 'Equipment';
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastRestocked: string;
  supplier: string;
  costPerUnit: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Zookeeper' | 'Vet' | 'Forest Officer' | 'Admin';
  email: string;
  phone: string;
  assignedArea?: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface EmergencyAlert {
  id: string;
  type: 'Medical Emergency' | 'Escape' | 'Fire' | 'Natural Disaster' | 'Other';
  description: string;
  location: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  reportedBy: string;
  timestamp: string;
  status: 'Active' | 'Resolved';
}

export const mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Raja',
    species: 'Bengal Tiger',
    enclosure: 'Big Cat Habitat A',
    age: 5,
    gender: 'Male',
    healthStatus: 'Healthy',
    lastFed: '2 hours ago',
    morningLogStatus: 'Completed',
    eveningLogStatus: 'Pending',
    weight: 225,
    dietPlan: '12kg meat, bones',
    description: 'Adult male Bengal tiger, very active and healthy',
  },
  {
    id: '2',
    name: 'Lakshmi',
    species: 'Indian Elephant',
    enclosure: 'Elephant Sanctuary',
    age: 12,
    gender: 'Female',
    healthStatus: 'Healthy',
    lastFed: '1 hour ago',
    morningLogStatus: 'Completed',
    eveningLogStatus: 'Pending',
    weight: 3500,
    dietPlan: '200kg vegetables, fruits, hay',
    description: 'Gentle and friendly, loves interaction',
  },
  {
    id: '3',
    name: 'Simba',
    species: 'Asiatic Lion',
    enclosure: 'Big Cat Habitat B',
    age: 8,
    gender: 'Male',
    healthStatus: 'Under Observation',
    lastFed: '3 hours ago',
    morningLogStatus: 'Completed',
    eveningLogStatus: 'Pending',
    weight: 190,
    dietPlan: '10kg meat',
    description: 'Showing slight lethargy, monitoring closely',
  },
  {
    id: '4',
    name: 'Mowgli',
    species: 'Sloth Bear',
    enclosure: 'Bear Enclosure',
    age: 3,
    gender: 'Male',
    healthStatus: 'Healthy',
    lastFed: '4 hours ago',
    morningLogStatus: 'Pending',
    eveningLogStatus: 'Pending',
    weight: 140,
    dietPlan: '5kg fruits, honey, insects',
    description: 'Young and playful, good appetite',
  },
  {
    id: '5',
    name: 'Rani',
    species: 'Indian Leopard',
    enclosure: 'Big Cat Habitat C',
    age: 4,
    gender: 'Female',
    healthStatus: 'Recovering',
    lastFed: '5 hours ago',
    morningLogStatus: 'Completed',
    eveningLogStatus: 'Pending',
    weight: 50,
    dietPlan: '6kg meat, soft diet',
    description: 'Recovering from minor injury, improving daily',
  },
  {
    id: '6',
    name: 'Ganesh',
    species: 'Indian Elephant',
    enclosure: 'Elephant Sanctuary',
    age: 25,
    gender: 'Male',
    healthStatus: 'Healthy',
    lastFed: '1 hour ago',
    morningLogStatus: 'Completed',
    eveningLogStatus: 'Pending',
    weight: 5000,
    dietPlan: '250kg vegetables, fruits, hay',
    description: 'Senior elephant, calm and majestic',
  },
];

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    animalId: '1',
    animalName: 'Raja',
    date: '2026-03-22',
    time: '08:30',
    type: 'Morning',
    observations: 'Active and alert, good appetite',
    feedingStatus: 'Fed full portion',
    healthNotes: 'No abnormalities observed',
    behaviorNotes: 'Normal territorial behavior, responsive to keeper',
    temperature: 38.5,
    createdBy: 'Ramesh Kumar',
  },
  {
    id: '2',
    animalId: '2',
    animalName: 'Lakshmi',
    date: '2026-03-22',
    time: '09:00',
    type: 'Morning',
    observations: 'Very active, enjoying morning bath',
    feedingStatus: 'Fed full portion plus extra fruits',
    healthNotes: 'Excellent condition, skin hydration good',
    behaviorNotes: 'Playful and social',
    createdBy: 'Priya Sharma',
  },
  {
    id: '3',
    animalId: '3',
    animalName: 'Simba',
    date: '2026-03-22',
    time: '08:15',
    type: 'Morning',
    observations: 'Slightly lethargic compared to yesterday',
    feedingStatus: 'Ate 80% of portion',
    healthNotes: 'Monitoring for possible mild infection',
    behaviorNotes: 'Less active than usual, resting more',
    temperature: 39.2,
    createdBy: 'Arun Patel',
  },
];

export const mockMedications: Medication[] = [
  {
    id: '1',
    animalId: '5',
    animalName: 'Rani',
    medication: 'Antibiotic - Amoxicillin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2026-03-18',
    endDate: '2026-03-28',
    prescribedBy: 'Dr. Suresh Reddy',
    status: 'Active',
  },
  {
    id: '2',
    animalId: '3',
    animalName: 'Simba',
    medication: 'Anti-inflammatory',
    dosage: '250mg',
    frequency: 'Once daily',
    startDate: '2026-03-21',
    endDate: '2026-03-26',
    prescribedBy: 'Dr. Suresh Reddy',
    status: 'Active',
  },
];

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Chicken Meat',
    category: 'Meat',
    quantity: 450,
    unit: 'kg',
    reorderLevel: 200,
    lastRestocked: '2026-03-20',
    supplier: 'Fresh Meat Suppliers',
    costPerUnit: 180,
  },
  {
    id: '2',
    name: 'Beef',
    category: 'Meat',
    quantity: 320,
    unit: 'kg',
    reorderLevel: 150,
    lastRestocked: '2026-03-20',
    supplier: 'Fresh Meat Suppliers',
    costPerUnit: 350,
  },
  {
    id: '3',
    name: 'Carrots',
    category: 'Vegetables',
    quantity: 180,
    unit: 'kg',
    reorderLevel: 100,
    lastRestocked: '2026-03-21',
    supplier: 'Local Farms',
    costPerUnit: 30,
  },
  {
    id: '4',
    name: 'Bananas',
    category: 'Fruits',
    quantity: 220,
    unit: 'kg',
    reorderLevel: 80,
    lastRestocked: '2026-03-21',
    supplier: 'Local Farms',
    costPerUnit: 40,
  },
  {
    id: '5',
    name: 'Hay Bales',
    category: 'Vegetables',
    quantity: 85,
    unit: 'bales',
    reorderLevel: 50,
    lastRestocked: '2026-03-19',
    supplier: 'Agricultural Co-op',
    costPerUnit: 200,
  },
  {
    id: '6',
    name: 'Vitamins Supplement',
    category: 'Supplements',
    quantity: 45,
    unit: 'bottles',
    reorderLevel: 20,
    lastRestocked: '2026-03-15',
    supplier: 'Vet Supplies Inc',
    costPerUnit: 850,
  },
  {
    id: '7',
    name: 'Antibiotics Stock',
    category: 'Medical',
    quantity: 12,
    unit: 'boxes',
    reorderLevel: 5,
    lastRestocked: '2026-03-10',
    supplier: 'Medical Distributors',
    costPerUnit: 2500,
  },
];

export const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    role: 'Zookeeper',
    email: 'ramesh.kumar@zoo.in',
    phone: '+91 98765 43210',
    assignedArea: 'Big Cat Habitats',
    joinDate: '2023-05-15',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Zookeeper',
    email: 'priya.sharma@zoo.in',
    phone: '+91 98765 43211',
    assignedArea: 'Elephant Sanctuary',
    joinDate: '2022-08-20',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Dr. Suresh Reddy',
    role: 'Vet',
    email: 'suresh.reddy@zoo.in',
    phone: '+91 98765 43212',
    assignedArea: 'All Areas',
    joinDate: '2021-03-10',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Arun Patel',
    role: 'Zookeeper',
    email: 'arun.patel@zoo.in',
    phone: '+91 98765 43213',
    assignedArea: 'Bear & Primates',
    joinDate: '2023-11-05',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Kavita Singh',
    role: 'Forest Officer',
    email: 'kavita.singh@zoo.in',
    phone: '+91 98765 43214',
    assignedArea: 'All Areas',
    joinDate: '2020-06-01',
    status: 'Active',
  },
  {
    id: '6',
    name: 'Rajesh Mehta',
    role: 'Admin',
    email: 'rajesh.mehta@zoo.in',
    phone: '+91 98765 43215',
    joinDate: '2019-01-15',
    status: 'Active',
  },
];

export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: '1',
    type: 'Medical Emergency',
    description: 'Simba showing signs of lethargy and reduced appetite',
    location: 'Big Cat Habitat B',
    severity: 'Medium',
    reportedBy: 'Arun Patel',
    timestamp: '2026-03-22 08:15',
    status: 'Active',
  },
];
