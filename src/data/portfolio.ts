import mediaMapData from "./mediaMap.json";

export type MediaType = "image" | "video";

export interface MediaAsset {
    type: MediaType;
    url: string;
    videoMp4?: string;
    videoWebm?: string;
    poster?: string;
    alt: string;
}

const mediaMap: Record<string, string> = mediaMapData as Record<string, string>;

/**
 * Resolves a local media path to a secure Cloudinary URL if NEXT_PUBLIC_MEDIA_MODE === 'cloudinary'
 */
export function getMediaUrl(localPath?: string): string | undefined {
    if (!localPath) return undefined;

    const mode = process.env.NEXT_PUBLIC_MEDIA_MODE === "cloudinary" ? "cloudinary" : "local";

    if (mode === "cloudinary") {
        return mediaMap[localPath] || localPath; // fallback to local if missing in map
    }

    return localPath;
}

export interface Project {
    slug: string;
    brand: string;
    title: string;
    region: string;
    year: string;
    disciplines: string[];
    shortDescription: string;
    roleSummary: string;
    tools: string[];
    caseStudySections: {
        challenge: string;
        insight: string;
        idea: string;
        execution: string;
        outcome?: string; // Optional placeholder
    };
    deliverables: string[];
    coverImage?: string; // Optional explicit image thumbnail bypass
    heroMedia: MediaAsset;
    gallery?: MediaAsset[];
    credits?: string[];
}

export const siteMeta = {
    name: "Roshan Mariadas",
    role: "Art Director",
    location: "Colombo 04, Sri Lanka",
    phone: "+94 766 942 362",
    email: "Roshanpravin0@gmail.com",
    experienceYears: "7+",
    brandsCount: "35+",
    tagline: "Digital-first Art Director specializing in cinematic visuals and motion design.",
    availability: "Open for freelance and collaborations",
};

