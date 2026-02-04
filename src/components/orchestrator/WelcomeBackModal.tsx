import { useTranslation } from 'react-i18next'

import { Modal } from '../ui/Modal'

type WelcomeBackModalProps = {
  isOpen?: boolean
  onClose: () => void
  onGoBack: () => void
}

/**
 * Display a modal when the user come back to the orchestrator, allowing to
 * quickly come back to last page reached.
 */
export function WelcomeBackModal({
  isOpen = false,
  onClose,
  onGoBack,
}: Readonly<WelcomeBackModalProps>) {
  const { t } = useTranslation()

  const welcomeModalTitle = t('navigation.welcomeModal.title')
  const welcomeModalContent = t('navigation.welcomeModal.label')

  const welcomeModalButtons = [
    {
      label: t('navigation.welcomeModal.backToStart'),
      onClick: onClose,
      autoFocus: false,
    },
    {
      label: t('navigation.welcomeModal.resume'),
      onClick: onGoBack,
      autoFocus: true,
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      dialogTitle={welcomeModalTitle}
      dialogContent={welcomeModalContent}
      buttons={welcomeModalButtons}
      mandatory
      onClose={onClose}
    />
  )
}
