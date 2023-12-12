import { Container, Typography } from "@mui/material"
import { useTranslate } from "hooks/useTranslate"
import { tss } from "tss-react/mui";
export function Visualize() {
  const { t } = useTranslate()
  const { classes } = useStyles()
  return (
    <Container>
      <Typography variant="h3" className={classes.title}>{t("vizu")}</Typography>
    </Container>
  )
}


const useStyles = tss.create(
  () => ({
    title: {
      textAlign: 'center',
    }
  })
)