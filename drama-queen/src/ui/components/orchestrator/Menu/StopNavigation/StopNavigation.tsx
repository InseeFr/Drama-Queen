import { Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { useState } from 'react'
import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'
import { QuitModal } from 'ui/components/QuitModal'
import { useTranslation } from 'i18n/i18n'

type StopNavigationProps = {
  quit: () => void
  definitiveQuit: () => void
}

type StopItem = {
  definitive: boolean
  label: string
}

export function StopNavigation(props: StopNavigationProps) {
  const { quit, definitiveQuit } = props
  const { classes } = useStyles()
  const { t } = useTranslation('navigationMessage')
  const { t: t2 } = useTranslation('modalMessage')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isDefinitiveModal, setIsDefinitiveModal] = useState<boolean>(false)

  const stopItems: StopItem[] = [
    {
      definitive: true,
      label: t('definitiveQuestionnaireStop'),
    },
    {
      definitive: false,
      label: t('temporaryQuestionnaireStop'),
    },
  ]

  const quitModalTitle = isDefinitiveModal
    ? t2('definitiveQuitTitle')
    : t2('temporaryQuitTitle')
  const quitModalContent = isDefinitiveModal
    ? t2('definitiveQuitContent')
    : t2('temporaryQuitContent')
  const quitModalValidateLabel = isDefinitiveModal
    ? t2('definitiveQuitValidate')
    : t2('temporaryQuitValidate')

  const quitModalOnOpen = (definitive: boolean) => {
    setIsOpenModal(true)
    setIsDefinitiveModal(definitive)
  }

  const quitModalonClose = () => setIsOpenModal(false)

  const quitModalValidate = () => {
    if (isDefinitiveModal) {
      definitiveQuit()
    } else quit()
    close()
  }

  return (
    <Stack className={classes.navigationContainer}>
      <Typography variant="overline" className={classes.typography}>
        {t('questionnaireStopNature')}
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
      <QuitModal
        isOpen={isOpenModal}
        dialogTitle={quitModalTitle}
        dialogContent={quitModalContent}
        isValidation={true}
        validateLabel={quitModalValidateLabel}
        onClose={quitModalonClose}
        onValidate={quitModalValidate}
      />
    </Stack>
  )
}

const useStyles = tss.create(({ theme }) => ({
  navigationContainer: { gap: '1.5em' },
  typography: {
    lineHeight: '1.5em',
    paddingLeft: '1.2em',
  },
}))
