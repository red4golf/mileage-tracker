import { Dialog } from './Dialog';
import { Button } from './Button';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
}

export const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
}: DeleteConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Dialog.Title>{title}</Dialog.Title>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {message}
          {itemName && (
            <span className="font-medium text-gray-900 dark:text-white">
              {' '}
              "{itemName}"
            </span>
          )}
        </p>

        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" className="text-red-600" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
