import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteEnvs } from 'vite-envs'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEnvs({
      computedEnv: async ({ resolvedConfig }) => {
        const path = await import('path')
        const fs = await import('fs/promises')

        const packageJson = JSON.parse(
          await fs.readFile(path.resolve(__dirname, 'package.json'), 'utf-8')
        )

        // Here you can define any arbitrary values they will be available
        // in `import.meta.env` and it's type definitions.
        // You can also compute defaults for variable declared in `.env` files.
        return {
          APP_VERSION: packageJson.version,
          LUNATIC_VERSION: packageJson.dependencies['@inseefr/lunatic'],
        }
      },
    }),
    federation({
      name: 'drama-queen',
      filename: 'remoteEntry.js',
      exposes: {
        './DramaIndex': './src/bootstrap.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
    tsconfigPaths(),
    VitePWA({
      //Generate the external service worker for pearl
      injectRegister: false,
      strategies: 'injectManifest',
      manifest: false,
      srcDir: 'src',
      filename: 'queen-service-worker.js',
      // main file is 2.14 MB, and default value is 2.09 MB, so we adjust maximumFileSizeToCacheInBytes to cache all needed files
      // https://vite-pwa-org.netlify.app/guide/faq#missing-assets-from-sw-precache-manifest
      injectManifest: {
        maximumFileSizeToCacheInBytes: 2500000,
        // do not minify to avoid variable name conflicts with parent-app
        minify: false,
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: true,
    sourcemap: true,
  },
})
