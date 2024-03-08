import { useEffect } from 'react'
import { useCoreState, useCore } from 'core'
import { useEvt } from 'evt/hooks'
import { useTranslate } from 'ui/hooks/useTranslate'
import { LoadingDisplay } from './LoadingDisplay'

export function SynchronizeData() {
  const { t } = useTranslate()

  const {
    hideProgress,
    isUploading,
    isDownloading,
    nomenclatureProgress,
    surveyProgress,
    surveyUnitProgress,
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
        console.log('we should redirect to ', window.location.href)
      }
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
              label: undefined,
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
          ]}
          syncStepTitle={t('downloadingData')}
        />
      )}
    </>
  )
}
