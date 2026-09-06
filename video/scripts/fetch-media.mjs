// Downloads the Higgsfield-generated shots and clips into public/media/ and
// switches the project to local media, so renders are offline and repeatable.
//
//   node scripts/fetch-media.mjs
//
// Re-run it any time src/media.ts gains a new asset; files already present are
// left alone unless you pass --force.

import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mediaDir = join(root, 'public', 'media');
const force = process.argv.includes('--force');

// src/media.ts is TypeScript, so read the URLs out of it rather than importing.
const source = await readFile(join(root, 'src', 'media.ts'), 'utf8');
const cdn = source.match(/const CDN = '([^']+)'/)?.[1];
if (!cdn) throw new Error('Could not find the CDN base in src/media.ts');

const assets = [...source.matchAll(/asset\('([^']+)',\s*'([^']+)'\)/g)].map(([, id, file]) => ({
  id,
  url: `${cdn}/${file}`,
}));

if (assets.length === 0) throw new Error('No assets found in src/media.ts');

await mkdir(mediaDir, { recursive: true });

let downloaded = 0;
for (const { id, url } of assets) {
  const target = join(mediaDir, id);
  if (!force) {
    const existing = await stat(target).catch(() => null);
    if (existing?.size) {
      console.log(`· ${id} (already there)`);
      continue;
    }
  }
  process.stdout.write(`↓ ${id} `);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(target, buf);
  downloaded += 1;
  console.log(`(${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
}

await writeFile(
  join(root, '.env'),
  'REMOTION_MEDIA_SOURCE=local\n',
);

console.log(
  `\nDone — ${downloaded} new file(s) in public/media, and .env now points the project at them.`,
);
