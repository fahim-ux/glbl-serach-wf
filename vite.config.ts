import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwind()],
  resolve: {
    alias: {
    '@': '/src',
    '@components': '/src/components',
    '@assets': '/src/assets',
    '@utils': '/src/utils',
    '@hooks': '/src/hooks',
    '@styles': '/src/styles',
    '@context': '/src/context',
    '@pages': '/src/pages',
    '@services': '/src/services',
    '@constants': '/src/constants',
    '@types': '/src/types',
    '@config': '/src/config',
    '@store': '/src/store',
    '@routes': '/src/routes',
    '@lib': '/src/lib',
    '@mocks': '/src/mocks'
  }
  }
})
