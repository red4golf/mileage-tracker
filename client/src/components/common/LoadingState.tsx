interface LoadingStateProps {
  rows?: number;
  type?: 'card' | 'table' | 'text';
}

export const LoadingState = ({ rows = 3, type = 'card' }: LoadingStateProps) => {
  if (type === 'table') {
    return (
      <div className="animate-pulse">
        <div className="h-10 rounded-t bg-gray-200 dark:bg-gray-700" />
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className="h-12 border-t border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-gray-200 dark:bg-gray-700"
            style={{ width: `${Math.random() * 50 + 50}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 p-6 dark:border-gray-700"
        >
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mt-6">
            <div className="h-8 w-full rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
};
