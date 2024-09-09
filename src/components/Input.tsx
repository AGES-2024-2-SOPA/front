import React from 'react';
import '../styles/input.css'; // Certifique-se de importar o arquivo CSS

// Definição do tipo das propriedades esperadas pelo componente Input
interface InputProps {
  type?: string;
  icon?: React.ReactNode;
  label?: string;
  placeholder?: string;
  onChangeCallback?: (value: string) => void;
}

// Componente Input tipado
const Input: React.FC<InputProps> = ({ 
  type = 'text', 
  icon, 
  label, 
  placeholder = '', 
  onChangeCallback 
}) => {

  // Função que é chamada sempre que o valor do input é alterado
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeCallback) {
      onChangeCallback(event.target.value);
    }
  };

  return (
    <div className="custom_input">
      {label && <label>{label}</label>}
      
      <div style={{ position: 'relative', width: '100%' }}>
        {icon && <span className="svg_icon">{icon}</span>}
        <input 
          type={type} 
          placeholder={placeholder} 
          onChange={handleChange} 
          className="input" 
        />
      </div>
    </div>
  );
};

export default Input;
