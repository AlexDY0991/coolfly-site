// Builds every language of the site:
//   dist/      English (deploy to coolflyaircraft.com)
//   dist/zh/   Chinese (deploy to coolflyaircraft.net, or serve at /zh/)
// Each language is a complete site with its own copy of the assets, so it
// can be deployed on its own.
//
//   npm run build              all languages
//   SITE_LANG=zh npm run build  one language into dist/

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const builds = process.env.SITE_LANG
  ? [{ lang: process.env.SITE_LANG, out: 'dist' }]
  : [
      { lang: 'en', out: 'dist' },
      { lang: 'zh', out: 'dist/zh' },
    ];

for (const { lang, out } of builds) {
  const result = spawnSync(process.execPath, [join(root, 'scripts', 'build-lang.mjs')], {
    stdio: 'inherit',
    env: { ...process.env, SITE_LANG: lang, OUT_DIR: out },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
