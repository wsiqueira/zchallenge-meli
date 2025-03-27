import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ReactQueryProvider } from '@/utils';
import { Header, Footer, Breadcrumb } from '@/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Star Wars API - Meli Challenge 2025',
  description: 'We ve taken all the rich contextual stuff from the universe and formatted into something easier to consume with software. Then we went and stuck an API on the front so you can access it all!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-dvh ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <div className="grid grid-rows-[auto_auto_1fr_auto] gap-8 min-h-dvh">
            <Header />
            <Breadcrumb />
            {children}
            <Footer />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
