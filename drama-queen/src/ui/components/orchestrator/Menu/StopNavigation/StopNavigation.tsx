import { Button, Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { StopModal } from '../StopModal/StopModal'
import { useState } from 'react'
import { MenuNavigationButton } from '../../buttons/MenuNavigationButton/MenuNavigationButton'

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

  const title = "Quelle est la nature de l'arrêt ?"

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

  function toggleModal(definitive: boolean, open: boolean) {
    console.log(definitive)
    setIsOpenModal(open)
    setIsDefinitiveModal(definitive)
    console.log(definitive)
  }

  return (
    <Stack className={classes.navigationContainer}>
      <Typography variant="overline" className={classes.typography}>
        {title}
      </Typography>
      <Stack>
        {stopItems.map((item, index) => (
          <MenuNavigationButton
            key={item.label}
            label={`${index + 1}. ${item.label}`}
            onClick={() => toggleModal(item.definitive, !isOpenModal)}
          />
        ))}
      </Stack>
      <StopModal
        isOpen={isOpenModal}
        definitive={isDefinitiveModal}
        toggleModal={toggleModal}
        quit={quit}
        definitiveQuit={definitiveQuit}
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
