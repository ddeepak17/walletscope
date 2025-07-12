import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WalletScope - Sei Wallet Analytics',
  description: 'Lightning-fast behavioural analytics for any Sei wallet',
  keywords: ['Sei', 'blockchain', 'analytics', 'wallet', 'crypto'],
  authors: [{ name: 'WalletScope Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-sei-50 to-blue-50">
          {children}
        </div>
      </body>
    </html>
  );
} 