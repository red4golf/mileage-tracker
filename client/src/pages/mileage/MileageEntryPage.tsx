import { Card } from '@/components/common/Card';
import { MileageEntryForm } from './components/MileageEntryForm';
import { RecentEntriesTable } from './components/RecentEntriesTable';

export const MileageEntryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Mileage Entry
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Add Mileage Entry">
          <MileageEntryForm />
        </Card>

        <Card title="Recent Entries">
          <RecentEntriesTable />
        </Card>
      </div>
    </div>
  );
};