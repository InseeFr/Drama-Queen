import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTranslate } from "hooks/useTranslate";
import preloader from 'ui/assets/preloader.svg';
import { tss } from "tss-react/mui";
import { Fragment, useEffect, useState } from "react";
import { type PullData, usePullData } from 'hooks/usePullData';
import { SyncError } from "hooks/queries/SyncError";
import { storeSyncProgress } from "./storeSyncProgress";
import { db } from 'core/indexedDb';

type SyncState = "Idle" | "Push" | "Pull" | "End";


export const SynchronizePage = () => {
    const { classes } = useStyles();
    const [state, setState] = useState<SyncState>("Pull")

    useEffect(() => {
        storeSyncProgress()
    }, []);

    const handlePullEnd = (data: PullData, errors: SyncError[]) => {
        storeSyncProgress(
            data,
            errors
        )
        db.surveyUnit.bulkAdd(data.surveyUnits);
        setState("End")
    }

    return <Stack spacing={3} alignItems="center">
        {state !== 'End' && <img src={preloader} alt="" className={classes.spinner} />}
        {state === "Pull" && <PullProgress onEnd={handlePullEnd} />}
        {state === "End" && <h1>Finished pulling data</h1>}
    </Stack>;
}

const IndexProgress = () => {
    return <>Index</>
}

type DownloadProgressProps = {
    onEnd: (data: PullData, errors: SyncError[]) => void
}

const PullProgress = ({ onEnd }: DownloadProgressProps) => {
    const { __ } = useTranslate();
    const { classes } = useStyles();
    const { progress, data, errors, status } = usePullData({
        onEnd: onEnd
    });
    const progressBars = [{
        progress: progress.surveyUnits,
        label: __('sync.surveyUnits')
    },
    {
        progress: progress.nomenclatures,
        label: __('sync.nomenclatures')
    },
    {
        progress: progress.questionnaires,
        label: __('sync.questionnaires')
    }]
        .filter(bar => bar.progress !== null)

    return <>
        <Stack spacing={1} alignItems="center">
            <Typography variant="h3" fontWeight="bold">{__('sync.progress')}</Typography>
            <Typography variant="h6" className={classes.lightText}>{__('sync.download')}</Typography>
        </Stack>
        <Stack spacing={2}>
            {progressBars.map(bar =>
                <Fragment key={bar.label}>
                    <Stack spacing={1}>
                        <Typography variant="body2" fontWeight="bold"
                            className={classes.lightText}>{bar.label}</Typography>
                        <LinearProgress variant="determinate" value={bar.progress! * 100}
                            className={classes.progressBar} />
                    </Stack>
                </Fragment>)}
        </Stack>
    </>
}

const useStyles = tss
    .create(() => ({
        lightText: {
            opacity: .75,
        },
        spinner: {
            width: 200,
            height: 200
        },
        progressBar: {
            maxWidth: 700,
            width: '80vw',
            height: 10,
            borderRadius: 10
        }
    }));
