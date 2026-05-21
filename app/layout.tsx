import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Cricket Intelligence AI',
  description: 'AI-powered real-time cricket analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#050608] text-slate-100 antialiased selection:bg-blue-500/30 min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
