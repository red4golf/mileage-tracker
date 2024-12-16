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
