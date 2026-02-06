import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { Overview, OverviewItem } from '@/models/lunaticType'

import { MenuNavigationButton } from './MenuNavigationButton'

type SequenceNavigationProps = {
  questionnaireTitle: string
  overview: Overview
  selectedSequence: OverviewItem | undefined
  sequenceOnClick: (sequence: OverviewItem) => void
}

export function SequenceNavigation({
  questionnaireTitle,
  overview,
  selectedSequence,
  sequenceOnClick,
}: Readonly<SequenceNavigationProps>) {

  // display endIcon only if sequence leads to a subSequences menu
  const getSequenceEndIcon = (sequence: OverviewItem) =>
    sequence.children.length > 0 ? <ChevronRightIcon /> : undefined

  return (
    <Stack className="gap-6">
      <Typography variant="overline" className="leading-6 pl-[1.2em]">
        {questionnaireTitle}
      </Typography>
      <Stack>
        {overview.map((sequence) => (
          // we can only navigate to a sequence that has already been reached
          <MenuNavigationButton
            key={sequence.id}
            className={
              selectedSequence === sequence ? 'bg-button-light' : ''
            }
            label={sequence.label}
            disabled={!sequence.reached}
            endIcon={getSequenceEndIcon(sequence)}
            onClick={() => sequenceOnClick(sequence)}
          />
        ))}
      </Stack>
    </Stack>
  )
}