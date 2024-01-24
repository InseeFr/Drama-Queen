import { Suspense } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import type { surveyUnitLoader } from 'ui/routing/loader'
import { useLoaderData, Await } from 'ui/routing/utils'

export function SurveyUnitMapping() {
  const { surveyUnitId } = useParams<{
    surveyUnitId: string
  }>()

  return <div>Error : we do not found {surveyUnitId}</div>
}
