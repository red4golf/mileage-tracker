import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { googleSheetsService } from '@/services/sheets/sheets-service';

interface Transfer {
  month: string;
  status: 'pending' | 'completed';
  confirmationId: string | null;
  timestamp: string;
}

interface TransferStatusCardProps {
  transfers: Transfer[];
}

export const TransferStatusCard = ({ transfers }: TransferStatusCardProps) => {
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [confirmationId, setConfirmationId] = useState('');
  const queryClient = useQueryClient();

  const updateTransfer = useMutation({
    mutationFn: async ({ month, status, confirmationId }: {
      month: string;
      status: 'pending' | 'completed';
      confirmationId?: string;
    }) => {
      await googleSheetsService.updateMonthlyTransferStatus(month, status, confirmationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transferHistory'] });
      setSelectedTransfer(null);
      setConfirmationId('');
    },
  });

  const pendingTransfers = transfers.filter(t => t.status === 'pending');
  const recentTransfers = transfers
    .filter(t => t.status === 'completed')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  return (
    <Card title="Transfer Status">
      <div className="space-y-4">
        {/* Pending Transfers Section */}
        <div>
          <h4 className="mb-2 font-medium text-gray-900 dark:text-white">Pending Transfers</h4>
          {pendingTransfers.length > 0 ? (
            <div className="space-y-2">
              {pendingTransfers.map((transfer) => (
                <div
                  key={transfer.month}
                  className="flex items-center justify-between rounded-md bg-yellow-50 p-2 dark:bg-yellow-900/20"
                >
                  <span className="text-sm text-yellow-800 dark:text-yellow-200">
                    {new Date(transfer.month + '-01').toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedTransfer(transfer)}
                  >
                    Mark Complete
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No pending transfers
            </p>
          )}
        </div>
