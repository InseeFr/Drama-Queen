import { describe, expect, it } from 'vitest'

import { selectors } from './selectors'

const mockStore = (state: any) => ({
  getState: () => state,
})

describe('selectors', () => {
  it('should return main selector for running download state', () => {
    const runningDownloadState = {
      synchronizeData: {
        stateDescription: 'running',
        type: 'download',
        interrogationCompleted: 50,
        totalInterrogation: 200,
        nomenclatureCompleted: 50,
        totalNomenclature: 200,
        surveyCompleted: 50,
        totalSurvey: 200,
        externalResourcesByQuestionnaireCompleted: 50,
        totalExternalResourcesByQuestionnaire: 200,
        totalExternalResources: 200,
        externalResourcesCompleted: 50,
      },
    }

    const store = mockStore(runningDownloadState)

    const result = selectors.main(store.getState())

    expect(result).toEqual({
      isDownloading: true,
      interrogationProgress: 25,
      nomenclatureProgress: 25,
      surveyProgress: 25,
      externalResourcesProgress: 25,
      externalResourcesProgressCount: {
        externalResourcesCompleted: 50,
        totalExternalResources: 200,
      },
    })
  })

  it('should return main selector for running upload state', () => {
    const runningUploadState = {
      synchronizeData: {
        stateDescription: 'running',
        type: 'upload',
        total: 200,
        interrogationCompleted: 50,
      },
    }

    const store = mockStore(runningUploadState)

    const result = selectors.main(store.getState())

    expect(result).toEqual({
      isUploading: true,
      uploadProgress: 25,
    })
  })

  it('should return main selector for not running state', () => {
    const notRunningState = {
      synchronizeData: {
        stateDescription: 'not running',
      },
    }

    const store = mockStore(notRunningState)

    const result = selectors.main(store.getState())

    expect(result).toEqual({ hideProgress: true })
  })
})
