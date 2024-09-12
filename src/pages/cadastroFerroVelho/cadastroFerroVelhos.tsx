import React, { useState } from 'react';
import Input from '../../components/Input/index'; 
import { z } from 'zod';
import axios from 'axios';

const vendedorSchema = z.object({
  nomeEmpresa: z.string().min(3, { message: "Nome da Empresa deve ter pelo menos 3 caracteres" }),
  nomeFantasia: z.string().min(3, { message: "Nome Fantasia deve ter pelo menos 3 caracteres" }),
  cnpj: z.string().min(14, { message: "CNPJ deve ter 14 dígitos" }).max(14, { message: "CNPJ deve ter 14 dígitos" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().regex(/^\d{10,11}$/, { message: "Telefone inválido" }),
  cdv: z.string().min(1, { message: "CDV obrigatório" }),
  cep: z.string().min(8, { message: "CEP deve ter 8 dígitos" }).max(8, { message: "CEP deve ter 8 dígitos" }),
  endereco: z.string().min(1, { message: "Endereço obrigatório" }),
  numero: z.string().min(1, { message: "Número obrigatório" }),
  complemento: z.string().optional(),
  estado: z.string().min(1, { message: "Estado obrigatório" }),
});

const CadastroVendedor = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    nomeFantasia: '',
    cnpj: '',
    email: '',
    telefone: '',
    cdv: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    estado: '',
  });

  const [errors, setErrors] = useState({
    nomeEmpresa: '', nomeFantasia: '', cnpj: '', email: '', telefone: '', cdv: '', cep: '', endereco: '', numero: '', complemento: '', estado: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));

    if (field === 'cep' && value.length === 8) {
      fetchAddress(value);
    }
  };

  const fetchAddress = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        setFormData(prevState => ({
          ...prevState,
          endereco: data.logradouro,
          estado: data.uf,
          complemento: '', // Mantendo "Complemento" vazio
          numero: '' // Mantendo "Número" vazio
        }));
      } else {
        setErrors(prevState => ({ ...prevState, cep: 'CEP não encontrado' }));
      }
    } catch (error) {
      setErrors(prevState => ({ ...prevState, cep: 'Erro ao buscar o CEP' }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setErrors({
        nomeEmpresa: '', nomeFantasia: '', cnpj: '', email: '', telefone: '', cdv: '', cep: '', endereco: '', numero: '', complemento: '', estado: ''
      });
      vendedorSchema.parse(formData);
      console.log('Formulário enviado com sucesso:', formData);
      // Aqui você pode enviar os dados para uma API ou realizar outra ação
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setErrors(prev => ({ ...prev, [err.path[0]]: err.message }));
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF4EA]">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro Vendedor</h2>
        
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações básicas</h3>
            <div className="space-y-4">
              <Input 
                label="Nome da Empresa" 
                placeholder="Digite o Nome da Empresa" 
                onChangeCallback={(value) => handleInputChange('nomeEmpresa', value)} 
                value={formData.nomeEmpresa}
                error={errors.nomeEmpresa}
              />
              <Input 
                label="Nome Fantasia" 
                placeholder="Digite o Nome Fantasia" 
                onChangeCallback={(value) => handleInputChange('nomeFantasia', value)} 
                value={formData.nomeFantasia}
                error={errors.nomeFantasia}
              />
              <Input 
                label="CNPJ" 
                placeholder="Digite o CNPJ" 
                onChangeCallback={(value) => handleInputChange('cnpj', value)} 
                value={formData.cnpj}
                error={errors.cnpj}
              />
              <Input 
                label="Email" 
                placeholder="Digite o Email" 
                type="email" 
                onChangeCallback={(value) => handleInputChange('email', value)} 
                value={formData.email}
                error={errors.email}
              />
              <Input 
                label="Telefone" 
                placeholder="Digite o Telefone" 
                type="tel" 
                onChangeCallback={(value) => handleInputChange('telefone', value)} 
                value={formData.telefone}
                error={errors.telefone}
              />
              <Input 
                label="CDV" 
                placeholder="Digite o CDV" 
                onChangeCallback={(value) => handleInputChange('cdv', value)} 
                value={formData.cdv}
                error={errors.cdv}
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
                value={formData.cep}
                error={errors.cep}
              />
              <Input 
                label="Endereço" 
                placeholder="Digite o Endereço" 
                onChangeCallback={(value) => handleInputChange('endereco', value)} 
                value={formData.endereco}
                error={errors.endereco}
              />
              <Input 
                label="Número" 
                placeholder="Digite o Número" 
                onChangeCallback={(value) => handleInputChange('numero', value)} 
                value={formData.numero}
                error={errors.numero}
              />
              <Input 
                label="Complemento" 
                placeholder="Digite o Complemento" 
                onChangeCallback={(value) => handleInputChange('complemento', value)} 
                value={formData.complemento}
                error={errors.complemento}
              />
              <Input 
                label="Estado" 
                placeholder="Digite o Estado" 
                onChangeCallback={(value) => handleInputChange('estado', value)} 
                value={formData.estado}
                error={errors.estado}
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
