import { IconButton, makeStyles } from '@material-ui/core';
import React, { useRef } from 'react';
import { SIMPLE_CLICK_EVENT, paradataHandler } from 'utils/events';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close } from '@material-ui/icons';
import { Button } from 'components/designSystem/Button';
import D from 'i18n';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const StopModal = React.forwardRef(
  ({ open, setOpen, definitive, quit, definitiveQuit, pageTag }, ref) => {
    const utilInfo = type => {
      return {
        ...SIMPLE_CLICK_EVENT,
        idParadataObject: `${type}-button`,
        page: pageTag,
      };
    };

    const close = () => setOpen(false);
    const agree = () => {
      if (definitive) definitiveQuit();
      else quit();
      setOpen(false);
    };

    const stopTitle = definitive ? D.stopDefinitiveLabelTitle : D.stopLabelTitle;
    const stopDetails = definitive ? D.stopDefinitiveDetails : D.stopDetails;
    const validateLabel = definitive ? D.definitiveValidateButton : D.validateButton;
    const classes = useStyles();
    const agreeRef = useRef();

    const onEntered = () => {
      agreeRef.current.focus();
    };
    return (
      <Dialog
        open={open}
        onClose={close}
        disableEnforceFocus
        onEntered={onEntered}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        container={() => ref.current}
      >
        <>
          <DialogTitle id="alert-dialog-slide-title">
            {stopTitle}

            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <IconButton aria-label="close" className={classes.closeButton} onClick={close}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="alert-dialog-slide-description">{stopDetails}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <Button onClick={paradataHandler(agree)(utilInfo('end-survey'))} ref={agreeRef}>
              {validateLabel}
            </Button>
            <Button onClick={close}>{D.cancelButton}</Button>
          </DialogActions>
        </>
      </Dialog>
    );
  }
);

export default StopModal;
