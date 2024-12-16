export interface Vehicle {
  id: string;
  name: string;
  currentMileage: number;
  costPerMile: number;
  status: 'active' | 'inactive';
  category?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}