import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  leadName?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  leadName,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Lead">
      <div className="space-y-4">
        <p className="text-gray-700">
          Are you sure you want to delete lead <strong>{leadName}</strong>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;