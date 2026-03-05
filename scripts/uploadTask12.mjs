import { v2 as cloudinary } from 'cloudinary';
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import 'dotenv/config'; // Make sure to use dotenv if needed

// Configure Cloudinary (Make sure process.env contains these or we fall back to hardcoded if necessary based on past run. Actually we had them in .env.local)
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ddxa0ahzp',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const MAP_PATH = join(process.cwd(), 'src/data/mediaMap.json');
let mediaMap = {};
try {
    mediaMap = JSON.parse(readFileSync(MAP_PATH, 'utf-8'));
} catch (e) { }

async function uploadFile(localPath, publicId, isVideo = false) {
    try {
        console.log(`Uploading ${localPath} to ${publicId}...`);
        const result = await cloudinary.uploader.upload(localPath, {
            public_id: publicId,
            resource_type: isVideo ? "video" : "image",
            overwrite: true
        });
        console.log(`✅ Success: ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error(`❌ Failed to upload ${localPath}:`, error);
        return null;
    }
}

async function run() {
    console.log("Starting targeted upload...");

    // 1. Upload Logo
    const logoLocal = "/Users/roshanmariadas/Desktop/New media update/logo.png";
    const logoId = "rm-portfolio-live/site-assets/logo";
    const logoUrl = await uploadFile(logoLocal, logoId, false);
    if (logoUrl) {
        mediaMap["/media/site-assets/logo.png"] = logoUrl;
    }

    // 2. Upload Portfolio 2022
    const dir = "/Users/roshanmariadas/Desktop/New media update/Portfolio 2022";
    const files = readdirSync(dir);

    for (const file of files) {
        if (file.includes('.DS_Store')) continue;

        const localPath = join(dir, file);
        if (statSync(localPath).isFile()) {
            const ext = file.split('.').pop().toLowerCase();
            const isVideo = ['mp4', 'mov', 'webm'].includes(ext);

            // Normalize filename
            const cleanName = file.toLowerCase().replace(/['"]/g, '');
            const nameWithoutExt = cleanName.substring(0, cleanName.lastIndexOf('.'));

            const publicId = `rm-portfolio-live/portfolio-2022/${nameWithoutExt}`;
            const internalKey = `/media/portfolio-2022/${cleanName}`;

            const url = await uploadFile(localPath, publicId, isVideo);
            if (url) {
                mediaMap[internalKey] = url;
            }
        }
    }

    writeFileSync(MAP_PATH, JSON.stringify(mediaMap, null, 2));
    console.log("Updated mediaMap.json.");
}

run();
