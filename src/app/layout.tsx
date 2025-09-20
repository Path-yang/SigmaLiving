import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import Navigation from "@/components/Navigation";

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <Link href="/">
                  <h1 className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    SilverSigma
                  </h1>
                </Link>
                {/* Placeholder for Text Size Toggle */}
                <Button variant="outline" size="sm" className="text-xs">
                  <Mic className="w-4 h-4 mr-2" />
                  Text Size
                </Button>
              </div>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
            {children}
          </main>
          
          <footer className="bg-white border-t mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600">
                <p>© 2024 SilverSigma. Designed with love for seniors in Singapore.</p>
              </div>
            </div>
          </footer>
          
          {/* Bottom Navigation - Mobile Only */}
          <div className="fixed bottom-0 left-0 right-0 z-50 ">
            <Navigation />
          </div>
        </div>
      </body>
    </html>
  );
}
