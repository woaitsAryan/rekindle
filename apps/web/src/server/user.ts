"use server";
import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import prisma from "@rekindle/db";
import type { User } from "@supabase/supabase-js";

console.warn = () => {};

export async function upsertUser(user: User) {
	if (!user.email) {
		logger.error("No email found!");
		throw new Error("No email found");
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [
				{
					id: user.id,
				},
				{
					email: user.email,
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
			metadata: user.user_metadata,
			name: user.user_metadata.full_name,
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

export async function getUserSession() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getSession();

	if (error) {
		logger.error(error);
		return null;
	}

	if (!data.session) {
		logger.error("Session does not exist");
		return null;
	}

	return data.session;
}
