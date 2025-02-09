import { z } from "zod";

export const EmotionsEnum = z.object({
	emotions: z.array(
		z.enum([
			"anger",
			"anticipation",
			"disgust",
			"fear",
			"joy",
			"love",
			"optimism",
			"pessimism",
			"sadness",
			"surprise",
			"trust",
		]),
	),
});

export type EmotionsType = z.infer<typeof EmotionsEnum>;
