import { useState } from 'react'

import { useCore } from '@/core'
import type { SurveyUnit } from '@/core/model'
import { useTranslation } from '@/i18n'
import { Modal } from '@/ui/components/Modal'
import { Orchestrator } from '@/ui/components/orchestrator/Orchestrator'
import type { reviewLoader } from '@/ui/routing/loader'
import { useLoaderData } from '@/ui/routing/utils'

export function Review() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof reviewLoader>>
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false)
  const { t } = useTranslation('modalMessage')

  const { reviewSurvey } = useCore().functions

  const getReferentiel = reviewSurvey.getReferentiel

  const onQuit = (_surveyUnit: SurveyUnit) => {
    setIsQuitModalOpen(true)
  }

  const quitModalOnClose = () => setIsQuitModalOpen(false)

  const quitModalTitle = t('reviewQuitTitle')

  const quitModalContent = t('reviewQuitContent')

  const quitModalButtons = [
    {
      label: t('cancel'),
      onClick: quitModalOnClose,
      autoFocus: false,
    },
  ]

  return (
    <>
      <Modal
        isOpen={isQuitModalOpen}
        dialogTitle={quitModalTitle}
        dialogContent={quitModalContent}
        buttons={quitModalButtons}
        onClose={quitModalOnClose}
      />
      <Orchestrator
        source={loaderData.questionnaire}
        surveyUnit={loaderData.surveyUnit}
        readonly={true}
        onQuit={onQuit}
        onDefinitiveQuit={onQuit}
        onChangePage={undefined}
        getReferentiel={getReferentiel}
      />
    </>
  )
}
