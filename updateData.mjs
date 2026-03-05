import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORTFOLIO_PATH = join(__dirname, 'src/data/portfolio.ts');
const MAP_PATH = join(__dirname, 'src/data/mediaMap.json');

const updatePortfolio = () => {
    let portfolioStr = readFileSync(PORTFOLIO_PATH, 'utf-8');
    const mediaMap = JSON.parse(readFileSync(MAP_PATH, 'utf-8'));

    // The media keys that we want to inject into portfolio.ts
    // 1. Sprite
    portfolioStr = portfolioStr.replace('/media/sprite/hero.jpg', '/media/sprite/hero.jpg'); // Cloudinary creates .jpg automatically for .mp4, so we just map it.

    // Actually, according to the user prompt, we just want to ensure portfolio.ts matches the files we just uploaded.
    // The previous multi_replace already added the Sprite object and updated featuredOrder.
    // Let's explicitly set the Sprite urls since the local folder had different names than what I guessed.

    /* 
    Uploaded Sprite Assets:
    /media/sprite/1.png
    /media/sprite/2.png
    /media/sprite/eid ul adha 04.png
    /media/sprite/eid ul adha-02.png
    /media/sprite/eid ul adha-03.png
    /media/sprite/eid ul adha-1.png
    /media/sprite/eid ul adha-final wish.png
    /media/sprite/eid ul adha03.png
    /media/sprite/hero.mp4
    /media/sprite/rmdn -03.png
    /media/sprite/rmdn-01.png
    /media/sprite/rmdn-02.png
    /media/sprite/mother's day-01.png
    /media/sprite/mother's day-02.png
    /media/sprite/mother's day-03.png
    */

    const spriteGalleryRaw = `
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
        ],`;

    // Regex to entirely replace the gallery array inside the Sprite object
    const spriteGalleryRegex = /gallery:\s*\[\s*(?:\{\s*type:\s*"(?:video|image)",\s*url:\s*"\/media\/sprite\/[^"]+",\s*alt:\s*"[^"]+"(?:,\s*videoMp4:\s*"[^"]+")?\s*\}(?:,\s*)?)+\s*\],/g;

    portfolioStr = portfolioStr.replace(spriteGalleryRegex, spriteGalleryRaw);

    // Update Hero videos for Anchor Moments, Cinnamon, Idemitsu MENA, Anchor Butter based on the uploaded 'hero.mp4'
    const replaceHero = (slug) => {
        const regex = new RegExp(`heroMedia:\\s*{\\s*type:\\s*"image",\\s*url:\\s*"\\/media\\/${slug}\\/cover\\.jpg",\\s*alt:\\s*"([^"]+)",?\\s*},`, 'g');
        const replacement = `heroMedia: {
            type: "video",
            url: "/media/${slug}/hero.jpg",
            videoMp4: "/media/${slug}/hero.mp4",
            alt: "$1",
        },`;
        portfolioStr = portfolioStr.replace(regex, replacement);
    };

    replaceHero('anchor-moments');
    replaceHero('cinnamon');
    replaceHero('idemitsu-mena');
    replaceHero('anchor-butter'); // Note anchor butter actually used 01.jpg as hero, so let's handle it manually

    const anchorButterRegex = /heroMedia:\s*{\s*type:\s*"image",\s*url:\s*"\/media\/anchor-butter\/01\.jpg",\s*alt:\s*"Anchor Butter Hero",?\s*},/g;
    portfolioStr = portfolioStr.replace(anchorButterRegex, `heroMedia: {
            type: "video",
            url: "/media/anchor-butter/hero.jpg",
            videoMp4: "/media/anchor-butter/hero.mp4",
            alt: "Anchor Butter Hero",
        },`);

    // Also Brewery had hero.mp4 uploaded
    const breweryRegex = /heroMedia:\s*{\s*type:\s*"image",\s*url:\s*"\/media\/brewery\/cover\.jpg",\s*alt:\s*"Brewery Hero",?\s*},/g;
    portfolioStr = portfolioStr.replace(breweryRegex, `heroMedia: {
            type: "video",
            url: "/media/brewery/hero.jpg",
            videoMp4: "/media/brewery/hero.mp4",
            alt: "Brewery Hero",
        },`);

    writeFileSync(PORTFOLIO_PATH, portfolioStr, 'utf-8');
    console.log("Updated portfolio.ts with new hero videos and Sprite gallery data.");
};

updatePortfolio();
