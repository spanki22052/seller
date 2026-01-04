import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import { I18nextProvider } from "react-i18next";
import i18n from "@/shared/lib/i18n";
import App from "./app/App";
import "./app/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Use Russian locale since i18n default is "ru"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={ruRU}
          theme={{
            token: {
              colorPrimary: "#1890ff",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode>,
);

