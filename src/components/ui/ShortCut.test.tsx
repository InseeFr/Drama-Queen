import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ShortCut } from './ShortCut'

describe('ShortCut', () => {
  it.skip('triggers function on shortcut typing', async () => {
    // Given a Shortcut alt+enter
    const user = userEvent.setup()
    const foo = vi.fn()
    render(<ShortCut shortCutKey="alt+enter" onClickMethod={foo} />)

    // When we type alt+enter
    await user.keyboard('{Alt>}{Enter}{/Alt}')

    // Then nothing happens
    expect(foo).toHaveBeenCalledOnce()
  })
})
