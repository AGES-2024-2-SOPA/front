import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email("Formato de email inválido")
    .toLowerCase(),
  password: z.string().min(6, "A senha precisa de 6 caracteres"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: CreateUserFormData) => {
    console.log("Dados do formulário:", data);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-amber-50">
      <div className="flex w-[80%] h-[80%] shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 bg-white flex flex-col justify-start items-center p-10">
          {" "}
          {/*Primeira metade da tela*/}
          <h1 className="text-3xl font-bold mb-16 mt-20">Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm flex flex-col space-y-6"
          >
            <div>
              {/* Campo Email */}
              <Input
                type="email"
                label="Email"
                name="email"
                register={register("email")}
                placeholder="Digite seu email"
                icon="/logoemail.svg"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
              {/* Mensagem de erro */}
              {/* Campo Senha */}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                label="Senha"
                register={register("password")}
                placeholder="Digite sua senha"
                icon="/logosenha.svg"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}{" "}
              {/* Mensagem de erro */}
              {/* Botão Login */}
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition mt-60 mb-2"
            >
              Log in
            </button>
          </form>
        </div>

        <div className="w-1/2 bg-orange-500 flex flex-col justify-center items-center">
          {" "}
          {/*Segunda metade da tela*/}
          <div className="p-10 rounded-lg mb-6" style={{ marginTop: "100px" }}>
            <img src="/logoprojeto.png" alt="Logo" />
          </div>
          <div className="mb-80 mt-4">
            <h2 className="text-2xl font-bold text-center text-white">
              Bem-vindo <br /> de volta!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
