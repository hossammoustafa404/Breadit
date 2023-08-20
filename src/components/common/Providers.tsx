"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// Types
interface props {
  children: ReactNode;
}

const client = new QueryClient();
const Providers: FC<props> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
