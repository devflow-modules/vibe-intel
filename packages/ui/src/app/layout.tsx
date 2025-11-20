import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Intel Dashboard",
  description: "Painel operacional do agente Vibe Intel"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body className="min-h-screen bg-background text-text antialiased">
        {children}
      </body>
    </html>
  );
}

