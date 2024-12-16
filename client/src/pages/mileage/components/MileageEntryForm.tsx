import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/common/Button';
import { googleSheetsService } from '@/services/sheets/sheets-service';

const mileageSchema = z.object({
  vehicleId: z.string().min(1, 'Please select a vehicle'),
  endingMileage: z.number().min(0, 'Mileage must be positive'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type MileageFormData = z.infer<typeof mileageSchema>;

interface MileageEntryFormProps {
  onSuccess?: () => void;
}

export const MileageEntryForm = ({ onSuccess }: MileageEntryFormProps) => {
  const queryClient = useQueryClient();
  
  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => googleSheetsService.getVehicles(),
    select: (data) => data.data.filter(v => v.status === 'active'),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MileageFormData>({
    resolver: zodResolver(mileageSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const addMileage = useMutation({
    mutationFn: (data: MileageFormData) =>
      googleSheetsService.addMileageEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mileageEntries'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      reset();
      onSuccess?.();
    },
  });

  const selectedVehicleId = watch('vehicleId');
  const selectedVehicle = vehicles?.find(v => v.id === selectedVehicleId);

  useEffect(() => {
    if (selectedVehicle) {
      setValue('endingMileage', selectedVehicle.currentMileage);
    }
  }, [selectedVehicle, setValue]);

  return (
    <form onSubmit={handleSubmit((data) => addMileage.mutate(data))} className="space-y-4">
      <div>
        <label
          htmlFor="vehicleId"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Vehicle
        </label>
        <select
          id="vehicleId"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          {...register('vehicleId')}
        >
          <option value="">Select a vehicle</option>
          {vehicles?.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.name} (Current: {vehicle.currentMileage.toLocaleString()} mi)
            </option>
          ))}
        </select>
        {errors.vehicleId && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicleId.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="endingMileage"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Ending Mileage
        </label>
        <input
          type="number"
          id="endingMileage"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          {...register('endingMileage', { valueAsNumber: true })}
        />
        {errors.endingMileage && (
          <p className="mt-1 text-sm text-red-600">{errors.endingMileage.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          {...register('date')}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={addMileage.isPending}>
          {addMileage.isPending ? 'Adding...' : 'Add Mileage'}
        </Button>
      </div>
    </form>
  );
};
