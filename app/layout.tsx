import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Malki Mohamed | Full-Stack Developer",
  description: "Full-stack developer specializing in Laravel, React, PHP, and Node.js. Building scalable web applications and system designs.",
  keywords: ["full-stack developer", "laravel developer", "react developer", "php", "web development", "software engineer", "sql", "python"],
  authors: [{ name: "Malki Mohamed" }],
  openGraph: {
    title: "Malki Mohamed | Full-Stack Developer",
    description: "Junior full-stack developer seeking internship or junior position. Experience with Laravel, React, and MySQL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
          <Analytics />
      </body>
    </html>
  );
}
