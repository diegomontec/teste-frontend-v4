import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google"; // Importação correta

const roboto = Roboto({
  weight: ["300", "500", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroTech - Monitoramento de Máquinas",
  description: "Aplicação Web que permite fazer o monitoramento de máquinas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
