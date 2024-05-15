import Button from '@mui/material/Button'
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'

type MenuNaviGationButtonProps = {
  className?: string
  label: string | ReactNode
  disabled?: boolean
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  autofocus?: boolean
  onClick: () => void
}

export function MenuNavigationButton(props: MenuNaviGationButtonProps) {
  const {
    className,
    label,
    disabled = false,
    startIcon,
    endIcon,
    autofocus,
    onClick,
  } = props
  const { classes, cx } = useStyles()

  return (
    <Button
      className={cx(classes.navigationButton, className)}
      autoFocus={autofocus}
      size="small"
      disableRipple
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

const useStyles = tss.create(({ theme }) => ({
  navigationButton: {
    textTransform: 'none',
    justifyContent: 'flex-start',
    textAlign: 'left',
    color: theme.palette.primary.main,
    lineHeight: '1.5em',
    paddingLeft: '1.2em',
    borderRadius: 0,
    '&:hover, &:focus': {
      fontWeight: 'bold',
      backgroundColor: theme.palette.background.button.light,
    },
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: '10px',
    },
  },
}))
