import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import { SilverSigmaLogo } from "@/components/SilverSigmaLogo";
import { I18nProvider } from "@/lib/i18n/context";
import { FontSizeProvider } from "@/lib/font-size/context";
import { ResponsiveContainer } from "@/components/responsive/ResponsiveContainer";
import { ResponsiveText } from "@/components/responsive/ResponsiveText";
import { LanguageSelector } from "@/components/settings/LanguageSelector";
import { FontSizeSelector } from "@/components/settings/FontSizeSelector";
import { MobileMenu } from "@/components/layout/MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SilverSigma - Senior Community App",
  description: "A simple, friendly app to chat with your AI companion, learn hobbies, and share moments with family and friends.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  initialScale: 1,
  width: "device-width",
};

function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
      <ResponsiveContainer maxWidth="7xl" padding="md">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link href="/" className="flex items-center space-x-2 md:space-x-4">
            <SilverSigmaLogo 
              width={48}
              height={48}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <ResponsiveText 
              as="h1" 
              size="xl" 
              weight="bold" 
              className="text-gray-900 hover:text-blue-600 transition-colors"
            >
              SilverSigma
            </ResponsiveText>
          </Link>
          
          {/* Desktop Settings */}
          <div className="hidden md:flex items-center gap-4">
            <FontSizeSelector />
            <LanguageSelector />
          </div>
          
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </ResponsiveContainer>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white/95 backdrop-blur-md border-t border-gray-200/50 mt-16">
      <ResponsiveContainer maxWidth="7xl" padding="md">
        <div className="py-6 md:py-8">
          <div className="text-center text-gray-600">
            <ResponsiveText size="sm">
              © 2024 SilverSigma. Designed with love for seniors in Singapore.
            </ResponsiveText>
          </div>
        </div>
      </ResponsiveContainer>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
        <I18nProvider>
          <FontSizeProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              
              <main className="flex-1">
                <ResponsiveContainer maxWidth="7xl" padding="md" className="py-6 md:py-12 pb-20">
                  {children}
                </ResponsiveContainer>
              </main>
              
              <Footer />
              
              {/* Bottom Navigation - Mobile Only */}
              <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg md:hidden">
                <Navigation />
              </div>
            </div>
          </FontSizeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
