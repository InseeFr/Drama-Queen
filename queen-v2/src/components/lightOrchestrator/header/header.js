import { ButtonBase, IconButton } from '@material-ui/core';
import { useRef } from 'react';
import { SIMPLE_CLICK_EVENT, paradataHandler } from 'utils/events';

import { ExitToApp } from '@material-ui/icons';
import D from 'i18n';
import insee from 'img/insee.png';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useConstCallback } from 'utils/hook/useConstCallback';
import BreadcrumbQueen from '../breadcrumb';
import Navigation from '../navigation';
import { useStyles } from './header.style';

const Header = ({
  title,
  hierarchy,
  standalone,
  quit,
  definitiveQuit,
  setPage,
  currentPage,
  overview,
  readonly,
}) => {
  const classes = useStyles({ standalone });
  const setToFirstPage = useConstCallback(() => setPage('1'));
  const quitButtonRef = useRef();

  const utilInfo = type => {
    return {
      ...SIMPLE_CLICK_EVENT,
      idParadataObject: `${type}-button`,
      page: currentPage,
    };
  };
  const { sequence, subSequence } = hierarchy;

  const quitShortCut = () => {
    if (quitButtonRef && quitButtonRef.current) quitButtonRef.current.focus();
    quit();
  };

  return (
    <div className={classes.root}>
      <Navigation
        className={classes.headerItemNavigation}
        title={title}
        overview={overview}
        readonly={readonly}
        setPage={setPage}
        quit={quit}
        definitiveQuit={definitiveQuit}
        currentPage={currentPage}
      />
      <div className="header-item">
        <ButtonBase
          focusRipple
          onClick={setToFirstPage}
          aria-label={D.backToBeginning}
          title={D.backToBeginning}
        >
          <img id="logo" src={insee} alt="Logo de L'Insee" className={classes.headerLogo} />
        </ButtonBase>
      </div>
      <div className={classes.headerTitle}>
        <span className={classes.questionnaireTitle}>{title}</span>
        {sequence && (
          <BreadcrumbQueen
            sequence={sequence}
            subsequence={subSequence}
            currentPage={currentPage}
            setPage={setPage}
          />
        )}
      </div>
      {!standalone && (
        <>
          <div className={classes.headerClose}>
            <IconButton
              ref={quitButtonRef}
              title={D.simpleQuit}
              className={classes.closeIcon}
              onClick={paradataHandler(quit)(utilInfo('end-survey'))}
            >
              <ExitToApp htmlColor={'#000000'} />
            </IconButton>
          </div>
          <KeyboardEventHandler
            handleKeys={['alt+q']}
            onKeyEvent={paradataHandler(quitShortCut)(utilInfo('end-survey'))}
            handleFocusableElements
          />
        </>
      )}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
