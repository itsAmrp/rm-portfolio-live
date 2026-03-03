import { siteMeta, socialLinks, nav } from "@/data/portfolio";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-foreground text-background py-20 px-6 md:px-12 mt-32">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-16">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 leading-[1.1]">
                            Let&apos;s build something <br />
                            <span className="text-background/50 italic">bold.</span>
                        </h2>
                        <a
                            href={`mailto:${siteMeta.email}`}
                            className="inline-block font-sans text-xl md:text-3xl border-b border-background/30 hover:border-background transition-colors pb-2"
                        >
                            {siteMeta.email}
                        </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-12 lg:gap-24">
                        <div className="flex flex-col gap-4 text-sm tracking-widest uppercase text-background/70">
                            <span className="text-background/40 pb-2 border-b border-background/10">Social</span>
                            {socialLinks.map((link) => (
                                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-background transition-colors">{link.label}</a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 text-sm tracking-widest uppercase text-background/70">
                            <span className="text-background/40 pb-2 border-b border-background/10">Navigation</span>
                            {nav.map((link) => (
                                <Link key={link.label} href={link.href} className="hover:text-background transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-background/10 text-xs tracking-widest text-background/40 gap-4">
                    <p>&copy; {new Date().getFullYear()} TricoR Studios. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
