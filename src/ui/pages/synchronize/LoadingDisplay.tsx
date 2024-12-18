import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'

import { Fragment } from 'react'

import { useTranslation } from '@/i18n'

type LoadingDisplayProps = {
  syncStepTitle: string
  progressBars: {
    progress: number
    label: string | undefined
  }[]
}

export function LoadingDisplay(props: LoadingDisplayProps) {
  const { syncStepTitle, progressBars } = props
  const { t } = useTranslation('synchronizeMessage')
  const { classes } = useStyles()
  return (
    <Stack spacing={3} alignItems="center">
      <Stack spacing={1} alignItems="center">
        <Typography variant="h3" fontWeight="bold">
          {t('synchronizationInProgress')}
        </Typography>
        <Typography variant="h6" className={classes.lightText}>
          {syncStepTitle}
        </Typography>
      </Stack>
      <Stack spacing={2}>
        {progressBars.map((bar) => (
          <Fragment key={`${bar.label}-${bar.progress}`}>
            <Stack spacing={1}>
              {bar.label !== undefined && (
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  className={classes.lightText}
                >
                  {bar.label}
                </Typography>
              )}
              <LinearProgress
                variant="determinate"
                value={bar.progress}
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
