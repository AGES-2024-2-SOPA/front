import React, { useState } from 'react';
import Input from './Input';

const Teste = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: React.SetStateAction<string>) => {
    setInputValue(value);
    console.log("Valor do input:", value);
  };

  return (
    <div>
      <h1>Exemplo de Input</h1>
      <Input 
        type="text" 
        //icon = (icone) 
        label="Nome de Usuário" 
        placeholder="Digite seu nome"
        onChangeCallback={handleInputChange}
      />
      <p>Valor atual: {inputValue}</p>
    </div>
  );
};

export default Teste;
