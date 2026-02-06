import { Stack } from '@mui/material'
import Box from '@mui/material/Box'

type StepProgressBarProps = {
  currentStep: number
  maxStep: number
}

export function StepProgressBar({
  currentStep,
  maxStep,
}: Readonly<StepProgressBarProps>) {

  const stepBar = (index: number) => (
    <Box
      key={`step-${index}`}
      id={`step-${index}`}
      data-active={index < currentStep}
      className={`flex-1 w-[7px] bg-[#B8B8B8] transition-colors duration-300
        ${index < currentStep ? 'bg-[#666666]' : ''}
      `}
    />
  )

  return (
    <Stack className='flex flex-col h-full gap-[3px] p-[18px] rounded-[5px] bg-white'>
      {[...Array(maxStep)].map((_, index) => stepBar(index))}
    </Stack>
  )
}