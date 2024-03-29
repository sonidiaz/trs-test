import fs from 'node:fs';
import path from 'path';
const buildDir = path.resolve(__dirname, 'dist/assets/');
const files = fs.readdirSync(buildDir);
const jsFiles = files.filter(file => file.endsWith('.js'));
const cssFiles = files.filter(file => file.endsWith('.css'));
const scriptHtmlContent = `
  ${cssFiles.map(file => `<link rel="stylesheet" href="${process.env.VITE_RTVE_PATH}/${file}">`).join('\n')}
  ${jsFiles.map(file => {
    if (file.startsWith('main-')) {
      return `<script type="module" crossorigin src="${process.env.VITE_RTVE_PATH}/${file}"></script>`;
    } else {
      return `<link rel="modulepreload" crossorigin href="${process.env.VITE_RTVE_PATH}/${file}">`;
    }
  }).join('\n')}
`;

fs.writeFileSync(path.join(buildDir, 'script.html'), scriptHtmlContent);
