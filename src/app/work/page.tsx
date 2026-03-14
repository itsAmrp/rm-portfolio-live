"use client";

import { useState, useEffect, useMemo, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, brandList } from "@/data/portfolio";
import { WorkCard } from "@/components/WorkCard";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";

function WorkGallery() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // URL States
    const urlBrand = searchParams.get("brand") || "All";
    const urlDiscipline = searchParams.get("discipline") || "All";
    const urlRegion = searchParams.get("region") || "All";
    const urlYear = searchParams.get("year") || "All";
    const urlSearch = searchParams.get("q") || "";
    const urlSort = searchParams.get("sort") || "Featured";

    // Component States
    const [search, setSearch] = useState(urlSearch);
    const [showFilters, setShowFilters] = useState(false);

    const updateUrl = useCallback((key: string, value: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        if (!value || value === "All" || value === "") {
            current.delete(key);
        } else {
            current.set(key, value);
        }
        const searchStr = current.toString();
        const query = searchStr ? `?${searchStr}` : "";
        router.replace(`${pathname}${query}`, { scroll: false });
    }, [searchParams, pathname, router]);

    // Sync search input with debounce to URL
    useEffect(() => {
        const timeout = setTimeout(() => {
            updateUrl("q", search);
        }, 500);
        return () => clearTimeout(timeout);
    }, [search, updateUrl]);

    // Extract unique filter options
    const disciplines = ["All", ...Array.from(new Set(projects.flatMap(p => p.disciplines)))];
    const regions = ["All", ...Array.from(new Set(projects.map(p => p.region)))];
    const years = ["All", ...Array.from(new Set(projects.map(p => p.year))).sort().reverse()];
    const brands = ["All", ...brandList];
    const sorts = ["Featured", "Newest", "A-Z"];

    // Filter and Sort Logic
    const filteredProjects = useMemo(() => {
        let result = [...projects];

        // Search
        if (urlSearch) {
            const q = urlSearch.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.disciplines.some(d => d.toLowerCase().includes(q)) ||
                p.shortDescription.toLowerCase().includes(q)
            );
        }

        // Filters
        if (urlBrand !== "All") result = result.filter(p => p.brand === urlBrand);
        if (urlDiscipline !== "All") result = result.filter(p => p.disciplines.includes(urlDiscipline));
        if (urlRegion !== "All") result = result.filter(p => p.region === urlRegion);
        if (urlYear !== "All") result = result.filter(p => p.year === urlYear);

        // Sort
        if (urlSort === "Newest") {
            result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        } else if (urlSort === "A-Z") {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } // Featured is just the default array order from data

        return result;
    }, [urlSearch, urlBrand, urlDiscipline, urlRegion, urlYear, urlSort]);

    return (
        <div className="container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight uppercase">
                        Archive
                    </h1>

                    {/* Search Bar */}
                    <div className="w-full md:w-auto flex items-center gap-4">
                        <div className="relative w-full md:w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-foreground/30 transition-colors"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-2 rounded-full border transition-colors ${showFilters ? 'bg-foreground text-background border-foreground' : 'border-foreground/20 hover:border-foreground/50'}`}
                        >
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </div>

                {/* Expanding Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-6 md:p-8 bg-foreground/5 border border-foreground/10 rounded-2xl mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                                {/* Brand Filter */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50 font-medium">Brand</label>
                                    <select
                                        value={urlBrand}
                                        onChange={(e) => updateUrl("brand", e.target.value)}
                                        className="bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-foreground cursor-pointer"
                                    >
                                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>

                                {/* Discipline Filter */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50 font-medium">Discipline</label>
                                    <select
                                        value={urlDiscipline}
                                        onChange={(e) => updateUrl("discipline", e.target.value)}
                                        className="bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-foreground cursor-pointer"
                                    >
                                        {disciplines.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>

                                {/* Region Filter */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50 font-medium">Region</label>
                                    <select
                                        value={urlRegion}
                                        onChange={(e) => updateUrl("region", e.target.value)}
                                        className="bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-foreground cursor-pointer"
                                    >
                                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>

                                {/* Year Filter */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50 font-medium">Year</label>
                                    <select
                                        value={urlYear}
                                        onChange={(e) => updateUrl("year", e.target.value)}
                                        className="bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-foreground cursor-pointer"
                                    >
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>

                                {/* Sort */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50 font-medium">Sort By</label>
                                    <select
                                        value={urlSort}
                                        onChange={(e) => updateUrl("sort", e.target.value)}
                                        className="bg-transparent border-b border-foreground/20 py-2 text-sm focus:outline-none focus:border-foreground cursor-pointer"
                                    >
                                        {sorts.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 ? (
                <div className="py-20 text-center text-foreground/50">
                    <p className="text-xl">No projects found matching your criteria.</p>
                    <button
                        onClick={() => {
                            setSearch("");
                            router.replace(pathname, { scroll: false });
                        }}
                        className="mt-4 border-b border-foreground/50 hover:text-foreground hover:border-foreground transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <WorkCard
                                key={project.slug}
                                project={project}
                                className={index % 2 !== 0 ? "md:mt-24" : ""}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}

export default function Work() {
    return (
        <div className="min-h-screen px-6 md:px-12 pt-32 pb-24">
            <Suspense fallback={<div className="container mx-auto py-20 text-center opacity-50">Loading archive...</div>}>
                <WorkGallery />
            </Suspense>
        </div>
    );
}
