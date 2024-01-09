const texts = {
  sync: "Synchronisation en cours",
  "sync.download": "Téléchargement des données...",
  "sync.download.surveyUnits": "Unités enquêtées",
  "sync.download.nomenclatures": "Nomenclatures",
  "sync.download.questionnaires": "Questionnaires",
  "sync.upload": "Envoi des données",
  vizu: "Page de visualisation de questionnaire",
  "vizu.input.survey.label": "Questionnaire",
  "vizu.input.survey.helper":
    "L'url d'un json de questionnaire au format Lunatic-model",
  "vizu.input.data.label": "Données",
  "vizu.input.data.helper": "L'url d'un json de données (de réponse)",
  "vizu.input.nomenclatures.label": "Dictionnaire de nomenclatures",
  "vizu.input.nomenclatures.helper":
    "Dictionnaire avec en clé le nom de la nomenclature et en valeur l'url",
  "vizu.button.label": "Visualiser",
  "vizu.queen.label": "Version de Queen",
  "vizu.examples.label": "Ou choisir un exemple :",
  "vizu.examples.select.label": "Exemples",
} as const;

const getTranslation = (s: keyof typeof texts) => texts[s] ?? s;

export function useTranslate() {
  return {
    t: getTranslation,
  };
}
