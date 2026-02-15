import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "John Doe | Full-Stack Developer",
  description: "Full-stack developer specializing in React, Node.js, and cloud architecture. Building scalable web applications that drive business results.",
  keywords: ["full-stack developer", "react developer", "node.js", "web development", "software engineer"],
  authors: [{ name: "John Doe" }],
  openGraph: {
    title: "John Doe | Full-Stack Developer",
    description: "Building digital products that drive results. 5+ years of experience in web development.",
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
      </body>
    </html>
  );
}
