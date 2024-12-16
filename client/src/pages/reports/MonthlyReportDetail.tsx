import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { googleSheetsService } from '@/services/sheets/sheets-service';
import { VehicleBreakdownChart } from './components/VehicleBreakdownChart';
import { MileageBreakdownTable } from './components/MileageBreakdownTable';

export const MonthlyReportDetail = () => {
  const { month = '' } = useParams();
  
  const { data: report, isLoading } = useQuery({
    queryKey: ['monthlyReport', month],
    queryFn: () => googleSheetsService.getMonthlyReport(month),
    enabled: !!month
  });

  const monthDate = new Date(month + '-01');
  const monthName = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-96 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  const reportData = report?.data[0];

  if (!reportData) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {monthName} Report
          </h1>
          <Link to="/reports">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>
        <Card>
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            No data available for this month
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {monthName} Report
        </h1>
        <Link to="/reports">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Summary">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Miles</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {reportData.totalMiles.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${reportData.totalCost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Average Cost per Mile</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${(reportData.totalCost / reportData.totalMiles).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </Card>

        <Card title="Vehicle Distribution">
          <VehicleBreakdownChart data={reportData.vehicleBreakdown} />
        </Card>
      </div>

      <Card title="Detailed Breakdown">
        <MileageBreakdownTable data={reportData.vehicleBreakdown} />
      </Card>
    </div>
  );
};
