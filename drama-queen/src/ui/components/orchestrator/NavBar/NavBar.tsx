import { tss } from 'tss-react/mui'
import { PrevNext } from '../buttons/PrevNext/PrevNext'

type NavBarProps = {}

export function NavBar(props: NavBarProps) {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.page}>
        <div className={classes.labelPage}>n° page</div>
        <div>
          <b>x/y</b>
        </div>
      </div>
      <PrevNext />
    </div>
  )
}

const useStyles = tss.create(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '2em',
    paddingBottom: '2em',
    alignItems: 'center',
    borderLeft: '1px solid #777777',
    width: '60px',
  },
  page: {
    marginTop: '0.3em',
    paddingTop: '0.3em',
    paddingBottom: '0.3em',
    fontSize: '80%',
    textAlign: 'center',
    borderRadius: '5px',
    width: '57px',
    backgroundColor: 'white',
  },
  labelPage: { fontSize: '90%', marginBottom: '4px' },
}))
