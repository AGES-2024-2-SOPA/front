import React from 'react';

interface InputProps {
  type?: string;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChangeCallback?: (value: string) => void;
}

const Input = ({
  type = 'text',
  icon,
  label,
  placeholder = '',
  value = '',
  error = '',
  onChangeCallback,
}: InputProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeCallback) {
      onChangeCallback(event.target.value);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`w-full px-4 py-2 pr-10 text-sm bg-gray-100 text-gray-900 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-full transition duration-300 focus:outline-none focus:border-green-600`}
        />
        {icon && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
