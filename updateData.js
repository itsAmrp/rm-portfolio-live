const fs = require('fs');
const path = require('path');

const portfolioPath = path.join(__dirname, 'src', 'data', 'portfolio.ts');
let content = fs.readFileSync(portfolioPath, 'utf8');

const publicMediaDir = path.join(__dirname, 'public', 'media');

const getFiles = (slug) => {
    const dir = path.join(publicMediaDir, slug);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir);
};

const regex = /slug: "([^"]+)",[\s\S]*?heroMedia: \{[\s\S]*?\},[\s\S]*?gallery: mockGallery\([^)]+\),/g;

content = content.replace(regex, (match, slug) => {
    const files = getFiles(slug);

    let hasVideoHero = files.includes('hero.mp4');
    let hasWebm = files.includes('hero.webm');
    let heroUrl = files.includes('cover.jpg') ? `/media/${slug}/cover.jpg` :
        (files.includes('01.jpg') ? `/media/${slug}/01.jpg` : `/placeholders/hero-${slug}.jpg`);

    if (!files.includes('cover.jpg') && files.includes('01.jpg')) {
        // user instruction fallback if cover missing to prevent 404
        // fs.copyFileSync(path.join(publicMediaDir, slug, '01.jpg'), path.join(publicMediaDir, slug, 'cover.jpg'));
        heroUrl = `/media/${slug}/01.jpg`;
    }

    let heroMediaStr = `heroMedia: {
            type: "${hasVideoHero ? 'video' : 'image'}",
            url: "${hasVideoHero ? `/media/${slug}/poster.jpg` : heroUrl}",`;

    if (hasVideoHero) {
        heroMediaStr += `
            videoMp4: "/media/${slug}/hero.mp4",`;
        if (hasWebm) {
            heroMediaStr += `
            videoWebm: "/media/${slug}/hero.webm",`;
        }
    }

    heroMediaStr += `
            alt: "\${brand} Hero",
        },`;

    const galleryFiles = ['01.jpg', '02.jpg', '03.jpg'].filter(f => files.includes(f));
    let galleryStr = `gallery: [`;
    if (galleryFiles.length > 0) {
        galleryStr += galleryFiles.map(f => `
            { type: "image", url: "/media/${slug}/${f}", alt: "\${brand} gallery image" }`).join(',') + `
        ],`;
    } else {
        galleryStr += `],`;
    }

    // replace heroMedia object
    let newMatch = match.replace(/heroMedia: \{[\s\S]*?\},/, heroMediaStr);
    // replace gallery
    newMatch = newMatch.replace(/gallery: mockGallery\([^)]+\),/, galleryStr);

    // fix alt tags to actually use the brand but wait, we don't have brand variable in the regex.
    // I can extract brand from the match.
    const brandMatch = newMatch.match(/brand: "([^"]+)"/);
    const brand = brandMatch ? brandMatch[1] : slug;
    newMatch = newMatch.replace(/\$\{brand\}/g, brand);

    return newMatch;
});

fs.writeFileSync(portfolioPath, content);
console.log("Portfolio updated.");
