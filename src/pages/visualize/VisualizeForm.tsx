import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { tss } from 'tss-react/mui'

import { getSearchParams } from './getSearchParams'
import type { FormValues } from './models'

export function VisualizeForm() {
  const { t } = useTranslation()
  const { classes } = useStyles()
  const { register, handleSubmit } = useForm<FormValues>()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({ to: '/visualize', search: getSearchParams(data) })
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3} alignItems="center">
        <Stack spacing={2}>
          <Typography variant="h3" className={classes.title}>
            {t('visualize.visualizePage')}
          </Typography>
          <TextField
            {...register('questionnaire')}
            name="questionnaire"
            id="questionnaire-url-form"
            label={t('visualize.survey.label')}
            helperText={t('visualize.survey.helper')}
          />
          <TextField
            {...register('data')}
            id="data-url-form"
            label={t('visualize.data.label')}
            helperText={t('visualize.data.helper')}
          />
          <TextField
            {...register('nomenclature', {
              setValueAs: (value: string) =>
                value ? (JSON.parse(value) as Record<string, string>) : null,
            })}
            id="nomenclature-url-form"
            label={t('visualize.nomenclature.label')}
            helperText={t('visualize.nomenclature.helper')}
          />
        </Stack>
        <Stack direction={'row'} alignItems="center">
          <FormControlLabel
            {...register('readonly')}
            id="readonly"
            control={<Switch />}
            label={t('visualize.readonly')}
          />
        </Stack>
        <Button variant="contained" type="submit">
          {t('visualize.visualize')}
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
