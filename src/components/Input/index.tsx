import React from 'react';

interface InputProps {
  type?: string;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  value?: string; // Adicionando a prop 'value'
  error?: string; // Adicionando a prop 'error'
  onChangeCallback?: (value: string) => void;
}

const Input = ({ 
  type = 'text', 
  icon, 
  label, 
  placeholder = '', 
  value = '', 
  error = '', 
  onChangeCallback 
}: InputProps ) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeCallback) {
      onChangeCallback(event.target.value);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative w-full">
        {icon && <span className="absolute right-7 top-4 fill-current text-gray-500 w-4 h-4">{icon}</span>}
        <input 
          type={type} 
          placeholder={placeholder} 
          value={value} // Usando a prop 'value'
          onChange={handleChange} 
          className={`w-full px-4 py-2 text-sm bg-gray-100 text-gray-900 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-full transition duration-300 focus:outline-none focus:border-green-600`}
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>} {/* Mostrando a mensagem de erro */}
    </div>
  );
};

export default Input;
