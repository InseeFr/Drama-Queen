import { Evt } from 'evt'

import type { CreateEvt } from '@/core/bootstrap'

import { name } from './state'

export const createEvt = (({ evtAction }) => {
  const evt = Evt.create<{
    action: 'redirect'
  }>()

  evtAction
    .pipe((action) => (action.usecaseName === name ? [action] : null))
    .attach(
      (action) =>
        action.actionName === 'uploadError' ||
        action.actionName === 'downloadCompleted' ||
        action.actionName === 'downloadFailed',
      () => {
        evt.post({
          action: 'redirect',
        })
      },
    )

  return evt
}) satisfies CreateEvt
