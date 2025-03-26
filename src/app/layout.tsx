'use client';

import "./globals.css";
import { usePathname } from 'next/navigation';
import { Inter, Roboto } from "next/font/google";
import { NavBar } from "@/components/elements/Layout/NavBar";
import { Footer } from "@/components/elements/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-roboto',
});

// Routes that should not have NavBar and Footer
const excludeNavbarFooterRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const shouldExcludeNavbarFooter = excludeNavbarFooterRoutes.includes(pathname);
  
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className={inter.className}>
        {!shouldExcludeNavbarFooter && <NavBar />}
        <main className={!shouldExcludeNavbarFooter ? "pt-16" : ""}>
          {children}
        </main>
        {!shouldExcludeNavbarFooter && <Footer />}
      </body>
    </html>
  );
}