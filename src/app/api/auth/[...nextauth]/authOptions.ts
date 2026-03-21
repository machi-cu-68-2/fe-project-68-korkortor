import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userLogIn } from "@/libs/userLogIn";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await userLogIn(credentials.email, credentials.password);
        if (!result) return null;

        return {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          tel: result.user.tel,
          role: result.user.role,
          token: result.token,
        } as any;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        (token as any).tel = (user as any).tel;
        (token as any).role = (user as any).role;
        (token as any).accessToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).tel = (token as any).tel;
        (session.user as any).role = (token as any).role;
        (session.user as any).accessToken = (token as any).accessToken;
      }
      return session;
    },
  },
};
