import React from 'react';
import Input from '../../components/Input/index'; 

const CadastroVendedor = () => {
  const handleInputChange = (field: string, value: string) => {
    console.log(`${field}: ${value}`);
    // Aqui você pode adicionar a lógica para armazenar os valores dos inputs no estado ou enviá-los para uma API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF4EA]">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro Vendedor</h2>
        
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações básicas</h3>
            <div className="space-y-4">
              <Input 
                label="Nome da Empresa" 
                placeholder="Digite o Nome da Empresa" 
                onChangeCallback={(value) => handleInputChange('nomeEmpresa', value)} 
              />
              <Input 
                label="Nome Fantasia" 
                placeholder="Digite o Nome Fantasia" 
                onChangeCallback={(value) => handleInputChange('nomeFantasia', value)} 
              />
              <Input 
                label="CNPJ" 
                placeholder="Digite o CNPJ" 
                onChangeCallback={(value) => handleInputChange('cnpj', value)} 
              />
              <Input 
                label="Email" 
                placeholder="Digite o Email" 
                type="email" 
                onChangeCallback={(value) => handleInputChange('email', value)} 
              />
              <Input 
                label="Telefone" 
                placeholder="Digite o Telefone" 
                type="tel" 
                onChangeCallback={(value) => handleInputChange('telefone', value)} 
              />
              <Input 
                label="CDV" 
                placeholder="Digite o CDV" 
                onChangeCallback={(value) => handleInputChange('cdv', value)} 
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Endereço</h3>
            <div className="space-y-4">
              <Input 
                label="CEP" 
                placeholder="Digite o CEP" 
                onChangeCallback={(value) => handleInputChange('cep', value)} 
              />
              <Input 
                label="Endereço" 
                placeholder="Digite o Endereço" 
                onChangeCallback={(value) => handleInputChange('endereco', value)} 
              />
              <Input 
                label="Número" 
                placeholder="Digite o Número" 
                onChangeCallback={(value) => handleInputChange('numero', value)} 
              />
              <Input 
                label="Complemento" 
                placeholder="Digite o Complemento" 
                onChangeCallback={(value) => handleInputChange('complemento', value)} 
              />
              <Input 
                label="Estado" 
                placeholder="Digite o Estado" 
                onChangeCallback={(value) => handleInputChange('estado', value)} 
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="mt-8 w-full py-3 bg-[#FF8E29] text-white rounded-full hover:bg-[#e07a20] transition duration-300"
        >
          Próximo
        </button>
      </form>
    </div>
  );
};

export default CadastroVendedor;
