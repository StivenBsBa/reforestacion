import type { Metadata } from "next";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reforestación Comunitaria",
  description:
    "Plataforma para documentar y dar seguimiento a iniciativas comunitarias de reforestación.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
