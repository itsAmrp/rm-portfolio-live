import { v2 as cloudinary } from 'cloudinary';
import { readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAP_OUTPUT_FILE = join(__dirname, '../src/data/mediaMap.json');
let mediaMap = JSON.parse(readFileSync(MAP_OUTPUT_FILE, 'utf8'));

const filesToUpload = [
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-butter/port ver.png', cloudinaryFolder: 'rm-portfolio-live/anchor-butter', localKey: '/media/anchor-butter/port-ver.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 1.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-1.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 2.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-2.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 3.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-3.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 4.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-4.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 5.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-5.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 7.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-7.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 8.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-8.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 9.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-9.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-moments/Artboard 10.png', cloudinaryFolder: 'rm-portfolio-live/anchor-moments', localKey: '/media/anchor-moments/artboard-10.png' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/anchor-newdale/hero.mp4', cloudinaryFolder: 'rm-portfolio-live/anchor-newdale', localKey: '/media/anchor-newdale/hero.mp4' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/baby-cheramy/hero.mp4', cloudinaryFolder: 'rm-portfolio-live/baby-cheramy', localKey: '/media/baby-cheramy/hero.mp4' },
    { localPath: '/Users/roshanmariadas/Desktop/New media update/Mazda/hero.mp4', cloudinaryFolder: 'rm-portfolio-live/mazda-motor-oil-mena', localKey: '/media/mazda-motor-oil-mena/hero.mp4' }
];

async function uploadFiles() {
    for (const file of filesToUpload) {
        console.log(`Uploading ${file.localPath}...`);
        try {
            const extension = parse(file.localPath).ext.toLowerCase();
            const baseName = parse(file.localPath).name.toLowerCase().replace(/\s+/g, '-');
            const isVideo = ['.mp4', '.webm', '.mov'].includes(extension);

            const result = await cloudinary.uploader.upload(file.localPath, {
                public_id: baseName,
                folder: file.cloudinaryFolder,
                resource_type: isVideo ? 'video' : 'image',
                overwrite: true,
                use_filename: true,
                unique_filename: false
            });

            mediaMap[file.localKey] = result.secure_url;
            console.log(`✅ Success: ${result.secure_url}`);
        } catch (err) {
            console.error(`❌ Failed to upload ${file.localPath}:`, err.message);
        }
    }
    writeFileSync(MAP_OUTPUT_FILE, JSON.stringify(mediaMap, null, 2));
    console.log(`\n🎉 Updated ${MAP_OUTPUT_FILE}`);
}

uploadFiles();
