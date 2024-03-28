import { useEffect } from 'react'
import { useCoreState, useCore } from 'core'
import { useEvt } from 'evt/hooks'
import { LoadingDisplay } from './LoadingDisplay'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'i18n/i18n'

export function SynchronizeData() {
  const { t } = useTranslation('synchronizeMessage')
  const navigate = useNavigate()

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
        navigate('/')
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
