import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

interface MonthlyData {
  month: string;
  totalMiles: number;
  totalCost: number;
}

interface MonthlySummaryCardProps {
  data?: MonthlyData;
}

export const MonthlySummaryCard = ({ data }: MonthlySummaryCardProps) => {
  const monthName = data
    ? new Date(data.month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })
    : new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <Card title={`${monthName} Summary`}>
      {data ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Miles</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data.totalMiles.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Total Cost</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${data.totalCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="pt-4">
            <Link to={`/reports/${data.month}`}>
              <Button variant="secondary" size="sm" className="w-full">
                View Full Report
              </Button>
            </Link>
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