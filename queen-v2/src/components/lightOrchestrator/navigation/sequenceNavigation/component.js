import {
  NEXT_FOCUS,
  PREVIOUS_FOCUS,
  createArrayOfRef,
  createReachableElement,
  getNewFocusElementIndex,
} from 'utils/navigation';
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';

import { ButtonItemMenu } from 'components/designSystem';
import D from 'i18n';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { isReachable } from 'utils/breadcrumb';
import { useConstCallback } from 'utils/hook/useConstCallback';
import { useStyles } from '../component.style';

const SequenceNavigation = ({
  title,
  components,
  setPage,
  setSelectedSequence,
  subSequenceOpen,
  close,
}) => {
  const offset = 1;
  const [currentFocusElement, setCurrentFocusElement] = useState(undefined);
  const [currentFocusElementIndex, setCurrentFocusElementIndex] = useState(0);

  const [listRefs] = useState(
    components
      ? components.reduce(_ => [..._, React.createRef()], createArrayOfRef(offset))
      : createArrayOfRef(offset)
  );
  const reachableRefs = components.reduce((_, current) => {
    return [..._, isReachable(current)];
  }, createReachableElement(offset));

  useEffect(() => {
    if (!subSequenceOpen && currentFocusElementIndex >= 0) {
      listRefs[currentFocusElementIndex].current.focus();
      setCurrentFocusElement(undefined);
    }
  }, [subSequenceOpen, currentFocusElementIndex, listRefs]);

  const setFocus = useConstCallback(index => () => setCurrentFocusElementIndex(index));

  const openSubComponents = sequence => {
    if (sequence.children && sequence.children.length > 0) {
      if (!currentFocusElement || currentFocusElement !== sequence.lunaticId) {
        setSelectedSequence(sequence);
        setCurrentFocusElement(sequence.lunaticId);
      }
      if (currentFocusElement === sequence.lunaticId) {
        listRefs[0].current.focus();
        setSelectedSequence(undefined);
        setCurrentFocusElement(undefined);
      }
    } else if (isReachable(sequence)) {
      setPage(sequence.page);
    }
  };

  const open = sequence => () => openSubComponents(sequence);
  const closeMenu = () => close('sequence');

  const keysToHandle = subSequenceOpen ? ['left', 'esc'] : ['left', 'right', 'esc', 'up', 'down'];
  const keyboardShortcut = (key, e) => {
    e.preventDefault();
    const indexOfSequence = currentFocusElementIndex - offset;
    if (key === 'right' && indexOfSequence >= 0) openSubComponents(components[indexOfSequence]);
    if (key === 'esc' || key === 'left') {
      if (!subSequenceOpen) closeMenu();
      else openSubComponents(components[indexOfSequence]);
    }
    if (key === 'down' || key === 'up') {
      const directionFocus = key === 'down' ? NEXT_FOCUS : PREVIOUS_FOCUS;
      const newRefIndex =
        getNewFocusElementIndex(directionFocus)(currentFocusElementIndex)(reachableRefs);
      listRefs[newRefIndex].current.focus();
    }
  };

  const classes = useStyles();

  return (
    <div className="content">
      <ButtonItemMenu back autoFocus ref={listRefs[0]} onFocus={setFocus(0)} onClick={closeMenu}>
        <span>{'\u3008'}</span>
        {D.goBackNavigation}
      </ButtonItemMenu>
      <div>
        <div className={classes.title}>{title}</div>
        <nav role="navigation">
          <ul>
            {components.map((c, index) => {
              const reachable = c.reached && c.visible;
              return (
                <li key={`breadcrumbEntry-${c.lunaticId}`}>
                  <ButtonItemMenu
                    ref={listRefs[index + offset]}
                    autoFocus={index === 0}
                    selected={currentFocusElementIndex === index + offset}
                    disabled={!reachable}
                    onClick={open(c)}
                    onFocus={setFocus(index + offset)}
                  >
                    {c.label}
                    <span>{`${c.children.length > 0 ? '\u3009' : ''} `}</span>
                  </ButtonItemMenu>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <KeyboardEventHandler
        handleKeys={keysToHandle}
        onKeyEvent={keyboardShortcut}
        handleFocusableElements
      />
    </div>
  );
};

SequenceNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.any).isRequired,
  setPage: PropTypes.func.isRequired,
  setSelectedSequence: PropTypes.func.isRequired,
  subSequenceOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SequenceNavigation;
