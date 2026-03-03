const fs = require("fs");
const path = require("path");

const publicMediaDir = path.join(__dirname, "..", "public", "media");
const outputFile = path.join(__dirname, "..", "src", "data", "generatedGallery.ts");

const EXCLUDED_FILES = new Set([
    "hero.mp4",
    "hero.webm",
    "poster.jpg",
    "cover.jpg",
    "cover..jpg",
    ".DS_Store"
]);

const ALLOWED_EXTS = new Set([
    ".jpg", ".jpeg", ".png", ".webp", ".mp4", ".webm"
]);

function getMediaFiles(slug) {
    const dir = path.join(publicMediaDir, slug);
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);

    // Filter out excluded files
    let mediaFiles = files.filter(f => !EXCLUDED_FILES.has(f));

    // Natural sort: numbered files first, then alphabetical
    mediaFiles.sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    const assets = [];
    const usedPosters = new Set();

    // First pass loop for videos
    for (const file of mediaFiles) {
        const ext = path.extname(file).toLowerCase();
        if (ext === ".mp4" || ext === ".webm") {
            const baseName = path.basename(file, ext);
            let posterFile = null;

            // Detect poster
            if (mediaFiles.includes(`${baseName}.jpg`)) posterFile = `${baseName}.jpg`;
            else if (mediaFiles.includes(`${baseName}.png`)) posterFile = `${baseName}.png`;
            else if (mediaFiles.includes(`${baseName}.webp`)) posterFile = `${baseName}.webp`;

            const asset = {
                type: "video",
                url: `/media/${slug}/${file}`,
                alt: `${slug} gallery video`
            };

            if (ext === ".mp4") asset.videoMp4 = `/media/${slug}/${file}`;
            if (ext === ".webm") asset.videoWebm = `/media/${slug}/${file}`;

            if (posterFile) {
                asset.poster = `/media/${slug}/${posterFile}`;
                usedPosters.add(posterFile);
            }

            assets.push(asset);
        }
    }

    // Second pass loop for images
    for (const file of mediaFiles) {
        const ext = path.extname(file).toLowerCase();
        if (ALLOWED_EXTS.has(ext) && ext !== ".mp4" && ext !== ".webm" && !usedPosters.has(file)) {
            assets.push({
                type: "image",
                url: `/media/${slug}/${file}`,
                alt: `${slug} gallery image`
            });
        }
    }

    // Re-sort the final assets array based on filename (extracted from URL) to maintain intended order
    assets.sort((a, b) => {
        const aName = path.basename(a.url);
        const bName = path.basename(b.url);
        return aName.localeCompare(bName, undefined, { numeric: true, sensitivity: 'base' });
    });

    return assets;
}

function generate() {
    console.log("Generating gallery manifest...");

    if (!fs.existsSync(publicMediaDir)) {
        console.warn("Public media directory not found!");
        fs.writeFileSync(outputFile, "import type { MediaAsset } from './portfolio';\n\nexport const generatedGallery: Record<string, MediaAsset[]> = {};\n");
        return;
    }

    const slugs = fs.readdirSync(publicMediaDir).filter(f => {
        return fs.statSync(path.join(publicMediaDir, f)).isDirectory();
    });

    const galleryData = {};
    slugs.forEach(slug => {
        galleryData[slug] = getMediaFiles(slug);
    });

    const content = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Run \`npm run predev\` or \`npm run prebuild\` to regenerate.
import type { MediaAsset } from './portfolio';

export const generatedGallery: Record<string, MediaAsset[]> = ${JSON.stringify(galleryData, null, 4)};
`;

    fs.writeFileSync(outputFile, content);
    console.log(`Gallery generated for ${slugs.length} projects.`);
}

generate();
