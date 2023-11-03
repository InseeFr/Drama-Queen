import {
  NEXT_FOCUS,
  PREVIOUS_FOCUS,
  createArrayOfRef,
  createReachableElement,
  getNewFocusElementIndex,
} from 'utils/navigation';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from 'react';
import { dependencies, version } from '../../../../package.json';

import { IconButton } from '@material-ui/core';
import { Apps } from '@material-ui/icons';
import { ButtonItemMenu } from 'components/designSystem';
import D from 'i18n';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useConstCallback } from 'utils/hook/useConstCallback';
import { useStyles } from './component.style';
import SequenceNavigation from './sequenceNavigation';
import StopNavigation from './stopNavigation';
import SubsequenceNavigation from './subSequenceNavigation';

const Navigation = ({
  className,
  title,
  readonly,
  setPage,
  overview,
  quit,
  definitiveQuit,
  currentPage,
}) => {
  const [open, setOpen] = useState(false);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [stopOpen, setStopOpen] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState(undefined);
  const lunaticVersion = dependencies['@inseefr/lunatic'].replace('^', '');

  const offset = 1;

  const menuItemsSurvey = [D.surveyNavigation];
  const menuItemsQuality = !readonly ? ['Arrêt'] : [];

  const [currentFocusElementIndex, setCurrentFocusElementIndex] = useState(0);
  const [listRefs] = useState(
    [...menuItemsSurvey, ...menuItemsQuality].reduce(
      _ => [..._, React.createRef()],
      createArrayOfRef(offset)
    )
  );

  const setFocus = useConstCallback(index => () => setCurrentFocusElementIndex(index));
  const reachableRefs = [...menuItemsSurvey, ...menuItemsQuality].reduce(
    _ => [..._, true],
    createReachableElement(offset)
  );

  const openCloseSubMenu = useConstCallback(type => {
    if (type === 'sequence') {
      setStopOpen(false);
      if (surveyOpen) {
        setSelectedSequence(undefined);
        setSurveyOpen(false);
        listRefs[1].current.focus();
      } else {
        setSurveyOpen(true);
      }
    } else if (type === 'stop') {
      setSurveyOpen(false);
      if (stopOpen) {
        setStopOpen(false);
        listRefs[2].current.focus();
      } else {
        setStopOpen(true);
      }
    }
  });

  const openCloseMenu = useConstCallback(() => {
    if (surveyOpen) openCloseSubMenu('sequence');
    if (stopOpen) openCloseSubMenu('stop');
    setOpen(!open);
    listRefs[0].current.focus();
  });

  const setNavigationPage = useConstCallback(page => {
    openCloseMenu();
    setPage(page);
  });

  const getKeysToHandle = () => {
    if (open && (surveyOpen || stopOpen)) return ['alt+b'];
    if (open) return ['alt+b', 'esc', 'right', 'up', 'down'];
    return ['alt+b'];
  };
  const keysToHandle = getKeysToHandle();

  const keyboardShortcut = (key, e) => {
    e.preventDefault();
    if (key === 'alt+b') {
      openCloseMenu();
    }
    if (key === 'esc' && !surveyOpen) openCloseMenu();
    if (key === 'right') {
      if (currentFocusElementIndex === 1) openCloseSubMenu('sequence');
      if (currentFocusElementIndex === 2) openCloseSubMenu('stop');
    }
    if (key === 'down' || key === 'up') {
      const directionFocus = key === 'down' ? NEXT_FOCUS : PREVIOUS_FOCUS;
      const newRefIndex =
        getNewFocusElementIndex(directionFocus)(currentFocusElementIndex)(reachableRefs);
      listRefs[newRefIndex]?.current?.focus();
    }
  };
  const classes = useStyles();

  const rootRef = useRef();

  const menu = (
    <>
      <IconButton
        ref={listRefs[0]}
        title={D.mainMenu}
        className={classes.menuIcon}
        onClick={openCloseMenu}
        onFocus={setFocus(0)}
      >
        <Apps fontSize={'small'} htmlColor={open ? '#E30342' : '#000000'} />
      </IconButton>
      <div className={`${classes.menu}${open ? ' slideIn' : ''}`}>
        {open && (
          <>
            <div className={classes.navigationContainer}>
              <span className={classes.goToNavigationSpan}>{`${D.goToNavigation} ...`}</span>
              <nav role="navigation">
                <ul>
                  {menuItemsSurvey.map((label, index) => {
                    const type = index === 0 ? 'sequence' : '';
                    return (
                      <li key={label}>
                        <ButtonItemMenu
                          ref={listRefs[index + offset]}
                          selected={currentFocusElementIndex === index + offset}
                          onClick={() => openCloseSubMenu(type)}
                          onFocus={setFocus(index + offset)}
                        >
                          {label}
                          <span>〉</span>
                        </ButtonItemMenu>
                      </li>
                    );
                  })}
                  {menuItemsQuality.map((label, index) => {
                    const type = 'stop';
                    return (
                      <li key={label}>
                        <ButtonItemMenu
                          ref={listRefs[index + menuItemsSurvey.length + offset]}
                          selected={
                            currentFocusElementIndex === index + menuItemsSurvey.length + offset
                          }
                          onClick={() => openCloseSubMenu(type)}
                          onFocus={setFocus(index + menuItemsSurvey.length + offset)}
                        >
                          {label}
                          <span>{'\u3009'}</span>
                        </ButtonItemMenu>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <div
              className={classes.version}
            >{`Queen : ${version} | Lunatic : ${lunaticVersion}`}</div>
          </>
        )}
      </div>
    </>
  );
  return (
    <div ref={rootRef} className={className}>
      {menu}
      {open && (
        <>
          <div
            className={`${classes.subMenuNavigationContainer} ${
              classes.sequenceNavigationContainer
            }${surveyOpen || stopOpen ? ' slideIn' : ''}`}
          >
            {surveyOpen && (
              <SequenceNavigation
                title={title}
                components={overview}
                setPage={setNavigationPage}
                setSelectedSequence={setSelectedSequence}
                subSequenceOpen={!!selectedSequence}
                close={openCloseSubMenu}
              />
            )}
            {stopOpen && (
              <StopNavigation
                ref={rootRef}
                close={openCloseSubMenu}
                quit={quit}
                definitiveQuit={definitiveQuit}
                currentPage={currentPage}
              />
            )}
          </div>
          {surveyOpen && (
            <div
              className={`${classes.subMenuNavigationContainer} ${
                classes.subsequenceNavigationContainer
              }${selectedSequence ? ' slideIn' : ''}`}
            >
              {selectedSequence && selectedSequence.children.length > 0 && (
                <SubsequenceNavigation
                  sequence={selectedSequence}
                  close={() => setSelectedSequence(undefined)}
                  setPage={setNavigationPage}
                />
              )}
            </div>
          )}
        </>
      )}

      {open && <div className={classes.backgroundMenu} onClick={openCloseMenu} />}

      <KeyboardEventHandler
        handleKeys={keysToHandle}
        onKeyEvent={keyboardShortcut}
        handleFocusableElements
      />
    </div>
  );
};

const comparison = (_, nextProps) => {
  return !nextProps.menuOpen && isEqual(_.overview, nextProps.overview);
};

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default React.memo(Navigation, comparison);
