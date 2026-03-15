import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: 'Jamal Awil | Digital Garden',
    template: '%s | Jamal Awil',
  },
  description: 'A digital garden — essays, notes, and patterns growing over time.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jamalawil.com',
    siteName: 'Jamal Awil — Digital Garden',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lora.variable}>
      <body>
        <Header />
        <main style={{ minHeight: '80vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
