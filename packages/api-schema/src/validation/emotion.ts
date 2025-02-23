import { z } from "zod";

export const EmotionsArray = [
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
] as const

export const EmotionsEnum = z.object({
	emotions: z.array(
		z.enum(EmotionsArray),
	),
});

export type EmotionsType = z.infer<typeof EmotionsEnum>;
