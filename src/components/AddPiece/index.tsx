import React from 'react';
import ReactDOM from 'react-dom';

const AddPieceButton: React.FC<{ onClick: () => void; disabled?: boolean }> = ({ onClick, disabled = false }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${disabled ? 'cursor-not-allowed border-gray-300 text-gray-400' : 'cursor-pointer border-[#8c9b96] text-[#7eccb3]'}
          w-[50rem] max-w-[40rem] py-[0.5rem] mt-[5rem]
          border-2 border-[#E1E1E1] bg-white 
          text-center text-2xl text-[#6F757E] font-normal rounded-lg 
          transition-colors duration-300 ease-in-out
          hover:bg-[#f0fdf4] 
          disabled:bg-gray-200
        `}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
            <span className="text-3xl">+</span>
          </div>
          <span className="text-xl">Adicionar peça</span>
        </div>
      </button>
    </div>
  );
};

export default AddPieceButton;

const App = () => {
  const handleButtonClick = () => {
    alert('Botão clicado!');
  };

  return (
    <div className="p-4">
      <AddPieceButton onClick={handleButtonClick} disabled={false} />
      
      <div className="flex justify-center items-center w-full max-h-80 mt-0">
        <button
          className="
            border-2 border-[#8c9b96] bg-white 
            text-[#7eccb3] text-center text-xl font-normal rounded-lg 
            transition-colors duration-300 ease-in-out
            hover:bg-[#f0fdf4] disabled:cursor-not-allowed 
            disabled:border-gray-300 disabled:text-gray-400 
            disabled:hover:bg-gray-200
          "
        >
        </button>
        <div className="flex justify-center items-center w-full h-full text-[1.5rem]">
        </div>
        <label className="mt-[0.5rem] text-[1.25rem]">
        </label>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
