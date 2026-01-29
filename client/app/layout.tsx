import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'FounderStack | Exclusive SaaS Deals',
  description: 'Exclusive SaaS deals for startups',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased bg-background text-foreground`}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16 min-h-screen flex flex-col">
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
