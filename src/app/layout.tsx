import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import PublicChrome from "@/components/PublicChrome";
import { CartProvider } from "@/lib/cart";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Sillage Perfume | Luxury Fragrances",
  description: "Discover Sillage Perfume — an exquisite collection of luxury fragrances crafted for those who demand the extraordinary.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`} style={{ fontFamily: "var(--font-inter)" }} suppressHydrationWarning>
        <CartProvider>
          <PublicChrome>{children}</PublicChrome>
        </CartProvider>
      </body>
    </html>
  );
}
