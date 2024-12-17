import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { storageService } from '@/services/storage/storage-service';

export const Dashboard = () => {
  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => storageService.getVehicles(),
  });

  const activeVehicles = vehicles?.filter((v) => v.status === 'active') || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <div className="flex h-full flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Vehicles
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {activeVehicles.length} active vehicles
              </p>
            </div>
            <Link to="/vehicles">
              <Button variant="secondary" className="w-full">
                Manage Vehicles
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <div className="flex h-full flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Mileage Entry
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Record your latest mileage
              </p>
            </div>
            <Link to="/mileage">
              <Button variant="secondary" className="w-full">
                Enter Mileage
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <div className="flex h-full flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Reports
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                View monthly reports and transfers
              </p>
            </div>
            <Link to="/reports">
              <Button variant="secondary" className="w-full">
                View Reports
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};