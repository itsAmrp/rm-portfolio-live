import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const sourceDir = '/Users/roshanmariadas/Desktop/new Stuff';
const publicDir = path.join(process.cwd(), 'public/media');

const brands = [
  { folder: 'Sampath bank', slug: 'sampath-bank' },
  { folder: 'Anchor Butter', slug: 'anchor-butter' },
  { folder: 'Anchor Moments', slug: 'anchor-moments' },
  { folder: 'Carlsberg', slug: 'brewery' },
  { folder: 'Guinness', slug: 'brewery' }
];

async function processMedia() {
  for (const brand of brands) {
    const srcPath = path.join(sourceDir, brand.folder);
    const destPath = path.join(publicDir, brand.slug);
    
    if (!fs.existsSync(srcPath)) {
      console.log(`Skipping ${brand.folder}, directory not found.`);
      continue;
    }
    
    fs.mkdirSync(destPath, { recursive: true });

    const files = fs.readdirSync(srcPath);
    for (const file of files) {
      if (file.startsWith('.')) continue;
      
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      
      const safeName = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const fullSrcPath = path.join(srcPath, file);
      
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const destFile = path.join(destPath, `${safeName}.webp`);
        console.log(`Optimizing ${file} -> ${brand.slug}/${safeName}.webp`);
        await sharp(fullSrcPath)
          .webp({ quality: 85 })
          .toFile(destFile);
      } else if (ext === '.mp4') {
        const destFile = path.join(destPath, `${safeName}${ext}`);
        console.log(`Copying ${file} -> ${brand.slug}/${safeName}${ext}`);
        fs.copyFileSync(fullSrcPath, destFile);
      }
    }
  }
  console.log('All media processed successfully!');
}

processMedia().catch(console.error);
