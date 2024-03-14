"use client";
import { useEffect } from 'react';
import { useRouter as useNextRouter } from "next/navigation";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useNextRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/logo1.png" sizes="any" />
        <div id="root">{children}</div>

      </body>
    </html>
  );
}
