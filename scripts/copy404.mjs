import { copyFileSync } from 'node:fs';

// GitHub Pages lacks SPA rewrites. Duplicate the app shell for direct route visits.
copyFileSync('dist/index.html', 'dist/404.html');
