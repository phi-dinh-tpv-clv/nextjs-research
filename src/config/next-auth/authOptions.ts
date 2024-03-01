import { LOGIN_USER } from "@/graphql/mutations/login";
import { mutationRequest } from "@/utils/common/mutationRequest";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res: any = await mutationRequest(LOGIN_USER, {
          email: credentials?.email,
          password: credentials?.password,
        });
        if (res) {
          return res.login;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, trigger, user, session }: any) => {
      if (user) {
        token.user = user.user;
        token.tokens = user.token;
      }
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      session.user = token.user;
      session.tokens = token.tokens;

      return session;
    },
  },
};
