import { useContext, useEffect, useState } from 'react';
import { useGetReferentiel, useRemoteData, useVisuQuery } from 'utils/hook';
import {
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
import { useQuestionnaireState } from 'utils/hook/questionnaire';
import { useConstCallback } from 'utils/hook/useConstCallback';
import surveyUnitIdbService from 'utils/indexedbb/services/surveyUnit-idb-service';
import QuestionnaireForm from './questionnaireForm';

const Visualizer = () => {
  const { apiUrl, standalone } = useContext(AppContext);
  const [surveyUnitData, setSurveyUnitData] = useState(null);

  const [surveyUnit, setSurveyUnit] = useState(undefined);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null);

  const { questionnaireUrl, dataUrl, nomenclatures, readonly } = useVisuQuery();
  const {
    surveyUnit: suData,
    questionnaire,
    loadingMessage,
    errorMessage,
  } = useRemoteData(questionnaireUrl, dataUrl);

  const { getReferentielForVizu } = useGetReferentiel(nomenclatures);

  const [getState, , onDataChange] = useQuestionnaireState(
    surveyUnit?.id,
    suData?.stateData?.state
  );

  const history = useHistory();

  useEffect(() => {
    if (suData === null) return;
    const unit = {
      ...suData,
      id: '1234',
    };
    const insertSuInIndexedDB = async su => {
      console.log('Initiating sudata in IDB', su);
      await surveyUnitIdbService.addOrUpdateSU(su);
    };
    insertSuInIndexedDB(unit);
    setSurveyUnit(unit);
  }, [suData]);

  useEffect(() => {
    if (questionnaireUrl && questionnaire && suData) {
      const { valid, error: questionnaireError } = checkQuestionnaire(questionnaire);
      if (valid) {
        setSource(questionnaire);
        setSurveyUnitData(suData?.data || {});
      } else {
        setError(questionnaireError);
      }
    }
  }, [questionnaireUrl, questionnaire, suData, apiUrl]);

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
      {questionnaireUrl && source && surveyUnit && (
        <LightOrchestrator
          surveyUnit={surveyUnit}
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
