import { useTranslation } from '@/i18n'

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
  const { t } = useTranslation('modalMessage')

  const welcomeModalTitle = t('welcomeModalTitle')
  const welcomeModalContent = t('welcomeModalContent')

  const welcomeModalButtons = [
    { label: t('welcomeModalFirstPage'), onClick: onClose, autoFocus: false },
    { label: t('welcomeModalGoBack'), onClick: onGoBack, autoFocus: true },
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
