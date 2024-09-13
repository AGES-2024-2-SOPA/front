import React, { useState } from 'react';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import { z } from 'zod';
import axios from 'axios';

interface FormData {
  nomeEmpresa: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  telefone: string;
  cdv: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  estado: string;
}

interface Errors {
  [key: string]: string;
}

const cnpjRegex = /^\d{14}$/;
const cepRegex = /^\d{8}$/;
const telefoneRegex = /^\d{10,11}$/;

const vendedorSchema = z.object({
  nomeEmpresa: z.string().min(3, { message: "Nome da Empresa deve ter pelo menos 3 caracteres" }),
  nomeFantasia: z.string().min(3, { message: "Nome Fantasia deve ter pelo menos 3 caracteres" }),
  cnpj: z.string().regex(cnpjRegex, { message: "CNPJ deve ter 14 dígitos numéricos" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().regex(telefoneRegex, { message: "Telefone inválido" }),
  cdv: z.string().min(1, { message: "CDV obrigatório" }),
  cep: z.string().regex(cepRegex, { message: "CEP deve ter 8 dígitos numéricos" }),
  endereco: z.string().min(1, { message: "Endereço obrigatório" }),
  numero: z.string().min(1, { message: "Número obrigatório" }),
  complemento: z.string().optional(),
  estado: z.string().min(1, { message: "Estado obrigatório" }),
});

const CadastroVendedor = () => {
  const [formData, setFormData] = useState<FormData>({
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

  const [errors, setErrors] = useState<Errors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
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
          complemento: data.complemento || '',
        }));
        setErrors(prevState => ({ ...prevState, cep: '' }));
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
      setErrors({});
      vendedorSchema.parse(formData);
      console.log('Formulário enviado com sucesso:', formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Errors = {};
        error.errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            const fieldName = err.path[0] as string;
            newErrors[fieldName] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFF4EA]">
      <div className="w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
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
          </form>
        </div>
        <div className="flex justify-end mt-8">
          <div className="w-80">
            <Button
              isFluid={true}
              onClick={handleSubmit}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroVendedor;
