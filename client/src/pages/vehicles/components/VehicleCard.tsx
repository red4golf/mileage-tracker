import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Vehicle } from '@/types/vehicle';
import { formatDate } from '@/utils/date';

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: () => void;
}

export const VehicleCard = ({ vehicle, onEdit }: VehicleCardProps) => {
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {vehicle.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Added {formatDate(vehicle.createdAt)}
            </p>
          </div>
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
              vehicle.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
            }`}
          >
            {vehicle.status}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Current Mileage</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {vehicle.currentMileage.toLocaleString()} mi
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Cost per Mile</span>
            <span className="font-medium text-gray-900 dark:text-white">
              ${vehicle.costPerMile.toFixed(2)}
            </span>
          </div>
          {vehicle.category && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Category</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {vehicle.category}
              </span>
            </div>
          )}
        </div>

        {vehicle.notes && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.notes}</p>
        )}

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" size="sm" onClick={onEdit}>
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
};
