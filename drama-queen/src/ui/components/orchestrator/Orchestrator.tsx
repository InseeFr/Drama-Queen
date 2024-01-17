import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ComponentDisplayer } from './ComponentDisplayer/ComponentDisplayer'
import { Header } from './Header/Header'
import { NavBar } from './NavBar/NavBar'
import { tss } from 'tss-react/mui'
import { form } from './form'
import { questionnaireData } from './data'
import * as lunatic from '@inseefr/lunatic'

type OrchestratorProps = {
  source: lunatic.LunaticSource
  missing: boolean
  shortcut: boolean
  autoSuggesterLoading: boolean
  features: lunatic.LunaticState['features']
  savingType: lunatic.LunaticState['savingType']
  overview: boolean
}

export function Orchestrator(props: OrchestratorProps) {
  const {
    source = form,
    shortcut = true,
    features = ['VTL'],
    savingType = 'COLLECTED',
    overview = true,
  } = props
  const { classes } = useStyles()
  const data = questionnaireData
  const [components, setComponents] = useState<any>([])

  const {
    getComponents,
    goPreviousPage,
    goNextPage,
    goToPage,
    pager,
    Provider,
  } = lunatic.useLunatic(source, data, {
    shortcut,
    withOverview: overview,
  })

  const { maxPage, page, subPage, nbSubPages } = pager

  const questionnaireTitle = source.label.value

  useEffect(() => {
    setComponents(getComponents())
  }, [getComponents])

  const firstComponent = components[0]
  const hierarchy = firstComponent?.hierarchy

  return (
    <div className={classes.root}>
      <Header
        questionnaireTitle={questionnaireTitle}
        hierarchy={hierarchy}
        goToPage={goToPage}
      />
      <div className={classes.bodyContainer}>
        <Provider>
          <ComponentDisplayer
            components={components}
            features={features}
            readonly={false}
            savingType={savingType}
          />
        </Provider>
        <NavBar
          page={page}
          maxPage={maxPage}
          subPage={subPage}
          nbSubPages={nbSubPages}
          goPrevious={goPreviousPage}
          goNext={goNextPage}
        />
      </div>
    </div>
  )
}

const useStyles = tss.create(() => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'space-between',
    paddingTop: '60px',
  },
}))
