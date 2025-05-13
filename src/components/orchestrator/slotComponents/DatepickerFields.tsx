import type { LunaticSlotComponents } from '@inseefr/lunatic'
import { Stack } from '@mui/material'
import type { DateView } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { frFR } from '@mui/x-date-pickers/locales'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale/fr'

import { useState } from 'react'

export type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY'

export const DatepickerFields: LunaticSlotComponents['DatepickerFields'] = ({
  disabled,
  readOnly,
  value,
  dateFormat,
  id,
  min,
  max,
  onChange,
}) => {
  const parsedDate = value ? parseISO(value) : null
  const parsedMinDate = min ? parseISO(min) : undefined
  const parsedMaxDate = max ? parseISO(max) : undefined
  const [selectedDate, setSelectedDate] = useState<Date | null>(parsedDate)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    // Convert the date back to the string format expected by the component
    onChange(date ? format(date, computeDateFnsFormat(dateFormat)) : null)
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={fr}
      localeText={
        frFR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Stack
        sx={{
          width: '15rem',
        }}
      >
        <MuiDatePicker
          className="datepicker"
          value={selectedDate}
          onChange={handleDateChange}
          format={computeDisplayedFormat(dateFormat)}
          views={getDatePickerViews(dateFormat)}
          disabled={disabled}
          readOnly={readOnly}
          minDate={parsedMinDate}
          maxDate={parsedMaxDate}
          slotProps={{
            field: { clearable: true },
            textField: {
              id: id,
              sx: {
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              },
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  )
}

/**
 * Computes the displayed date format for the datepicker from the source format
 */
function computeDisplayedFormat(format: DateFormat) {
  switch (format) {
    case 'YYYY-MM':
      return 'MM/yyyy'
    case 'YYYY':
      return 'yyyy'
    case 'YYYY-MM-DD':
    default:
      return 'dd/MM/yyyy'
  }
}

/**
 * Computes the date format understood by the 'date-fns' library from the source format
 */
function computeDateFnsFormat(format: DateFormat) {
  // Replace 'YYYY' with 'yyyy' and 'DD' with 'dd', keeping 'MM', for compatibility with date-fns
  return format.replace('YYYY', 'yyyy').replace('DD', 'dd')
}

/**
 * Determines calendar views
 */
function getDatePickerViews(format: DateFormat): DateView[] {
  switch (format) {
    case 'YYYY-MM':
      return ['month', 'year']
    case 'YYYY':
      return ['year']
    case 'YYYY-MM-DD':
    default:
      return ['year', 'month', 'day']
  }
}
