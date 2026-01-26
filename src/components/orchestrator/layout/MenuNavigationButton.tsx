import Button from '@mui/material/Button'
import { tss } from 'tss-react/mui'

import type { ReactNode } from 'react'

type MenuNaviGationButtonProps = {
  className?: string
  label: string | ReactNode
  disabled?: boolean
  startIcon?: React.JSX.Element
  endIcon?: React.JSX.Element
  autofocus?: boolean
  onClick: () => void
}

export function MenuNavigationButton({
  className,
  label,
  disabled = false,
  startIcon,
  endIcon,
  autofocus,
  onClick,
}: Readonly<MenuNaviGationButtonProps>) {
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
