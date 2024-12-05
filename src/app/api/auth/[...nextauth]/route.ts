// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// import dotenv from "dotenv";

// dotenv.config();

// const handler = NextAuth({
//   pages: {
//     signIn: "/admin", // Página de login
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Usuário", type: "text", placeholder: "admin" },
//         senha: { label: "Senha", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           return null;
//         }

//         // Verifique as credenciais no ambiente
//         if (
//           credentials.username === process.env.ADMIN_USERNAME &&
//           credentials.senha === process.env.ADMIN_PASSWORD
//         ) {
//           return {
//             id: "1",
//             name: "Admin",
//           };
//         }

//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session(session, user) {
//       if (user) {
//         session.user.id = user.id;
//         session.user.name = user.name;
//       }
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };
