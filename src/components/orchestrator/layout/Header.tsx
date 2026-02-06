import AppsIcon from '@mui/icons-material/Apps'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import { ShortCut } from '@/components/ui/ShortCut'
import { SHORTCUT_MENU, SHORTCUT_QUIT } from '@/constants/shortcuts'
import { DYNAMIC_PUBLIC_URL } from '@/core/constants'
import type { GoToPage, Overview, OverviewItem } from '@/models/lunaticType'

import { Breadcrumb } from './Breadcrumb'
import { Menu } from './Menu'

type HeaderProps = {
  questionnaireTitle: string
  readonly: boolean
  overview: Overview
  goToPage: GoToPage
  quit: () => void
  definitiveQuit: () => void
}

export function Header({
  questionnaireTitle,
  readonly,
  overview,
  goToPage,
  quit,
  definitiveQuit,
}: Readonly<HeaderProps>) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const menuShortKey = SHORTCUT_MENU
  const quitShortKey = SHORTCUT_QUIT

  const handleDrawerToggle = (open: boolean) => setIsDrawerOpen(open)
  const handleOpen = () => setIsDrawerOpen(true)
  const handleClose = () => setIsDrawerOpen(false)

  const goToFirstPage = () => goToPage({ page: '1' })

  const currentSequence = findCurrentOverviewItem(overview)
  const currentSubSequence = currentSequence
    ? findCurrentOverviewItem(currentSequence.children)
    : undefined

  return (
    <AppBar
      className="flex flex-row items-center bg-white gap-2 border-b border-info"
      elevation={0}
    >
      <Stack className="border-r border-info">
        <IconButton
          className={`${isDrawerOpen ? 'text-[#E30342]' : 'text-black'} [&>svg]:text-[2em]`}
          onClick={() => handleDrawerToggle(!isDrawerOpen)}
          aria-label="menu"
        >
          <AppsIcon />
          <ShortCut
            shortCutKey={menuShortKey}
            onClickMethod={() => handleDrawerToggle(!isDrawerOpen)}
          />
        </IconButton>
      </Stack>
      <SwipeableDrawer
        className='z-1000'
        open={isDrawerOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        PaperProps={{ className: 'min-w-[250px]' }}
      >
        <Menu
          isDrawerOpen={isDrawerOpen}
          readonly={readonly}
          questionnaireTitle={questionnaireTitle}
          overview={overview}
          goToPage={goToPage}
          setIsDrawerOpen={setIsDrawerOpen}
          quit={quit}
          definitiveQuit={definitiveQuit}
        />
      </SwipeableDrawer>

      <Button
        title={t('navigation.header.backToQuestionnaireStart')}
        onClick={goToFirstPage}
      >
        <img
          id="logo"
          src={`${DYNAMIC_PUBLIC_URL}/assets/insee.svg`}
          alt="Logo de L'Insee"
          className="h-12.5"
        />
      </Button>
      <Stack className="pl-4">
        <Typography className="text-black uppercase text-[0.8em]" variant="h1">
          {questionnaireTitle}
        </Typography>
        <Breadcrumb
          sequence={currentSequence}
          subSequence={currentSubSequence}
          goToPage={goToPage}
        />
      </Stack>
      <Stack className="ml-auto border-l border-info w-15">
        <IconButton
          title={t('common.quit')}
          className="text-black [&>svg]:text-[2em]"
          onClick={quit}
        >
          <ExitToAppIcon />
          <ShortCut shortCutKey={quitShortKey} onClickMethod={quit} />
        </IconButton>
      </Stack>
    </AppBar>
  )
}

function findCurrentOverviewItem(
  overviewItems: OverviewItem[],
): OverviewItem | undefined {
  return overviewItems.find((item) => item.current)
}