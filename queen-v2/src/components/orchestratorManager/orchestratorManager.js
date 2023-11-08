import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  GLOBAL_QUEEN_VARIABLES,
  ORCHESTRATOR_COLLECT,
  ORCHESTRATOR_READONLY,
  READ_ONLY,
} from 'utils/constants';
import { EventsManager, INIT_ORCHESTRATOR_EVENT, INIT_SESSION_EVENT } from 'utils/events';
import { useAPI, useAPIRemoteData, useAuth, useGetReferentiel } from 'utils/hook';
import { COMPLETED, VALIDATED, useQuestionnaireState } from 'utils/hook/questionnaire';

import { AppContext } from 'components/app';
import LightOrchestrator from 'components/lightOrchestrator';
import Error from 'components/shared/Error';
import NotFound from 'components/shared/not-found';
import Preloader from 'components/shared/preloader';
import { sendCloseEvent } from 'utils/communication';
import { useConstCallback } from 'utils/hook/useConstCallback';
import surveyUnitIdbService from 'utils/indexedbb/services/surveyUnit-idb-service';
import {
  addGlobalVariablesToData,
  addGlobalVariablesToQuestionnaire,
  checkQuestionnaire,
  getFullData,
  removeNullCollectedData,
} from 'utils/questionnaire';

export const OrchestratorManager = () => {
  const { standalone, apiUrl } = useContext(AppContext);
  const { readonly: readonlyParam, idQ, idSU } = useParams();
  const [surveyUnitData, setSurveyUnitData] = useState(null);
  const [initalStateForLunatic, setInitalStateForLunatic] = useState(null);
  const history = useHistory();

  const readonly = readonlyParam === READ_ONLY;

  const LOGGER = useMemo(
    () =>
      EventsManager.createEventLogger({
        idQuestionnaire: idQ,
        idSurveyUnit: idSU,
        idOrchestrator: readonly ? ORCHESTRATOR_READONLY : ORCHESTRATOR_COLLECT,
      }),
    [idQ, idSU, readonly]
  );

  const { surveyUnit, questionnaire, loadingMessage, errorMessage } = useAPIRemoteData(idSU, idQ);

  const stateData = surveyUnit?.stateData;
  const { oidcUser } = useAuth();
  const isAuthenticated = !!oidcUser?.profile;

  const { getReferentiel } = useGetReferentiel();
  const [init, setInit] = useState(false);

  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);
  const { putUeData /* postParadata */ } = useAPI();
  const [getState, changeState, onDataChange] = useQuestionnaireState(
    surveyUnit?.id,
    stateData?.state
  );

  useEffect(() => {
    /*
     * We add to the logger the new session (which will be store in paradata)
     */
    if (isAuthenticated && questionnaire) {
      LOGGER.addMetadata({ idSession: oidcUser.session_state });
      LOGGER.log(INIT_SESSION_EVENT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, LOGGER, questionnaire]);

  useEffect(() => {
    if (!init && questionnaire && surveyUnit) {
      const { valid, error: questionnaireError } = checkQuestionnaire(questionnaire);
      if (valid) {
        const globalQueenData = {
          [GLOBAL_QUEEN_VARIABLES.GLOBAL_SURVEY_UNIT_ID]: surveyUnit.id,
          [GLOBAL_QUEEN_VARIABLES.GLOBAL_QUESTIONNAIRE_ID]:
            surveyUnit.questionnaireId ?? questionnaire.id,
        };
        const newQuestionnaire = addGlobalVariablesToQuestionnaire(questionnaire, globalQueenData);
        setSource(newQuestionnaire);

        const newData = addGlobalVariablesToData(surveyUnit?.data || {}, globalQueenData);
        setSurveyUnitData(newData);
        setInitalStateForLunatic({
          initialData: newData,
          lastReachedPage: surveyUnit?.stateData?.currentPage,
        });
        setInit(true);
        LOGGER.log(INIT_ORCHESTRATOR_EVENT);
      } else {
        setError(questionnaireError);
      }
    }
  }, [questionnaire, surveyUnit, apiUrl, LOGGER, init]);

  useEffect(() => {
    if (errorMessage) setError(errorMessage);
  }, [errorMessage]);

  /** take a survey-unit as parameter, then save it in IDB, then save paradatas in IDB
   *  If in standalone mode : make API calls to persist data in DB
   */
  const saveData = useConstCallback(async unit => {
    if (!readonly) {
      const putSurveyUnit = async unit => {
        const { id, ...other } = unit;
        await putUeData(id, other);
      };

      await surveyUnitIdbService.addOrUpdateSU(unit);

      /**
       * Disable temporaly paradata
       *
       * const paradatas = LOGGER.getEventsToSend();
       */
      // TODO : make a true update of paradatas : currently adding additional completed arrays => SHOULD save one and only one array
      // await paradataIdbService.update(paradatas);
      if (standalone) {
        // TODO managing errors
        await putSurveyUnit(unit);
        // await postParadata(paradatas);
      }
    }
  });

  const savePartialQueen = useConstCallback(async (newState, newPartialData, lastReachedPage) => {
    const currentState = getState();

    const newData = getFullData(surveyUnitData, removeNullCollectedData(newPartialData));
    setSurveyUnitData(newData);
    saveData({
      comment: {},
      ...surveyUnit,
      stateData: {
        state: newState ?? currentState,
        date: new Date().getTime(),
        currentPage: lastReachedPage,
      },
      data: newData ?? surveyUnitData,
    });
  });

  const closeOrchestrator = useConstCallback(() => {
    if (standalone) {
      history.push('/');
    } else {
      sendCloseEvent(surveyUnit.id);
    }
  });

  const quit = useConstCallback(async (pager, getChangedData) => {
    const { page, maxPage, lastReachedPage } = pager;
    const isLastPage = page === maxPage;
    const newData = getChangedData(true);
    if (isLastPage) {
      // TODO : make algo to calculate COMPLETED event
      changeState(COMPLETED);
      changeState(VALIDATED);
      await savePartialQueen(VALIDATED, newData, lastReachedPage);
    } else await savePartialQueen(undefined, newData, lastReachedPage);
    closeOrchestrator();
  });

  const definitiveQuit = useConstCallback(async (pager, getChangedData) => {
    const { lastReachedPage } = pager;
    const newData = getChangedData(true);
    changeState(VALIDATED);
    await savePartialQueen(VALIDATED, newData, lastReachedPage);
    closeOrchestrator();
  });

  return (
    <>
      {![READ_ONLY, undefined].includes(readonlyParam) && <NotFound />}
      {loadingMessage && <Preloader message={loadingMessage} />}
      {error && <Error message={error} />}
      {!loadingMessage && !error && source && initalStateForLunatic && (
        <LightOrchestrator
          initialData={initalStateForLunatic.initialData}
          lastReachedPage={initalStateForLunatic.lastReachedPage}
          source={source}
          getReferentiel={getReferentiel}
          allData={surveyUnitData}
          autoSuggesterLoading={true}
          standalone={standalone}
          readonly={readonly}
          savingType="COLLECTED"
          pagination={true}
          missing={true}
          shortcut={true}
          filterDescription={false}
          save={savePartialQueen}
          onDataChange={onDataChange}
          close={closeOrchestrator}
          quit={quit}
          definitiveQuit={definitiveQuit}
        />
      )}
    </>
  );
};
