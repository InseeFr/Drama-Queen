import { useLunatic } from '@inseefr/lunatic'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { InterrogationData, PageTag } from '@/core/model'

import { isIterationReachable } from './utils'

type LoopPanelProps = {
  loopVariables: string[]
  roundaboutLoopVariables: string[]
  page: number
  subPage: number | undefined
  iteration: number | undefined
  lastReachedPage: PageTag | undefined
  data: InterrogationData
  goToPage: ReturnType<typeof useLunatic>['goToPage']
}

export function LoopPanel({
  loopVariables,
  roundaboutLoopVariables,
  page,
  iteration,
  lastReachedPage,
  data,
  goToPage,
}: Readonly<LoopPanelProps>) {

  const isSimpleLoop = loopVariables.length > 0
  const isRoundaboutLoop = roundaboutLoopVariables.length > 0

  // we don't display anything outside a loop
  if (
    (!isSimpleLoop && !isRoundaboutLoop) ||
    !lastReachedPage ||
    !data.COLLECTED
  ) {
    return null
  }

  // find the depending variable of the loop
  const titleVariable = isSimpleLoop
    ? loopVariables[0]
    : roundaboutLoopVariables[0]

  // get its collected value for every iteration
  const titleData = data.COLLECTED[titleVariable]?.COLLECTED

  if (!Array.isArray(titleData)) {
    return null
  }

  // panel is disabled if you cannot reach the first subPage of the iteration, and always disabled for roundabout loop
  const isDisabledButton = (iteration: number) =>
    isRoundaboutLoop || !isIterationReachable(page, lastReachedPage, iteration)

  // redirects to the first subPage of an iteration (in the same loop so "page" does not change)
  const goToIteration = (index: number) => () =>
    goToPage({ page: page, subPage: 0, iteration: index })

  return (
    <Stack className="gap-4 self-center min-w-[70%]">
      {titleData.map((value, index) => (
        <Button
          className={`justify-between p-4 text-[0.5em] disabled:bg-transparent disabled:border disabled:border-info disabled:border-solid
            ${index === iteration
              ? "bg-[#455a79] text-white hover:bg-white hover:text-[#455a79] focus:bg-white focus:text-[#455a79] disabled:border-2 disabled:border-[#455a79]"
              : "bg-[#6f90c0] text-white hover:bg-white hover:text-[#6f90c0] focus:bg-white focus:text-[#6f90c0]"
            }
            `}
          disabled={isDisabledButton(index)}
          disableRipple
          endIcon={isSimpleLoop && <ChevronRightIcon />}
          onClick={goToIteration(index)}
        >
          <Typography>{`${value}`}</Typography>
        </Button>
      ))}
    </Stack>
  )
}