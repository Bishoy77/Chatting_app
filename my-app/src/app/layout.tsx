import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export const Navbar = () => {
  return (
    <div className="" data-theme="abyss">
      <Link href="/auth/login">
        <button className="btn btn-primary">Primary</button>
      </Link>
    
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
    <Navbar/>
      <div>
        {children}
      </div>
      </body>
    </html>
  );
}
