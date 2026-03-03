export interface Project {
  name: string;
  slug: string;
  year: string;
  industry: string;
  role: string;
  services: string[];
  thumbnail: string;
  heroImage: string;
  challenge: string;
  approach: string;
  outcome: string;
  gallery: string[];
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    name: "Lumina Archive",
    slug: "lumina-archive",
    year: "2023",
    industry: "Fashion Tech",
    role: "Creative Director",
    services: ["Brand Identity", "Web Design", "Creative Direction"],
    thumbnail: "https://images.unsplash.com/photo-1515347619252-8d4e9d7c2a26?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1515347619252-8d4e9d7c2a26?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Lumina needed a digital presence that matched their avant-garde approach to sustainable fashion archives.",
    approach: "We created a minimalist, high-contrast digital environment that acts as a gallery space rather than a traditional e-commerce site.",
    outcome: "A 40% increase in average session duration and features in multiple design awards.",
    gallery: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  },
  {
    name: "Aura Skincare",
    slug: "aura-skincare",
    year: "2024",
    industry: "Beauty",
    role: "Lead Designer",
    services: ["E-commerce Strategy", "UX/UI Design", "Prototyping"],
    thumbnail: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Translating the tactile purity of natural skincare ingredients into a frictionless digital shopping experience.",
    approach: "Utilizing ample whitespace, elegant typography, and subtle micro-interactions to evoke a sense of calm and clarity.",
    outcome: "Conversion rates improved by 25% within the first three months post-launch.",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&h=800&auto=format&fit=crop"
    ]
  },
  {
    name: "Maison Noir",
    slug: "maison-noir",
    year: "2022",
    industry: "Architecture",
    role: "Digital Designer",
    services: ["Web Development", "Art Direction", "Motion Design"],
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Showcasing monumental architectural projects without the interface distracting from the imagery.",
    approach: "An immersive, horizontally scrolling portfolio that mimics the experience of walking through a physical exhibition.",
    outcome: "Secured inquiries for three international projects directly attributed to the website redesign.",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  },
  {
    name: "Vanguard Studios",
    slug: "vanguard-studios",
    year: "2024",
    industry: "Production",
    role: "Product Designer",
    services: ["UX Research", "UI Design", "Interaction Design"],
    thumbnail: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Organizing a vast library of commercial film projects into an easily navigable and visually striking archive.",
    approach: "Implemented a robust filtering system and dynamic video previews that activate elegantly on hover.",
    outcome: "Reduced bounce rate by 15% and increased engagement with individual project case studies.",
    gallery: [
      "https://images.unsplash.com/photo-1590845947698-8924d7409b56?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535016120720-40c746a65518?q=80&w=1200&h=800&auto=format&fit=crop"
    ]
  },
  {
    name: "Ethereal Fragrances",
    slug: "ethereal-fragrances",
    year: "2023",
    industry: "Luxury Goods",
    role: "Design Lead",
    services: ["E-commerce Design", "Brand Strategy", "Front-end Dev"],
    thumbnail: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Capturing the essence of olfactory experiences through visual and interactive web design.",
    approach: "Utilized fluid animations, soft color palettes, and structural layouts inspired by editorial magazines.",
    outcome: "Winner of 'Site of the Day' on Awwwards and CSS Design Awards.",
    gallery: [
      "https://images.unsplash.com/photo-1595425984033-ce2ea3a9be45?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  },
  {
    name: "Oblique Dynamics",
    slug: "oblique-dynamics",
    year: "2022",
    industry: "Industrial Design",
    role: "UX Strategist",
    services: ["UX Design", "Content Strategy", "Prototyping"],
    thumbnail: "https://images.unsplash.com/photo-1507119124451-b016d9fc9227?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1507119124451-b016d9fc9227?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Presenting complex industrial design case studies in an accessible and engaging format.",
    approach: "Broke down dense technical information into scannable chapters accompanied by detailed 3D renders.",
    outcome: "Improved lead generation from B2B clients by streamlining the contact process.",
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1200&h=800&auto=format&fit=crop"
    ]
  },
  {
    name: "Crescent Hospitality",
    slug: "crescent-hospitality",
    year: "2024",
    industry: "Hospitality",
    role: "Art Director",
    services: ["Brand Refresh", "Web Design", "Photography Direction"],
    thumbnail: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c53?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Modernizing the digital presence of a legacy boutique hotel group while retaining its heritage.",
    approach: "Custom serif typography paired with expansive, uncropped photography to showcase the locations.",
    outcome: "Direct bookings increased by 30% compared to previous OTA-reliant channels.",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  },
  {
    name: "Vertex Fin",
    slug: "vertex-fin",
    year: "2023",
    industry: "Fintech",
    role: "Product Designer",
    services: ["UI/UX Design", "Design System", "Interaction Design"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Designing an intuitive interface for a complex institutional investment platform.",
    approach: "Created a strict, data-driven design system that prioritizes clarity and precision over embellishment.",
    outcome: "Successfully launched the v1.0 platform to a closed beta of 50 enterprise clients.",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&h=800&auto=format&fit=crop"
    ]
  },
  {
    name: "Kinetix Mobility",
    slug: "kinetix-mobility",
    year: "2022",
    industry: "Automotive",
    role: "Creative Developer",
    services: ["WebGL", "Motion Design", "Front-end Dev"],
    thumbnail: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Crafting a high-performance landing page for a new electric vehicle concept.",
    approach: "Implemented interactive 3D elements powered by WebGL, allowing users to explore the vehicle dynamically.",
    outcome: "Garnered over 100k unique visitors in the first week and extensive media coverage.",
    gallery: [
      "https://images.unsplash.com/photo-1503376713-365bd3e1cd04?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  },
  {
    name: "Oasis Living",
    slug: "oasis-living",
    year: "2024",
    industry: "Interior Design",
    role: "Digital Strategist",
    services: ["Web Design", "SEO Strategy", "Copywriting"],
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Positioning a new interior design studio in a saturated luxury market.",
    approach: "Focused on narrative-driven case studies detailing the intention and craft behind every design decision.",
    outcome: "First page rankings for key local SEO terms within six months.",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&h=800&auto=format&fit=crop"
    ]
  },
  {
    name: "Nectar Coffee Co.",
    slug: "nectar-coffee",
    year: "2023",
    industry: "Food & Beverage",
    role: "Brand Identity Designer",
    services: ["Packaging Design", "Shopify Plus", "Art Direction"],
    thumbnail: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Creating a cohesive brand experience from physical packaging to digital storefront.",
    approach: "Designed a clean, warm aesthetic with vibrant typography that translates seamlessly across all touchpoints.",
    outcome: "Subscription sign-ups exceeded initial projections by 50%.",
    gallery: [
      "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  },
  {
    name: "Symphony Audio",
    slug: "symphony-audio",
    year: "2022",
    industry: "Consumer Electronics",
    role: "UI Engineer",
    services: ["Front-end Architecture", "React Development", "Animation"],
    thumbnail: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Building a fluid e-commerce experience that visualizes sound quality.",
    approach: "Integrated custom SVG animations triggered by scroll to represent sound waves alongside sleek product photography.",
    outcome: "Nominated for 'Best E-Commerce Site' at the Webby Awards.",
    gallery: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&h=800&auto=format&fit=crop"
    ]
  },
  {
    name: "Zenith Watches",
    slug: "zenith-watches",
    year: "2024",
    industry: "Luxury Timpieces",
    role: "Lead UI Designer",
    services: ["Digital Experience", "Creative Direction", "3D Web"],
    thumbnail: "https://images.unsplash.com/photo-1524592094714-cf05615712e5?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1524592094714-cf05615712e5?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Reflecting the rigorous precision of Swiss watchmaking in a web interface.",
    approach: "Used ultra-fine lines, micro-interactions, and macro photography to highlight the intricate details of the timepieces.",
    outcome: "Enhanced brand perception and a marked increase in online consultation requests.",
    gallery: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548171915-e7af5dc91873?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  },
  {
    name: "Equinox Fitness",
    slug: "equinox-fitness",
    year: "2023",
    industry: "Health & Wellness",
    role: "Product Designer",
    services: ["App Design", "User Testing", "Prototyping"],
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Designing a companion app for high-end gym members to track progress and book classes effortlessly.",
    approach: "A sleek, dark-mode-first interface that prioritizes quick actions and clear data visualization.",
    outcome: "App adoption rate reached 85% among active gym members.",
    gallery: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&h=800&auto=format&fit=crop"
    ]
  },
  {
    name: "Apex Architecture",
    slug: "apex-architecture",
    year: "2022",
    industry: "Architecture",
    role: "Web Designer",
    services: ["Web Design", "CMS Integration", "SEO"],
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&h=1080&auto=format&fit=crop",
    challenge: "Creating a brutalist-inspired portfolio that remains highly usable and accessible.",
    approach: "Employed a stark black-and-white color palette, raw typography, and grid-breaking layouts that resolve smoothly on mobile.",
    outcome: "Attracted a younger demographic of clients for innovative residential projects.",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&h=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&h=800&auto=format&fit=crop"
    ],
    liveUrl: "https://example.com"
  }
];
