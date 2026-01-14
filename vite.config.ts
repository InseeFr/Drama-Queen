import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import { viteEnvs } from 'vite-envs'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const defaultPlugin = [
  react(),
  viteEnvs({
    nameOfTheGlobal: '__QUEEN_ENVS',
    computedEnv: async ({ resolvedConfig }) => {
      const path = await import('path')
      const fs = await import('fs/promises')

      const packageJson = JSON.parse(
        await fs.readFile(path.resolve(__dirname, 'package.json'), 'utf-8'),
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
  tsconfigPaths({
    projects: [
      './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
    ],
  }),
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
      globPatterns: ['**\/*.{js,wasm,css,html,png}'],
      globIgnores: ['queen-service-worker.js'],
      maximumFileSizeToCacheInBytes: 4500000,
      // do not minify to avoid variable name conflicts with parent-app
      minify: false,
    },
  }),
]

export const buildViteConf = (withFederation: boolean) => {
  return {
    plugins: withFederation
      ? [
          ...defaultPlugin,
          federation({
            name: 'drama-queen',
            filename: 'remoteEntry.js',
            exposes: {
              './DramaIndex': './src/bootstrap.tsx',
              './getArticulationTable':
                './src/federation/getArticulationTable.ts',
              './partialResetInterrogation':
                './src/federation/partialResetInterrogation.ts',
            },
            shared: ['react', 'react-dom'],
          }),
        ]
      : defaultPlugin,
    build: {
      target: 'esnext',
    },
    define: {
      global: 'window',
    },
    // https://vite.dev/guide/build.html#advanced-base-options
    experimental: {
      renderBuiltUrl(_filename, { hostType }) {
        /**
         * For js files,
         * We need the urls to be relative not absolute (fix issue when we load directly /questionnaire/{id}),
         * But as for the rest, it must remain absolute to allow application works in legacy and with the new application.
         */
        if (hostType === 'js') return { relative: true }
      },
    },
  }
}

export default buildViteConf(true)
