import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/vehicles', label: 'Vehicles' },
  { path: '/mileage', label: 'Mileage Entry' },
  { path: '/reports', label: 'Reports' },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Mileage Tracker
              </span>
            </div>
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'px-3 py-2 rounded-md text-sm font-medium',
                    location.pathname === item.path
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:text-white"
              onClick={() => {
                document.documentElement.classList.toggle('dark');
              }}
            >
              <span className="sr-only">Toggle dark mode</span>
              {document.documentElement.classList.contains('dark') ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};