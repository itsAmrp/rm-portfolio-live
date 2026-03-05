import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PORTFOLIO_PATH = join(process.cwd(), 'src/data/portfolio.ts');
const MAP_PATH = join(process.cwd(), 'src/data/mediaMap.json');

const mediaMap = JSON.parse(readFileSync(MAP_PATH, 'utf-8'));

const updateGalleries = () => {
    let portfolioStr = readFileSync(PORTFOLIO_PATH, 'utf-8');

    const projectsToUpdate = ['anchor-butter', 'brewery'];

    projectsToUpdate.forEach(slug => {
        // Collect all keys belonging to this slug
        const prefix = `/media/${slug}/`;
        const keys = Object.keys(mediaMap).filter(k => k.startsWith(prefix));

        const isExcluded = (k) => {
            const lower = k.toLowerCase();
            return lower.includes('hero') || lower.includes('cover') || lower.includes('.DS_Store');
        };

        const galleryKeys = keys.filter(k => !isExcluded(k));

        // Group videos vs images
        const assets = [];
        galleryKeys.forEach(k => {
            const ext = k.split('.').pop().toLowerCase();
            const url = mediaMap[k];

            if (['mp4', 'webm', 'mov'].includes(ext)) {
                // Determine poster. Cloudinary handles substituting extension to .jpg
                const posterUrl = url.replace(/\.(mp4|webm|mov)$/, '.jpg');
                assets.push({
                    type: 'video',
                    url: posterUrl,
                    videoMp4: url,
                    alt: `${slug} gallery video`,
                    originalKey: k
                });
            } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
                assets.push({
                    type: 'image',
                    url: url,
                    alt: `${slug} gallery image`,
                    originalKey: k
                });
            }
        });

        // Sort by original filename ascending
        assets.sort((a, b) => a.originalKey.localeCompare(b.originalKey));

        // Generate the replacement string
        let replacementArrayStr = "gallery: [\n" + assets.map((a, index) => {
            if (a.type === 'video') {
                return `            { type: "video", url: "${a.url}", alt: "${a.alt}", videoMp4: "${a.videoMp4}" }`;
            } else {
                return `            { type: "image", url: "${a.url}", alt: "${a.alt}" }`;
            }
        }).join(',\n') + "\n        ],";

        // Regex to replace the gallery array inside the specific project object
        // We'll search for the project slug and then its gallery
        const blockRegex = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?gallery:\\s*\\[[\\s\\S]*?\\],`, 'g');

        portfolioStr = portfolioStr.replace(blockRegex, (match) => {
            return match.replace(/gallery:\s*\[[\s\S]*?\],/, replacementArrayStr);
        });

        console.log(`Updated ${slug} with ${assets.length} gallery items.`);

        console.log(`\n--- First 5 final resolved URLs for ${slug} ---`);
        assets.slice(0, 5).forEach((asset, idx) => {
            console.log(`${idx + 1}. [${asset.type}] ${asset.url}`);
            if (asset.videoMp4) console.log(`   Video source: ${asset.videoMp4}`);
        });
        console.log('--------------------------------------------\n');
    });

    writeFileSync(PORTFOLIO_PATH, portfolioStr, 'utf-8');
};

console.log(`\n--- Anchor Moments Hero Resolved URLs ---`);
const anchorMomentsMapMp4 = mediaMap['/media/anchor-moments/hero.mp4'];
console.log(`Video: ${anchorMomentsMapMp4}`);
console.log(`Poster: ${anchorMomentsMapMp4.replace('.mp4', '.jpg')}`);
console.log('--------------------------------------------\n');

updateGalleries();
