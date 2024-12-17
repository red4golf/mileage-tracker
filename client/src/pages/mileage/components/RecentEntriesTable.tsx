import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { MileageEntryForm } from './MileageEntryForm';
import { formatDate } from '@/utils/date';
import { storageService } from '@/services/storage/storage-service';

export const RecentEntriesTable = () => {
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => storageService.getVehicles(),
  });

  const { data: entries, isLoading } = useQuery({
    queryKey: ['mileageEntries'],
    queryFn: async () => {
      if (!vehicles) return [];
      
      // Get entries for all active vehicles
      const activeVehicles = vehicles.filter(v => v.status === 'active');
      const allEntries = await Promise.all(
        activeVehicles.map(vehicle =>
          storageService.getMileageEntries(vehicle.id)
        )
      );

      // Combine and sort entries by date
      const combinedEntries = allEntries
        .flat()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10); // Show only last 10 entries

      return combinedEntries;
    },
    enabled: !!vehicles,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-10 rounded-md bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    );
  }

  const vehicleMap = new Map(
    vehicles?.map(vehicle => [vehicle.id, vehicle]) || []
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Vehicle
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Mileage
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Notes
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {entries && entries.length > 0 ? (
              entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {formatDate(entry.date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {vehicleMap.get(entry.vehicleId)?.name || 'Unknown'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-900 dark:text-white">
                    {entry.endingMileage.toLocaleString()}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {entry.notes}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingEntry(entry)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No recent entries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog 
        open={!!editingEntry} 
        onClose={() => setEditingEntry(null)}
        className="sm:max-w-lg"
      >
        <div className="space-y-4">
          <Dialog.Title>Edit Mileage Entry</Dialog.Title>
          {editingEntry && (
            <MileageEntryForm
              existingEntry={editingEntry}
              onSuccess={() => setEditingEntry(null)}
              onCancel={() => setEditingEntry(null)}
            />
          )}
        </div>
      </Dialog>
    </>
  );
};