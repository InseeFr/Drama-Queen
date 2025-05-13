import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

export const CenteredSpinner = () => (
  <Stack alignItems="center" justifyContent="center" height="100vh">
    <CircularProgress size={'5em'} />
  </Stack>
)
