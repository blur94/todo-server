import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    userName: string;
    id: string;
  }

  interface Session {
    user: User & {
      userName: string;
      id: string;
    };

    token: {
      userName: string;
      id: string;
    };
  }
}
