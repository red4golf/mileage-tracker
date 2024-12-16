import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Card = ({ title, className, children, ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        'rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800',
        className
      )}
      {...props}
    >
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};