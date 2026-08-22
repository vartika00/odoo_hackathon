import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-trip-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas: Your Local Guide to the World",
  description: "Plan your next trip, read authentic traveler reviews, compare hotel prices across 200+ booking sites, and discover the best things to do.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
