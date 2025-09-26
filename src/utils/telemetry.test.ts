import {
  TELEMETRY_EVENT_EXIT_SOURCE,
  TELEMETRY_EVENT_TYPE,
} from '@/constants/telemetry'

import {
  computeControlEvent,
  computeControlSkipEvent,
  computeDataMaxLength,
  computeExitEvent,
  computeInactivityDelay,
  computeInitEvent,
  computeNewPageEvent,
} from './telemetry'

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2024, 9, 28, 17, 7, 33, 11))
})

afterAll(() => {
  vi.useRealTimers()
})

describe('compute telemetry events', () => {
  test('for initialization', () => {
    expect(computeInitEvent()).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      type: TELEMETRY_EVENT_TYPE.INIT,
    })
  })

  test('for exit', () => {
    expect(
      computeExitEvent({ source: TELEMETRY_EVENT_EXIT_SOURCE.QUIT }),
    ).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      source: TELEMETRY_EVENT_EXIT_SOURCE.QUIT,
      type: TELEMETRY_EVENT_TYPE.EXIT,
    })
  })

  test('for page change', () => {
    expect(
      computeNewPageEvent({
        page: 'my-new-page',
        pageTag: 'my-page-tag',
      }),
    ).toMatchObject({
      date: vi.getMockedSystemTime()?.toISOString(),
      page: 'my-new-page',
      pageTag: 'my-page-tag',
      type: TELEMETRY_EVENT_TYPE.NEW_PAGE,
    })
  })

  test('for control', () => {
    expect(
      computeControlEvent({ controlIds: ['my-control-1', 'my-control-2'] }),
    ).toMatchObject({
      controlIds: ['my-control-1', 'my-control-2'],
      date: vi.getMockedSystemTime()?.toISOString(),
      type: TELEMETRY_EVENT_TYPE.CONTROL,
    })
  })

  test('for control skip', () => {
    expect(
      computeControlSkipEvent({ controlIds: ['my-control-1', 'my-control-2'] }),
    ).toMatchObject({
      controlIds: ['my-control-1', 'my-control-2'],
      date: vi.getMockedSystemTime()?.toISOString(),
      type: TELEMETRY_EVENT_TYPE.CONTROL_SKIP,
    })
  })
})

describe('computeDataMaxLength', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test.each([
    [undefined, undefined],
    ['', undefined],
    ['100', 100],
    ['-1', undefined],
    ['azear', undefined],
  ])('with env var %i -> %i', (env, res) => {
    vi.stubEnv('VITE_TELEMETRY_MAX_LENGTH', env)
    expect(computeDataMaxLength()).toBe(res)
  })
})

describe('computeInactivityDelay', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test.each([
    [undefined, undefined],
    ['', undefined],
    ['100', 100],
    ['-1', undefined],
    ['azear', undefined],
  ])('with env var %i -> %i', (env, res) => {
    vi.stubEnv('VITE_TELEMETRY_MAX_DELAY', env)
    expect(computeInactivityDelay()).toBe(res)
  })
})
