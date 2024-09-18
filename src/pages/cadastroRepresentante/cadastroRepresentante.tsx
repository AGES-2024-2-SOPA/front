import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormDataContext } from '../../contexts/FormDataContext';

interface FormData {
  nomeRepresentante: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
}

const representanteSchema = z
  .object({
    nomeRepresentante: z
      .string()
      .min(3, { message: 'Nome do Representante deve ter pelo menos 3 caracteres' }),
    cpf: z.string().length(11, { message: 'CPF deve ter 11 dígitos' }),
    email: z.string().email({ message: 'Email inválido' }),
    telefone: z.string().regex(/^\d{10,11}$/, { message: 'Telefone inválido' }),
    senha: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
    confirmarSenha: z.string().min(6, { message: 'Confirme a senha' }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas não coincidem',
  });

const CadastroRepresentante: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { cadastroRepresentante, setCadastroRepresentante } = useContext(FormDataContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(representanteSchema),
    defaultValues: cadastroRepresentante,
  });

  const onSubmit = (data: FormData) => {
    console.log('Dados do Representante:', data);
    setCadastroRepresentante(data);
  };

  const handleBackClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setCadastroRepresentante({}); 
    navigate(-1);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFF4EA]">
      <div className="w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form id="cadastro-form">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro Representante</h2>
            <h3 className="text-lg font-semibold mb-4">
              Informações do representante da empresa
            </h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <div className="space-y-4">
                  <Input
                    label="Nome Representante"
                    name="nomeRepresentante"
                    placeholder="Digite o Nome do Representante"
                    register={register('nomeRepresentante')}
                    error={errors.nomeRepresentante?.message}
                    autoComplete="name"
                  />
                  <Input
                    label="CPF"
                    name="cpf"
                    placeholder="Digite o CPF"
                    register={register('cpf')}
                    error={errors.cpf?.message}
                    autoComplete="off"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Digite o Email"
                    register={register('email')}
                    error={errors.email?.message}
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <Input
                    label="Telefone"
                    name="telefone"
                    type="tel"
                    placeholder="Digite o Telefone"
                    register={register('telefone')}
                    error={errors.telefone?.message}
                    autoComplete="tel"
                  />
                  <Input
                    label="Senha"
                    name="senha"
                    type="password"
                    placeholder="Digite a Senha"
                    register={register('senha')}
                    error={errors.senha?.message}
                    icon="/key.svg"
                    autoComplete="new-password"
                  />
                  <Input
                    label="Confirmar Senha"
                    name="confirmarSenha"
                    type="password"
                    placeholder="Confirme a Senha"
                    register={register('confirmarSenha')}
                    error={errors.confirmarSenha?.message}
                    icon="/key.svg"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-between mt-8">
          <div className="w-80">
            <Button
              isFluid={true}
              onClick={handleBackClick}
              customClass="bg-gray-300 hover:bg-gray-400 text-gray-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-x-1"
            >
              <div className="flex items-center justify-center">
                <ArrowBackIosIcon className="mr-2" />
                Voltar
              </div>
            </Button>
          </div>
          <div className="w-80">
            <Button
              isFluid={true}
              onClick={handleSubmit(onSubmit)}
              customClass="bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:translate-x-1"
            >
              Próximo
            </Button>
          </div>
        </div>
        <Modal
          isOpen={showModal}
          title="Tem certeza que deseja voltar?"
          content="Todas as informações não salvas serão perdidas."
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      </div>
    </div>
  );
};

export default CadastroRepresentante;
