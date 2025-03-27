"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { Inter, Roboto } from "next/font/google";
import { NavBar } from "@/components/elements/Layout/NavBar";
import { Footer } from "@/components/elements/Layout/Footer";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthInitializer } from "@/modules/auth/components/AuthInitializer";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

// Routes that should not have NavBar and Footer
const excludeNavbarFooterRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldExcludeNavbarFooter =
    excludeNavbarFooterRoutes.includes(pathname);

  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          <AuthInitializer />
          {!shouldExcludeNavbarFooter && <NavBar />}
          <main
            className={
              !shouldExcludeNavbarFooter
                ? "min-h-screen w-full pt-16"
                : "min-h-screen w-full"
            }
          >
            {children}
          </main>
          {!shouldExcludeNavbarFooter && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
