import { useState } from 'react'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { Modal } from '@/components/ui/Modal'
import { useCore } from '@/core'
import type { Interrogation } from '@/core/model'
import { useTranslation } from '@/i18n'
import type { reviewLoader } from '@/routes/routing/loader'
import { Route as ReviewRoute } from '@/routes/_layout/review-interrogations/route'

export function Review() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = ReviewRoute.useLoaderData() as Awaited<ReturnType<typeof reviewLoader>>
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false)
  const { t } = useTranslation('modalMessage')

  const { reviewSurvey } = useCore().functions

  const getReferentiel = reviewSurvey.getReferentiel

  const onQuit = (_interrogation: Interrogation) => {
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
        interrogation={loaderData.interrogation}
        readonly={true}
        onQuit={onQuit}
        onDefinitiveQuit={onQuit}
        onChangePage={undefined}
        getReferentiel={getReferentiel}
      />
    </>
  )
}
