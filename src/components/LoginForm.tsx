'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react';

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            username: formData.get('usuario'),
            senha: formData.get('senha'),
        };

        const result = await signIn("credentials", {
            ...data,
            redirect: false, 
        });

        if (result?.error) {
            console.log(result);
            setErrorMessage("Credenciais inválidas");
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={login} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <input
                    name="usuario"
                    type="text"
                    placeholder="Usuário"
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    required
                />

                <input
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    required
                />

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
                    Login
                </button>
            </form>
        </div>
    );
}
