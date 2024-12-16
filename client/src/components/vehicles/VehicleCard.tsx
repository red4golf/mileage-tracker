import { Card } from '../common/Card';

interface VehicleCardProps {
  name: string;
  currentMileage: number;
  costPerMile: number;
  status: 'active' | 'inactive';
}

export const VehicleCard = ({
  name,
  currentMileage,
  costPerMile,
  status,
}: VehicleCardProps) => {
  return (
    <Card className="hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {name}
        </h3>
        <span
          className={clsx('rounded-full px-2 py-1 text-sm', {
            'bg-green-100 text-green-800': status === 'active',
            'bg-gray-100 text-gray-800': status === 'inactive',
          })}
        >
          {status}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Current Mileage:</span>
          <span>{currentMileage.toLocaleString()} miles</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Cost per Mile:</span>
          <span>${costPerMile.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};