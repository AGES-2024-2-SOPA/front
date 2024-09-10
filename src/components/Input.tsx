import React from 'react';

interface InputProps {
  type?: string;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  onChangeCallback?: (value: string) => void;
}

const Input = ({ 
  type = 'text', 
  icon, 
  label, 
  placeholder = '', 
  onChangeCallback 
}:InputProps ) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeCallback) {
      onChangeCallback(event.target.value);
    }
  };

  return (
    <div className="flex items-center relative w-full">
      {label && <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative w-full">
        {icon && <span className="absolute right-7 top-4 fill-current text-gray-500 w-4 h-4">{icon}</span>}
        <input 
          type={type} 
          placeholder={placeholder} 
          onChange={handleChange} 
          className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-900 border border-gray-300 rounded-full transition duration-300 focus:outline-none focus:border-green-600"
        />
      </div>
    </div>
  );
};

export default Input;
