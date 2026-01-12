import { Alert } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Navigate, useParams } from 'react-router-dom'
import { assert } from 'tsafe'

import { useEffect } from 'react'

import { useCore, useCoreState } from '@/core'

export function SynchronizeInterrogation() {
  const { interrogationId } = useParams()

  assert(typeof interrogationId === 'string')

  const state = useCoreState('takeControl', 'state')

  const { start } = useCore().functions.takeControl

  useEffect(() => {
    start({ interrogationId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interrogationId])

  if (state.error) {
    return (
      <Stack maxWidth={700} gap={2} marginY={10} marginX="auto">
        <Alert severity="error">{state.error}</Alert>
      </Stack>
    )
  }

  if (state.done) {
    return <Navigate to={`/interrogations/${interrogationId}`} />
  }

  return (
    <Stack alignItems="center" gap={2} marginY={10}>
      <CircularProgress />
      <Typography variant="h6">{state.message}</Typography>
    </Stack>
  )
}
