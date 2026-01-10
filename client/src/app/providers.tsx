"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { ImageModalProvider } from "@/shared/contexts/ImageModalContext";
import { SidebarProvider } from "@/shared/contexts/SidebarContext";
import StyledComponentsRegistry from "./StyledComponentsRegistry";
import { DataPrefetcher } from "./DataPrefetcher";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <DataPrefetcher />
        <ThemeProvider>
          <ImageModalProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ImageModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}
