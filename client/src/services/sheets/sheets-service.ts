import { googleAuthService } from '../auth/google-auth';
import { Vehicle } from '@/types/vehicle';

export interface SheetResponse<T> {
  data: T[];
  error?: string;
}

class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private readonly spreadsheetId: string;
  private readonly baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';

  private constructor() {
    this.spreadsheetId = process.env.VITE_GOOGLE_SHEETS_ID || '';
  }

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService();
    }
    return GoogleSheetsService.instance;
  }

  private async getHeaders(): Promise<Headers> {
    const token = googleAuthService.getAccessToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    return new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  async getVehicles(): Promise<SheetResponse<Vehicle>> {
    try {
      const headers = await this.getHeaders();
      const range = 'Vehicles!A2:J';
      const response = await fetch(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }

      const { values } = await response.json();

      const vehicles = values?.map((row: any[]) => ({
        id: row[0],
        name: row[1],
        currentMileage: Number(row[2]),
        costPerMile: Number(row[3]),
        status: row[4],
        category: row[5],
        notes: row[6],
        createdAt: row[7],
        updatedAt: row[8],
      })) || [];

      return { data: vehicles };
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      return { data: [], error: 'Failed to fetch vehicles' };
    }
  }

  async addVehicle(vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const headers = await this.getHeaders();
      const range = 'Vehicles!A2';
      const now = new Date().toISOString();
      const id = crypto.randomUUID();

      const values = [[
        id,
        vehicle.name,
        vehicle.currentMileage,
        vehicle.costPerMile,
        vehicle.status,
        vehicle.category || '',
        vehicle.notes || '',
        now,
        now,
      ]];

      const response = await fetch(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ values }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Failed to add vehicle:', error);
      throw error;
    }
  }

  async updateVehicle(vehicle: Vehicle): Promise<void> {
    try {
      const headers = await this.getHeaders();
      const now = new Date().toISOString();

      // First, find the row with matching ID
      const searchResponse = await this.getVehicles();
      const vehicles = searchResponse.data;
      const rowIndex = vehicles.findIndex(v => v.id === vehicle.id);

      if (rowIndex === -1) {
        throw new Error('Vehicle not found');
      }

      const range = `Vehicles!A${rowIndex + 2}`;
      const values = [[
        vehicle.id,
        vehicle.name,
        vehicle.currentMileage,
        vehicle.costPerMile,
        vehicle.status,
        vehicle.category || '',
        vehicle.notes || '',
        vehicle.createdAt,
        now,
      ]];

      const response = await fetch(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}?valueInputOption=RAW`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({ values }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update vehicle');
      }
    } catch (error) {
      console.error('Failed to update vehicle:', error);
      throw error;
    }
  }

  async getMileageEntries(vehicleId: string): Promise<SheetResponse<any>> {
    try {
      const headers = await this.getHeaders();
      const range = 'MileageEntries!A2:F';
      const response = await fetch(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch mileage entries');
      }

      const { values } = await response.json();

      const entries = values
        ?.filter((row: any[]) => row[1] === vehicleId)
        .map((row: any[]) => ({
          id: row[0],
          vehicleId: row[1],
          date: row[2],
          endingMileage: Number(row[3]),
          notes: row[4],
        })) || [];

      return { data: entries };
    } catch (error) {
      console.error('Failed to fetch mileage entries:', error);
      return { data: [], error: 'Failed to fetch mileage entries' };
    }
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();