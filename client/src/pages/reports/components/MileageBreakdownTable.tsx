interface VehicleBreakdown {
  vehicleId: string;
  miles: number;
  cost: number;
}

interface MileageBreakdownTableProps {
  data: VehicleBreakdown[];
}

export const MileageBreakdownTable = ({ data }: MileageBreakdownTableProps) => {
  const totalMiles = data.reduce((sum, vehicle) => sum + vehicle.miles, 0);
  const totalCost = data.reduce((sum, vehicle) => sum + vehicle.cost, 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Vehicle
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Miles
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              % of Total
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Cost
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((vehicle) => (
            <tr key={vehicle.vehicleId}>
              <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                Vehicle {vehicle.vehicleId}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                {vehicle.miles.toLocaleString()}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                {((vehicle.miles / totalMiles) * 100).toFixed(1)}%
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-500 dark:text-gray-400">
                ${vehicle.cost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50 dark:bg-gray-800">
            <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
              Total
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
              {totalMiles.toLocaleString()}
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
              100%
            </td>
            <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-gray-900 dark:text-white">
              ${totalCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
