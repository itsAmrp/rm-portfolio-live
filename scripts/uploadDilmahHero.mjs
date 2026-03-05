import { v2 as cloudinary } from 'cloudinary';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ddxa0ahzp',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MAP_PATH = join(process.cwd(), 'src/data/mediaMap.json');
let mediaMap = JSON.parse(readFileSync(MAP_PATH, 'utf-8'));

async function uploadDilmahHero() {
    console.log("Starting targeted Dilmah hero video re-upload...");

    const heroLocal = "/Users/roshanmariadas/Desktop/New media update/dilmah-sri-lanka/hero.mp4";
    const heroId = "rm-portfolio-live/dilmah-sri-lanka/hero";

    try {
        console.log(`Uploading ${heroLocal} to ${heroId}...`);
        const result = await cloudinary.uploader.upload(heroLocal, {
            public_id: heroId,
            resource_type: "video",
            overwrite: true,
            invalidate: true // tell Cloudinary CDN to drop the cache for this asset
        });

        console.log(`✅ Success: ${result.secure_url}`);
        mediaMap["/media/dilmah-sri-lanka/hero.mp4"] = result.secure_url;

        writeFileSync(MAP_PATH, JSON.stringify(mediaMap, null, 2));
        console.log("Updated mediaMap.json with the new versioned URL to bust Next.js cache.");
    } catch (error) {
        console.error(`❌ Failed to upload dilmah hero:`, error);
    }
}

uploadDilmahHero();
