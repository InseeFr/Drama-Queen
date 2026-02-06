import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

import type { GoToPage, OverviewItem } from '@/models/lunaticType'

type BreadcrumbProps = {
  sequence: OverviewItem | undefined
  subSequence: OverviewItem | undefined
  goToPage: GoToPage
}

export function Breadcrumb({
  sequence,
  subSequence,
  goToPage,
}: Readonly<BreadcrumbProps>) {
  const { t } = useTranslation()

  const goToSequencePage = () => sequence && goToPage({ page: sequence.page })
  const goToSubSequencePage = () =>
    subSequence && goToPage({ page: subSequence.page })

  return (
    <Breadcrumbs separator={''} aria-label="breadcrumb">
      {sequence && (
        <Button
          className={`text-black rounded-none pb-0 text-[95%] hover:font-bold hover:bg-transparent
            before:content-['\\3009'] before:mr-[0.8em] before:font-bold
            ${subSequence ? '' : 'border-b-2 border-primary'}`
          }
          title={`${t('navigation.header.goToSequence')} ${sequence.label}`}
          disableRipple
          onClick={goToSequencePage}
        >
          {sequence.label}
        </Button>
      )}
      {subSequence && (
        <Button
          className={`text-black rounded-none pb-0 text-[95%] hover:font-bold hover:bg-transparent
            before:content-['\\3009'] before:mr-[0.8em] before:font-bold ml-[0.8em] border-b-2 border-primary`}
          title={`${t('navigation.header.goToSubSequence')} ${subSequence.label}`}
          disableRipple
          onClick={goToSubSequencePage}
        >
          {subSequence.label}
        </Button>
      )}
    </Breadcrumbs>
  )
}
