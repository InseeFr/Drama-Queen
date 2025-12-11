import * as collectSurvey from './collectSurvey'
import * as takeControl from './interrogation/takeControl'
import * as reviewSurvey from './reviewSurvey'
import * as synchronizeData from './synchronizeData'
import * as userAuthentication from './userAuthentication'
import * as visualizeSurvey from './visualizeSurvey'

export const usecases = {
  userAuthentication,
  synchronizeData,
  visualizeSurvey,
  collectSurvey,
  reviewSurvey,
  takeControl,
}
