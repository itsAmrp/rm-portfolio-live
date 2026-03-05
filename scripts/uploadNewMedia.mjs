import { v2 as cloudinary } from 'cloudinary';
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory for ES modules equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MEDIA_ROOT = '/Users/roshanmariadas/Desktop/New media update';
const CLOUDINARY_BASE_FOLDER = 'rm-portfolio-live';
const MAP_OUTPUT_FILE = join(__dirname, '../src/data/mediaMap.json');

// Load existing map or initialize new one
let mediaMap = {};
try {
    mediaMap = JSON.parse(readFileSync(MAP_OUTPUT_FILE, 'utf8'));
} catch (error) {
    console.log('No existing mediaMap.json found, starting fresh.');
}

function kebabCase(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function uploadFile(filePath, cloudinaryFolder, originalFileName) {
    const extension = parse(originalFileName).ext.toLowerCase();
    const baseName = parse(originalFileName).name.toLowerCase().replace(/\\s+/g, '-');
    const normalizedFileName = `${baseName}${extension}`;

    const publicId = `${cloudinaryFolder}/${baseName}`;
    const isVideo = ['.mp4', '.webm', '.mov'].includes(extension);

    // Construct what the local path effectively is for portfolio.ts matching
    const folderSlug = cloudinaryFolder.split('/').pop();
    const localKey = `/media/${folderSlug}/${normalizedFileName}`;

    console.log(`Uploading ${filePath} to ${publicId}...`);

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: baseName, // Cloudinary appends to 'folder' if folder is provided so we just use baseName
            folder: cloudinaryFolder,
            resource_type: isVideo ? 'video' : 'image',
            overwrite: true,
            use_filename: true,
            unique_filename: false
        });

        mediaMap[localKey] = result.secure_url;
        console.log(`✅ Success: ${result.secure_url}`);

    } catch (err) {
        console.error(`❌ Failed to upload ${filePath}:`, err.message);
    }
}

async function processDirectory(dirPath, baseFolder) {
    const items = readdirSync(dirPath);

    for (const item of items) {
        if (item === '.DS_Store' || item.startsWith('._')) continue;

        const fullPath = join(dirPath, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            const folderSlug = kebabCase(item);
            const cloudinaryPath = `${baseFolder}/${folderSlug}`;
            await processDirectory(fullPath, cloudinaryPath);
        } else {
            // we are in the destination folder "cloudinaryPath" passed from the parent. 
            // e.g if parent was Brewery, baseFolder is rm-portfolio-live/brewery.
            await uploadFile(fullPath, baseFolder, item);
        }
    }
}

async function main() {
    console.log('Starting Cloudinary media sync...');
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.error('Error: Cloudinary credentials missing from .env.local');
        process.exit(1);
    }

    await processDirectory(MEDIA_ROOT, CLOUDINARY_BASE_FOLDER);

    writeFileSync(MAP_OUTPUT_FILE, JSON.stringify(mediaMap, null, 2));
    console.log(`\\n🎉 Completed! Updated ${MAP_OUTPUT_FILE}`);
}

main();
