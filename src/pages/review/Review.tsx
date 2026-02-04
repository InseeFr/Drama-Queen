import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import { Orchestrator } from '@/components/orchestrator/Orchestrator'
import { Modal } from '@/components/ui/Modal'
import { useCore } from '@/core'
import type { reviewLoader } from '@/core/loader'
import type { Interrogation } from '@/core/model'
import { Route as ReviewRoute } from '@/routes/_layout/review/interrogations/$interrogationId/route'

export function Review() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = ReviewRoute.useLoaderData() as Awaited<
    ReturnType<typeof reviewLoader>
  >
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const { reviewSurvey } = useCore().functions

  const getReferentiel = reviewSurvey.getReferentiel

  const onQuit = (_interrogation: Interrogation) => {
    setIsQuitModalOpen(true)
  }

  const quitModalOnClose = () => setIsQuitModalOpen(false)

  const quitModalTitle = t('navigation.quitModal.review.title')

  const quitModalContent = t('navigation.quitModal.review.label')

  const quitModalButtons = [
    {
      label: t('common.cancel'),
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
