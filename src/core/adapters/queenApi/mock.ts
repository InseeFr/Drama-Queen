import type { Interrogation } from '@/core/model'
import type { QueenApi } from '@/core/ports/QueenApi'

import { surveySample } from './mockData/surveySample'

export function createApiClient(): QueenApi {
  return {
    getInterrogationsIdsAndQuestionnaireIdsByCampaign: () =>
      Promise.resolve([{ id: 'id', questionnaireId: 'questionnaireId' }]),
    getInterrogations: () =>
      Promise.resolve([
        createInterrogationMocked({}),
        createInterrogationMocked({
          idCampaign: 'camp2',
          idInterrogation: 'interro2',
        }),
      ]),
    fetchMoved: () => Promise.resolve([{ id: 'interro2' }]),
    syncInterrogation: (idInterrogation) =>
      Promise.resolve(
        createInterrogationMocked({ idInterrogation: idInterrogation }),
      ),
    getInterrogation: (idInterrogation) =>
      Promise.resolve(
        createInterrogationMocked({ idInterrogation: idInterrogation }),
      ),
    putInterrogation: (interrogation) =>
      Promise.resolve(
        console.log(
          'putInterrogation',
          `id: ${interrogation.id}`,
          interrogation,
        ),
      ),
    putInterrogationsData: (interrogationsData) =>
      Promise.resolve(console.table(interrogationsData)),
    postInterrogationInTemp: (interrogation) =>
      Promise.resolve(
        console.log(
          'postInterrogationInTemp',
          `id: ${interrogation.id}`,
          interrogation,
        ),
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

export const mockPrefixIdInterrogation = 'idInterrogation'

function createInterrogationMocked(props: {
  idInterrogation?: string
  idCampaign?: string
}): Interrogation {
  const { idInterrogation = 'interro1', idCampaign = 'campaign1' } = props
  return {
    id: `${mockPrefixIdInterrogation}:${idInterrogation}`,
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
