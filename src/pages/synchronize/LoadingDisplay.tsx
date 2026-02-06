import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

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
  return (
    <Stack spacing={3} alignItems="center">
      <Stack spacing={1} alignItems="center">
        <Typography variant="h3" fontWeight="bold">
          {t('synchronize.synchronizationInProgress')}
        </Typography>
        <Typography variant="h6" className="opacity-75">
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
                  className="opacity-75"
                >
                  {label}
                  {count ? `: ${count}` : ''}
                </Typography>
              )}
              <LinearProgress
                variant="determinate"
                value={progress}
                className="max-w-[700px] w-[80vw] h-2.5 rounded-full"
              />
            </Stack>
          </Fragment>
        ))}
      </Stack>
    </Stack>
  )
}
