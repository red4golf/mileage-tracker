import { PropsWithChildren } from 'react';
import { Header } from './Header';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};