interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    label: string;
    isFluid: boolean;
    isDisabled: boolean;
  }
  
  export default function Button(props: ButtonProps) {
  
    const buttonStyle = {
      backgroundColor: '#FF8E29',
      color: '#FFFFFF',
      width: props.isFluid ? '100%' : 'auto',
      border: 'none',         
      borderRadius: '30px',     
    };
  
    return (
      <button
        style={buttonStyle}
        onClick={props.onClick}
        disabled={props.isDisabled}
      >
        {props.label}
      </button>
    );
  }