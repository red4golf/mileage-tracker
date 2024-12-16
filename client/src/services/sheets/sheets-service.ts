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
};

export const googleSheetsService = GoogleSheetsService.getInstance();