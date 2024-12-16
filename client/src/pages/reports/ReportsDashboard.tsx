import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/common/Card';
import { googleSheetsService } from '@/services/sheets/sheets-service';
import { MonthlyReport } from '@/services/sheets/types';
import { MonthlySummaryCard } from './components/MonthlySummaryCard';
import { YearToDateChart } from './components/YearToDateChart';
import { TransferStatusCard } from './components/TransferStatusCard';

export const ReportsDashboard = () => {
  const { data: yearToDate, isLoading: isLoadingYTD } = useQuery({
    queryKey: ['yearToDateReport'],
    queryFn: () => googleSheetsService.generateYearToDateReport(),
  });

  const { data: transfers, isLoading: isLoadingTransfers } = useQuery({
    queryKey: ['transferHistory'],
    queryFn: () => googleSheetsService.getTransferHistory(),
  });

  const currentMonth = new Date().toISOString().substring(0, 7);
  const { data: currentMonthReport } = useQuery({
    queryKey: ['monthlyReport', currentMonth],
    queryFn: () => googleSheetsService.getMonthlyReport(currentMonth),
  });

  if (isLoadingYTD || isLoadingTransfers) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Reports Dashboard
        </h1>
      </div>

      <Card>
        <YearToDateChart data={yearToDate?.data || []} />
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MonthlySummaryCard report={currentMonthReport?.data?.[0]} />
        
        <Card title="Year to Date Summary">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Miles</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {yearToDate?.data.reduce((sum, month) => sum + month.totalMiles, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${yearToDate?.data.reduce((sum, month) => sum + month.totalCost, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </Card>

        <TransferStatusCard transfers={transfers?.data || []} />
      </div>
    </div>
  );
};
