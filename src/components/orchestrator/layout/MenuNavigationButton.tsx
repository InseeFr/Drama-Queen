import Button from '@mui/material/Button'

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

  return (
    <Button
      className={`normal-case justify-start text-left text-primary leading-6 pl-[1.2em]
        rounded-none hover:font-bold hover:bg-button-light focus:font-bold focus:bg-button-light
        [&_.MuiButton-endIcon]:absolute [&_.MuiButton-endIcon]:right-[10px]
        ${className ?? ''}`
      }
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
