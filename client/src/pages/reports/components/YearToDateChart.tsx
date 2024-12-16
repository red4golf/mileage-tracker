import { MonthlyReport } from '@/services/sheets/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface YearToDateChartProps {
  data: MonthlyReport[];
}

export const YearToDateChart = ({ data }: YearToDateChartProps) => {
  const chartData = data.map(report => ({
    name: new Date(report.month + '-01').toLocaleString('default', { month: 'short' }),
    miles: report.totalMiles,
    cost: report.totalCost
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            yAxisId="miles"
            orientation="left"
            label={{ value: 'Miles', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="cost"
            orientation="right"
            label={{ value: 'Cost ($)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'cost') {
                return [`$${value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`, 'Cost'];
              }
              return [value.toLocaleString(), 'Miles'];
            }}
          />
          <Legend />
          <Line
            yAxisId="miles"
            type="monotone"
            dataKey="miles"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Miles"
          />
          <Line
            yAxisId="cost"
            type="monotone"
            dataKey="cost"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Cost"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
