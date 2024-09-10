interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    isFluid?: boolean;
  }
  
  export default function Button({isFluid = false, disabled = false, children, onClick}: ButtonProps) {

    return (
      <button
        className = {`bg-amber-500 text-white border-none rounded-3xl ${isFluid ? 'w-full' : 'w-auto'} p-3`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }