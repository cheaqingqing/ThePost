import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Posts — A Modern Journal",
  description: "Browse, create, and manage posts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}