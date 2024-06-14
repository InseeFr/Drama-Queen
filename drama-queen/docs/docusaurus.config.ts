// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'

const config: Config = {
  markdown: {
    mermaid: true,
  },
  title: 'Drama-Queen',
  tagline: `Orchestrateur enquêteur de la filière d'enquête de l'Insee`,
  favicon: '/img/favicon.ico',

  // Set the production url of your site here
  url: 'https://inseefr.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: 'Drama-Queen/docs',

  // GitHub pages deployment config.
  organizationName: 'InseeFr', // Usually your GitHub org/user name.
  projectName: 'Drama-Queen', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/InseeFr/Drama-Queen/tree/2.1/drama-queen/docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      image: '/img/clipboard.png',
      navbar: {
        title: 'Drama-Queen',
        logo: {
          alt: 'Drama-Queen',
          src: '/img/clipboard.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            label: 'Documentation',
          },
          {
            to: 'changelog',
            label: 'Changelog',
          },
          {
            href: 'https://github.com/InseeFr/Drama-Queen',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/InseeFr/Drama-Queen',
              },
              {
                label: 'Issues',
                href: 'https://github.com/InseeFr/Drama-Queen/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} InseeFr. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
}

export default config
