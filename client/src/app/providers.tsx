"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { ImageModalProvider } from "@/shared/contexts/ImageModalContext";
import StyledComponentsRegistry from "./StyledComponentsRegistry";

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
        <ThemeProvider>
          <ImageModalProvider>{children}</ImageModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}

