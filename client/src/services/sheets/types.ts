export interface SheetResponse<T> {
  data: T[];
  error?: string;
}

export interface MileageEntry {
  id: string;
  vehicleId: string;
  date: string;
  endingMileage: number;
  notes?: string;
}

export interface MonthlyReport {
  month: string;
  totalMiles: number;
  totalCost: number;
  vehicleBreakdown: {
    vehicleId: string;
    miles: number;
    cost: number;
  }[];
}