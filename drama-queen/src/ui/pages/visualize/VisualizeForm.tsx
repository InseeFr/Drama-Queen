import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Switch, TextField, Typography } from "@mui/material"
import { useTranslate } from "hooks/useTranslate"
import { tss } from "tss-react/mui";


export function VisualizeForm() {
  const { t } = useTranslate()
  const { classes } = useStyles()
  return (
    <Stack spacing={3} alignItems="center">
      <Stack spacing={2}>
        <Typography variant="h3" className={classes.title}>{t("vizu")}</Typography>
        <TextField id="questionnaire-url-form"
          label={t("vizu.input.survey.label")} helperText={t('vizu.input.survey.helper')} />
        <TextField id="data-url-form"
          label={t("vizu.input.data.label")} helperText={t('vizu.input.data.helper')} />
        <TextField id="nomenclature-url-form"
          label={t("vizu.input.nomenclatures.label")} helperText={t('vizu.input.nomenclatures.helper')} />
      </Stack>
      <Stack direction={"row"} alignItems="center">
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Lecture Seul" />
        </FormGroup>
      </Stack>
      <Button variant="contained" type="submit">{t('vizu.button.label')}</Button>
    </Stack>
  )
}


const useStyles = tss.create(
  () => ({
    title: {
      textAlign: 'center',
    },
    selectExample: {
      minWidth: 120
    }
  })
)