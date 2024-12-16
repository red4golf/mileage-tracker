import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { googleSheetsService } from '@/services/sheets/sheets-service';
import { Vehicle } from '@/types/vehicle';

const vehicleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  currentMileage: z.number().min(0, 'Mileage must be positive'),
  costPerMile: z.number().min(0, 'Cost must be positive'),
  status: z.enum(['active', 'inactive']),
  category: z.string().optional(),
  notes: z.string().optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface AddVehicleDialogProps {
  open: boolean;
  onClose: () => void;
  existingVehicle: Vehicle | null;
  onExistingClose: () => void;
}

export const AddVehicleDialog = ({
  open,
  onClose,
  existingVehicle,
  onExistingClose,
}: AddVehicleDialogProps) => {
  const queryClient = useQueryClient();
  const isEditing = !!existingVehicle;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      status: 'active',
    },
  });

  useEffect(() => {
    if (existingVehicle) {
      reset({
        name: existingVehicle.name,
        currentMileage: existingVehicle.currentMileage,
        costPerMile: existingVehicle.costPerMile,
        status: existingVehicle.status,
        category: existingVehicle.category,
        notes: existingVehicle.notes,
      });
    }
  }, [existingVehicle, reset]);

  const addVehicle = useMutation({
    mutationFn: (data: VehicleFormData) => googleSheetsService.addVehicle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      onClose();
      reset();
    },
  });

  const updateVehicle = useMutation({
    mutationFn: (data: VehicleFormData) =>
      googleSheetsService.updateVehicle({
        ...data,
        id: existingVehicle!.id,
        createdAt: existingVehicle!.createdAt,
        updatedAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      onExistingClose();
      reset();
    },
  });

  const handleClose = () => {
    if (isEditing) {
      onExistingClose();
    } else {
      onClose();
    }
    reset();
  };

  const onSubmit = (data: VehicleFormData) => {
    if (isEditing) {
      updateVehicle.mutate(data);
    } else {
      addVehicle.mutate(data);
    }
  };

  return (
    <Dialog
      open={open || isEditing}
      onClose={handleClose}
      className="sm:max-w-lg"
    >
      <div className="flex flex-col gap-4">
        <Dialog.Title>
          {isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}
        </Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Vehicle Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="currentMileage"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Current Mileage
              </label>
              <input
                type="number"
                id="currentMileage"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                {...register('currentMileage', { valueAsNumber: true })}
              />
              {errors.currentMileage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.currentMileage.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="costPerMile"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cost per Mile
              </label>
              <input
                type="number"
                step="0.01"
                id="costPerMile"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                {...register('costPerMile', { valueAsNumber: true })}
              />
              {errors.costPerMile && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.costPerMile.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              {...register('status')}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category (Optional)
            </label>
            <input
              type="text"
              id="category"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              {...register('category')}
            />
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
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              {...register('notes')}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Save Changes' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
