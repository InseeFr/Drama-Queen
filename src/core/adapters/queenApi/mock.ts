import type { SurveyUnit } from '@/core/model'
import type { QueenApi } from '@/core/ports/QueenApi'

import { surveySample } from './mockData/surveySample'

export function createApiClient(): QueenApi {
  return {
    getSurveyUnitsIdsAndQuestionnaireIdsByCampaign: () =>
      Promise.resolve([{ id: 'id', questionnaireId: 'questionnaireId' }]),
    getSurveyUnits: () =>
      Promise.resolve([
        createSUMocked({}),
        createSUMocked({ idCampaign: 'camp2', idSu: 'su2' }),
      ]),
    getSurveyUnit: (idSurveyUnit) =>
      Promise.resolve(createSUMocked({ idSu: idSurveyUnit })),
    putSurveyUnit: (surveyUnit) =>
      Promise.resolve(
        console.log('putSurveyUnit', `id: ${surveyUnit.id}`, surveyUnit),
      ),
    putSurveyUnitsData: (surveyUnitsData) =>
      Promise.resolve(console.table(surveyUnitsData)),
    postSurveyUnitInTemp: (surveyUnit) =>
      Promise.resolve(
        console.log('postSurveyUnitInTemp', `id: ${surveyUnit.id}`, surveyUnit),
      ),
    getCampaigns: () =>
      Promise.resolve([
        {
          id: 'id',
          questionnaireIds: ['questionnaireIds'],
        },
      ]),
    getQuestionnaire: () => Promise.resolve(surveySample),
    getRequiredNomenclaturesByCampaign: () => Promise.resolve([]),
    getNomenclature: (idNomenclature) =>
      Promise.resolve([{ id: `${idNomenclature}`, label: 'label' }]),
    postParadata: (paradata) =>
      Promise.resolve(console.log('postParadata', paradata)),
  }
}

export const mockPrefixIdSu = 'idSU'

function createSUMocked(props: {
  idSu?: string
  idCampaign?: string
}): SurveyUnit {
  const { idSu = 'su1', idCampaign = 'campaign1' } = props
  return {
    id: `${mockPrefixIdSu}:${idSu}`,
    questionnaireId: `idCampaign${idCampaign}`,
    personalization: [],
    data: {
      EXTERNAL: {},
      CALCULATED: {},
      COLLECTED: {
        PRENOM: {
          EDITED: null,
          FORCED: null,
          INPUTED: null,
          PREVIOUS: null,
          COLLECTED: ['Dad', 'Mom', 'Unknow'],
        },
      },
    },
    stateData: {
      date: 1,
      currentPage: '1',
      state: null,
    },
    comment: {},
  }
}
