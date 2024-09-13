import React, { useState } from 'react';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import { z } from 'zod';

const representanteSchema = z.object({
  nomeRepresentante: z.string().min(3, { message: "Nome do Representante deve ter pelo menos 3 caracteres" }),
  cpf: z.string().min(11, { message: "CPF deve ter 11 dígitos" }).max(11, { message: "CPF deve ter 11 dígitos" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().regex(/^\d{10,11}$/, { message: "Telefone inválido" }),
  senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmarSenha: z.string().min(6, { message: "Confirme a senha" }),
});

const CadastroRepresentante = () => {
  const [formData, setFormData] = useState({
    nomeRepresentante: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });

  const [errors, setErrors] = useState({
    nomeRepresentante: '', cpf: '', email: '', telefone: '', senha: '', confirmarSenha: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setErrors({
        nomeRepresentante: '', cpf: '', email: '', telefone: '', senha: '', confirmarSenha: ''
      });
      representanteSchema.parse(formData);
      console.log('Formulário enviado com sucesso:', formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setErrors(prev => ({ ...prev, [err.path[0]]: err.message }));
        });
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFF4EA]">
      <div className="w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro Representante</h2>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Informações do representante da empresa</h3>
                <div className="space-y-4">
                  <Input
                    label="Nome Representante"
                    placeholder="Digite o Nome do Representante"
                    onChangeCallback={(value) => handleInputChange('nomeRepresentante', value)}
                    value={formData.nomeRepresentante}
                    error={errors.nomeRepresentante}
                  />
                  <Input
                    label="CPF"
                    placeholder="Digite o CPF"
                    onChangeCallback={(value) => handleInputChange('cpf', value)}
                    value={formData.cpf}
                    error={errors.cpf}
                  />
                  <Input
                    label="Email"
                    placeholder="Digite o Email"
                    type="email"
                    onChangeCallback={(value) => handleInputChange('email', value)}
                    value={formData.email}
                    error={errors.email}
                  />
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <Input
                    label="Telefone"
                    placeholder="Digite o Telefone"
                    type="tel"
                    onChangeCallback={(value) => handleInputChange('telefone', value)}
                    value={formData.telefone}
                    error={errors.telefone}
                  />
                  <Input
                    label="Senha"
                    placeholder="Digite a Senha"
                    type="password"
                    onChangeCallback={(value) => handleInputChange('senha', value)}
                    value={formData.senha}
                    error={errors.senha}
                  />
                  <Input
                    label="Confirmar Senha"
                    placeholder="Confirme a Senha"
                    type="password"
                    onChangeCallback={(value) => handleInputChange('confirmarSenha', value)}
                    value={formData.confirmarSenha}
                    error={errors.confirmarSenha}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end mt-8">
          <Button
            isFluid={false}
            onClick={handleSubmit}
            customClass="w-[330px] h-[45px]"
          >
            Cadastrar Representante
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CadastroRepresentante;
