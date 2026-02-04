import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

import { Fragment } from 'react'

type LoadingDisplayProps = {
  syncStepTitle: string
  progressBars: {
    progress: number
    label?: string
    count?: string
  }[]
}

export function LoadingDisplay({
  syncStepTitle,
  progressBars,
}: Readonly<LoadingDisplayProps>) {
  const { t } = useTranslation()
  const { classes } = useStyles()
  return (
    <Stack spacing={3} alignItems="center">
      <Stack spacing={1} alignItems="center">
        <Typography variant="h3" fontWeight="bold">
          {t('synchronize.synchronizationInProgress')}
        </Typography>
        <Typography variant="h6" className={classes.lightText}>
          {syncStepTitle}
        </Typography>
      </Stack>
      <Stack spacing={2}>
        {progressBars.map(({ label, progress, count }) => (
          <Fragment key={`${label}-${progress}`}>
            <Stack spacing={1}>
              {label !== undefined && (
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  className={classes.lightText}
                >
                  {label}
                  {count ? `: ${count}` : ''}
                </Typography>
              )}
              <LinearProgress
                variant="determinate"
                value={progress}
                className={classes.progressBar}
              />
            </Stack>
          </Fragment>
        ))}
      </Stack>
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  lightText: {
    opacity: 0.75,
  },
  spinner: {
    width: 200,
    height: 200,
  },
  progressBar: {
    maxWidth: 700,
    width: '80vw',
    height: 10,
    borderRadius: 10,
  },
}))
