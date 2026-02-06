import Stack from '@mui/material/Stack'

import type { OverviewItem } from '@/models/lunaticType'

import { MenuNavigationButton } from './MenuNavigationButton'

type subSequenceNavigationProps = {
  sequence: OverviewItem
  subSequenceOnClick: (subSequence: OverviewItem) => void
}

export function SubSequenceNavigation({
  sequence,
  subSequenceOnClick,
}: Readonly<subSequenceNavigationProps>) {

  return (
    <Stack className="gap-6">
      <MenuNavigationButton
        key={sequence.id}
        label={sequence.label}
        onClick={() => subSequenceOnClick(sequence)}
      />
      <Stack>
        {sequence.children.map((subSequence) => (
          // we can only navigate to a subSequence that has already been reached
          <MenuNavigationButton
            key={subSequence.id}
            label={subSequence.label}
            disabled={!subSequence.reached}
            onClick={() => subSequenceOnClick(subSequence)}
          />
        ))}
      </Stack>
    </Stack>
  )
}
