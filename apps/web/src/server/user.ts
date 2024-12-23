"use server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@rekindle/db";
import { enums, isValidEnumValue } from "@rekindle/db/enums";

import { logger } from "@/lib/logger";
import type { User } from "@supabase/supabase-js";

export async function upsertUser(user: User) {
	if (!user.email) {
		logger.error("No email found!");
		throw new Error("No email found");
	}

	const validatedProvider = isValidEnumValue(
		enums.Providers,
		user.app_metadata.provider,
	);
	if (!validatedProvider) {
		logger.error("Unsupported provider");
		throw new Error("Unsupported provider");
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

	if (existingUser) {
		return existingUser;
	}

	const newUser = await prisma.user.create({
		data: {
			id: user.id,
			email: user.email,
			provider: validatedProvider,
			metadata: user.user_metadata,
		},
	});
	return newUser;
}

export async function getUserFromCookies() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		logger.error(error);
		return null;
	}

	if (!data.user) {
		logger.error("User does not exist");
		return null;
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			id: data.user.id,
		},
	});

	if (!existingUser) {
		console.error("User not found");
		return null;
	}

	return existingUser;
}
