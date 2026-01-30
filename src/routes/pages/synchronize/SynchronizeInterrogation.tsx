import { Alert } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { assert } from 'tsafe'

import { useEffect } from 'react'

import { useCore, useCoreState } from '@/core'
import { useNavigate } from '@tanstack/react-router'

import { Route as SynchronizeInterrogationRoute } from '@/routes/_layout/synchronize-interrogation/$interrogationId/route'

export function SynchronizeInterrogation() {
  const { interrogationId } = SynchronizeInterrogationRoute.useParams()
  const navigate = useNavigate()

  assert(typeof interrogationId === 'string')

  const state = useCoreState('takeControl', 'state')

  const { start } = useCore().functions.takeControl

  useEffect(() => {
    start({ interrogationId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interrogationId])

  useEffect(() => {
    if (state.done) {
      navigate({ to: `/interrogations/${interrogationId}` })
    }
  }, [interrogationId, state.done, navigate])

  if (state.error) {
    return (
      <Stack maxWidth={700} gap={2} marginY={10} marginX="auto">
        <Alert severity="error">{state.error}</Alert>
      </Stack>
    )
  }

  return (
    <Stack alignItems="center" gap={2} marginY={10}>
      <CircularProgress />
      <Typography variant="h6">{state.message}</Typography>
    </Stack>
  )
}
