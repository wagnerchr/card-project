'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react';

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState("");

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = {
            username: formData.get('usuario'),
            senha: formData.get('senha')
        }
        const result = await signIn("credentials", {
            ...data,
            redirect: false, 
        });

        if (result?.error) {
            console.log(result)
            console.log(result.error)
            setErrorMessage("Credenciais inválidas");
        } else {
            window.location.href = "/";
        }
    }
    return (
        <form onSubmit={login}>
            <h2>

            </h2>
            <input
            name="usuario"
                type="text"
                placeholder="Usuário"
            />
            
            <input
            name="senha"
                type="password"
                placeholder="Senha"
            />

{errorMessage && (
                <p className="text-red-500">{errorMessage}</p>
            )}
            
            <button type="submit">Login</button>
        </form>
    )
}