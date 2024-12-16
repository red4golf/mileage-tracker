import { Card } from '@/components/common/Card';
import { MonthlyReport } from '@/services/sheets/types';

interface MonthlySummaryCardProps {
  report?: MonthlyReport;
}

export const MonthlySummaryCard = ({ report }: MonthlySummaryCardProps) => {
  const monthName = report
    ? new Date(report.month + '-01').toLocaleString('default', { month: 'long' })
    : new Date().toLocaleString('default', { month: 'long' });

  return (
    <Card title={`${monthName} Summary`}>
      {report ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Miles</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {report.totalMiles.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${report.totalCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="pt-4">
            <h4 className="mb-2 font-medium text-gray-900 dark:text-white">Vehicle Breakdown</h4>
            <div className="space-y-2">
              {report.vehicleBreakdown.map((vehicle) => (
                <div key={vehicle.vehicleId} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Vehicle {vehicle.vehicleId}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {vehicle.miles.toLocaleString()} mi
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No data available for {monthName}
        </div>
      )}
    </Card>
  );
};
