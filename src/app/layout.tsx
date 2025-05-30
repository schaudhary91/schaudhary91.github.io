import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { TopProgressBar } from '@/components/TopProgressBar';


export const metadata: Metadata = {
  title: 'Sandeep Chaudhary - sandeepchaudhary.com | Personal Portfolio',
  description: 'A personal portfolio website showcasing skills, experience, and education. Built with Next.js and modern design principles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <TopProgressBar />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
