import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { tss } from 'tss-react/mui'

type StopModalProps = {
  isOpen: boolean
  definitive: boolean
  toggleModal: (definitive: boolean, open: boolean) => void
  quit: () => void
  definitiveQuit: () => void
}

export function StopModal(props: StopModalProps) {
  const { isOpen, definitive, toggleModal, quit, definitiveQuit } = props
  const { classes } = useStyles()

  const dialogTitle = definitive ? 'Arrêt définitif' : 'Arrêt provisoire'
  const dialogContent = definitive
    ? 'Confirmez-vous l’arrêt définitif du questionnaire ?'
    : 'Vous allez sortir du questionnaire'
  const validateLabel = definitive ? "Valider l'arrêt définitif" : 'Valider'

  const close = () => toggleModal(definitive, !isOpen)

  function validate(definitive: boolean) {
    if (definitive) {
      definitiveQuit()
    } else quit()
    close()
  }

  const validateOnClick = () => validate(definitive)

  return (
    <Dialog open={isOpen} onClose={close}>
      <Stack className={classes.dialogHeader}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Stack justifyContent={'center'}>
          <IconButton aria-label="close" onClick={close}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </Stack>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className={classes.button} onClick={close}>
          Annuler
        </Button>
        <Button className={classes.button} autoFocus onClick={validateOnClick}>
          {validateLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const useStyles = tss.create(({ theme }) => ({
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.palette.background.button.main,
    color: theme.palette.secondary.main,
    '&:hover,&:focus': {
      backgroundColor: 'white',
      color: theme.palette.primary.main,
    },
  },
}))
