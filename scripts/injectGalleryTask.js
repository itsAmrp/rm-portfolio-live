const fs = require("fs");
const path = require("path");

const portfolioFile = path.join(__dirname, "..", "src", "data", "portfolio.ts");
const galleryFile = path.join(__dirname, "..", "src", "data", "generatedGallery.ts");

// 1. Parse generatedGallery.ts manually (it's a string containing JSON mapping)
const galleryContent = fs.readFileSync(galleryFile, "utf-8");
const jsonMatch = galleryContent.match(/export const generatedGallery: Record<string, MediaAsset\[\]> = (\{[\s\S]*?\});/);
if (!jsonMatch) {
    console.error("Could not parse generatedGallery.");
    process.exit(1);
}

const galleryData = JSON.parse(jsonMatch[1]);

// 2. Open portfolio.ts
let portfolioContent = fs.readFileSync(portfolioFile, "utf-8");

// 3. For each project, replace its gallery array
for (const slug in galleryData) {
    const assets = galleryData[slug];

    // Build the replacement string
    let replacementArray = `gallery: [\n`;
    for (let i = 0; i < assets.length; i++) {
        const a = assets[i];
        if (a.type === "video") {
            replacementArray += `            { type: "video", url: "${a.url}", alt: "${a.alt}", videoMp4: "${a.videoMp4}" }${i === assets.length - 1 ? '' : ','}\n`;
        } else {
            replacementArray += `            { type: "image", url: "${a.url}", alt: "${a.alt}" }${i === assets.length - 1 ? '' : ','}\n`;
        }
    }
    replacementArray += `        ],`;

    // Regex to find the project block and replace its gallery array
    // We look for: slug: "slug" ... gallery: [ ... ],
    const regex = new RegExp(`(slug:\\s*"${slug}",[\\s\\S]*?)gallery:\\s*\\[[\\s\\S]*?\\],`, 'g');

    portfolioContent = portfolioContent.replace(regex, `$1${replacementArray}`);
}

fs.writeFileSync(portfolioFile, portfolioContent);
console.log("Successfully injected all full generatedGallery data directly into portfolio.ts");
