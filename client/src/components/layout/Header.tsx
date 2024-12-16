import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-gray-900 dark:text-white"
            >
              Mileage Tracker
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/vehicles"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Vehicles
              </Link>
              <Link
                to="/reports"
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Reports
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};