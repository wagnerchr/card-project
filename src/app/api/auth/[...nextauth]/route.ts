import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import dotenv from 'dotenv';

dotenv.config();

const handler = NextAuth({
    pages: {
        signIn: "/admin",
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "usuario", type: "text", placeholder: "admin"},
                senha: { label: "senha", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials) {
                    return null
                }

                if (
                    credentials.username === process.env.ADMIN_USERNAME &&
                    credentials.senha === process.env.ADMIN_PASSWORD
                ) {
                    return {
                        id: "1",
                        name: "Admin",
                    }
                }

                return null
            }
        })
    ],
   
})

export { handler as POST, handler as GET };

