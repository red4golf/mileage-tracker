import { googleAuthService } from '../auth/google-auth';
import { Vehicle } from '@/types/vehicle';
import { SheetResponse, MileageEntry, MonthlyReport } from './types';

class GoogleSheetsService {
  // ... previous methods remain the same ...

  async getMonthlyReport(month: string): Promise<SheetResponse<MonthlyReport>> {
    try {
      const headers = await this.getHeaders();
      const range = 'MileageEntries!A2:F';
      const { values } = await this.makeRequest<{ values: any[] }>(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}`,
        { headers }
      );

      // Get all vehicles for cost calculations
      const { data: vehicles } = await this.getVehicles();
      const vehicleCosts = new Map(vehicles.map(v => [v.id, v.costPerMile]));

      // Filter entries for the specified month
      const monthEntries = values
        ?.filter((row: any[]) => {
          const entryDate = new Date(row[2]);
          const entryMonth = entryDate.toISOString().substring(0, 7); // YYYY-MM format
          return entryMonth === month;
        })
        .map((row: any[]) => ({
          vehicleId: row[1],
          mileage: Number(row[3]),
        })) || [];

      // Calculate totals by vehicle
      const vehicleBreakdown = Object.entries(monthEntries.reduce((acc, entry) => {
        const prevMileage = acc[entry.vehicleId]?.mileage || 0;
        const costPerMile = vehicleCosts.get(entry.vehicleId) || 0;
        const miles = entry.mileage - prevMileage;
        
        acc[entry.vehicleId] = {
          miles: miles,
          cost: miles * costPerMile
        };
        return acc;
      }, {} as Record<string, { miles: number; cost: number }>))
      .map(([vehicleId, data]) => ({
        vehicleId,
        miles: data.miles,
        cost: data.cost
      }));

      const totalMiles = vehicleBreakdown.reduce((sum, v) => sum + v.miles, 0);
      const totalCost = vehicleBreakdown.reduce((sum, v) => sum + v.cost, 0);

      const report: MonthlyReport = {
        month,
        totalMiles,
        totalCost,
        vehicleBreakdown
      };

      return { data: [report] };
    } catch (error) {
      console.error('Failed to generate monthly report:', error);
      return { data: [], error: 'Failed to generate monthly report' };
    }
  }

  async generateYearToDateReport(): Promise<SheetResponse<MonthlyReport[]>> {
    try {
      const currentYear = new Date().getFullYear();
      const months = Array.from({ length: 12 }, (_, i) => 
        `${currentYear}-${String(i + 1).padStart(2, '0')}`
      );

      const reports = await Promise.all(
        months.map(month => this.getMonthlyReport(month))
      );

      const validReports = reports
        .filter(r => !r.error && r.data.length > 0)
        .map(r => r.data[0]);

      return { data: validReports };
    } catch (error) {
      console.error('Failed to generate year-to-date report:', error);
      return { data: [], error: 'Failed to generate year-to-date report' };
    }
  }

  async updateMonthlyTransferStatus(month: string, status: 'pending' | 'completed', confirmationId?: string): Promise<void> {
    try {
      const headers = await this.getHeaders();
      const range = 'MonthlyTransfers!A2';
      const now = new Date().toISOString();

      const values = [[
        month,
        status,
        confirmationId || '',
        now
      ]];

      await this.makeRequest(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ values }),
        }
      );
    } catch (error) {
      console.error('Failed to update monthly transfer status:', error);
      throw error;
    }
  }

  async getTransferHistory(): Promise<SheetResponse<any>> {
    try {
      const headers = await this.getHeaders();
      const range = 'MonthlyTransfers!A2:D';
      const { values } = await this.makeRequest<{ values: any[] }>(
        `${this.baseUrl}/${this.spreadsheetId}/values/${range}`,
        { headers }
      );

      const transfers = values?.map((row: any[]) => ({
        month: row[0],
        status: row[1],
        confirmationId: row[2] || null,
        timestamp: row[3]
      })) || [];

      return { data: transfers };
    } catch (error) {
      console.error('Failed to fetch transfer history:', error);
      return { data: [], error: 'Failed to fetch transfer history' };
    }
  }
}

export const googleSheetsService = GoogleSheetsService.getInstance();