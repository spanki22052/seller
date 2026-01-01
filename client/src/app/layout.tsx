import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import StyledComponentsRegistry from "@/shared/ui/StyledComponentsRegistry";
import MaterialIconsLoader from "@/shared/ui/MaterialIconsLoader";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";
import { I18nProvider } from "@/shared/lib/i18n/I18nProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHEATARENA - Gaming Cheats Platform",
  description: "Gaming cheats platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <MaterialIconsLoader />
        <StyledComponentsRegistry>
          <I18nProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </I18nProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
