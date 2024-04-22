import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./contexts/useGlobalContext";
import { ModalContextProvider } from "./contexts/useModalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "📝 Todo App",
  description: "A Todo App to manage your tasks. Made by Nicolás Arrastía",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <body className={inter.className}>
          <ModalContextProvider>{children}</ModalContextProvider>
        </body>
      </GlobalContextProvider>
    </html>
  );
}
