import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { NavBar } from "@/components/elements/Layout/NavBar";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nusa Lapor",
  description: "Platform Pelaporan Terpadu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <NavBar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
