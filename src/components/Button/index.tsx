// components/Button/index.tsx

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFluid?: boolean;
  customClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  isFluid = false,
  disabled = false,
  children,
  onClick,
  customClass = '',
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`${
        isFluid ? 'w-full' : 'w-auto'
      } p-3 rounded-3xl ${customClass}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
