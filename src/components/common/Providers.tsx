"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// Types
interface props {
  children: ReactNode;
}

const client = new QueryClient();
const Providers: FC<props> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
