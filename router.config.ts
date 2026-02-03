import type { RouterConfig } from '@tanstack/router-cli'

const config: RouterConfig = {
  routesDirectory: 'src/routes',
  routeFileIgnorePrefix: '-',
  routeFileIgnorePattern: /\/_layout\/|\/\$[^/]+\//,
}

export default config
