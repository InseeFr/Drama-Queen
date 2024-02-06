import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'

export const AppVersion = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.footer}>
      <Typography variant="body1" color="textSecondary">
        Drama Queen version {APP_VERSION}
      </Typography>
    </div>
  )
}

const useStyles = tss.create(({}) => ({
  footer: {
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid black',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    padding: '2px 0 2px 0',
  },
}))
