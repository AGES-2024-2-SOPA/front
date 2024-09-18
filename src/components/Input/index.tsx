import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  icon?: string;
  label?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  name?: string;
  error?: string;
}

const Input = ({
                 type = "text",
                 icon,
                 label,
                 name,
                 placeholder = "",
                 register,
                 error = '',
                 ...rest
               }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          {...register}
          className={`w-full px-4 py-2 text-sm bg-gray-100 text-gray-900 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-full focus:outline-none focus:border-green-600`}
          {...rest}
        />
        {icon && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <img src={icon} alt="icon" className="h-5 w-5" />
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
