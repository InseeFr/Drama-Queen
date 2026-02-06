import Stack from '@mui/material/Stack'

import type { Overview } from '@/models/lunaticType'

import { PageCount } from './PageCount'
import { PrevNext } from './PrevNext'
import { StepProgressBar } from './StepProgressBar'

type NavBarProps = {
  overview: Overview
  page: number
  maxPage: number
  subPage: number | undefined
  nbSubPages: number | undefined
  isPreviousEnabled: boolean
  isNextEnabled: boolean
  onPrevious: () => void
  onNext: () => void
}

export function NavBar({
  overview,
  page,
  maxPage,
  subPage,
  nbSubPages,
  isPreviousEnabled,
  isNextEnabled,
  onPrevious,
  onNext,
}: Readonly<NavBarProps>) {

  const currentSequenceIndex = overview.findIndex(
    (sequence) => sequence.current,
  )

  const nbMaxSequence = overview.length

  const currentSubPage = subPage === undefined ? subPage : subPage + 1

  return (
    <Stack className='gap-8 items-center w-[60px] h-full mt-8'>
      <Stack className="flex flex-grow">
        <StepProgressBar
          currentStep={currentSequenceIndex + 1}
          maxStep={nbMaxSequence}
        />
      </Stack>
      <PageCount currentPage={currentSubPage} maxPage={nbSubPages} />
      <PageCount currentPage={page} maxPage={maxPage} />
      <PrevNext
        isPreviousEnabled={isPreviousEnabled}
        isNextEnabled={isNextEnabled}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </Stack>
  )
}
