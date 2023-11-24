import { Fragment } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { tss } from "tss-react/mui";
import { useTranslate } from "hooks/useTranslate";

type LoadingDisplayProps = {
  syncStepTitle: string,
  progressBars: {
    progress: number | undefined,
    label?: string
  }[]

}

export function LoadingDisplay(props: LoadingDisplayProps) {
  const { syncStepTitle, progressBars } = props
  const { __ } = useTranslate();
  const { classes } = useStyles();
  return (
    <Stack spacing={3} alignItems="center">
      <Stack spacing={1} alignItems="center">
        <Typography variant="h3" fontWeight="bold">{__('sync')}</Typography>
        <Typography variant="h6" className={classes.lightText}>{syncStepTitle}</Typography>
      </Stack>
      <Stack spacing={2}>
        {progressBars.map(bar =>
          <Fragment key={`${bar.label}-${bar.progress}`}>
            <Stack spacing={1}>
              <Typography variant="body2" fontWeight="bold"
                className={classes.lightText}>{bar.label}</Typography>
              <LinearProgress variant="determinate" value={bar.progress}
                className={classes.progressBar} />
            </Stack>
          </Fragment>)}
      </Stack>
    </Stack>
  )

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
