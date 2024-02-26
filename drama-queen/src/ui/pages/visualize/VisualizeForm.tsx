import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { useTranslate } from 'ui/hooks/useTranslate'
import { tss } from 'tss-react/mui'

import { useSearchParams } from 'react-router-dom'
import { encodeParams } from './encodeParams'

export type FormValues = {
  questionnaire: string
  data?: string
  nomenclature?: Record<string, string>
  readonly: boolean
}

export function VisualizeForm() {
  const { t } = useTranslate()
  const { classes } = useStyles()
  const { register, handleSubmit } = useForm<FormValues>()
  const [, setSearchParams] = useSearchParams()
  const onSubmit = handleSubmit((data) => {
    setSearchParams(encodeParams(data))
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3} alignItems="center">
        <Stack spacing={2}>
          <Typography variant="h3" className={classes.title}>
            {t('vizu')}
          </Typography>
          <TextField
            {...register('questionnaire')}
            name="questionnaire"
            id="questionnaire-url-form"
            label={t('vizu.input.survey.label')}
            helperText={t('vizu.input.survey.helper')}
          />
          <TextField
            {...register('data')}
            id="data-url-form"
            label={t('vizu.input.data.label')}
            helperText={t('vizu.input.data.helper')}
          />
          <TextField
            {...register('nomenclature', {
              setValueAs: (value: string) =>
                value ? (JSON.parse(value) as Record<string, string>) : null,
            })}
            id="nomenclature-url-form"
            label={t('vizu.input.nomenclatures.label')}
            helperText={t('vizu.input.nomenclatures.helper')}
          />
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <FormControlLabel
            {...register('readonly')}
            id="readonly"
            control={<Switch />}
            label="Lecture Seul"
          />
        </Stack>
        <Button variant="contained" type="submit">
          {t('vizu.button.label')}
        </Button>
      </Stack>
    </form>
  )
}

const useStyles = tss.create(() => ({
  title: {
    textAlign: 'center',
  },
  selectExample: {
    minWidth: 120,
  },
}))
