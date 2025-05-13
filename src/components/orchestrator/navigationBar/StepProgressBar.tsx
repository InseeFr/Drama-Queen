import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import { tss } from 'tss-react/mui'

type StepProgressBarProps = {
  currentStep: number
  maxStep: number
}

export function StepProgressBar({
  currentStep,
  maxStep,
}: Readonly<StepProgressBarProps>) {
  const { classes, cx } = useStyles()

  const stepBar = (index: number) => (
    <Box
      key={`step-${index}`}
      id={`step-${index}`}
      className={cx(classes.step, index < currentStep && classes.active)}
    />
  )

  return (
    <Stack className={classes.container}>
      {[...Array(maxStep)].map((_, index) => stepBar(index))}
    </Stack>
  )
}

const useStyles = tss.create(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '3px',
    padding: '18px',
    borderRadius: '5px',
    backgroundColor: 'white',
  },
  step: {
    flex: 1,
    width: '7px',
    backgroundColor: '#B8B8B8',
    transition: 'background-color 0.3s ease',
  },
  active: {
    backgroundColor: '#666666',
  },
}))
