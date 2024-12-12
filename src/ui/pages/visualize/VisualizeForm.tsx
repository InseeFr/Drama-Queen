import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { tss } from 'tss-react/mui'

import { useSearchParams } from 'react-router-dom'
import { getSearchParams } from './getSearchParams'
import { useTranslation } from 'i18n'

export type FormValues = {
  questionnaire: string
  data?: string
  nomenclature?: Record<string, string>
  readonly: boolean
}

export function VisualizeForm() {
  const { t } = useTranslation('visualizeMessage')
  const { classes } = useStyles()
  const { register, handleSubmit } = useForm<FormValues>()
  const [, setSearchParams] = useSearchParams()
  const onSubmit = handleSubmit((data) => {
    setSearchParams(getSearchParams(data))
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3} alignItems="center">
        <Stack spacing={2}>
          <Typography variant="h3" className={classes.title}>
            {t('visualizePage')}
          </Typography>
          <TextField
            {...register('questionnaire')}
            name="questionnaire"
            id="questionnaire-url-form"
            label={t('inputSurveyLabel')}
            helperText={t('inputSurveyHelper')}
          />
          <TextField
            {...register('data')}
            id="data-url-form"
            label={t('inputDataLabel')}
            helperText={t('inputDataHelper')}
          />
          <TextField
            {...register('nomenclature', {
              setValueAs: (value: string) =>
                value ? (JSON.parse(value) as Record<string, string>) : null,
            })}
            id="nomenclature-url-form"
            label={t('inputNomenclatureLabel')}
            helperText={t('inputNomenclatureHelper')}
          />
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <FormControlLabel
            {...register('readonly')}
            id="readonly"
            control={<Switch />}
            label={t('readonlyLabel')}
          />
        </Stack>
        <Button variant="contained" type="submit">
          {t('visualizeButtonLabel')}
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
