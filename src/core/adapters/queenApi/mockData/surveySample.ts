import type { Questionnaire } from '@/core/model/Questionnaire'

export const surveySample = {
  componentType: 'Questionnaire',
  variables: [
    {
      variableType: 'COLLECTED',
      values: {
        COLLECTED: null,
      },
      name: 'INPUT',
    },
    {
      variableType: 'COLLECTED',
      values: {
        COLLECTED: null,
      },
      name: 'COMMENT_QE',
    },
    {
      variableType: 'COLLECTED',
      values: {
        COLLECTED: null,
      },
      name: 'INPUT_MISSING',
    },
    {
      variableType: 'COLLECTED',
      values: {
        COLLECTED: null,
      },
      name: 'COMMENT_QE_MISSING',
    },
  ],
  components: [
    {
      componentType: 'Sequence',
      hierarchy: {
        sequence: {
          id: 'lw65iawq',
          page: '1',
          label: {
            type: 'VTL|MD',
            value: '"I - " || "Séquence 1"',
          },
        },
      },
      conditionFilter: {
        type: 'VTL',
        value: 'true',
      },
      id: 'lw65iawq',
      page: '1',
      label: {
        type: 'VTL|MD',
        value: '"I - " || "Séquence 1"',
      },
      declarations: [
        {
          declarationType: 'HELP',
          id: 'lw65geez',
          label: {
            type: 'VTL|MD',
            value: '"Une déclaration de séquence"',
          },
          position: 'AFTER_QUESTION_TEXT',
        },
      ],
    },
    {
      componentType: 'Input',
      missingResponse: {
        name: 'INPUT_MISSING',
      },
      response: {
        name: 'INPUT',
      },
      hierarchy: {
        sequence: {
          id: 'lw65iawq',
          page: '1',
          label: {
            type: 'VTL|MD',
            value: '"I - " || "Séquence 1"',
          },
        },
      },
      conditionFilter: {
        type: 'VTL',
        value: 'true',
      },
      id: 'lw6574kk',
      page: '2',
      label: {
        type: 'VTL|MD',
        value: '"➡ 1. " || "Question input"',
      },
      mandatory: false,
      maxLength: 40,
    },
    {
      componentType: 'Sequence',
      hierarchy: {
        sequence: {
          id: 'COMMENT-SEQ',
          page: '3',
          label: {
            type: 'VTL|MD',
            value: '"Commentaire"',
          },
        },
      },
      conditionFilter: {
        type: 'VTL',
        value: 'true',
      },
      id: 'COMMENT-SEQ',
      page: '3',
      label: {
        type: 'VTL|MD',
        value: '"Commentaire"',
      },
    },
    {
      componentType: 'Textarea',
      missingResponse: {
        name: 'COMMENT_QE_MISSING',
      },
      response: {
        name: 'COMMENT_QE',
      },
      conditionFilter: {
        type: 'VTL',
        value: 'true',
      },
      id: 'COMMENT-QUESTION',
      page: '4',
      label: {
        type: 'VTL|MD',
        value:
          '"➡ 2. " || "Avez-vous des remarques concernant l\'enquête ou des commentaires ?"',
      },
      isMandatory: false,
      maxLength: 2000,
    },
  ],
  pagination: 'question',
  resizing: {},
  missingBlock: {
    INPUT: ['INPUT_MISSING'],
    INPUT_MISSING: ['INPUT'],
    COMMENT_QE: ['COMMENT_QE_MISSING'],
    COMMENT_QE_MISSING: ['COMMENT_QE'],
  },
  label: {
    type: 'VTL|MD',
    value: 'Questionnaire simple',
  },
  lunaticModelVersion: '3.8.0',
  modele: 'QUESTSIMPL',
  enoCoreVersion: '3.21.1-SNAPSHOT',
  generatingDate: '14-05-2024 08:34:15',
  missing: true,
  id: 'lw6534qt',
  maxPage: '4',
} as Questionnaire
