import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

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

export function Modal({
  isOpen,
  dialogTitle,
  dialogContent,
  buttons,
  mandatory = false,
  onClose,
}: Readonly<ModalProps>) {

  const handleClose = (event: any, reason: string) => {
    if (mandatory && ['backdropClick', 'escapeKeyDown'].includes(reason)) {
      event.preventDefault()
      return
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} data-testid="modal-backdrop">
      <Stack className="bg-background-default">
        <Stack className="flex-row justify-between">
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
          {buttons.map((button, index) => (
            <Button
              key={`${index}-${button.label}`}
              className="bg-button-main text-secondary hover:bg-white hover:text-primary focus:bg-white focus:text-primary"
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
