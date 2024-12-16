import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

export const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <Button>Add Mileage Entry</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Recent Activity">
          <p className="text-gray-600 dark:text-gray-400">
            No recent activity to display.
          </p>
        </Card>
        <Card title="Monthly Summary">
          <p className="text-gray-600 dark:text-gray-400">
            Loading monthly summary...
          </p>
        </Card>
        <Card title="Active Vehicles">
          <p className="text-gray-600 dark:text-gray-400">
            Loading vehicle status...
          </p>
        </Card>
      </div>
    </div>
  );
};