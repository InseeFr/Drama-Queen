import { useTranslation } from 'i18n/i18n'
import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import type { surveyUnitLoader } from 'ui/routing/loader'
import { useLoaderData, Await } from 'ui/routing/utils'

export function SurveyUnitMapping() {
  const { surveyUnitId } = useParams<{
    surveyUnitId: string
  }>()
  const { t } = useTranslation('errorMessage')

  return (
    <div>{t('surveyUnitNotFound', { surveyUnitId: surveyUnitId ?? '' })}</div>
  )
}
