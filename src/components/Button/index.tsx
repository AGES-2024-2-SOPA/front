interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    label: string;
    isFluid: boolean;
    isDisabled: boolean;
  }
  
  export default function Button({isDisabled, isFluid, label, onClick}: ButtonProps) {

    return (
      <button
        className = {`bg-amber-500 text-white border-none rounded-3xl ${isFluid ? 'w-full' : 'w-auto'} p-3`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {label}
      </button>
    );
  }