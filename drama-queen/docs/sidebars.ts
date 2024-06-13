import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Composants',
      link: {
        type: 'generated-index',
        description:
          'Les composants proposés par la filière (et qui peuvent être décrits grâce aux outils Pogues, Eno et Lunatic)',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Le balisage',
          link: {
            description:
              "Ces composants offrent des indications visuelles pour aider l'utilisateur à s'orienter dans le formulaire",
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'components/decorations/sequence',
            'components/decorations/declaration',
            'components/decorations/global-index',
          ],
        },
        {
          type: 'category',
          label: 'Les champs de saisie et leur affichage',
          link: {
            description:
              'Cette partie décrit les différents composants proposés dans Stromae DSFR pour saisir des informations (et qui peuvent être décrits grâce aux outils Pogues, Eno et Lunatic',
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'components/fields/input',
            'components/fields/inputNumber',
            'components/fields/date',
            'components/fields/duration',
            'components/fields/dropdown',
            'components/fields/suggester',
            'components/fields/radio',
            'components/fields/checkboxGroup',
            'components/fields/table',
          ],
        },
        {
          type: 'category',
          label: 'Les agrégateurs',
          link: {
            description:
              "Quelques composants permettant d'agréger des informations complexes (et qui peuvent être décrits grâce aux outils Pogues, Eno et Lunatic)",
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'components/aggregators/pairwise',
            'components/aggregators/roundabout',
            'components/aggregators/rosterForLoop',
          ],
        },
      ],
    },
    'synchronize',
    'collect',
    'visualize',
    'review',
    {
      type: 'category',
      label: 'Orchestration de questionnaire',
      link: {
        description: "Fonctionnalités de l'orchestrateur",
        type: 'generated-index',
      },
      collapsed: true,
      items: ['orchestrator/pagination', 'orchestrator/navigation'],
    },
    {
      type: 'category',
      label: 'Fonctionnalités transverses',
      link: {
        description: "Fonctionnalités transversales de l'application",
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'transversal/authentification',
        'transversal/routing',
        'transversal/orchestratorRouting',
      ],
    },
  ],
}

export default sidebars
