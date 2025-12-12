import { describe, expect, it } from 'vitest'

import { selectors } from './selectors'

const mockStore = (state: any) => ({
  getState: () => state,
})

describe('selectors', () => {
  it('should return progress bars for running download state', () => {
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

    const bars = selectors.progressBars(store.getState())
    const stepTitle = selectors.stepTitle(store.getState())

    expect(bars).toHaveLength(4)
    // questionnaires, nomenclatures, interrogations, external resources
    expect(bars.map((b: any) => Math.round(b.progress))).toEqual([
      25, 25, 25, 25,
    ])
    // last bar should include a count string "completed / total"
    expect(bars[3].count).toBe('50 / 200')
    // step title for download should be a non-empty string
    expect(typeof stepTitle).toBe('string')
    expect(stepTitle.length).toBeGreaterThan(0)
  })

  it('should return progress bars for running upload state', () => {
    const runningUploadState = {
      synchronizeData: {
        stateDescription: 'running',
        type: 'upload',
        totalInterrogation: 200,
        interrogationCompleted: 50,
        totalParadata: 200,
        paradataCompleted: 50,
      },
    }

    const store = mockStore(runningUploadState)

    const bars = selectors.progressBars(store.getState())
    const stepTitle = selectors.stepTitle(store.getState())

    expect(bars).toHaveLength(2)
    expect(bars.map((b: any) => Math.round(b.progress))).toEqual([25, 25])
    expect(typeof stepTitle).toBe('string')
    expect(stepTitle.length).toBeGreaterThan(0)
  })

  it('should return empty progress bars and empty title for not running state', () => {
    const notRunningState = {
      synchronizeData: {
        stateDescription: 'not running',
      },
    }

    const store = mockStore(notRunningState)

    const bars = selectors.progressBars(store.getState())
    const stepTitle = selectors.stepTitle(store.getState())

    expect(bars).toEqual([])
    expect(stepTitle).toBe('')
  })
})
