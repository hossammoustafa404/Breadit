import type { Session, User } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    username?: string;
  }

  interface Session {
    user?: User & {
      _id: string;
    };
  }
}
