import React from 'react';
import './addPieceInput.css'; 

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AddPieceButton: React.FC<ButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <div className="add-piece-button-container">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`add-piece-button ${disabled ? 'disabled' : 'enabled'}`}
      >
        {}
        <div className="icon-container">
          <span className="icon">+</span>
        </div>
        {}
        <span className="label">Adicionar peça</span>
      </button>
    </div>
  );
};

export default AddPieceButton;
