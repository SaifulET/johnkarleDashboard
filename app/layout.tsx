import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Karle Dashboard",
  description: "Dashboard built with Next.js, Tailwind CSS, and TypeScript.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
