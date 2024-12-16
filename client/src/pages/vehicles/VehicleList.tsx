import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { googleSheetsService } from '@/services/sheets/sheets-service';
import { VehicleCard } from './components/VehicleCard';
import { AddVehicleDialog } from './components/AddVehicleDialog';
import { Vehicle } from '@/types/vehicle';

export const VehicleList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => googleSheetsService.getVehicles(),
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </div>
    );
  }

  const activeVehicles = vehicles?.data.filter(v => v.status === 'active') || [];
  const inactiveVehicles = vehicles?.data.filter(v => v.status === 'inactive') || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Vehicles
        </h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add Vehicle</Button>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Active Vehicles
          </h2>
          {activeVehicles.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onEdit={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                No active vehicles. Click "Add Vehicle" to get started.
              </div>
            </Card>
          )}
        </div>

        {inactiveVehicles.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Inactive Vehicles
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inactiveVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onEdit={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <AddVehicleDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        existingVehicle={selectedVehicle}
        onExistingClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
};
