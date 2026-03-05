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

async function uploadLogo() {
    console.log("Starting targeted logo re-upload...");

    const logoLocal = "/Users/roshanmariadas/Desktop/New media update/logo.png";
    const logoId = "rm-portfolio-live/site-assets/logo";

    try {
        console.log(`Uploading ${logoLocal} to ${logoId}...`);
        const result = await cloudinary.uploader.upload(logoLocal, {
            public_id: logoId,
            resource_type: "image",
            overwrite: true,
            invalidate: true // tell Cloudinary CDN to drop the cache for this asset
        });

        console.log(`✅ Success: ${result.secure_url}`);
        mediaMap["/media/site-assets/logo.png"] = result.secure_url;

        writeFileSync(MAP_PATH, JSON.stringify(mediaMap, null, 2));
        console.log("Updated mediaMap.json with the new versioned URL to bust Next.js cache.");
    } catch (error) {
        console.error(`❌ Failed to upload logo:`, error);
    }
}

uploadLogo();
