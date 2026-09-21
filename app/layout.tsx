import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Prism AI',
  description: 'Created by Rajat Yadav',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
