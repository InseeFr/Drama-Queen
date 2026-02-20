import { Evt } from 'evt'

import { createEvt } from './evt'

describe('createEvt', () => {
  let evtActionMock: Evt<any>

  beforeEach(() => {
    evtActionMock = Evt.create<any>()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should post "redirect" action when relevant events occur', () => {
    const evt = createEvt({ evtAction: evtActionMock } as any)
    const spy = vi.spyOn(evt, 'post')

    // simulate an action that should lead to a redirect
    evtActionMock.post({
      usecaseName: 'synchronizeData',
      actionName: 'uploadError',
    })
    evtActionMock.post({
      usecaseName: 'synchronizeData',
      actionName: 'downloadCompleted',
    })
    evtActionMock.post({
      usecaseName: 'synchronizeData',
      actionName: 'downloadFailed',
    })

    // Verify that post() was called 3 times
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith({ action: 'redirect' })
  })

  it('should not post "redirect" action for unrelated events', () => {
    const evt = createEvt({ evtAction: evtActionMock } as any)
    const spy = vi.spyOn(evt, 'post')

    // simulate an action that should not lead to a redirect
    evtActionMock.post({
      usecaseName: 'otherUsecase',
      actionName: 'uploadError',
    })
    evtActionMock.post({
      usecaseName: 'synchronizeData',
      actionName: 'otherAction',
    })

    // Ensure post() was never called
    expect(spy).not.toHaveBeenCalled()
  })
})
