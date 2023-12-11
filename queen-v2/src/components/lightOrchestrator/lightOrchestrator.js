import { useLunatic } from '@inseefr/lunatic';
import { memo, useEffect, useMemo, useRef } from 'react';
import ButtonContinue from './buttons/continue/index';
import D from 'i18n';
import { isSequenceOrSubsequenceComponent } from 'utils/components/deduceState';
import { QUEEN_URL } from 'utils/constants';
import { useConstCallback } from 'utils/hook/useConstCallback';
import { LoopPanel } from './LoopPanel';
import { ComponentDisplayer } from './componentDisplayer';
import Header from './header';
import { useStyles } from './lightOrchestrator.style';
import NavBar from './navBar';
import { Link } from 'react-router-dom';

function noDataChange() {
  /**/
}

const preferences = ['COLLECTED'];
const features = ['VTL', 'MD'];
const custom = { RouterLink: Link };

const missingShortcut = { dontKnow: 'f2', refused: 'f4' };

const dontKnowButton = D.doesntKnowButton;
const refusedButton = D.refusalButton;

function LightOrchestrator({
  initialData,
  lastReachedPage,
  standalone,
  readonly,
  pagination,
  source,
  getReferentiel,
  missing = true,
  shortcut = true,
  autoSuggesterLoading,
  allData,
  // onChange = onLogChange,
  onDataChange = noDataChange,
  save,
  quit,
  definitiveQuit,
}) {
  const classes = useStyles();

  const lunaticStateRef = useRef();

  const lightCustomHandleChange = useConstCallback(valueChange => {
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
  });

  const missingStrategy = useConstCallback(() => {
    if (lunaticStateRef === undefined) return;
    const { goNextPage } = lunaticStateRef.current;
    goNextPage();
  });

  lunaticStateRef.current = useLunatic(source, initialData, {
    custom,
    lastReachedPage: lastReachedPage ?? '1',
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
    trackChanges: true,
    workersBasePath: `${QUEEN_URL}/workers`,
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
    // getCurrentErrors,
    // getData,
    getChangedData,
    loopVariables = [],
    Provider,
    pageTag,
    hasPageResponse,
  } = lunaticStateRef.current;

  const components = getComponents();

  const previousPageTag = useRef();
  // page change : update pager and save data
  useEffect(() => {
    const savingTask = async () => {
      if (previousPageTag.current === undefined) {
        previousPageTag.current = pageTag;
        return;
      }
      if (pageTag !== previousPageTag.current) {
        previousPageTag.current = pageTag;
        const partialData = getChangedData(true);
        onDataChange(partialData);
        save(undefined, partialData, pager.lastReachedPage);
      }
    };
    savingTask();
  }, [save, pager, onDataChange, pageTag, getChangedData]);

  const trueGoToPage = useConstCallback(targetPage => {
    if (typeof targetPage === 'string') {
      goToPage({ page: targetPage });
    } else {
      const { page, iteration, subPage } = targetPage;
      goToPage({ page: page, iteration: iteration, subPage: subPage });
    }
  });
  const goToLastReachedPage = useConstCallback(() => {
    trueGoToPage(pager.lastReachedPage);
  });

  const memoQuit = useConstCallback(() => {
    quit(pager, getChangedData);
  });

  const memoDefinitiveQuit = useConstCallback(() => {
    definitiveQuit(pager, getChangedData);
  });

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

  const firstComponent = useMemo(() => [...components]?.[0], [components]);
  const hasResponse = hasPageResponse() || isSequenceOrSubsequenceComponent(firstComponent);

  const isLastReachedPage = pager !== undefined ? checkIfLastReachedPage() : false;
  const { maxPage, page, subPage, nbSubPages, iteration, nbIterations } = pager;

  const hierarchy = firstComponent?.hierarchy ?? {
    sequence: { label: 'There is no sequence', page: '1' },
  };
  // directly from source, could be in raw VTL in future versions
  const {
    label: { value: questionnaireTitle },
  } = source;

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
              <ComponentDisplayer components={components} pageTag={pageTag} readonly={readonly} />
            </Provider>
            <LoopPanel
              loopVariables={loopVariables}
              allData={allData}
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
          />
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
