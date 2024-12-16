// Placeholder for Google Sheets API integration
export interface SheetResponse<T> {
  data: T[];
  error?: string;
}

export const sheetsApi = {
  async get<T>(sheetName: string): Promise<SheetResponse<T>> {
    // TODO: Implement Google Sheets API integration
    return { data: [] };
  },

  async append<T>(sheetName: string, data: T): Promise<void> {
    // TODO: Implement Google Sheets API integration
  },

  async update<T>(sheetName: string, rowIndex: number, data: T): Promise<void> {
    // TODO: Implement Google Sheets API integration
  },
};