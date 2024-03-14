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
import { useTranslation } from 'i18n/i18n'

type QuitModalProps = {
  isOpen: boolean
  dialogTitle: string
  dialogContent: string
  isValidation: boolean
  validateLabel: string | undefined
  onClose: () => void
  onValidate: (() => void) | undefined
}

export function QuitModal(props: QuitModalProps) {
  const {
    isOpen,
    dialogTitle,
    dialogContent,
    isValidation,
    validateLabel,
    onClose,
    onValidate,
  } = props
  const { classes } = useStyles()
  const { t } = useTranslation('modalMessage')

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Stack className={classes.dialogHeader}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <Stack justifyContent={'center'}>
          <IconButton aria-label="close" onClick={onClose}>
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
        <Button
          className={classes.button}
          autoFocus={!isValidation}
          onClick={onClose}
        >
          {t('cancel')}
        </Button>
        {isValidation && (
          <Button
            className={classes.button}
            autoFocus={isValidation}
            onClick={onValidate}
          >
            {validateLabel}
          </Button>
        )}
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
