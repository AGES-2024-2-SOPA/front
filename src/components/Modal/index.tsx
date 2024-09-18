import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, content, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fundo escurecido */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Conteúdo do modal */}
      <div className="bg-white p-6 rounded-md z-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
