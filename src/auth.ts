import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }, //regisration email and password
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const response = await fetch(`${process.env.API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }), //request body - is the body of the request to the server which appllies  email and password from the user
        });

        if (!response.ok) return null;

        const data = await response.json();

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          accessToken: data.accessToken, //from next-auth.d.ts file
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      session.user.role = token.role as string;
      return session; //session is like form of login/registration
    },
  },
});
