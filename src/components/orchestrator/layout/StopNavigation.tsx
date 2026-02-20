import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

import { useState } from 'react'

import { Modal } from '@/components/ui/Modal'

import { MenuNavigationButton } from './MenuNavigationButton'

type StopNavigationProps = {
  quit: () => void
  definitiveQuit: () => void
}

type StopItem = {
  definitive: boolean
  label: string
}

export function StopNavigation({
  quit,
  definitiveQuit,
}: Readonly<StopNavigationProps>) {
  const { classes } = useStyles()
  const { t } = useTranslation()
  const [isQuitOpenModal, setIsQuitOpenModal] = useState<boolean>(false)
  const [isDefinitiveModal, setIsDefinitiveModal] = useState<boolean>(false)

  const stopItems: StopItem[] = [
    {
      definitive: true,
      label: t('navigation.menu.definitiveQuestionnaireStop'),
    },
    {
      definitive: false,
      label: t('navigation.menu.temporaryQuestionnaireStop'),
    },
  ]

  const quitModalTitle = isDefinitiveModal
    ? t('navigation.quitModal.definitive.title')
    : t('navigation.quitModal.temporary.title')
  const quitModalContent = isDefinitiveModal
    ? t('navigation.quitModal.definitive.label')
    : t('navigation.quitModal.temporary.label')
  const quitModalValidateLabel = isDefinitiveModal
    ? t('navigation.quitModal.definitive.validate')
    : t('navigation.quitModal.temporary.validate')

  const quitModalOnOpen = (definitive: boolean) => {
    setIsQuitOpenModal(true)
    setIsDefinitiveModal(definitive)
  }

  const quitModalOnClose = () => setIsQuitOpenModal(false)

  const quitModalValidateOnClick = isDefinitiveModal ? definitiveQuit : quit

  const quitModalButtons = [
    {
      label: t('common.cancel'),
      onClick: quitModalOnClose,
      autoFocus: false,
    },
    {
      label: quitModalValidateLabel,
      onClick: quitModalValidateOnClick,
      autoFocus: true,
    },
  ]

  return (
    <Stack className={classes.navigationContainer}>
      <Typography variant="overline" className={classes.typography}>
        {t('navigation.menu.questionnaireStopNature')}
      </Typography>
      <Stack>
        {stopItems.map((item, index) => (
          <MenuNavigationButton
            key={item.label}
            label={`${index + 1}. ${item.label}`}
            onClick={() => quitModalOnOpen(item.definitive)}
          />
        ))}
      </Stack>
      <Modal
        isOpen={isQuitOpenModal}
        dialogTitle={quitModalTitle}
        dialogContent={quitModalContent}
        buttons={quitModalButtons}
        onClose={quitModalOnClose}
      />
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  navigationContainer: { gap: '1.5em' },
  typography: {
    lineHeight: '1.5em',
    paddingLeft: '1.2em',
  },
}))
