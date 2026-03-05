import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PORTFOLIO_PATH = join(process.cwd(), 'src/data/portfolio.ts');
const MAP_PATH = join(process.cwd(), 'src/data/mediaMap.json');

const mediaMap = JSON.parse(readFileSync(MAP_PATH, 'utf-8'));
let portfolioStr = readFileSync(PORTFOLIO_PATH, 'utf-8');

const projectsToUpdate = ['anchor-moments', 'anchor-butter', 'brewery', 'portfolio-2022'];

projectsToUpdate.forEach(slug => {
    const prefix = `/media/${slug}/`;
    const keys = Object.keys(mediaMap).filter(k => k.startsWith(prefix));

    if (keys.length === 0) return;

    // 1. Include only specific formats
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'webm'];
    const validKeys = keys.filter(k => {
        const ext = k.split('.').pop().toLowerCase();
        return allowedExts.includes(ext) && !k.includes('.DS_Store');
    });

    let heroKey = null;
    let coverKey = null;
    const galleryKeys = [];

    // 2. Identify hero and cover. Support spaces etc.
    validKeys.forEach(k => {
        const filename = k.split('/').pop().toLowerCase();
        if (filename.startsWith('hero.')) {
            if (!heroKey || (heroKey.endsWith('.jpg') && k.endsWith('.mp4'))) {
                heroKey = k;
            }
        } else if (filename.startsWith('cover.')) {
            if (!coverKey || (coverKey.endsWith('.jpg') && k.endsWith('.mp4'))) {
                coverKey = k;
            }
        } else {
            galleryKeys.push(k);
        }
    });

    const actualHeroKey = heroKey || coverKey;

    // 3. Sorting gallery items: numeric first, then alphabetical
    galleryKeys.sort((a, b) => {
        // example name: "4 copy", "st p", "1v"
        const nameA = a.split('/').pop().split('.')[0].toLowerCase();
        const nameB = b.split('/').pop().split('.')[0].toLowerCase();

        const matchA = nameA.match(/^(\d+(\.\d+)?)/);
        const matchB = nameB.match(/^(\d+(\.\d+)?)/);

        const numA = matchA ? parseFloat(matchA[1]) : NaN;
        const numB = matchB ? parseFloat(matchB[1]) : NaN;

        if (!isNaN(numA) && !isNaN(numB)) {
            if (numA !== numB) return numA - numB;
            return nameA.localeCompare(nameB);
        } else if (!isNaN(numA)) {
            return -1; // Numbers come first
        } else if (!isNaN(numB)) {
            return 1;
        } else {
            return nameA.localeCompare(nameB);
        }
    });

    // 4. Update Hero Media
    if (actualHeroKey) {
        const url = mediaMap[actualHeroKey];
        const ext = actualHeroKey.split('.').pop().toLowerCase();
        let heroMediaStr = '';
        if (['mp4', 'mov', 'webm'].includes(ext)) {
            const posterUrl = url.replace(/\.(mp4|mov|webm)$/i, '.jpg');
            heroMediaStr = `heroMedia: {\n            type: "video",\n            url: "${posterUrl}",\n            videoMp4: "${url}",\n            alt: "${slug} Hero",\n        },`;
        } else {
            heroMediaStr = `heroMedia: {\n            type: "image",\n            url: "${url}",\n            alt: "${slug} Hero",\n        },`;
        }
        const heroRegex = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?heroMedia:\\s*\\{[\\s\\S]*?\\},`, 'g');
        portfolioStr = portfolioStr.replace(heroRegex, (match) => {
            return match.replace(/heroMedia:\s*\{[\s\S]*?\},/, heroMediaStr);
        });
    }

    // 5. Update Gallery
    const assets = galleryKeys.map(k => {
        const url = mediaMap[k];
        const ext = k.split('.').pop().toLowerCase();
        if (['mp4', 'mov', 'webm'].includes(ext)) {
            const posterUrl = url.replace(/\.(mp4|mov|webm)$/i, '.jpg');
            return `            { type: "video", url: "${posterUrl}", alt: "${slug} gallery video", videoMp4: "${url}" }`;
        } else {
            return `            { type: "image", url: "${url}", alt: "${slug} gallery image" }`;
        }
    });

    const galleryStr = `gallery: [\n${assets.join(',\n')}\n        ],`;
    const galleryRegex = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?gallery:\\s*\\[[\\s\\S]*?\\],`, 'g');

    const matchHasGallery = new RegExp(`slug:\\s*"${slug}"[\\s\\S]*?gallery:\\s*\\[`).test(portfolioStr);
    if (matchHasGallery) {
        portfolioStr = portfolioStr.replace(galleryRegex, (match) => {
            return match.replace(/gallery:\s*\[[\s\S]*?\],/, galleryStr);
        });
    }

    console.log(`\n=== ${slug.toUpperCase()} ===`);
    console.log(`[HERO] ${mediaMap[actualHeroKey]}`);
    assets.slice(0, 5).forEach((a, i) => {
        // Strip out the JS syntax to just show URLs.
        const matches = a.match(/url:\s*"([^"]+)"/);
        const mp4Matches = a.match(/videoMp4:\s*"([^"]+)"/);

        let output = `[GALLERY ${i + 1}] Poster/Image: ${matches[1]}`;
        if (mp4Matches) output += ` | MP4: ${mp4Matches[1]}`;

        console.log(output);
    });
});

writeFileSync(PORTFOLIO_PATH, portfolioStr, 'utf-8');
console.log('\nData update complete.');
