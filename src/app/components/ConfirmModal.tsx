import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
