import { useEffect } from "react";
import { useCoreState, useCoreFunctions, useCoreEvts, selectors } from "core";
import { useEvt } from "evt/hooks"
import { useTranslate } from "hooks/useTranslate";
import { LoadingDisplay } from "./LoadingDisplay";

export function SynchronizeData() {
  const { __ } = useTranslate();

  /* refactor this when redux-clean-archi updated */
  const { isRunning: showProgress } = useCoreState(selectors.synchronizeData.isRunning);

  const { isUploading } = useCoreState(selectors.synchronizeData.isUploading)
  const { uploadProgress } = useCoreState(selectors.synchronizeData.uploadProgress);
  const { isDownloading } = useCoreState(selectors.synchronizeData.isDownloading)
  const { nomenclatureProgress } = useCoreState(selectors.synchronizeData.nomenclatureProgress);
  const { surveyProgress } = useCoreState(selectors.synchronizeData.surveyProgress);
  const { surveyUnitProgress } = useCoreState(selectors.synchronizeData.surveyUnitProgress)


  const { synchronizeData } = useCoreFunctions();

  useEffect(() => {
    console.log("showProgress", showProgress)
  }, [showProgress]);

  useEffect(
    () => {
      synchronizeData.upload();
    }, []
  );

  const { evtSynchronizeData } = useCoreEvts();

  useEvt(
    ctx => {
      evtSynchronizeData.$attach(
        data => data.action === "redirect" ? [data] : null, ctx, () => {
          console.log("we should redirect to ", window.location.href);
        }
      )
    },
    []
  );

  if (!showProgress) {
    return null;
  }

  const uploadProgressBars = [{
    progress: uploadProgress,
  }];

  const progressBars = [{
    progress: surveyProgress,
    label: __('sync.download.questionnaires')
  },
  {
    progress: nomenclatureProgress,
    label: __('sync.download.nomenclatures')
  },
  {
    progress: surveyUnitProgress,
    label: __('sync.download.surveyUnits')
  }].filter(bar => bar.progress !== undefined);

  return (
    <>
      {isUploading && <LoadingDisplay progressBars={uploadProgressBars} syncStepTitle={__("sync.upload")} />}
      {isDownloading && <LoadingDisplay progressBars={progressBars} syncStepTitle={__('sync.download')} />}
    </>)
}