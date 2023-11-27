import { useEffect } from "react";
import { useCoreState, useCore } from "core";
import { useEvt } from "evt/hooks"
import { useTranslate } from "hooks/useTranslate";
import { LoadingDisplay } from "./LoadingDisplay";

export function SynchronizeData() {
  const { __ } = useTranslate();

  const {
    hideProgress,
    isUploading,
    isDownloading,
    nomenclatureProgress,
    surveyProgress,
    surveyUnitProgress,
    uploadProgress
  } = useCoreState("synchronizeData", "main");

  const { synchronizeData } = useCore().functions;


  useEffect(
    () => {
      synchronizeData.upload();
    }, []
  );

  const { evtSynchronizeData } = useCore().evts;

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

  useEffect(() => {
    console.log("surveyUnitProgress", surveyUnitProgress)
  }, [surveyUnitProgress]);

  if (hideProgress) {
    return null;
  }

  return (
    <>
      {isUploading && <LoadingDisplay progressBars={[
        {
          progress: uploadProgress,
          label: undefined
        }
      ]} syncStepTitle={__("sync.upload")} />}
      {isDownloading && <LoadingDisplay
        progressBars={[
          {
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
          }
        ]}
        syncStepTitle={__('sync.download')}
      />}
    </>)
}