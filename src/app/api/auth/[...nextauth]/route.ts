import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


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
                    credentials.username === 'jonathan@admin' &&
                    credentials.senha === 'machado'
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

