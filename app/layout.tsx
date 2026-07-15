import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font_Inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "openshare",
  description:
    "Share your photos, videos, & files through a secure link with OpenShare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${font_Inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
