import { LoadingSpinner } from './LoadingSpinner';

export const PageLoading = () => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};