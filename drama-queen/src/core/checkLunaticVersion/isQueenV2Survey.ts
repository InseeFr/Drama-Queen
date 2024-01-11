import axios from 'axios'
import { Questionnaire } from 'core/model/Questionnaire'

const lunaticModelVersionBreaking = '2.2.10'

const semverCompare = new Intl.Collator('en', { numeric: true }).compare

export async function isQueenV2Survey(
  questionnaireUrl: string | null
): Promise<boolean> {
  if (questionnaireUrl === null) {
    console.info(
      'No questionnaire URL we fallback to queen v1 visualisation page'
    )
    return false
  }

  const { lunaticModelVersion } = await axios
    .create({
      baseURL: questionnaireUrl,
      headers: {
        Accept: 'application/json;charset=utf-8',
      },
    })
    .get<Questionnaire>('')
    .then(({ data }) => data)

  if (lunaticModelVersion === undefined) {
    console.info(
      'The survey has no lunaticModelVersion field, so by default we redirect to queen v1'
    )
    return false
  }

  return semverCompare(lunaticModelVersion, lunaticModelVersionBreaking) === 1
}
