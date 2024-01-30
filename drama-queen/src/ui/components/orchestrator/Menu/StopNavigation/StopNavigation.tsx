import { Button, Stack, Typography } from '@mui/material'
import { tss } from 'tss-react/mui'
import { StopModal } from '../StopModal/StopModal'
import { useState } from 'react'

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
          <Button
            key={item.label}
            className={classes.navigationButton}
            size="small"
            disableRipple
            onClick={() => toggleModal(item.definitive, !isOpenModal)}
          >
            {index + 1}. {item.label}
          </Button>
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
  navigationButton: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: theme.palette.primary.main,
    lineHeight: '1.5em',
    paddingLeft: '1.2em',
    borderRadius: 0,
    '&:hover, &:focus': {
      fontWeight: 'bold',
      backgroundColor: theme.palette.background.button.light,
    },
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: '10px',
    },
  },
}))
