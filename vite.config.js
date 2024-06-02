import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Extendemos las reglas de manejo de JavaScript para incluir .js además de .jsx y .tsx
  esbuild: {
    jsxInject: `import React from 'react';`, // Si aún no lo has hecho, asegúrate de tener esta línea
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  resolve: {
    // Añadimos .js a las extensiones conocidas
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
});
