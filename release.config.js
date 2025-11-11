import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  branches: ['main'],
  repositoryUrl: 'https://github.com/devflow-modules/vibe-intel',

  // 🔍 Detecta e publica apenas pacotes que mudaram
  extends: 'semantic-release-monorepo',

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: './packages/shared',
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: './packages/core',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'packages/**/package.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
