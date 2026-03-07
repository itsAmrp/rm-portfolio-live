import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roshan Mariadas | Portfolio",
  description: "A portfolio of art direction, visual storytelling, and modern image-making.",
  openGraph: {
    title: "Roshan Mariadas | Portfolio",
    description: "A portfolio of art direction, visual storytelling, and modern image-making.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roshan Mariadas | Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roshan Mariadas | Portfolio",
    description: "A portfolio of art direction, visual storytelling, and modern image-making.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide dark">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-500`}>
        <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-[0.03] dark:opacity-[0.05]"></div>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            <main className="flex-1 w-full">{children}</main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
