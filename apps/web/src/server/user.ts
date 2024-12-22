"use server";
import prisma from "@rekindle/db";
import { enums, isValidEnumValue } from "@rekindle/db/enums";

import type { User } from "@supabase/supabase-js";

export async function upsertUser(user: User) {
	const validatedProvider = isValidEnumValue(enums.Providers, user.app_metadata.provider)
	if (!validatedProvider){
		throw new Error("Unsupported provider")
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [
				{
					id: user.id,
				},
				{
					email: user.email,
					provider: validatedProvider,
				},
			],
		},
	});
	console.log(existingUser);

	console.log(user);
}
