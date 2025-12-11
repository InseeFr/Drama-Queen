import { Hono } from 'hono'
import { cors } from 'hono/cors'

import Roundabout from '../mocks/roundabout.json'

const app = new Hono()

const waitTime = 1000 // Wait duration to fake a slow API
const questionnaireId = 'q1'

const defaultStateData = {
  state: 'INIT',
  date: 0,
  currentPage: '1',
}

// Fake the database with an in memory map
const interrogations = new Map(
  Array.from({ length: 5 }).map((_, k) => {
    const id = `i${k}`
    return [
      id,
      {
        id: id,
        questionnaireId: questionnaireId,
        personalization: [],
        data: {
          EXTERNAL: {
            NB_HAB: 2,
          },
          COLLECTED: {
            PRENOMS: { COLLECTED: ['John', 'Jane'] },
          },
        },
        comment: {},
        stateData: defaultStateData,
      },
    ]
  }),
)

app.use('/api/*', cors())

app.use(async (_, next) => {
  await new Promise((resolve) => setTimeout(resolve, waitTime))
  await next()
})

app.get('/api/interrogations/state-data', (c) => {
  return c.json([{ id: 'i2' }, { id: 'i3' }])
})

app.put('/api/interrogations/:id', async (c) => {
  const data = await c.req.json()
  interrogations.set(c.req.param('id'), data)
  return c.json({})
})

app.post('/api/interrogations/:id/synchronize', async (c) => {
  const interrogationId = c.req.param('id')
  const interrogation = interrogations.get(interrogationId)
  if (!interrogation) {
    throw new Error(`Cannot find interrogation ${interrogationId}`)
  }
  return c.json({
    ...interrogation,
    stateData: defaultStateData,
  })
})

app.get('/api/campaigns', (c) => {
  return c.json([
    {
      id: 'c1',
      label: 'Campaign 1',
      sensitivity: 'NORMAL',
      questionnaireIds: [questionnaireId],
      metadata: 'string',
    },
  ])
})

app.get('/api/questionnaire/:id', (c) => {
  return c.json({ value: Roundabout })
})

app.get('/api/campaign/:id/interrogations', (c) => {
  return c.json(
    Array.from(interrogations.values()).map((interrogation) => ({
      id: interrogation.id,
      questionnaireId: interrogation.questionnaireId,
    })),
  )
})

app.get('/api/interrogations/:id', (c) => {
  return c.json(interrogations.get(c.req.param('id')))
})

console.log('== Starting fake Queen API Server on http://localhost:3000')

export default {
  port: 3000,
  fetch: app.fetch,
}
