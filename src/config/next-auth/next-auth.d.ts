import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      fullname: string;
      avatar: string;
    };

    tokens: {
      token: string;
      type: string;
      expiration: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: number;
      email: string;
      fullname: string;
      avatar: string;
    };

    tokens: {
      token: string;
      type: string;
      expiration: number;
    };
  }
}
