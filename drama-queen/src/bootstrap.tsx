import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { unsubscribeOldSW } from 'unsubscribe_old_sw'
import { router } from 'ui/routing/routes'
import { CoreProvider } from 'createCore'

const CenteredSpinner = () => (
  <Stack alignItems="center" justifyContent="center" height="100vh">
    <CircularProgress size={'5em'} />
  </Stack>
)

const mount = ({ mountPoint }: { mountPoint: HTMLElement }) => {
  console.log('Mount Drama Queen')

  // unsubscribe to old SW
  unsubscribeOldSW()

  const root = createRoot(mountPoint)
  root.render(
    <CoreProvider fallback={<CenteredSpinner />}>
      <RouterProvider router={router} />
    </CoreProvider>
  )

  return () => queueMicrotask(() => root.unmount())
}

export { mount }
