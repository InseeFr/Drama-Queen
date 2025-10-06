import { useEvt } from 'evt/hooks'

import { useEffect } from 'react'

import { useCore, useCoreState } from '@/core'
import { useTranslation } from '@/i18n'

import { LoadingDisplay } from './LoadingDisplay'

export function SynchronizeData() {
  const { t } = useTranslation('synchronizeMessage')

  const {
    hideProgress,
    isUploading,
    isDownloading,
    nomenclatureProgress,
    surveyProgress,
    interrogationProgress,
    externalResourcesProgress,
    externalResourcesProgressCount,
    uploadInterrogationProgress,
    uploadParadataProgress,
  } = useCoreState('synchronizeData', 'main')

  const { synchronizeData } = useCore().functions

  useEffect(() => {
    synchronizeData.upload()
  }, [synchronizeData])

  const { evtSynchronizeData } = useCore().evts

  useEvt((ctx) => {
    evtSynchronizeData.$attach(
      (data) => (data.action === 'redirect' ? [data] : null),
      ctx,
      () => {
        // This is hacky, if anyone has a better solution let's contribute :)
        ;(window.location as any) = window.location.origin
      },
    )
  }, [])

  if (hideProgress) {
    return null
  }

  return (
    <>
      {isUploading && (
        <LoadingDisplay
          progressBars={[
            {
              progress: uploadInterrogationProgress,
              label: t('interrogationsProgress'),
            },
            // render paradata progress bar only if telemetry is enabled
            ...(uploadParadataProgress !== undefined
              ? [
                  {
                    progress: uploadParadataProgress,
                    label: t('paradataProgress'),
                  },
                ]
              : []),
          ]}
          syncStepTitle={t('uploadingData')}
        />
      )}
      {isDownloading && (
        <LoadingDisplay
          progressBars={[
            {
              progress: surveyProgress,
              label: t('questionnairesProgress'),
            },
            {
              progress: nomenclatureProgress,
              label: t('nomenclaturesProgress'),
            },
            {
              progress: interrogationProgress,
              label: t('interrogationsProgress'),
            },
            // render external resources progress bar only if there are external resources
            ...(externalResourcesProgress !== undefined &&
            externalResourcesProgressCount !== undefined
              ? [
                  {
                    progress: externalResourcesProgress,
                    label: t('externalResourcesProgress'),
                    extraTitle: Number.isFinite(
                      externalResourcesProgressCount.totalExternalResources,
                    )
                      ? `${externalResourcesProgressCount.externalResourcesCompleted} / ${externalResourcesProgressCount.totalExternalResources}`
                      : undefined,
                  },
                ]
              : []),
          ]}
          syncStepTitle={t('downloadingData')}
        />
      )}
    </>
  )
}
