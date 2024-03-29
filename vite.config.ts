import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'path';

// Obtenemos el listado de directorios dentro de src/components y filtramos por el archivos .tsx
// Verificamos que el nombre contenga el string Container
// Genera un array de objetos {id: nombre del directorio y path: ubicación del fichero}
const componentPath = path.resolve(__dirname,'./src/components');
const directoriesArray = [];

function searchFiles(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      searchFiles(filePath);
    } else {
      if (path.extname(file) === '.tsx' && /Container/i.test(file)) {
        const relativePath = path.relative(componentPath, filePath);
        const normalizedPath = relativePath.replace(/\\/g, '/');
        const id = path.dirname(normalizedPath).replace(/\//g, '.');
        directoriesArray.push({ id, path: filePath });
      }
    }
  });
}
searchFiles(componentPath);

// Creamos el objeto final con los datos de componentPath
// Más el {main: './index.html'} para agregar al bundle el core de la aplicación
const inputFiles = directoriesArray.reduce((result, item) => {
  result[item.id] = item.path;
  return result;
}, {
  main: './index.html',
});

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    build: {
      rollupOptions: {
        input: inputFiles
      }
    },
    plugins: [
      react(),
      {
        name: 'generate-script-html',
        writeBundle() {
          require('./generate-script-html.js');
        },
      }
    ],
  })
}
