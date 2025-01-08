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
    surveyUnitProgress,
    externalResourcesProgress,
    externalResourcesProgressCount,
    uploadProgress,
  } = useCoreState('synchronizeData', 'main')

  const { synchronizeData } = useCore().functions

  useEffect(() => {
    synchronizeData.upload()
  }, [])

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
              progress: uploadProgress,
            },
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
              progress: surveyUnitProgress,
              label: t('surveyUnitsProgress'),
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
