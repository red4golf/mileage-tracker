import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface VehicleBreakdown {
  vehicleId: string;
  miles: number;
  cost: number;
}

interface VehicleBreakdownChartProps {
  data: VehicleBreakdown[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const VehicleBreakdownChart = ({ data }: VehicleBreakdownChartProps) => {
  const chartData = data.map(vehicle => ({
    name: `Vehicle ${vehicle.vehicleId}`,
    value: vehicle.miles,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              `${value.toLocaleString()} miles (${((value / data.reduce((sum, v) => sum + v.miles, 0)) * 100).toFixed(1)}%)`
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
