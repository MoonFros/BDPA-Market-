// Converts source imagery in /assets-src into optimized WebP assets in /public/img.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/img';

async function main() {
  let entries;
  try { entries = await fs.readdir(SRC); } catch { console.log('no assets-src dir'); return; }
  const targets = entries.filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  let total = 0;
  for (const file of targets) {
    const name = path.basename(file, path.extname(file));
    let dir = 'products';
    if (name.startsWith('shop-')) dir = 'shops';
    if (name.startsWith('cat-')) dir = 'categories';
    if (name.startsWith('hero-') || name.startsWith('about-')) dir = '.';
    const dest = path.join(OUT, dir, `${name}.webp`);
    const info = await sharp(path.join(SRC, file))
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    total += info.size;
    console.log(`${dest} ${Math.round(info.size / 1024)}KB`);
  }
  console.log(`Done. ${Math.round(total / 1024)}KB total`);
}
main();
