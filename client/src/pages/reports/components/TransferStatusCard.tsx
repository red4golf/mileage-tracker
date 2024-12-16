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