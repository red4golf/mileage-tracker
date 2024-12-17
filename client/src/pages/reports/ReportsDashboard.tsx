import { Card } from '@/components/common/Card';
import { YearToDateChart } from './components/YearToDateChart';
import { MonthlySummaryCard } from './components/MonthlySummaryCard';
import { TransferStatusCard } from './components/TransferStatusCard';
import { useQuery } from '@tanstack/react-query';
import { storageService } from '@/services/storage/storage-service';

export const ReportsDashboard = () => {
  const currentMonth = new Date().toISOString().substring(0, 7);

  const { data: monthlyData } = useQuery({
    queryKey: ['monthlyReport', currentMonth],
    queryFn: async () => {
      const vehicles = await storageService.getVehicles();
      const allEntries = await Promise.all(
        vehicles.map(vehicle => 
          storageService.getMileageEntries(vehicle.id)
        )
      );

      // Filter entries for current month
      const monthEntries = allEntries.flatMap(entries => 
        entries.filter(entry => entry.date.startsWith(currentMonth))
      );

      // Calculate totals
      const totalMiles = monthEntries.reduce((sum, entry) => sum + entry.endingMileage, 0);
      const totalCost = vehicles.reduce((sum, vehicle) => {
        const vehicleEntries = monthEntries.filter(entry => entry.vehicleId === vehicle.id);
        const miles = vehicleEntries.reduce((total, entry) => total + entry.endingMileage, 0);
        return sum + (miles * vehicle.costPerMile);
      }, 0);

      return {
        month: currentMonth,
        totalMiles,
        totalCost,
      };
    }
  });

  const { data: yearToDate } = useQuery({
    queryKey: ['yearToDateReport'],
    queryFn: async () => {
      const currentYear = new Date().getFullYear();
      const months = Array.from({ length: 12 }, (_, i) => 
        `${currentYear}-${String(i + 1).padStart(2, '0')}`);

      const monthlyReports = await Promise.all(
        months.map(async (month) => {
          const vehicles = await storageService.getVehicles();
          const allEntries = await Promise.all(
            vehicles.map(vehicle => 
              storageService.getMileageEntries(vehicle.id)
            )
          );

          const monthEntries = allEntries.flatMap(entries => 
            entries.filter(entry => entry.date.startsWith(month))
          );

          const totalMiles = monthEntries.reduce((sum, entry) => sum + entry.endingMileage, 0);
          const totalCost = vehicles.reduce((sum, vehicle) => {
            const vehicleEntries = monthEntries.filter(entry => entry.vehicleId === vehicle.id);
            const miles = vehicleEntries.reduce((total, entry) => total + entry.endingMileage, 0);
            return sum + (miles * vehicle.costPerMile);
          }, 0);

          return {
            month,
            totalMiles,
            totalCost,
          };
        })
      );

      return monthlyReports;
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Reports Dashboard
      </h1>

      <Card>
        <YearToDateChart data={yearToDate || []} />
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MonthlySummaryCard data={monthlyData} />
        <TransferStatusCard />
      </div>
    </div>
  );
};