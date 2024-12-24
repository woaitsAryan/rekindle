import type { User } from '@supabase/supabase-js'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import { supabase } from '../config/client'
import { logger } from '../config/logger'

const authMiddleware = createMiddleware<{
	Variables: {
		user: User
	}
}>(async (c, next) => {
	const auth_token = c.req.header().authorization
	if (!auth_token){
		logger.error("Authorization header not set")
		throw new HTTPException(401, { message: 'Authorization header not set' })
	}

	const response = await supabase.auth.getUser(auth_token)

	if (!response || !response.data || !response.data.user) {
		logger.error("User not found")
		throw new HTTPException(404, { message: "User not found" })
	}

	if (response.error){
		logger.error(response.error)
		throw new HTTPException(404, { message: response.error.message })
	}

	c.set('user', response.data.user)
	await next()
})

export { authMiddleware }