import { googleAuthService } from '../auth/google-auth';
import { Vehicle } from '@/types/vehicle';
import { SheetResponse, MileageEntry } from './types';

class GoogleSheetsService {
  private static instance: GoogleSheetsService;
  private readonly spreadsheetId: string;
  private readonly baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';

  private constructor() {
    this.spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID || '';
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

  private async makeRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
  }

  async getMileageEntries(vehicleId: string): Promise<SheetResponse<MileageEntry>> {
    try {
      const headers = await this.getHeaders();
      const range = 'MileageEntries!A2:F';
      const { values } = await this.makeRequest<{ values: any[] }>(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}`,
        { headers }
      );

      const entries = values
        ?.filter((row: any[]) => row[1] === vehicleId)
        .map((row: any[]) => ({
          id: row[0],
          vehicleId: row[1],
          date: row[2],
          endingMileage: Number(row[3]),
          notes: row[4] || '',
        })) || [];

      return { data: entries };
    } catch (error) {
      console.error('Failed to fetch mileage entries:', error);
      return { data: [], error: 'Failed to fetch mileage entries' };
    }
  }

  async addMileageEntry(entry: Omit<MileageEntry, 'id'>): Promise<void> {
    try {
      const headers = await this.getHeaders();
      const range = 'MileageEntries!A2';
      const id = crypto.randomUUID();

      const values = [[
        id,
        entry.vehicleId,
        entry.date,
        entry.endingMileage,
        entry.notes || '',
      ]];

      await this.makeRequest(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ values }),
        }
      );

      // Update vehicle's current mileage
      await this.updateVehicleMileage(entry.vehicleId, entry.endingMileage);
    } catch (error) {
      console.error('Failed to add mileage entry:', error);
      throw error;
    }
  }

  private async updateVehicleMileage(vehicleId: string, newMileage: number): Promise<void> {
    try {
      const { data: vehicles } = await this.getVehicles();
      const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);
      
      if (vehicleIndex === -1) {
        throw new Error('Vehicle not found');
      }

      const headers = await this.getHeaders();
      const range = `Vehicles!C${vehicleIndex + 2}`; // Column C is currentMileage

      await this.makeRequest(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}?valueInputOption=RAW`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            values: [[newMileage]]
          }),
        }
      );
    } catch (error) {
      console.error('Failed to update vehicle mileage:', error);
      throw error;
    }
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();