import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = __dirname;
const guidesDir = path.join(docsDir, 'guide');
const componentsDir = path.join(docsDir, 'components');

// Clean up legacy static HTML files from previous multi-page generator if present
if (fs.existsSync(guidesDir)) {
  fs.rmSync(guidesDir, { recursive: true, force: true });
}
if (fs.existsSync(componentsDir)) {
  fs.rmSync(componentsDir, { recursive: true, force: true });
}

console.log('Documentation SPA configured successfully.');


