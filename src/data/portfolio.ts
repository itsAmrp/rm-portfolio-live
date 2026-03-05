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
    tagline: "Digital-first Art Director specialising in AI visuals and AI video creation.",
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
    "Anchor Moments",
    "Brewery",
    "Anchor Stirred Yoghurt",
    "Mapei UAE",
    "2024 Portfolio",
];

export const featuredOrder = [
    "portfolio-2024",
    "anchor-moments",
    "idemitsu-mena",
    "anchor-butter",
    "mazda-motor-oil-mena"
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

export const projects: Project[] = [
    {
        slug: "idemitsu-mena",
        brand: "Idemitsu MENA",
        title: "High-Performance Aesthetics for the Modern Road",
        region: "MENA",
        year: "2023",
        disciplines: ["Art Direction", "KV", "Digital", "AI Video"],
        shortDescription: "A striking digital campaign redefining automotive lubricants with high-impact 3D and AI-driven fluid dynamics.",
        roleSummary: "Lead Art Director overseeing the conceptualization and production of the entire MENA digital suite.",
        tools: ["Adobe Creative Suite", "Midjourney", "RunwayML", "Figma"],
        caseStudySections: {
            challenge: "Positioning Idemitsu as a premium, technologically advanced choice in a saturated Middle Eastern market.",
            insight: "Consumers don't just buy oil; they buy the feeling of seamless, unstoppable performance.",
            idea: "Visualizing the 'Zenith of Performance' through seamless, infinite-looping 3D/AI animations of fluid mechanics.",
            execution: "Developed a comprehensive digital toolkit, blending AI video generation for fluid states with meticulous typographic layouts.",
            outcome: "Exceeded engagement benchmarks by 45% across social channels in the UAE and Saudi Arabia.",
        },
        deliverables: ["Social Media KV", "AI Video Assets", "Digital Ad Units", "Brand Guidelines"],
        heroMedia: {
            type: "image",
            url: "/media/idemitsu-mena/cover.jpg",
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
        year: "2023",
        disciplines: ["Social", "Branding", "KV", "Art Direction"],
        shortDescription: "Translating the heritage of Ceylon tea into a vibrant, Gen-Z friendly digital experience.",
        roleSummary: "Art Director for all active social properties, bridging physical packaging design with digital storytelling.",
        tools: ["Adobe Illustrator", "Adobe Photoshop", "Adobe After Effects"],
        caseStudySections: {
            challenge: "Making a classic, heritage tea brand appeal to a younger, digital-native demographic without alienating core consumers.",
            insight: "Young consumers value authenticity and the 'aesthetic' of the brewing ritual over historical claims.",
            idea: "A visual series dubbed 'The Modern Brew', focusing on macro textures, dynamic lighting, and tea mixology.",
            execution: "Launched a social-first campaign utilizing high-speed macro videography and vibrant, youth-centric color palettes.",
        },
        deliverables: ["Social First Video", "Instagram Grid Overhaul", "Digital Display Ads"],
        heroMedia: {
            type: "image",
            url: "/media/dilmah-sri-lanka/cover.jpg",
            alt: "Dilmah Sri Lanka Hero",
        },
        gallery: [
            { type: "image", url: "/media/dilmah-sri-lanka/01.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "/media/dilmah-sri-lanka/02.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "/media/dilmah-sri-lanka/03.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "/media/dilmah-sri-lanka/04.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "/media/dilmah-sri-lanka/05.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "/media/dilmah-sri-lanka/06.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "/media/dilmah-sri-lanka/07.jpg", alt: "dilmah-sri-lanka gallery image" },
            { type: "image", url: "/media/dilmah-sri-lanka/08.jpg", alt: "dilmah-sri-lanka gallery image" }
        ],
    },
    {
        slug: "mazda-motor-oil-mena",
        brand: "Mazda Motor Oil MENA",
        title: "Precision in Every Drop",
        region: "MENA",
        year: "2022",
        disciplines: ["Digital", "Art Direction", "AI Visuals"],
        shortDescription: "A sleek, technology-focused visual identity for Mazda's genuine oil range in the Middle East.",
        roleSummary: "Developed the key visual systems and localized them for multiple Arabic and English platforms.",
        tools: ["Adobe Creative Suite", "Cinema 4D", "Figma"],
        caseStudySections: {
            challenge: "Creating a differentiated visual language for an OEM oil brand that stands out from aftermarket competitors.",
            insight: "Mazda drivers are deeply invested in the engineering purity of their vehicles.",
            idea: "Treating the oil as a precision-engineered component, using stark, lab-like lighting and immaculate reflections.",
            execution: "Generated a suite of AI-enhanced macro visuals of metallic engine surfaces interacting with perfect oil droplets.",
            outcome: "Successfully established a premium visual standard adopted across all MENA distributor networks.",
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
        year: "2023",
        disciplines: ["Digital", "Activation", "Art Direction", "Social"],
        shortDescription: "Elevating the digital presence of Sri Lanka's leading hospitality brand through immersive visual storytelling.",
        roleSummary: "Art Direction for seasonal campaigns and digital activations across Cinnamon's portfolio of properties.",
        tools: ["Adobe Creative Suite", "Photography Direction", "Figma"],
        caseStudySections: {
            challenge: "Capturing the tactile luxury and diverse experiences of Cinnamon hotels through a unified digital lens.",
            insight: "Travellers seek sensory previews of their stays, the sound of waves, the texture of linens.",
            idea: "'Moments in Cinnamon', a campaign focused on hyper-sensory, short-form video vignettes.",
            execution: "Directed a series of mood-driven shoots and translated them into a cohesive digital ecosystem with bespoke typography.",
        },
        deliverables: ["Campaign Strategy", "Social Media Playbook", "Video Vignettes", "Digital Ad Banners"],
        heroMedia: {
            type: "image",
            url: "/media/cinnamon/cover.jpg",
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
        year: "2022",
        disciplines: ["Art Direction", "Social", "KV"],
        shortDescription: "Modernizing the visual communication of Sri Lanka's largest private bank.",
        roleSummary: "Lead Designer translating complex financial products into accessible, modern digital visuals.",
        tools: ["Adobe Creative Suite", "Figma", "After Effects"],
        caseStudySections: {
            challenge: "Making legacy banking products appealing to a tech-savvy generation.",
            insight: "Financial freedom is the core desire; the bank is merely the enabler.",
            idea: "A lifestyle-first visual approach, prioritizing human aspirations over numbers and charts.",
            execution: "Redesigned the social media grid with a clean, grid-based aesthetic, utilizing localized lifestyle photography and clear typographic hierarchy.",
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
        year: "2022",
        disciplines: ["Activation", "KV", "Digital"],
        shortDescription: "A gentle, trust-building digital campaign for Sri Lanka's most loved baby care brand.",
        roleSummary: "Art Direction for digital activations and mother-centric social campaigns.",
        tools: ["Adobe Creative Suite", "Illustration", "Figma"],
        caseStudySections: {
            challenge: "Maintaining the heritage of absolute trust while adopting modern digital engagement mechanics.",
            insight: "New mothers seek community and reassurance, not just product features.",
            idea: "Visualizing the 'Circle of Care' through soft, organic shapes and authentic, unpolished moments of motherhood.",
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
        year: "2021",
        disciplines: ["KV", "Social", "Branding"],
        shortDescription: "Energetic and vibrant visual storytelling to relaunch a core dairy product.",
        roleSummary: "Contributed to the visual identity refresh and digital rollout.",
        tools: ["Adobe Photoshop", "Adobe Illustrator"],
        caseStudySections: {
            challenge: "Reinvigorating a classic dairy brand to capture the attention of energetic kids and health-conscious parents.",
            insight: "Nutrition should feel like an adventure, not a chore.",
            idea: "A stylized, comic-book inspired visual direction for all digital communications.",
            execution: "Crafted a series of dynamic KVs featuring action-oriented photography integrated with bold graphic elements.",
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
        slug: "dialog",
        brand: "Dialog",
        title: "Connecting the Nation",
        region: "Sri Lanka",
        year: "2024",
        disciplines: ["Digital", "AI Video", "Art Direction"],
        shortDescription: "A high-speed, futuristic digital presence for Sri Lanka's premier telecommunications provider.",
        roleSummary: "Lead Art Director for the 5G rollout digital campaign, utilizing AI video components.",
        tools: ["Midjourney", "RunwayML", "Adobe After Effects", "Figma"],
        caseStudySections: {
            challenge: "Visualizing the intangible speed and possibilities of a widespread 5G network.",
            insight: "5G isn't just about faster downloads; it's about a fully integrated, hyper-connected future.",
            idea: "A sleek, cyberpunk-adjacent visual world where data flows like light.",
            execution: "Generated complex data-flow animations using AI video tools, heavily post-processed to match the brand's red and white corporate identity.",
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
        disciplines: ["Art Direction", "AI Video", "Digital"],
        shortDescription: "A culmination of experiments in AI video and digital-first art direction.",
        roleSummary: "Creator, Director, and Designer.",
        tools: ["Figma", "Next.js", "Midjourney", "RunwayML", "After Effects"],
        caseStudySections: {
            challenge: "Creating a personalized digital footprint that showcases both traditional agency rigor and experimental AI prowess.",
            insight: "A portfolio should be a product, not just a PDF.",
            idea: "A stark, minimalist digital environment where the work provides the color and motion.",
            execution: "Designed a comprehensive dual-theme web experience with fluid motion, custom cursors, and heavy integration of AI video techniques.",
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
        title: "Golden Standard of Taste",
        region: "Sri Lanka",
        year: "2022",
        disciplines: ["KV", "Social", "Art Direction"],
        shortDescription: "A rich and vibrant digital campaign celebrating the premium quality of Anchor Butter.",
        roleSummary: "Art Director",
        tools: ["Adobe Photoshop", "Adobe Illustrator"],
        caseStudySections: {
            challenge: "Showcasing the premium nature of the product while maintaining approachability.",
            insight: "Consumers associate the color gold and rich textures with premium quality.",
            idea: "Warm, golden-hour styling with macro food photography.",
            execution: "Developed a series of rich, appetizing key visuals and social adaptations.",
        },
        deliverables: ["Key Visuals", "Social Content"],
        heroMedia: {
            type: "image",
            url: "/media/anchor-butter/01.jpg",
            alt: "Anchor Butter Hero",
        },
        gallery: [
            { type: "image", url: "/media/anchor-butter/01.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/02.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/03.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/04.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/05.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/06.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/07.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/08.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/09.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/10.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/11.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/12.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/13.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/14.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/15.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/16.jpg", alt: "anchor-butter gallery image" },
            { type: "image", url: "/media/anchor-butter/17.jpg", alt: "anchor-butter gallery image" },
            { type: "video", url: "/media/anchor-butter/18.jpg", alt: "anchor-butter gallery video", videoMp4: "/media/anchor-butter/18.mp4" },
            { type: "video", url: "/media/anchor-butter/19.jpg", alt: "anchor-butter gallery video", videoMp4: "/media/anchor-butter/19.mp4" }
        ],
    },
    {
        slug: "anchor-moments",
        brand: "Anchor Moments",
        title: "Celebrating Everyday Connections",
        region: "Sri Lanka",
        year: "2022",
        disciplines: ["Digital", "Social", "Art Direction"],
        shortDescription: "A lifestyle-centric campaign focusing on the moments shared over Anchor products.",
        roleSummary: "Art Director",
        tools: ["Adobe Creative Suite", "Photography Direction"],
        caseStudySections: {
            challenge: "Moving beyond functional benefits to emotional connection.",
            insight: "Dairy is often part of shared family moments.",
            idea: "Candid, warm lifestyle photography integrated into a clean digital layout.",
            execution: "Directed a lifestyle shoot and rolled out a cohesive social campaign.",
        },
        deliverables: ["Social Media Playbook", "Lifestyle Photography"],
        heroMedia: {
            type: "image",
            url: "/media/anchor-moments/01.jpg",
            alt: "Anchor Moments Hero",
        },
        gallery: [
            { type: "image", url: "/media/anchor-moments/01.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/02.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/03.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/04.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/05.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/06.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/07.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/08.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/09.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/10.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/11.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/12.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/13.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/14.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/15.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/16.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/17.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/18.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/19.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/20.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/21.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/22.jpg", alt: "anchor-moments gallery image" },
            { type: "image", url: "/media/anchor-moments/23.jpg", alt: "anchor-moments gallery image" },
            { type: "video", url: "/media/anchor-moments/24.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/24.mp4" },
            { type: "video", url: "/media/anchor-moments/25.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/25.mp4" },
            { type: "video", url: "/media/anchor-moments/26.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/26.mp4" },
            { type: "video", url: "/media/anchor-moments/27.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/27.mp4" },
            { type: "video", url: "/media/anchor-moments/28.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/28.mp4" },
            { type: "video", url: "/media/anchor-moments/29.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/29.mp4" },
            { type: "video", url: "/media/anchor-moments/30.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/30.mp4" },
            { type: "video", url: "/media/anchor-moments/31.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/31.mp4" },
            { type: "video", url: "/media/anchor-moments/32.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/32.mp4" },
            { type: "video", url: "/media/anchor-moments/33.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/33.mp4" },
            { type: "video", url: "/media/anchor-moments/34.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/34.mp4" },
            { type: "video", url: "/media/anchor-moments/35.jpg", alt: "anchor-moments gallery video", videoMp4: "/media/anchor-moments/35.mp4" }
        ],
    },
    {
        slug: "brewery",
        brand: "Brewery",
        title: "Crafting the Perfect Draft",
        region: "Global",
        year: "2023",
        disciplines: ["Branding", "Digital", "KV"],
        shortDescription: "A sophisticated visual identity and digital presence for a premium craft brewery.",
        roleSummary: "Lead Art Director",
        tools: ["Adobe Illustrator", "Figma", "Cinema 4D"],
        caseStudySections: {
            challenge: "Standing out in the crowded craft beer market.",
            insight: "Craft beer enthusiasts appreciate the science and art of brewing.",
            idea: "A visual language that balances industrial brewing elements with refined typography.",
            execution: "Created a comprehensive branding system and translated it into a sleek digital experience.",
        },
        deliverables: ["Brand Identity", "Website Design", "Packaging Concepts"],
        heroMedia: {
            type: "image",
            url: "/media/brewery/cover.jpg",
            alt: "Brewery Hero",
        },
        gallery: [
            { type: "image", url: "/media/brewery/01.jpg", alt: "brewery gallery image" },
            { type: "image", url: "/media/brewery/02.jpg", alt: "brewery gallery image" },
            { type: "image", url: "/media/brewery/03.jpg", alt: "brewery gallery image" },
            { type: "video", url: "/media/brewery/4.jpg", alt: "brewery gallery video", videoMp4: "/media/brewery/4.mp4" },
            { type: "video", url: "/media/brewery/5.jpg", alt: "brewery gallery video", videoMp4: "/media/brewery/5.mp4" },
            { type: "video", url: "/media/brewery/6.jpg", alt: "brewery gallery video", videoMp4: "/media/brewery/6.mp4" },
            { type: "video", url: "/media/brewery/7.jpg", alt: "brewery gallery video", videoMp4: "/media/brewery/7.mp4" }
        ],
    },
    {
        slug: "anchor-stirred-yoghurt",
        brand: "Anchor Stirred Yoghurt",
        title: "The Joy of Smoothness",
        region: "Sri Lanka",
        year: "2021",
        disciplines: ["Social", "KV", "Activation"],
        shortDescription: "A playful, vibrant campaign highlighting the smooth texture of Anchor Stirred Yoghurt.",
        roleSummary: "Art Director",
        tools: ["Adobe Photoshop", "After Effects"],
        caseStudySections: {
            challenge: "Communicating the unique texture and taste digitally.",
            insight: "Visualizing texture is key to appetite appeal.",
            idea: "Using fluid, smooth motions and swirling graphics to mimic the product.",
            execution: "Developed animated social posts and vibrant key visuals.",
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
    }
];
