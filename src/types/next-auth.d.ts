import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: { id: string } & DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    id?: string;
  }
}

//this is for the extended types for the next-auth cause typescript cant understand the types of the seesion adn user
