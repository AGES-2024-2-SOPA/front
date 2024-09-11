import React, { useState } from 'react';
import Input from '../../components/Input' // Importando o componente Input

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (value: string) => {
        setEmail(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="flex h-screen justify-center items-center bg-amber-50">
            <div className="flex w-[80%] h-[80%] shadow-lg rounded-lg overflow-hidden">

                <div className="w-1/2 bg-white flex flex-col justify-start items-center p-10"> {/*Primeira metade*/}
                    <h1 className="text-3xl font-bold mb-16 mt-20">Login</h1>
                    <form onSubmit={handleSubmit}
                          className="w-full max-w-sm flex flex-col space-y-6">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Digite seu email"
                            icon="/logoemail.svg"
                            onChangeCallback={handleEmailChange}
                        />
                        <Input
                            type="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            icon="/logosenha.svg"
                            onChangeCallback={handlePasswordChange}
                        />
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition mt-60 mb-2">
                            Log in
                        </button>
                    </form>
                </div>

                <div className="w-1/2 bg-orange-500 flex flex-col justify-center items-center"> {/*Segunda metade*/}
                    <div className="p-10 rounded-lg mb-6" style={{marginTop: '100px'}}>
                        <img src="/logoprojeto.png" alt="Logo"/>
                    </div>
                    <div className="mb-80 mt-4">
                        <h2 className="text-2xl font-bold text-center text-white">Bem-vindo <br/> de volta!</h2>
                    </div>
                    {/*<div className="mt-auto mb-[260px]">*/}
                    {/*    <h2 className="text-2xl font-bold text-left text-white -ml-80">Bem-vindo <br/> de volta!</h2>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Login;
