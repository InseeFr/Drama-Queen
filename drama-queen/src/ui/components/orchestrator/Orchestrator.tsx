import { ComponentDisplayer } from './ComponentDisplayer/ComponentDisplayer'
import { Header } from './Header/Header'
import { NavBar } from './NavBar/NavBar'
import { tss } from 'tss-react/mui'

export function Orchestrator() {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.bodyContainer}>
        <ComponentDisplayer />
        <NavBar />
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
