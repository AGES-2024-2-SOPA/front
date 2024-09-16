import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

const CadastroFerroVelho = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(vendedorSchema),
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
    console.log('Formulário enviado com sucesso:', data);
    navigate('/cadastro-representante');
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFF4EA]">
      <div className="w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  />
                  <Input
                    label="Nome Fantasia"
                    name="nomeFantasia"
                    placeholder="Digite o Nome Fantasia"
                    register={register('nomeFantasia')}
                    error={errors.nomeFantasia?.message}
                  />
                  <Input
                    label="CNPJ"
                    name="cnpj"
                    placeholder="Digite o CNPJ"
                    register={register('cnpj')}
                    error={errors.cnpj?.message}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Digite o Email"
                    register={register('email')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Telefone"
                    name="telefone"
                    type="tel"
                    placeholder="Digite o Telefone"
                    register={register('telefone')}
                    error={errors.telefone?.message}
                  />
                  <Input
                    label="CDV"
                    name="cdv"
                    placeholder="Digite o CDV"
                    register={register('cdv')}
                    error={errors.cdv?.message}
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
                  />
                  <Input
                    label="Endereço"
                    name="endereco"
                    placeholder="Digite o Endereço"
                    register={register('endereco')}
                    error={errors.endereco?.message}
                  />
                  <Input
                    label="Número"
                    name="numero"
                    placeholder="Digite o Número"
                    register={register('numero')}
                    error={errors.numero?.message}
                  />
                  <Input
                    label="Complemento"
                    name="complemento"
                    placeholder="Digite o Complemento"
                    register={register('complemento')}
                    error={errors.complemento?.message}
                  />
                  <Input
                    label="Estado"
                    name="estado"
                    placeholder="Digite o Estado"
                    register={register('estado')}
                    error={errors.estado?.message}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <div className="w-80">
                <Button isFluid={true} type="submit">
                  Próximo
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroFerroVelho;
