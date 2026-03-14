import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { CustomCursor } from "@/components/CustomCursor";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-main",
  subsets: ["latin"],
});

const display = Outfit({
  variable: "--font-display-main",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rm-portfolio-live.vercel.app"),
  title: "Roshan Mariadas | Portfolio",
  description: "A portfolio of art direction, visual storytelling, and modern image-making.",
  openGraph: {
    title: "Roshan Mariadas | Portfolio",
    description: "A portfolio of art direction, visual storytelling, and modern image-making.",
    type: "website",
    images: [
      {
        url: "https://rm-portfolio-live.vercel.app/og-image.png",
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
    images: ["https://rm-portfolio-live.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide dark">
      <body className={`${sans.variable} ${display.variable} antialiased min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-500 overflow-x-hidden`}>
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
