import { useEffect, Fragment } from "react";
import { useCoreState, useCoreFunctions, useCoreEvts, selectors } from "core";
import { useEvt } from "evt/hooks"
import { useTranslate } from "hooks/useTranslate";
import { LoadingDisplay } from "./LoadingDisplay";


export function DownloadPage() {
    const { __ } = useTranslate();

    /* refactor this when redux-clean-archi updated */
    const { isRunning: showProgress } = useCoreState(selectors.downloadData.isRunning);
    const { nomenclatureProgress } = useCoreState(selectors.downloadData.nomenclatureProgress);
    const { surveyProgress } = useCoreState(selectors.downloadData.surveyProgress);
    const { surveyUnitProgress } = useCoreState(selectors.downloadData.surveyUnitProgress)

    const { downloadData } = useCoreFunctions();

    useEffect(
        () => {
            downloadData.start();
        }, []
    );

    const { evtDownloadData } = useCoreEvts();

    useEvt(
        ctx => {
            evtDownloadData.$attach(
                data => data.action === "redirect" ? [data] : null,
                ctx,
                () => {
                    console.log("redirect to " + window.location.href)
                }
            );
        },
        []
    );

    if (!showProgress) {
        return null;
    }

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
    }].filter(bar => bar.progress !== undefined)

    return (
        <>
            <LoadingDisplay progressBars={progressBars} syncStepTitle={__('sync.download')} />
        </>

    )
}
