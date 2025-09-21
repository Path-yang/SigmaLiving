import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SilverSigmaLogo } from "@/components/SilverSigmaLogo";
import Navigation from "@/components/Navigation";
import { I18nProvider } from "@/lib/i18n/context";
import { FontSizeProvider } from "@/lib/font-size/context";
import { FontSizeBody } from "@/components/FontSizeBody";

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
            <FontSizeBody>
              <div className="min-h-screen">
                <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                      <Link href="/" className="flex items-center space-x-4">
                        <SilverSigmaLogo 
                          width={64}
                          height={64}
                          className="w-16 h-16"
                        />
                        <h1 className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                          SilverSigma
                        </h1>
                      </Link>
                    </div>
                  </div>
                </header>
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
                  {children}
                </main>
                
                {/* Bottom Navigation - Mobile Only */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
                  <Navigation />
                </div>
              </div>
            </FontSizeBody>
          </FontSizeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