export const nav = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const socialLinks = [
    { label: "Behance", href: "https://www.behance.net/roshanmariadas" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/roshan-mariadas" },
];

export const brandList = [
    "Idemitsu MENA",
    "Dilmah Sri Lanka",
    "Mazda Motor Oil MENA",
    "Cinnamon",
    "Commercial Bank Sri Lanka",
    "Baby Cheramy",
    "Anchor Newdale",
    "Dialog",
    "Anchor Butter",
    "Brewery",
    "Anchor Stirred Yoghurt",
    "Mapei UAE",
    "2024 Portfolio",
    "Sprite",
    "Portfolio 2022",
    "Potted",
];

export const featuredOrder = [
    "portfolio-2022",
    "sprite",
    "portfolio-2024",
    "anchor-moments",
    "idemitsu-mena",
    "anchor-butter"
];

const mockGallery = (brand: string): MediaAsset[] => {
    return Array(6).fill(null).map((_, i) => ({
        type: i % 3 === 0 ? "video" : "image",
        url: `/placeholders/gallery-${i + 1}.jpg`,
        videoMp4: i % 3 === 0 ? `/placeholders/video-${i + 1}.mp4` : undefined,
        videoWebm: i % 3 === 0 ? `/placeholders/video-${i + 1}.webm` : undefined,
        alt: `${brand} visual ${i + 1}`,
    }));
};

/**
 * Robustly pulls the best thumbnail option available for any project
 * 1) Hero video poster / generated thumbnail from the video itself
 * 2) Cover image explicitly defined
 * 3) Local generic fallback
 */
export function getProjectThumbnail(project: Project): string {
    // 1
    if (project.heroMedia.type === "video") {
        if (project.heroMedia.poster) return getMediaUrl(project.heroMedia.poster) || project.heroMedia.poster;

        // Use the actual .mp4 to generate a high quality Cloudinary frame
        let videoUrl = getMediaUrl(project.heroMedia.videoMp4);
        if (videoUrl && (videoUrl.endsWith(".mp4") || videoUrl.endsWith(".webm"))) {
            if (videoUrl.includes('/upload/')) {
                videoUrl = videoUrl.replace('/upload/', '/upload/so_95p/');
            }
            return videoUrl.replace(/\.(mp4|webm)$/, ".jpg");
        }
    }

    // 2
    if (project.coverImage) return getMediaUrl(project.coverImage) || project.coverImage;
    if (project.heroMedia.type === "image") {
        return getMediaUrl(project.heroMedia.url) || project.heroMedia.url;
    }

    // 3
    return "/placeholders/gallery-1.jpg";
}

export const projects: Project[] = [
    {
        slug: "idemitsu-mena",
        brand: "Idemitsu MENA",
        title: "High-Performance Aesthetics for the Modern Road",
        region: "MENA",
        year: "2024",
        disciplines: ["Art Direction", "Motion Design", "Digital"],
        shortDescription: "A striking digital campaign blending 3D mechanics and fluid dynamics to elevate automotive lubricants.",
        roleSummary: "Lead Art Director",
        tools: ["Adobe Creative Suite", "Figma", "Motion Generation"],
        caseStudySections: {
            challenge: "Positioning Idemitsu as a premium, advanced choice in a saturated Middle Eastern market.",
            insight: "Consumers don't just buy oil; they buy the feeling of seamless, unstoppable performance.",
            idea: "Visualizing the 'Zenith of Performance' through infinite looping fluid mechanics.",
            execution: "Developed a comprehensive digital toolkit, combining generated fluid motion with meticulous typography.",
        },
        deliverables: ["Social Media KV", "AI Video Assets", "Digital Ad Units", "Brand Guidelines"],
        coverImage: "/media/idemitsu-mena/cover.jpg",
        heroMedia: {
            type: "video",
            url: "/media/idemitsu-mena/hero.jpg",
            videoMp4: "/media/idemitsu-mena/hero.mp4",
            alt: "Idemitsu MENA Hero",
        },
        gallery: [
            { type: "image", url: "/media/idemitsu-mena/01.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/02.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/03.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/04.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/05.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/06.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/07.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/08.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/09.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/10.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/11.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/12.jpg", alt: "idemitsu-mena gallery image" },
            { type: "image", url: "/media/idemitsu-mena/13.jpg", alt: "idemitsu-mena gallery image" }
        ],
    },
    {
        slug: "dilmah-sri-lanka",
        brand: "Dilmah Sri Lanka",
        title: "Steeping Tradition in a Digital World",
        region: "Sri Lanka",
        year: "2025",
        disciplines: ["Art Direction", "Social", "Branding"],
        shortDescription: "Translating the heritage of Ceylon tea into a vibrant digital experience.",
        roleSummary: "Art Director",
        tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe After Effects"],
        caseStudySections: {
            challenge: "Making a classic heritage tea brand appeal to a younger demographic without alienating core consumers.",
            insight: "Young consumers value authenticity and the aesthetics of the brewing ritual.",
            idea: "'The Modern Brew', a visual series focusing on macro textures, dynamic lighting, and tea mixology.",
            execution: "Launched a social-first campaign utilizing macro videography and vibrant color palettes.",
        },
        deliverables: ["Social First Video", "Instagram Grid Overhaul", "Digital Display Ads"],
        heroMedia: {
            type: "video",
            url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772741168/rm-portfolio-live/dilmah-sri-lanka/hero.jpg",
            videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772741168/rm-portfolio-live/dilmah-sri-lanka/hero.mp4",
            alt: "dilmah-sri-lanka Hero",
        },
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640564/rm-portfolio-live/dilmah-sri-lanka/01.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640563/rm-portfolio-live/dilmah-sri-lanka/02.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640562/rm-portfolio-live/dilmah-sri-lanka/03.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640560/rm-portfolio-live/dilmah-sri-lanka/04.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640559/rm-portfolio-live/dilmah-sri-lanka/05.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640555/rm-portfolio-live/dilmah-sri-lanka/06.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640551/rm-portfolio-live/dilmah-sri-lanka/07.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640550/rm-portfolio-live/dilmah-sri-lanka/08.jpg", alt: "dilmah-sri-lanka gallery image" }
        ],
    },
    {
        slug: "mazda-motor-oil-mena",
        brand: "Mazda Motor Oil MENA",
        title: "Precision in Every Drop",
        region: "MENA",
        year: "2025",
        disciplines: ["Art Direction", "Digital", "Production"],
        shortDescription: "A sleek, technology-focused visual identity for Mazda's genuine oil range.",
        roleSummary: "Lead Art Director",
        tools: ["Adobe Creative Suite", "Cinema 4D", "Figma"],
        caseStudySections: {
            challenge: "Creating a differentiated visual language for an OEM oil brand that stands out from competitors.",
            insight: "Mazda drivers are deeply invested in the engineering purity of their vehicles.",
            idea: "Treating the oil as a precision component, using lab-like lighting and exact reflections.",
            execution: "Produced macro visuals of metallic engine surfaces interacting with perfect oil droplets.",
        },
        deliverables: ["Key Visuals", "Social Content System", "POS Display Designs"],
        heroMedia: {
            type: "image",
            url: "/media/mazda-motor-oil-mena/cover.jpg",
            alt: "Mazda Motor Oil MENA Hero",
        },
        gallery: [
            { type: "image", url: "/media/mazda-motor-oil-mena/01.jpg", alt: "mazda-motor-oil-mena gallery image" },
            { type: "image", url: "/media/mazda-motor-oil-mena/02.jpg", alt: "mazda-motor-oil-mena gallery image" },
            { type: "image", url: "/media/mazda-motor-oil-mena/03.jpg", alt: "mazda-motor-oil-mena gallery image" },
            { type: "image", url: "/media/mazda-motor-oil-mena/04.jpg", alt: "mazda-motor-oil-mena gallery image" }
        ],
    },
    {
        slug: "cinnamon",
        brand: "Cinnamon",
        title: "The Essence of Tropical Luxury",
        region: "Sri Lanka",
        year: "2024",
        disciplines: ["Art Direction", "Social", "Digital"],
        shortDescription: "Elevating the digital presence of Sri Lanka's leading hospitality brand through immersive storytelling.",
        roleSummary: "Art Director",
        tools: ["Adobe Creative Suite", "Photography Direction", "Figma"],
        caseStudySections: {
            challenge: "Capturing the tactile luxury and diverse experiences of Cinnamon hotels through a unified lens.",
            insight: "Travelers seek sensory previews of their stays, such as the sound of waves or the texture of linens.",
            idea: "'Moments in Cinnamon', a campaign focused on hyper-sensory, short-form vignettes.",
            execution: "Directed mood-driven shoots and translated them into a cohesive digital ecosystem with bespoke typography.",
        },
        deliverables: ["Campaign Strategy", "Social Media Playbook", "Video Vignettes", "Digital Ad Banners"],
        coverImage: "/media/cinnamon/cover.jpg",
        heroMedia: {
            type: "video",
            url: "/media/cinnamon/hero.jpg",
            videoMp4: "/media/cinnamon/hero.mp4",
            alt: "Cinnamon Hero",
        },
        gallery: [
            { type: "image", url: "/media/cinnamon/01.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/02.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/03.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/04.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/05.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/06.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/07.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/08.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/09.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/10.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/11.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/12.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/13.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/14.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/15.jpg", alt: "cinnamon gallery image" },
            { type: "image", url: "/media/cinnamon/16.jpg", alt: "cinnamon gallery image" }
        ],
    },
    {
        slug: "commercial-bank-sri-lanka",
        brand: "Commercial Bank Sri Lanka",
        title: "Banking on the Future",
        region: "Sri Lanka",
        year: "2024",
        disciplines: ["Art Direction", "Social", "Brand Systems"],
        shortDescription: "Modernizing the visual communication of Sri Lanka's largest private bank.",
        roleSummary: "Lead Designer",
        tools: ["Adobe Creative Suite", "Figma", "After Effects"],
        caseStudySections: {
            challenge: "Making legacy banking products appealing to a tech-savvy generation.",
            insight: "Financial freedom is the core desire; the bank is merely the enabler.",
            idea: "A lifestyle-first visual approach, prioritizing human aspirations over numbers and charts.",
            execution: "Redesigned the social grid with localized lifestyle photography and a clear typographic hierarchy.",
        },
        deliverables: ["Social Media Guidelines", "Product Launch KV", "Explainer Videos"],
        heroMedia: {
            type: "image",
            url: "/media/commercial-bank-sri-lanka/cover.jpg",
            alt: "Commercial Bank Sri Lanka Hero",
        },
        gallery: [
            { type: "image", url: "/media/commercial-bank-sri-lanka/01.jpg", alt: "commercial-bank-sri-lanka gallery image" },
            { type: "image", url: "/media/commercial-bank-sri-lanka/02.jpg", alt: "commercial-bank-sri-lanka gallery image" }
        ],
    },
    {
        slug: "baby-cheramy",
        brand: "Baby Cheramy",
        title: "Generations of Care",
        region: "Sri Lanka",
        year: "2025",
        disciplines: ["Digital", "Art Direction", "Illustration"],
        shortDescription: "A gentle, trust-building digital campaign for Sri Lanka's most loved baby care brand.",
        roleSummary: "Art Director",
        tools: ["Adobe Creative Suite", "Figma", "Illustration"],
        caseStudySections: {
            challenge: "Maintaining a heritage of absolute trust while adopting modern digital engagement.",
            insight: "New mothers seek community and reassurance, not just product features.",
            idea: "Visualizing the 'Circle of Care' through soft, organic shapes and authentic moments of motherhood.",
            execution: "Developed a pastel, illustration-heavy digital system that felt warm, safe, and distinctively Cheramy.",
        },
        deliverables: ["Activation Branding", "Social Campaign", "Digital Illustrations"],
        heroMedia: {
            type: "image",
            url: "/media/baby-cheramy/cover.jpg",
            alt: "Baby Cheramy Hero",
        },
        gallery: [
            { type: "image", url: "/media/baby-cheramy/01.jpg", alt: "baby-cheramy gallery image" },
            { type: "image", url: "/media/baby-cheramy/02.jpg", alt: "baby-cheramy gallery image" },
            { type: "image", url: "/media/baby-cheramy/03.jpg", alt: "baby-cheramy gallery image" },
            { type: "image", url: "/media/baby-cheramy/04.jpg", alt: "baby-cheramy gallery image" },
            { type: "video", url: "/media/baby-cheramy/05.jpg", alt: "baby-cheramy gallery video", videoMp4: "/media/baby-cheramy/05.mp4" }
        ],
    },
    {
        slug: "anchor-newdale",
        brand: "Anchor Newdale",
        title: "Fueling the Next Generation",
        region: "Sri Lanka",
        year: "2024",
        disciplines: ["Art Direction", "Social", "Branding"],
        shortDescription: "Energetic and vibrant visual storytelling to relaunch a core dairy product.",
        roleSummary: "Art Director",
        tools: ["Adobe Photoshop", "Adobe Illustrator"],
        caseStudySections: {
            challenge: "Reinvigorating a classic dairy brand to capture the attention of energetic kids and health-conscious parents.",
            insight: "Nutrition should feel like an adventure, not a chore.",
            idea: "A stylized, comic-book inspired visual direction for all digital communications.",
            execution: "Crafted dynamic key visuals featuring action-oriented photography integrated with bold graphic elements.",
        },
        deliverables: ["Key Visuals", "Social Content", "BTL Materials"],
        heroMedia: {
            type: "image",
            url: "/media/anchor-newdale/cover.jpg",
            alt: "Anchor Newdale Hero",
        },
        gallery: [
            { type: "image", url: "/media/anchor-newdale/01.jpg", alt: "anchor-newdale gallery image" },
            { type: "image", url: "/media/anchor-newdale/02.jpg", alt: "anchor-newdale gallery image" }
        ],
    },
    {
        slug: "potted",
        brand: "Potted",
        title: "Modern Nature",
        region: "Global",
        year: "2025",
        disciplines: ["Art Direction", "Branding", "Design"],
        shortDescription: "A comprehensive branding and visual identity project.",
        roleSummary: "Art Director",
        tools: ["Adobe Illustrator", "Photoshop", "InDesign"],
        caseStudySections: {
            challenge: "Creating a standout visual identity in a crowded market.",
            insight: "Nature-inspired designs resonate deeply when kept clean and modern.",
            idea: "An earthy typographic approach paired with vibrant imagery.",
            execution: "Developed full brand guidelines, logo updates, and packaging mockups.",
        },
        deliverables: ["Brand Identity", "Logo Design", "Packaging"],
        heroMedia: {
            type: "image",
            url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737802/rm-portfolio-live/potted/hero.jpg",
            alt: "potted Hero",
        },
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737756/rm-portfolio-live/potted/potted%20branding_page_02.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737758/rm-portfolio-live/potted/potted%20branding_page_03.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737759/rm-portfolio-live/potted/potted%20branding_page_04.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737761/rm-portfolio-live/potted/potted%20branding_page_05.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737762/rm-portfolio-live/potted/potted%20branding_page_06.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737764/rm-portfolio-live/potted/potted%20branding_page_07.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737768/rm-portfolio-live/potted/potted%20branding_page_08.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737770/rm-portfolio-live/potted/potted%20branding_page_09.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737771/rm-portfolio-live/potted/potted%20branding_page_10.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737772/rm-portfolio-live/potted/potted%20branding_page_11.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737773/rm-portfolio-live/potted/potted%20branding_page_12.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737774/rm-portfolio-live/potted/potted%20branding_page_13.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737776/rm-portfolio-live/potted/potted%20branding_page_14.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737777/rm-portfolio-live/potted/potted%20branding_page_15.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737778/rm-portfolio-live/potted/potted%20branding_page_16.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737780/rm-portfolio-live/potted/potted%20branding_page_17.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737781/rm-portfolio-live/potted/potted%20branding_page_18.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737782/rm-portfolio-live/potted/potted%20branding_page_19.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737785/rm-portfolio-live/potted/potted%20branding_page_20.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737786/rm-portfolio-live/potted/potted%20branding_page_21.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737788/rm-portfolio-live/potted/potted%20branding_page_22.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737789/rm-portfolio-live/potted/potted%20branding_page_23.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737790/rm-portfolio-live/potted/potted%20branding_page_24.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737792/rm-portfolio-live/potted/potted%20branding_page_25.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737793/rm-portfolio-live/potted/potted%20branding_page_26.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737794/rm-portfolio-live/potted/potted%20branding_page_27.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737796/rm-portfolio-live/potted/potted%20branding_page_28.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737800/rm-portfolio-live/potted/potted%20branding_page_29.jpg", alt: "potted gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772737801/rm-portfolio-live/potted/potted%20branding_page_30.jpg", alt: "potted gallery image" }
        ],
    },
    {
        slug: "dialog",
        brand: "Dialog",
        title: "Connecting the Nation",
        region: "Sri Lanka",
        year: "2026",
        disciplines: ["Digital", "Motion Design", "Art Direction"],
        shortDescription: "A high-speed, futuristic digital presence for Sri Lanka's premier telecommunications provider.",
        roleSummary: "Lead Art Director",
        tools: ["Adobe After Effects", "Figma", "Motion Generation"],
        caseStudySections: {
            challenge: "Visualizing the intangible speed and possibilities of a widespread 5G network.",
            insight: "5G isn't just about faster downloads; it's about a fully integrated, hyper-connected future.",
            idea: "A sleek, cyberpunk-adjacent visual world where data flows like light.",
            execution: "Generated complex data-flow animations heavily post-processed to match the brand's red and white identity.",
        },
        deliverables: ["AI Video Assets", "Campaign Website Design", "Social Takeover"],
        heroMedia: {
            type: "image",
            url: "/media/dialog/cover.jpg",
            alt: "Dialog Hero",
        },
        gallery: [
            { type: "image", url: "/media/dialog/01.jpg", alt: "dialog gallery image" },
            { type: "image", url: "/media/dialog/02.jpg", alt: "dialog gallery image" },
            { type: "image", url: "/media/dialog/03.jpg", alt: "dialog gallery image" }
        ],
    },
    {
        slug: "portfolio-2024",
        brand: "2024 Portfolio",
        title: "The 2024 Archive",
        region: "Global",
        year: "2024",
        disciplines: ["Art Direction", "Web Design", "Digital"],
        shortDescription: "A culmination of experiments in motion and digital-first art direction.",
        roleSummary: "Creator, Director & Designer.",
        tools: ["Figma", "Next.js", "After Effects", "Motion Synthesis"],
        caseStudySections: {
            challenge: "Creating a personalized digital footprint that showcases both traditional rigour and experimental prowess.",
            insight: "A portfolio should be a living product, not a static PDF.",
            idea: "A minimalist digital environment where the work provides the color and momentum.",
            execution: "Designed a comprehensive web experience prioritizing fluid motion, custom cursors, and visual immediacy.",
        },
        deliverables: ["Website Design", "UX/UI", "AI Video Showreel"],
        heroMedia: {
            type: "image",
            url: "/media/portfolio-2024/cover.jpg",
            alt: "2024 Portfolio Hero",
        },
        gallery: [
            { type: "image", url: "/media/portfolio-2024/01.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/02.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/03.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/04.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/05.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/06.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/07.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/08.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/09.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/10.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/11.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/12.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/13.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/14.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/15.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/16.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/17.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/18.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/19.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/20.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/21.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/22.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/23.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/24.jpg", alt: "portfolio-2024 gallery image" },
            { type: "image", url: "/media/portfolio-2024/25.jpg", alt: "portfolio-2024 gallery image" }
        ],
    },
    {
        slug: "anchor-butter",
        brand: "Anchor Butter",
        title: "The Golden Standard",
        region: "Sri Lanka",
        year: "2026",
        disciplines: ["Art Direction", "Social", "KV"],
        shortDescription: "A rich and vibrant digital campaign celebrating the premium quality of Anchor Butter.",
        roleSummary: "Art Director",
        tools: ["Adobe Photoshop", "Adobe Illustrator"],
        caseStudySections: {
            challenge: "Showcasing the premium nature of the product while maintaining daily approachability.",
            insight: "Consumers associate the color gold and rich textures with indulgent quality.",
            idea: "Warm, golden-hour styling intersecting with macro food photography.",
            execution: "Developed a series of appetizing key visuals and bespoke social adaptations.",
        },
        deliverables: ["Key Visuals", "Social Content"],
        heroMedia: {
            type: "video",
            url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733662/rm-portfolio-live/anchor-butter/hero.jpg",
            videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733662/rm-portfolio-live/anchor-butter/hero.mp4",
            alt: "anchor-butter Hero",
        },
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640721/rm-portfolio-live/anchor-butter/01.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772733654/rm-portfolio-live/anchor-butter/1v.png", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640719/rm-portfolio-live/anchor-butter/02.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772733655/rm-portfolio-live/anchor-butter/2v.png", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640718/rm-portfolio-live/anchor-butter/03.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772733656/rm-portfolio-live/anchor-butter/3.png", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640714/rm-portfolio-live/anchor-butter/04.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640713/rm-portfolio-live/anchor-butter/05.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640706/rm-portfolio-live/anchor-butter/06.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640703/rm-portfolio-live/anchor-butter/07.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640702/rm-portfolio-live/anchor-butter/08.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640701/rm-portfolio-live/anchor-butter/09.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640700/rm-portfolio-live/anchor-butter/10.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640698/rm-portfolio-live/anchor-butter/11.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640697/rm-portfolio-live/anchor-butter/12.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640696/rm-portfolio-live/anchor-butter/13.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640694/rm-portfolio-live/anchor-butter/14.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640692/rm-portfolio-live/anchor-butter/15.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640691/rm-portfolio-live/anchor-butter/16.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640690/rm-portfolio-live/anchor-butter/17.jpg", alt: "anchor-butter gallery image" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640688/rm-portfolio-live/anchor-butter/18.jpg", alt: "anchor-butter gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640688/rm-portfolio-live/anchor-butter/18.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640683/rm-portfolio-live/anchor-butter/19.jpg", alt: "anchor-butter gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640683/rm-portfolio-live/anchor-butter/19.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733659/rm-portfolio-live/anchor-butter/butter%20chicken.jpg", alt: "anchor-butter gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733659/rm-portfolio-live/anchor-butter/butter%20chicken.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733667/rm-portfolio-live/anchor-butter/swirl.jpg", alt: "anchor-butter gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733667/rm-portfolio-live/anchor-butter/swirl.mp4" }
        ],
    },
    {
        slug: "anchor-moments",
        brand: "Anchor Moments",
        title: "Celebrating Everyday Connections",
        region: "Sri Lanka",
        year: "2025",
        disciplines: ["Digital", "Social", "Art Direction"],
        shortDescription: "A lifestyle-centric campaign focusing on the moments shared over Anchor products.",
        roleSummary: "Art Director",
        tools: ["Adobe Creative Suite", "Photography Direction"],
        caseStudySections: {
            challenge: "Moving beyond functional value to authentic emotional connection.",
            insight: "Dairy forms the background of shared, intimate family moments.",
            idea: "Candid, warm lifestyle photography integrated into a clean digital layout.",
            execution: "Directed a localized lifestyle shoot and rolled out a cohesive social framework.",
        },
        deliverables: ["Social Media Playbook", "Lifestyle Photography"],
        heroMedia: {
            type: "video",
            url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733678/rm-portfolio-live/anchor-moments/hero.jpg",
            videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733678/rm-portfolio-live/anchor-moments/hero.mp4",
            alt: "anchor-moments Hero",
        },
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640845/rm-portfolio-live/anchor-moments/01.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640843/rm-portfolio-live/anchor-moments/02.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640842/rm-portfolio-live/anchor-moments/03.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640841/rm-portfolio-live/anchor-moments/04.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640840/rm-portfolio-live/anchor-moments/05.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640838/rm-portfolio-live/anchor-moments/06.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640837/rm-portfolio-live/anchor-moments/07.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640836/rm-portfolio-live/anchor-moments/08.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640835/rm-portfolio-live/anchor-moments/09.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640834/rm-portfolio-live/anchor-moments/10.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640833/rm-portfolio-live/anchor-moments/11.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640832/rm-portfolio-live/anchor-moments/12.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640830/rm-portfolio-live/anchor-moments/13.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640829/rm-portfolio-live/anchor-moments/14.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640828/rm-portfolio-live/anchor-moments/15.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640827/rm-portfolio-live/anchor-moments/16.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640825/rm-portfolio-live/anchor-moments/17.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640824/rm-portfolio-live/anchor-moments/18.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640822/rm-portfolio-live/anchor-moments/19.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640821/rm-portfolio-live/anchor-moments/20.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640819/rm-portfolio-live/anchor-moments/21.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640817/rm-portfolio-live/anchor-moments/22.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640816/rm-portfolio-live/anchor-moments/23.jpg", alt: "anchor-moments gallery image" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640814/rm-portfolio-live/anchor-moments/24.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640814/rm-portfolio-live/anchor-moments/24.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640810/rm-portfolio-live/anchor-moments/25.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640810/rm-portfolio-live/anchor-moments/25.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640804/rm-portfolio-live/anchor-moments/26.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640804/rm-portfolio-live/anchor-moments/26.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640797/rm-portfolio-live/anchor-moments/27.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640797/rm-portfolio-live/anchor-moments/27.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640790/rm-portfolio-live/anchor-moments/28.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640790/rm-portfolio-live/anchor-moments/28.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640784/rm-portfolio-live/anchor-moments/29.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640784/rm-portfolio-live/anchor-moments/29.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640778/rm-portfolio-live/anchor-moments/30.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640778/rm-portfolio-live/anchor-moments/30.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640771/rm-portfolio-live/anchor-moments/31.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640771/rm-portfolio-live/anchor-moments/31.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640764/rm-portfolio-live/anchor-moments/32.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640764/rm-portfolio-live/anchor-moments/32.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640755/rm-portfolio-live/anchor-moments/33.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640755/rm-portfolio-live/anchor-moments/33.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640741/rm-portfolio-live/anchor-moments/34.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640741/rm-portfolio-live/anchor-moments/34.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640734/rm-portfolio-live/anchor-moments/35.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640734/rm-portfolio-live/anchor-moments/35.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733674/rm-portfolio-live/anchor-moments/hc%20making%20revised%202.jpg", alt: "anchor-moments gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733674/rm-portfolio-live/anchor-moments/hc%20making%20revised%202.mp4" }
        ],
    },
    {
        slug: "brewery",
        brand: "Brewery",
        title: "Crafting the Perfect Draft",
        region: "Global",
        year: "2026",
        disciplines: ["Art Direction", "Digital", "Branding"],
        shortDescription: "A sophisticated visual identity and digital presence for a premium craft brewery.",
        roleSummary: "Lead Art Director",
        tools: ["Adobe Illustrator", "Figma", "Cinema 4D"],
        caseStudySections: {
            challenge: "Standing out in a crowded, visually noisy craft beer market.",
            insight: "Craft beer enthusiasts appreciate the intersection of science and art in brewing.",
            idea: "A visual language balancing industrial elements with refined, elegant typography.",
            execution: "Created a comprehensive branding system and translated it into a sleek digital experience.",
        },
        deliverables: ["Brand Identity", "Website Design", "Packaging Concepts"],
        heroMedia: {
            type: "video",
            url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733606/rm-portfolio-live/brewery/hero.jpg",
            videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733606/rm-portfolio-live/brewery/hero.mp4",
            alt: "brewery Hero",
        },
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640633/rm-portfolio-live/brewery/01.jpg", alt: "brewery gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772733594/rm-portfolio-live/brewery/1.png", alt: "brewery gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640631/rm-portfolio-live/brewery/02.jpg", alt: "brewery gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772640630/rm-portfolio-live/brewery/03.jpg", alt: "brewery gallery image" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733599/rm-portfolio-live/brewery/3.jpg", alt: "brewery gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733599/rm-portfolio-live/brewery/3.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640628/rm-portfolio-live/brewery/4.jpg", alt: "brewery gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640628/rm-portfolio-live/brewery/4.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733603/rm-portfolio-live/brewery/4%20copy.jpg", alt: "brewery gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772733603/rm-portfolio-live/brewery/4%20copy.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640623/rm-portfolio-live/brewery/5.jpg", alt: "brewery gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640623/rm-portfolio-live/brewery/5.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640617/rm-portfolio-live/brewery/6.jpg", alt: "brewery gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640617/rm-portfolio-live/brewery/6.mp4" },
            { type: "video", url: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640602/rm-portfolio-live/brewery/7.jpg", alt: "brewery gallery video", videoMp4: "https://res.cloudinary.com/ddxa0ahzp/video/upload/v1772640602/rm-portfolio-live/brewery/7.mp4" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772733608/rm-portfolio-live/brewery/st%20p.png", alt: "brewery gallery image" }
        ],
    },
    {
        slug: "anchor-stirred-yoghurt",
        brand: "Anchor Stirred Yoghurt",
        title: "The Joy of Smoothness",
        region: "Sri Lanka",
        year: "2026",
        disciplines: ["Art Direction", "Social", "KV"],
        shortDescription: "A playful, vibrant campaign highlighting the smooth texture of Anchor Stirred Yoghurt.",
        roleSummary: "Art Director",
        tools: ["Adobe Photoshop", "After Effects"],
        caseStudySections: {
            challenge: "Communicating a unique tactile texture entirely through digital media.",
            insight: "Visualizing texture is the primary driver of digital appetite appeal.",
            idea: "Using fluid, uninterrupted motion and swirling graphics to mimic the product experience.",
            execution: "Developed animated social posts and vibrant, highly saturated key visuals.",
        },
        deliverables: ["Animated Social Posts", "Key Visuals"],
        heroMedia: {
            type: "video",
            url: "/media/anchor-stirred-yoghurt/cover.jpg",
            videoMp4: "/media/anchor-stirred-yoghurt/1.mp4",
            alt: "Anchor Stirred Yoghurt Hero",
        },
        gallery: [
            { type: "video", url: "/media/anchor-stirred-yoghurt/1.jpg", alt: "anchor-stirred-yoghurt gallery video", videoMp4: "/media/anchor-stirred-yoghurt/1.mp4" },
            { type: "video", url: "/media/anchor-stirred-yoghurt/2.jpg", alt: "anchor-stirred-yoghurt gallery video", videoMp4: "/media/anchor-stirred-yoghurt/2.mp4" }
        ],
    },
    {
        slug: "mapei-uae",
        brand: "Mapei UAE",
        title: "Building the Future",
        region: "MENA",
        year: "2023",
        disciplines: ["B2B", "Digital", "Art Direction"],
        shortDescription: "A robust and professional digital presence for a global leader in construction products.",
        roleSummary: "Art Director",
        tools: ["Figma", "Adobe Creative Suite"],
        caseStudySections: {
            challenge: "Making B2B construction materials visually engaging.",
            insight: "Architects and builders value precision, reliability, and scale.",
            idea: "A structured, geometric visual approach highlighting monumental projects.",
            execution: "Redesigned digital touchpoints with a clear, authoritative aesthetic and impactful project photography.",
        },
        deliverables: ["B2B Digital Materials", "Project Showcase Design"],
        heroMedia: {
            type: "image",
            url: "/media/mapei-uae/cover.jpg",
            alt: "Mapei UAE Hero",
        },
        gallery: [
            { type: "image", url: "/media/mapei-uae/01.jpg", alt: "mapei-uae gallery image" },
            { type: "image", url: "/media/mapei-uae/02.jpg", alt: "mapei-uae gallery image" }
        ],
    },
    {
        slug: "sprite",
        brand: "Sprite",
        title: "Stay Refreshingly Bold",
        region: "Global",
        year: "2022",
        disciplines: ["Art Direction", "CGI", "Digital"],
        shortDescription: "A high-energy, hyper-refreshing digital campaign celebrating the bold taste of Sprite.",
        roleSummary: "Lead Art Director",
        tools: ["Cinema 4D", "Redshift", "After Effects"],
        caseStudySections: {
            challenge: "Creating impossibly refreshing visuals that feel completely authentic.",
            insight: "Refreshment is a visual sensation triggered by ice, condensation, and dynamic energy.",
            idea: "A 'Hyper-Chilled' visual direction pairing stark studio lighting with intense fluid dynamics.",
            execution: "Developed a comprehensive visual system featuring macro CGI renders and high-speed motion.",
        },
        deliverables: ["CGI Key Visuals", "Social Media Toolkit", "Digital Video Ads"],
        heroMedia: {
            type: "video",
            url: "/media/sprite/hero.jpg",
            videoMp4: "/media/sprite/hero.mp4",
            alt: "Sprite Hero Video",
        },

        gallery: [
            { type: "image", url: "/media/sprite/1.png", alt: "Sprite gallery image 1" },
            { type: "image", url: "/media/sprite/2.png", alt: "Sprite gallery image 2" },
            { type: "image", url: "/media/sprite/eid ul adha 04.png", alt: "Sprite gallery image 3" },
            { type: "image", url: "/media/sprite/eid ul adha-02.png", alt: "Sprite gallery image 4" },
            { type: "image", url: "/media/sprite/eid ul adha-03.png", alt: "Sprite gallery image 5" },
            { type: "image", url: "/media/sprite/eid ul adha-1.png", alt: "Sprite gallery image 6" },
            { type: "image", url: "/media/sprite/eid ul adha-final wish.png", alt: "Sprite gallery image 7" },
            { type: "image", url: "/media/sprite/eid ul adha03.png", alt: "Sprite gallery image 8" },
            { type: "image", url: "/media/sprite/rmdn -03.png", alt: "Sprite gallery image 9" },
            { type: "image", url: "/media/sprite/rmdn-01.png", alt: "Sprite gallery image 10" },
            { type: "image", url: "/media/sprite/rmdn-02.png", alt: "Sprite gallery image 11" },
            { type: "image", url: "/media/sprite/mother's day-01.png", alt: "Sprite gallery image 12" },
            { type: "image", url: "/media/sprite/mother's day-02.png", alt: "Sprite gallery image 13" },
            { type: "image", url: "/media/sprite/mother's day-03.png", alt: "Sprite gallery image 14" }
        ],
    },
    {
        slug: "portfolio-2022",
        brand: "Portfolio 2022",
        title: "Creative Archive 2022",
        region: "Global",
        year: "2022",
        disciplines: ["Art Direction", "Digital", "CGI", "Design"],
        shortDescription: "A comprehensive showcase of art direction and design projects from 2022.",
        roleSummary: "Art Director",
        tools: ["Adobe Creative Cloud", "Cinema 4D"],
        caseStudySections: {
            challenge: "Showcasing a diverse range of high-impact visual design projects.",
            insight: "A portfolio needs to be visually striking and easy to navigate.",
            idea: "A bold, image-first presentation highlighting the best work from the year.",
            execution: "Curated and designed an immersive visual narrative for each project.",
        },
        deliverables: ["Key Visuals", "Digital Campaigns", "Branding"],
        heroMedia: {
            type: "image",
            url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736708/rm-portfolio-live/portfolio-2022/hero.jpg",
            alt: "portfolio-2022 Hero",
        },
        gallery: [
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736709/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_03.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736710/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_04.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736711/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_05.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736712/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_06.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736713/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_07.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736714/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_08.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736716/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_09.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736717/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_10.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736720/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_11.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736722/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_12.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736723/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_13.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736725/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_14.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736727/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_15.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736728/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_16.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736729/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_17.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736731/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_18.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736732/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_19.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736733/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_20.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736734/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_21.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736736/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_22.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736737/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_23.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736738/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_24.jpg", alt: "portfolio-2022 gallery image" },
            { type: "image", url: "https://res.cloudinary.com/ddxa0ahzp/image/upload/v1772736739/rm-portfolio-live/portfolio-2022/roshans%20portfolio_page_25.jpg", alt: "portfolio-2022 gallery image" }
        ],
    }
];
