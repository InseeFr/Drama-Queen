import { useLunatic } from '@inseefr/lunatic';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ButtonContinue from './buttons/continue/index';

import D from 'i18n';
import { componentHasResponse } from 'utils/components/deduceState';
import { LoopPanel } from './LoopPanel';
import { ComponentDisplayer } from './componentDisplayer';
import Header from './header';
import { useStyles } from './lightOrchestrator.style';
import NavBar from './navBar';

function onLogChange(response, value, args) {
  console.log('onChange', { response, value, args });
}

function noDataChange() {
  /**/
}

const preferences = ['COLLECTED'];
const features = ['VTL'];
const savingType = 'COLLECTED';

const missingShortcut = { dontKnow: 'f2', refused: 'f4' };

function LightOrchestrator({
  surveyUnit,
  standalone,
  readonly,
  pagination,
  source,
  getReferentiel,
  missing = true,
  shortcut = true,
  autoSuggesterLoading,
  filterDescription,
  onChange = onLogChange,
  onDataChange = noDataChange,
  save,
  quit,
  definitiveQuit,
}) {
  const { data, stateData } = surveyUnit;
  const classes = useStyles();
  const lunaticStateRef = useRef();

  const lightCustomHandleChange = useCallback(valueChange => {
    if (lunaticStateRef === undefined) return;
    const { getComponents, goNextPage } = lunaticStateRef.current;
    const currentComponent = getComponents()?.[0];
    if (
      currentComponent &&
      !valueChange?.name?.includes('_MISSING') &&
      (currentComponent.componentType === 'Radio' ||
        currentComponent.componentType === 'CheckboxBoolean' ||
        currentComponent.componentType === 'CheckboxOne')
    ) {
      goNextPage();
    }
  }, []);

  const missingStrategy = useCallback(() => {
    if (lunaticStateRef === undefined) return;
    const { goNextPage } = lunaticStateRef.current;
    goNextPage();
  }, []);

  // TODO restore when lunatic handle object in missingButtons properties
  // const dontKnowButton = <MissingButton shortcutLabel="F2" buttonLabel={D.doesntKnowButton} />;
  // const refusedButton = <MissingButton shortcutLabel="F4" buttonLabel={D.refusalButton} />;
  const dontKnowButton = D.doesntKnowButton;
  const refusedButton = D.refusalButton;

  lunaticStateRef.current = useLunatic(source, data, {
    lastReachedPage: stateData?.currentPage ?? '1',
    features,
    pagination,
    onChange: lightCustomHandleChange,
    preferences,
    autoSuggesterLoading,
    getReferentiel,
    missing,
    shortcut,
    missingStrategy,
    withOverview: true,
    missingShortcut,
    dontKnowButton,
    refusedButton,
    withAutofocus: true,
  });

  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    goToPage,
    isFirstPage,
    isLastPage,
    overview = [],
    // waiting,
    pager,

    // getErrors,
    // getModalErrors,
    getCurrentErrors,
    getData,
    loopVariables = [],
    Provider,
  } = lunaticStateRef.current;

  const previousPageTag = useRef();

  // page change : update pager and save data
  useEffect(() => {
    const savingTask = async () => {
      if (lunaticStateRef.current === undefined) return;
      const { getData: freshGetData, pageTag, pager } = lunaticStateRef.current;
      if (previousPageTag.current === undefined) {
        previousPageTag.current = pageTag;
        return;
      }
      if (pageTag !== previousPageTag.current) {
        previousPageTag.current = pageTag;
        const allData = freshGetData();
        onDataChange(allData.COLLECTED);
        save(undefined, allData, pager.lastReachedPage);
      }
    };
    savingTask();
  }, [save, pager, onDataChange]);

  const memoQuit = useCallback(() => {
    const { getData: freshGetData, pager: freshPager } = lunaticStateRef.current;
    quit(freshPager, freshGetData);
  }, [quit]);

  const memoDefinitiveQuit = useCallback(() => {
    const { getData: freshGetData, pager: freshPager } = lunaticStateRef.current;
    definitiveQuit(freshPager, freshGetData);
  }, [definitiveQuit]);

  const [components, setComponents] = useState([]);

  // persist components independently from Lunatic state
  useEffect(() => {
    if (typeof getComponents === 'function') {
      setComponents(getComponents);
    }
  }, [getComponents]);

  // const errors = getErrors();
  // const modalErrors = getModalErrors();
  const currentErrors = typeof getCurrentErrors === 'function' ? getCurrentErrors() : [];

  const trueGoToPage = useCallback(
    targetPage => {
      if (typeof targetPage === 'string') {
        goToPage({ page: targetPage });
      } else {
        const { page, iteration, subPage } = targetPage;
        goToPage({ page: page, iteration: iteration, subPage: subPage });
      }
    },
    [goToPage]
  );

  const goToLastReachedPage = useCallback(() => {
    if (lunaticStateRef.current === undefined) return;
    const { pager } = lunaticStateRef.current;
    trueGoToPage(pager.lastReachedPage);
  }, [trueGoToPage]);

  const firstComponent = useMemo(() => [...components]?.[0], [components]);
  const hasResponse = componentHasResponse(firstComponent);

  const hierarchy = firstComponent?.hierarchy ?? {
    sequence: { label: 'There is no sequence', page: '1' },
  };

  // directly from source, could be in raw VTL in future versions
  const {
    label: { value: questionnaireTitle },
  } = source;

  if (previousPageTag === undefined) return null;

  // lastReachedpage can have values like "35" or like "35.1#1"
  const checkIfLastReachedPage = () => {
    if (pager === undefined || pager.lastReachedPage === undefined) {
      return false;
    }
    const splittedPagerLRP = pager.lastReachedPage.split(/\W+/);
    if (splittedPagerLRP.length === 1) {
      return pager.page === pager.lastReachedPage;
    }
    const [lastPage, lastSubPage, lastIteration] = splittedPagerLRP;
    return (
      pager.page === lastPage &&
      pager.iteration === lastIteration - 1 &&
      pager.subPage === lastSubPage - 1
    );
  };
  const isLastReachedPage = pager !== undefined ? checkIfLastReachedPage() : false;
  const { maxPage, page, subPage, nbSubPages, iteration, nbIterations } = pager;

  return (
    <div className={classes.root}>
      <Header
        title={questionnaireTitle}
        hierarchy={hierarchy}
        setPage={trueGoToPage}
        overview={overview}
        standalone={standalone}
        readonly={readonly}
        quit={memoQuit}
        definitiveQuit={memoDefinitiveQuit}
        currentPage={page}
      />
      <div className={classes.bodyContainer}>
        <div className={classes.mainTile}>
          <div className={classes.activeView}>
            <Provider>
              <ComponentDisplayer
                components={components}
                preferences={preferences}
                features={features}
                readonly={readonly}
                savingType={savingType}
                filterDescription={filterDescription}
                currentErrors={currentErrors}
              />
            </Provider>
            <LoopPanel
              loopVariables={loopVariables}
              getData={getData}
              pager={pager}
              goToPage={trueGoToPage}
            ></LoopPanel>
          </div>
          <ButtonContinue
            readonly={readonly}
            isLastPage={isLastPage}
            page={page}
            quit={memoDefinitiveQuit}
            goNext={goNextPage}
            rereading={!isLastReachedPage}
            isLastReachedPage={isLastReachedPage}
            componentHasResponse={hasResponse}
            goToLastReachedPage={goToLastReachedPage}
          ></ButtonContinue>
        </div>
        <NavBar
          page={page}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          goPrevious={goPreviousPage}
          goNext={goNextPage}
          maxPages={maxPage}
          subPage={subPage + 1}
          nbSubPages={nbSubPages}
          iteration={iteration}
          nbIterations={nbIterations}
          rereading={!isLastReachedPage}
          componentHasResponse={hasResponse}
          isLastReachedPage={isLastReachedPage}
          goLastReachedPage={goToLastReachedPage}
          readonly={readonly}
        />
      </div>
    </div>
  );
}

export default memo(LightOrchestrator);
