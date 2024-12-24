import { Hono } from 'hono'
import { handleTest } from './controllers/testing.controller'
import { ENV, init_env } from './config/env'
import { authMiddleware } from './middleware/auth.middleware'

init_env()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello world!')
})

app.use('/v1/*', authMiddleware)

app.get('/v1/protected', handleTest)

export default {
	port: ENV.PORT,
	fetch: app.fetch,
}