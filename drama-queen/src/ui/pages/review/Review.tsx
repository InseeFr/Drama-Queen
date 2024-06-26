import { useCore } from 'core'
import { useTranslation } from 'i18n'
import { useState } from 'react'
import { QuitModal } from 'ui/components/QuitModal'
import { Orchestrator } from 'ui/components/orchestrator/Orchestrator'
import type { reviewLoader } from 'ui/routing/loader'
import { useLoaderData } from 'ui/routing/utils'

export function Review() {
  //Cf https://github.com/remix-run/react-router/discussions/9792#discussioncomment-5133635
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof reviewLoader>>
  const [isQuitModalOpen, setIsQuitModalOpen] = useState<boolean>(false)
  const { t } = useTranslation('modalMessage')

  if (!loaderData.isQueenV2) {
    return <queen-app />
  }

  const { reviewSurvey } = useCore().functions

  const getReferentiel = reviewSurvey.getReferentiel

  const onQuit = () => {
    setIsQuitModalOpen(true)
  }

  const quitModalOnClose = () => setIsQuitModalOpen(false)

  const quitModalTitle = t('reviewQuitTitle')

  const quitModalContent = t('reviewQuitContent')

  return (
    <>
      <QuitModal
        isOpen={isQuitModalOpen}
        dialogTitle={quitModalTitle}
        dialogContent={quitModalContent}
        isValidation={false}
        validateLabel={undefined}
        onClose={quitModalOnClose}
        onValidate={undefined}
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
