import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ReportsDashboard } from '@/pages/reports/ReportsDashboard';
import { MonthlyReportDetail } from '@/pages/reports/MonthlyReportDetail';
import { VehicleList } from '@/pages/vehicles/VehicleList';
import { MileageEntryPage } from '@/pages/mileage/MileageEntryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
      {
        path: 'vehicles',
        element: <VehicleList />,
      },
      {
        path: 'mileage',
        element: <MileageEntryPage />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
