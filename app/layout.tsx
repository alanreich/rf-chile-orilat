import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RF Chile | ORILAT",
  description:
    "Consulta de información técnica y documentación de equipos de radiofrecuencia comercializados en Chile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
