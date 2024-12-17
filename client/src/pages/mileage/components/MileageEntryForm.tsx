import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/common/Button';
import { storageService } from '@/services/storage/storage-service';

const createMileageSchema = (currentMileage: number = 0) => z.object({
  vehicleId: z.string().min(1, 'Please select a vehicle'),
  endingMileage: z.number()
    .min(0, 'Mileage must be positive')
    .refine(value => value > currentMileage, {
      message: `Ending mileage must be greater than current mileage (${currentMileage.toLocaleString()})`,
    }),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type MileageFormData = z.infer<ReturnType<typeof createMileageSchema>>;

interface MileageEntryFormProps {
  onSuccess?: () => void;
  existingEntry?: {
    id: string;
    vehicleId: string;
    endingMileage: number;
    date: string;
    notes?: string;
  };
  onCancel?: () => void;
}

export const MileageEntryForm = ({
  onSuccess,
  existingEntry,
  onCancel,
}: MileageEntryFormProps) => {
  const queryClient = useQueryClient();

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => storageService.getVehicles(),
    select: (data) => data.filter(v => v.status === 'active'),
  });

  const selectedVehicleId = existingEntry?.vehicleId;
  const selectedVehicle = vehicles?.find(v => v.id === selectedVehicleId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MileageFormData>({
    resolver: zodResolver(createMileageSchema(selectedVehicle?.currentMileage)),
    defaultValues: {
      date: existingEntry?.date || new Date().toISOString().split('T')[0],
      vehicleId: existingEntry?.vehicleId || '',
      endingMileage: existingEntry?.endingMileage,
      notes: existingEntry?.notes,
    },
  });

  const addMileage = useMutation({
    mutationFn: (data: MileageFormData) =>
      existingEntry
        ? storageService.updateMileageEntry({
            id: existingEntry.id,
            ...data,
          })
        : storageService.addMileageEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mileageEntries'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      reset();
      onSuccess?.();
    },
  });

  const watchedVehicleId = watch('vehicleId');
  const watchedVehicle = vehicles?.find(v => v.id === watchedVehicleId);

  useEffect(() => {
    if (watchedVehicle && !existingEntry) {
      setValue('endingMileage', watchedVehicle.currentMileage);
    }
  }, [watchedVehicle, setValue, existingEntry]);

  return (
    <form onSubmit={handleSubmit((data) => addMileage.mutate(data))} className="space-y-4">
      {/* Form fields */}
    </form>
  );
};