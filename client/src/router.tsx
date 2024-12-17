import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { VehicleList } from '@/pages/vehicles/VehicleList';
import { MileageEntryPage } from '@/pages/mileage/MileageEntryPage';
import { ReportsDashboard } from '@/pages/reports/ReportsDashboard';
import { MonthlyReportDetail } from '@/pages/reports/MonthlyReportDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'vehicles',
        element: <VehicleList />,
      },
      {
        path: 'mileage',
        element: <MileageEntryPage />,
      },
      {
        path: 'reports',
        children: [
          {
            index: true,
            element: <ReportsDashboard />,
          },
          {
            path: ':month',
            element: <MonthlyReportDetail />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};