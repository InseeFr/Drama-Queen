import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import CloseIcon from '@mui/icons-material/Close'
import { tss } from 'tss-react/mui'
import { useTranslation } from 'i18n'

type ModalProps = {
  isOpen: boolean
  dialogTitle: string
  dialogContent: string
  buttons: {
    label: string
    onClick: () => void
    autoFocus: boolean
  }[]
  mandatory?: boolean
  onClose: () => void
}

export function Modal(props: ModalProps) {
  const {
    isOpen,
    dialogTitle,
    dialogContent,
    buttons,
    mandatory = false,
    onClose,
  } = props
  const { classes } = useStyles()
  const { t } = useTranslation('modalMessage')

  const handleClose = (event: any, reason: string) => {
    if (mandatory && ['backdropClick', 'escapeKeyDown'].includes(reason)) {
      event.preventDefault()
      return
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Stack className={classes.dialog}>
        <Stack className={classes.dialogHeader}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <Stack justifyContent={'center'}>
            {!mandatory && (
              <IconButton aria-label="close" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {buttons.map((button) => (
            <Button
              className={classes.button}
              autoFocus={button.autoFocus}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}
        </DialogActions>
      </Stack>
    </Dialog>
  )
}

const useStyles = tss.create(({ theme }) => ({
  dialog: { backgroundColor: theme.palette.background.default },
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
