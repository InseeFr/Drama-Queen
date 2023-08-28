import { useIsFetching } from '@tanstack/react-query'
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useTranslate } from "hooks/useTranslate";
import preloader from './preloader.svg'
import { tss } from "tss-react/mui";
import { Fragment, useState } from "react";
import { useSynchronize } from 'hooks/useSynchronize';

type SyncState = "Idle" |
    "Upload" |
    "Download" |
    "Index";


export const SynchronizePage = () => {
    const { classes } = useStyles();
    const [state, setState] = useState<SyncState>("Download")
    return <Stack spacing={3} alignItems="center">
        <img src={preloader} alt="" className={classes.spinner} />
        {state === "Download" && <DownloadProgress />}
    </Stack>;
}

const DownloadProgress = () => {
    const { __ } = useTranslate();
    const { classes } = useStyles();
    const { progress, data, errors } = useSynchronize();
    console.log(data);
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
    .create(({ theme }) => ({
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
