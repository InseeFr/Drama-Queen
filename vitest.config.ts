import { defineConfig, mergeConfig } from 'vitest/config'

import { buildViteConf } from './vite.config'

export default mergeConfig(
  buildViteConf(false),
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      setupFiles: 'tests/setup.ts',
      coverage: {
        reporter: ['text', 'lcov'],
      },
    },
  }),
)
