interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isFluid?: boolean;
  customClass?: string;  
}

export default function Button({
  isFluid = false,
  disabled = false,
  children,
  onClick,
  customClass = "",  
}: ButtonProps) {
  return (
    <button
      className={`bg-amber-500 text-white border-none rounded-3xl ${
        isFluid ? "w-full" : "w-auto"
      } p-3 ${customClass}`}  
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
