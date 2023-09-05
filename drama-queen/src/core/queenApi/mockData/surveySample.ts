import type { Questionnaire } from "core/model/survey";

export const surveySample = {
  id: "lk9s32o5",
  modele: "TESTQUESTI",
  enoCoreVersion: "2.4.3",
  lunaticModelVersion: "2.3.2",
  generatingDate: "19-07-2023 15:49:59",
  missing: true,
  pagination: "question",
  maxPage: "4",
  label: { value: "Test Questionnaire", type: "VTL|MD" },
  components: [
    {
      id: "lk9s5zal",
      componentType: "Sequence",
      page: "1",
      label: { value: '"I - " || "Séquence1"', type: "VTL|MD" },
      declarations: [
        {
          id: "lk9s5zal-lk9sorcs",
          declarationType: "HELP",
          position: "AFTER_QUESTION_TEXT",
          label: {
            value: '"Une déclaration de séquence"',
            type: "VTL|MD",
          },
        },
      ],
      conditionFilter: { value: "true", type: "VTL" },
      hierarchy: {
        sequence: {
          id: "lk9s5zal",
          page: "1",
          label: { value: '"I - " || "Séquence1"', type: "VTL|MD" },
        },
      },
    },
    {
      id: "lk9sncn6",
      componentType: "Input",
      mandatory: false,
      page: "2",
      maxLength: 249,
      label: { value: '"➡ 1. " || "Une question"', type: "VTL|MD" },
      conditionFilter: { value: "true", type: "VTL" },
      hierarchy: {
        sequence: {
          id: "lk9s5zal",
          page: "1",
          label: { value: '"I - " || "Séquence1"', type: "VTL|MD" },
        },
      },
      missingResponse: { name: "Q1_MISSING" },
      bindingDependencies: ["Q1_MISSING", "Q1"],
      response: { name: "Q1" },
    },
    {
      id: "COMMENT-SEQ",
      componentType: "Sequence",
      page: "3",
      label: { value: '"Commentaire"', type: "VTL|MD" },
      conditionFilter: { value: "true", type: "VTL" },
      hierarchy: {
        sequence: {
          id: "COMMENT-SEQ",
          page: "3",
          label: { value: '"Commentaire"', type: "VTL|MD" },
        },
      },
    },
    {
      id: "COMMENT-QUESTION",
      componentType: "Textarea",
      mandatory: false,
      page: "4",
      maxLength: 2000,
      label: {
        value:
          '"Avez-vous des remarques concernant l\'enquête ou des commentaires ?"',
        type: "VTL|MD",
      },
      conditionFilter: { value: "true", type: "VTL" },
      hierarchy: {
        sequence: {
          id: "COMMENT-SEQ",
          page: "3",
          label: { value: '"Commentaire"', type: "VTL|MD" },
        },
      },
      bindingDependencies: ["COMMENT_QE"],
      response: { name: "COMMENT_QE" },
    },
  ],
  variables: [
    {
      variableType: "COLLECTED",
      name: "COMMENT_QE",
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },
    {
      variableType: "COLLECTED",
      name: "Q1",
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },
    {
      variableType: "COLLECTED",
      name: "Q1_MISSING",
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },
  ],
  cleaning: {},
  missingBlock: { Q1_MISSING: ["Q1"], Q1: ["Q1_MISSING"] },
  resizing: {},
} as Questionnaire;
