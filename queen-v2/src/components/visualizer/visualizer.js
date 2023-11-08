import { useContext, useEffect, useState } from 'react';
import { useGetReferentiel, useRemoteData, useVisuQuery } from 'utils/hook';
import {
  addGlobalVariablesToData,
  addGlobalVariablesToQuestionnaire,
  checkQuestionnaire,
  downloadDataAsJson,
  getFullData,
  removeNullCollectedData,
} from 'utils/questionnaire';

import { AppContext } from 'components/app';
import LightOrchestrator from 'components/lightOrchestrator';
import Error from 'components/shared/Error';
import Preloader from 'components/shared/preloader';
import { useHistory } from 'react-router';
import { GLOBAL_QUEEN_VARIABLES } from 'utils/constants';
import { useQuestionnaireState } from 'utils/hook/questionnaire';
import { useConstCallback } from 'utils/hook/useConstCallback';
import surveyUnitIdbService from 'utils/indexedbb/services/surveyUnit-idb-service';
import QuestionnaireForm from './questionnaireForm';

const Visualizer = () => {
  const { apiUrl, standalone } = useContext(AppContext);
  const [surveyUnitData, setSurveyUnitData] = useState(null);

  const [initalStateForLunatic, setInitalStateForLunatic] = useState(null);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);

  const { questionnaireUrl, dataUrl, nomenclatures, readonly } = useVisuQuery();
  const { surveyUnit, questionnaire, loadingMessage, errorMessage } = useRemoteData(
    questionnaireUrl,
    dataUrl
  );

  const { getReferentielForVizu } = useGetReferentiel(nomenclatures);

  const [getState, , onDataChange] = useQuestionnaireState(
    surveyUnit?.id,
    surveyUnit?.stateData?.state
  );

  const history = useHistory();

  useEffect(() => {
    if (surveyUnit === null) return;
    const insertSuInIndexedDB = async su => {
      console.log('Initiating fake surveyUnit in IDB', su);
      await surveyUnitIdbService.addOrUpdateSU(su);
    };
    insertSuInIndexedDB(surveyUnit);
  }, [surveyUnit]);

  useEffect(() => {
    if (questionnaireUrl && questionnaire && surveyUnit) {
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
      } else {
        setError(questionnaireError);
      }
    }
  }, [questionnaireUrl, questionnaire, surveyUnit, apiUrl]);

  useEffect(() => {
    if (errorMessage) setError(errorMessage);
  }, [errorMessage]);

  const savePartial = useConstCallback(async (newState, newPartialData, lastReachedPage) => {
    const currentState = getState();

    const newData = getFullData(surveyUnitData, removeNullCollectedData(newPartialData));
    setSurveyUnitData(newData);
    const unit = {
      ...surveyUnit,
      stateData: {
        state: newState ?? currentState,
        date: new Date().getTime(),
        currentPage: lastReachedPage,
      },
      data: newData ?? surveyUnit.data,
    };
    await surveyUnitIdbService.addOrUpdateSU(unit);
  });

  const closeAndDownloadData = useConstCallback(async (pager, getChangedData) => {
    const { lastReachedPage } = pager;
    const newData = getFullData(surveyUnitData, removeNullCollectedData(getChangedData(true)));
    const unit = {
      ...surveyUnit,
      stateData: {
        state: getState(),
        date: new Date().getTime(),
        currentPage: lastReachedPage,
      },
      data: newData ?? surveyUnit?.data,
    };

    downloadDataAsJson(unit, 'data');
    history.push('/');
  });

  return (
    <>
      {loadingMessage && <Preloader message={loadingMessage} />}
      {error && <Error message={error} />}
      {questionnaireUrl && source && initalStateForLunatic && (
        <LightOrchestrator
          initialData={initalStateForLunatic.initialData}
          lastReachedPage={initalStateForLunatic.lastReachedPage}
          source={source}
          autoSuggesterLoading={true}
          getReferentiel={getReferentielForVizu}
          allData={surveyUnitData}
          standalone={standalone}
          readonly={readonly}
          pagination={true}
          missing={true}
          save={savePartial}
          onDataChange={onDataChange}
          filterDescription={false}
          quit={closeAndDownloadData}
          definitiveQuit={closeAndDownloadData}
        />
      )}
      {!questionnaireUrl && <QuestionnaireForm />}
    </>
  );
};

export default Visualizer;
