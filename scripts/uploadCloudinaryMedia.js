require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER || 'rm-portfolio-live';
const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const MAP_OUTPUT = path.join(process.cwd(), 'src', 'data', 'mediaMap.json');

async function uploadMedia() {
    console.log(`Scanning local files in: ${MEDIA_DIR}`);

    // Find all files in the media directory, ignoring .DS_Store and empty dirs
    const files = await glob('**/*', { cwd: MEDIA_DIR, nodir: true });
    console.log(`Found ${files.length} files to process.`);

    const mediaMap = {};

    for (const relativePath of files) {
        if (relativePath.includes('.DS_Store')) continue;

        // Convert Windows paths to POSIX for consistent keys
        const posixPath = relativePath.split(path.sep).join('/');
        const absolutePath = path.join(MEDIA_DIR, relativePath);

        // Determine target location in Cloudinary based on folder structure
        // e.g. /idemitsu-mena/cover.jpg -> <Folder>/idemitsu-mena/cover
        const parsedPath = path.parse(posixPath);
        const slugDir = parsedPath.dir; // e.g. "idemitsu-mena"
        const filenameNoExt = parsedPath.name; // e.g. "cover"

        // Maintain subfolder structure explicitly 
        const publicId = slugDir
            ? `${CLOUDINARY_FOLDER}/${slugDir}/${filenameNoExt}`
            : `${CLOUDINARY_FOLDER}/${filenameNoExt}`;

        const ext = parsedPath.ext.toLowerCase();

        let resourceType = 'auto'; // let Cloudinary decide initially
        if (['.mp4', '.webm', '.mov'].includes(ext)) {
            resourceType = 'video';
        } else if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
            resourceType = 'image';
        }

        console.log(`Uploading: ${posixPath} as ${resourceType}...`);

        try {
            const result = await cloudinary.uploader.upload(absolutePath, {
                public_id: publicId,
                resource_type: resourceType,
                overwrite: true,
            });

            // The key in mediaMap will be the local path format expected by the frontend
            // e.g. "/media/idemitsu-mena/cover.jpg"
            const mapKey = `/media/${posixPath}`;

            // Store the secure delivery URL
            mediaMap[mapKey] = result.secure_url;
            console.log(`  -> Success: ${result.secure_url}`);

        } catch (error) {
            console.error(`  -> Failed to upload ${posixPath}:`, error.message);
        }
    }

    // Save the manifest map to the data layer directory securely
    fs.writeFileSync(MAP_OUTPUT, JSON.stringify(mediaMap, null, 2), 'utf-8');
    console.log(`\nUpload complete! Created map with ${Object.keys(mediaMap).length} entries at: ${MAP_OUTPUT}`);
}

uploadMedia().catch(console.error);
