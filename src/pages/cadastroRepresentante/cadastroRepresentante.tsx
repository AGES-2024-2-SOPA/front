import Input from '../../components/Input';
import Button from '../../components/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
    nomeRepresentante: z.string().min(3, { message: "Nome do Representante deve ter pelo menos 3 caracteres" }),
    cpf: z.string().length(11, { message: "CPF deve ter 11 dígitos" }),
    email: z.string().email({ message: "Email inválido" }),
    telefone: z.string().regex(/^\d{10,11}$/, { message: "Telefone inválido" }),
    senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    confirmarSenha: z.string().min(6, { message: "Confirme a senha" }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    path: ['confirmarSenha'],
    message: 'As senhas não coincidem',
  });

const CadastroRepresentante = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(representanteSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Formulário enviado com sucesso:', data);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFF4EA]">
      <div className="w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cadastro Representante</h2>
            <h3 className="text-lg font-semibold mb-4">Informações do representante da empresa</h3>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <div className="space-y-4">
                  <Input
                    label="Nome Representante"
                    name="nomeRepresentante"
                    placeholder="Digite o Nome do Representante"
                    register={register('nomeRepresentante')}
                    error={errors.nomeRepresentante?.message}
                  />
                  <Input
                    label="CPF"
                    name="cpf"
                    placeholder="Digite o CPF"
                    register={register('cpf')}
                    error={errors.cpf?.message}
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Digite o Email"
                    register={register('email')}
                    error={errors.email?.message}
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
                  />
                  <Input
                    label="Senha"
                    name="senha"
                    placeholder="Digite a Senha"
                    type="password"
                    register={register('senha')}
                    error={errors.senha?.message}
                    icon="/key.svg"
                  />
                  <Input
                    label="Confirmar Senha"
                    name="confirmarSenha"
                    placeholder="Confirme a Senha"
                    type="password"
                    register={register('confirmarSenha')}
                    error={errors.confirmarSenha?.message}
                    icon="/key.svg"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end mt-8">
              <div className="w-80">
                <Button isFluid={true} type="submit">
                  Cadastrar Representante
                </Button>
              </div>
            </div>
      </div>
    </div>
  );
};

export default CadastroRepresentante;
