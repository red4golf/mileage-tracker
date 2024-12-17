import { ReactNode } from 'react';
import { LoadingState } from './LoadingState';
import { PageLoading } from './PageLoading';

interface QueryLoadingBoundaryProps {
  children: ReactNode;
  loading: boolean;
  type?: 'page' | 'component';
  loadingType?: 'card' | 'table' | 'text';
  rows?: number;
}

export const QueryLoadingBoundary = ({
  children,
  loading,
  type = 'component',
  loadingType = 'card',
  rows = 3,
}: QueryLoadingBoundaryProps) => {
  if (!loading) {
    return <>{children}</>;
  }

  if (type === 'page') {
    return <PageLoading />;
  }

  return <LoadingState type={loadingType} rows={rows} />;
};