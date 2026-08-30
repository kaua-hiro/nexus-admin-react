import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base only applies to the production build (GitHub Pages serves this repo
// under /nexus-admin-react/); dev mode serves from the root, matching the
// basename App.jsx picks via import.meta.env.DEV.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/nexus-admin-react/' : '/',
}));