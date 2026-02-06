import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'

import type { GoToPage, Overview, OverviewItem } from '@/models/lunaticType'

import { MenuNavigationButton } from './MenuNavigationButton'
import { SequenceNavigation } from './SequenceNavigation'
import { StopNavigation } from './StopNavigation'
import { SubSequenceNavigation } from './SubSequenceNavigation'
import { useTheme } from '@mui/material/styles'

type MenuProps = {
  isDrawerOpen: boolean
  readonly: boolean
  questionnaireTitle: string
  overview: Overview
  goToPage: GoToPage
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  quit: () => void
  definitiveQuit: () => void
}

type MenuItem = {
  type: 'survey' | 'stop'
  label: string
}

export function Menu({
  isDrawerOpen,
  readonly,
  questionnaireTitle,
  overview,
  goToPage,
  setIsDrawerOpen,
  quit,
  definitiveQuit,
}: Readonly<MenuProps>) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    MenuItem | undefined
  >(undefined)
  const [selectedSequence, setSelectedSequence] = useState<
    OverviewItem | undefined
  >(undefined)

  const { t } = useTranslation()

  const theme = useTheme()
  const matchesMdBreackpoint = useMediaQuery(theme.breakpoints.up('md'))

  const lunaticVersion = import.meta.env.LUNATIC_VERSION?.replace(/^\^/, '')

  const menuItems: MenuItem[] = [
    { type: 'survey', label: t('navigation.menu.surveyButton') },
    ...(readonly
      ? []
      : [{ type: 'stop', label: t('navigation.menu.stopButton') } as MenuItem]),
  ]

  useEffect(() => {
    // prevents drawer to stay extanded when reopening it
    if (!isDrawerOpen) {
      setSelectedMenuItem(undefined)
    }
    // close the third menu panel when closing survey navigation
    if (selectedMenuItem?.type !== 'survey') {
      setSelectedSequence(undefined)
    }
  }, [isDrawerOpen, selectedMenuItem])

  const toggleExpandedMenu = (menuItem: MenuItem) => {
    if (selectedMenuItem?.type === menuItem.type) {
      return setSelectedMenuItem(undefined)
    }
    return setSelectedMenuItem(menuItem)
  }

  const toggleExpandedSubMenu = (sequence: OverviewItem) => {
    if (selectedSequence === sequence) {
      return setSelectedSequence(undefined)
    }
    return setSelectedSequence(sequence)
  }

  // closes the menu and redirects to the first page of the sequence
  function goToComponent(component: OverviewItem) {
    goToPage({ page: component.page })
    setIsDrawerOpen(false)
  }

  // click on a sequence in the second menu panel
  const sequenceOnClick = (sequence: OverviewItem) => {
    // sequence has subsequences, clicking on it extends the menu with a third panel
    if (sequence.children.length > 0) {
      if (!selectedSequence || selectedSequence === sequence) {
        return toggleExpandedSubMenu(sequence)
      }
      return setSelectedSequence(sequence)
    }
    // sequence has no subsequence, clicking on it closes the menu and redirects to the first page of the sequence
    goToComponent(sequence)
  }

  // click on a sequence/subsequence in the third menu panel closes the menu and redirects to the first page of the sequence/subsequence
  const subSequenceOnClick = (component: OverviewItem) => {
    goToComponent(component)
  }

  return (
    <Stack className="flex-row h-full pt-[65px] overflow-y-auto">
      {(!selectedMenuItem || matchesMdBreackpoint) && (
        <Stack className="w-[250px] justify-between">
          <Stack className="gap-6 mt-[30px]">
            <Typography
              variant="overline"
              className="text-info leading-6 pl-[1.2em] mt-[30px]"
            >
              {t('navigation.menu.goTo')}
            </Typography>
            <Stack>
              {menuItems.map((menuItem, index) => (
                <MenuNavigationButton
                  key={`${menuItem.type}-${index}`}
                  className={
                    selectedMenuItem === menuItem ? "bg-button-light" : ''
                  }
                  label={menuItem.label}
                  endIcon={<ChevronRightIcon />}
                  autofocus={index === 0}
                  onClick={() => toggleExpandedMenu(menuItem)}
                />
              ))}
            </Stack>
          </Stack>
          <Stack className="relative left-0 bottom-0 bg-background-default border-t border-info text-center py-0.5">
            <Typography>
              Queen : {import.meta.env.APP_VERSION} | Lunatic : {lunaticVersion}
            </Typography>
          </Stack>
        </Stack>
      )}
      {selectedMenuItem && (!selectedSequence || matchesMdBreackpoint) && (
        <Stack className="w-[250px] lg:w-[375px] border-l border-info overflow-y-auto md:bg-background-default">
          <MenuNavigationButton
            label={t('navigation.menu.back')}
            startIcon={<ChevronLeftIcon />}
            autofocus
            onClick={() => toggleExpandedMenu(selectedMenuItem)}
          />
          {selectedMenuItem.type === 'survey' && (
            <Stack className="gap-6 mt-[30px]">
              <SequenceNavigation
                questionnaireTitle={questionnaireTitle}
                overview={overview}
                selectedSequence={selectedSequence}
                sequenceOnClick={sequenceOnClick}
              />
            </Stack>
          )}

          {selectedMenuItem.type === 'stop' && (
            <Stack className="gap-6 mt-[30px]">
              <StopNavigation quit={quit} definitiveQuit={definitiveQuit} />
            </Stack>
          )}
        </Stack>
      )}
      {selectedSequence && (
        <Stack className="w-[250px] lg:w-[375px] border-l border-info overflow-y-auto">
          <MenuNavigationButton
            label={t('navigation.menu.back')}
            startIcon={<ChevronLeftIcon />}
            autofocus
            onClick={() => toggleExpandedSubMenu(selectedSequence)}
          />
          <Stack className="gap-6 mt-[30px]">
            <SubSequenceNavigation
              sequence={selectedSequence}
              subSequenceOnClick={subSequenceOnClick}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}