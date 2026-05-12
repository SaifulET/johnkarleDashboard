import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Karle Dashboard",
  description: "Dashboard built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
