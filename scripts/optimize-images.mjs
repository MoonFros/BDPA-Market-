/**
 * SAVORA image pipeline.
 *
 * Converts the large generated PNGs in `assets-src/savora` (not committed)
 * into the optimised WebP files served from `public/img/savora`.
 *
 * The remaining photographs in public/img/savora were derived once from
 * generated and earlier sample assets, and are committed as-is.
 *
 * Run with: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'assets-src/savora';
const OUT = 'public/img/savora';

await mkdir(OUT, { recursive: true });

const jobs = [
  { from: `${SRC}/hero-dining.png`, to: 'hero.webp', width: 1800, quality: 84 },
  { from: `${SRC}/interior.png`, to: 'interior.webp', width: 1400 },
  { from: `${SRC}/chef-plating.png`, to: 'chef.webp', width: 1400 },
  { from: `${SRC}/jollof-chicken.png`, to: 'dish-jollof.webp', width: 1200 },
  { from: `${SRC}/grilled-fish.png`, to: 'dish-grilled-fish.webp', width: 1200 },
  { from: `${SRC}/shawarma.png`, to: 'dish-shawarma.webp', width: 1200 },
  { from: `${SRC}/alfredo.png`, to: 'dish-alfredo.webp', width: 1200 },
  { from: `${SRC}/pepper-soup.png`, to: 'dish-pepper-soup.webp', width: 1200 },
  { from: `${SRC}/fried-rice.png`, to: 'dish-fried-rice.webp', width: 1200 },
  { from: `${SRC}/chocolate-cake.png`, to: 'dish-cake.webp', width: 1200 },
  {
    // Grill close-up cropped from the jollof plate photograph.
    from: `${SRC}/jollof-chicken.png`,
    to: 'dish-grilled-chicken.webp',
    width: 760,
    extract: { left: 800, top: 90, width: 580, height: 660 },
  },
];

for (const job of jobs) {
  const input = sharp(job.from);
  if (job.extract) input.extract(job.extract);
  await input
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality ?? 82, effort: 5 })
    .toFile(`${OUT}/${job.to}`);
  console.log('✓', job.to);
}
