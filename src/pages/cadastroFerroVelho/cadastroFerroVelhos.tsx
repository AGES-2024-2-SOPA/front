import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { FormDataContext } from '../../contexts/FormDataContext';

// Remova a importação direta do arquivo SVG

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

const cnpjRegex = /^\d{14}$/;
const cepRegex = /^\d{8}$/;
const telefoneRegex = /^\d{10,11}$/;

const vendedorSchema = z.object({
  nomeEmpresa: z.string().min(3, { message: 'Nome da Empresa deve ter pelo menos 3 caracteres' }),
  nomeFantasia: z.string().min(3, { message: 'Nome Fantasia deve ter pelo menos 3 caracteres' }),
  cnpj: z.string().regex(cnpjRegex, { message: 'CNPJ deve ter 14 dígitos numéricos' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefone: z.string().regex(telefoneRegex, { message: 'Telefone inválido' }),
  cdv: z.string().min(1, { message: 'CDV obrigatório' }),
  cep: z.string().regex(cepRegex, { message: 'CEP deve ter 8 dígitos numéricos' }),
  endereco: z.string().min(1, { message: 'Endereço obrigatório' }),
  numero: z.string().min(1, { message: 'Número obrigatório' }),
  complemento: z.string().optional(),
  estado: z.string().min(1, { message: 'Estado obrigatório' }),
});

const CadastroFerroVelho: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { cadastroFerroVelho, setCadastroFerroVelho } = useContext(FormDataContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(vendedorSchema),
    defaultValues: cadastroFerroVelho,
  });

  const cepValue = watch('cep');

  useEffect(() => {
    if (cepValue && cepValue.length === 8) {
      fetchAddress(cepValue);
    }
  }, [cepValue]);

  const fetchAddress = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        setValue('endereco', data.logradouro);
        setValue('estado', data.uf);
        setValue('complemento', data.complemento || '');
        setError('cep', {});
      } else {
        setError('cep', { type: 'manual', message: 'CEP não encontrado' });
      }
    } catch (error) {
      setError('cep', { type: 'manual', message: 'Erro ao buscar o CEP' });
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Dados do Vendedor:', data);
    setCadastroFerroVelho(data);
    navigate('/cadastro-representante');
  };

  const handleBackClick = () => {
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setCadastroFerroVelho({});
    navigate('/');
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFF4EA]">
      {/* Usando a referência direta para a logo no caminho correto */}
      <div className="flex justify-center mb-6">
        <img src="/logo.svg" alt="Logo" className="w-20 h-auto" />
      </div>
      <div className="w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form id="cadastro-ferro-velho-form">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro Vendedor</h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Informações básicas</h3>
                <div className="space-y-4">
                  <Input
                    label="Nome da Empresa"
                    name="nomeEmpresa"
                    placeholder="Digite o Nome da Empresa"
                    register={register('nomeEmpresa')}
                    error={errors.nomeEmpresa?.message}
                    autoComplete="organization"
                  />
                  <Input
                    label="Nome Fantasia"
                    name="nomeFantasia"
                    placeholder="Digite o Nome Fantasia"
                    register={register('nomeFantasia')}
                    error={errors.nomeFantasia?.message}
                    autoComplete="organization"
                  />
                  <Input
                    label="CNPJ"
                    name="cnpj"
                    placeholder="Digite o CNPJ"
                    register={register('cnpj')}
                    error={errors.cnpj?.message}
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
                    label="CDV"
                    name="cdv"
                    placeholder="Digite o CDV"
                    register={register('cdv')}
                    error={errors.cdv?.message}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Endereço</h3>
                <div className="space-y-4">
                  <Input
                    label="CEP"
                    name="cep"
                    placeholder="Digite o CEP"
                    register={register('cep')}
                    error={errors.cep?.message}
                    autoComplete="postal-code"
                  />
                  <Input
                    label="Endereço"
                    name="endereco"
                    placeholder="Digite o Endereço"
                    register={register('endereco')}
                    error={errors.endereco?.message}
                    autoComplete="street-address"
                  />
                  <Input
                    label="Número"
                    name="numero"
                    placeholder="Digite o Número"
                    register={register('numero')}
                    error={errors.numero?.message}
                    autoComplete="off"
                  />
                  <Input
                    label="Complemento"
                    name="complemento"
                    placeholder="Digite o Complemento"
                    register={register('complemento')}
                    error={errors.complemento?.message}
                    autoComplete="off"
                  />
                  <Input
                    label="Estado"
                    name="estado"
                    placeholder="Digite o Estado"
                    register={register('estado')}
                    error={errors.estado?.message}
                    autoComplete="address-level1"
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

export default CadastroFerroVelho;
