import { Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { useState } from 'react'
import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'
import { QuitModal } from 'ui/components/QuitModal'

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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isDefinitiveModal, setIsDefinitiveModal] = useState<boolean>(false)

  const stopItems: StopItem[] = [
    {
      definitive: true,
      label:
        "Arrêt définitif de l'interview (refus, impossibilité de continuer, ...)",
    },
    {
      definitive: false,
      label: "Arrêt provisoire de l'interview",
    },
  ]

  const quitModalTitle = isDefinitiveModal
    ? 'Arrêt définitif'
    : 'Arrêt provisoire'
  const quitModalContent = isDefinitiveModal
    ? 'Confirmez-vous l’arrêt définitif du questionnaire ?'
    : 'Vous allez sortir du questionnaire'
  const quitModalValidateLabel = isDefinitiveModal
    ? "Valider l'arrêt définitif"
    : 'Valider'

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
        Quelle est la nature de l'arrêt ?
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
