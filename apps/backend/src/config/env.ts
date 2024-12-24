import { z } from 'zod';
import { logger } from './logger';

const envSchema = z.object({
	OPENAI_KEY: z.string().min(1),
	SUPABASE_URL: z.string().min(1),
	SUPABASE_ANON_KEY: z.string().min(1),
	PORT: z.string().transform(Number)
})

type EnvType = z.infer<typeof envSchema>;

let _ENV: EnvType | null = null

function init_env(): EnvType {
	if (_ENV !== null) return _ENV;

	const parsed = envSchema.safeParse(Bun.env);

	if (!parsed.success) {
		logger.error(`Invalid environment variables: ${parsed.error.message}`)
		process.exit(1)
	}

	_ENV = parsed.data;
	return _ENV;
}

const ENV = init_env()

export { init_env, ENV };