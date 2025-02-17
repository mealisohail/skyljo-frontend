import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Skyljo',
  description: 'Skyljo Web',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
