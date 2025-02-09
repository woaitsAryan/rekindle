"use server";

import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import { DB } from "@rekindle/db";
import { enums } from "@rekindle/db/enums";
import type { Customer, FindUniqueCustomerReturn } from "@rekindle/db/types";
import type { Session, User } from "@supabase/supabase-js";

console.warn = () => {};

export async function getCustomer(user: User) {
	if (!user.email) {
		logger.error("No email found!");
		throw new Error("No email found");
	}

	if (!user.user_metadata.full_name) {
		logger.error("Full name not found in user");
		throw new Error("Full name not found");
	}

	const existingCustomer = await DB.customer.findUnique({
		customerId: user.id,
	});

	if (existingCustomer) return existingCustomer;

	const freePlan = await DB.billedPlan.findUnique({
		type: enums.PlanType.FREE,
		billingPeriod: enums.BillingPeriod.INFINITE,
	});

	if (!freePlan) {
		logger.error("Free billed plan not found");
		throw new Error("Free billed plan not found");
	}

	const newCustomer = await DB.customer.create({
		email: user.email,
		customerId: user.id,
		metadata: user.user_metadata,
		name: user.user_metadata.full_name,
		billedPlanId: freePlan.id,
	});

	await DB.billedUsage.create({
		customerId: newCustomer.id,
		periodStart: new Date(),
	});

	return newCustomer;
}

export async function getCustomerFromCookies<T extends boolean>(
	include_all: T = false as T,
): Promise<FindUniqueCustomerReturn<T> | null> {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		logger.error(error);
		return null;
	}

	if (!data.user) {
		logger.error("Customer does not exist");
		return null;
	}

	const existingCustomer = await DB.customer.findUnique(
		{
			customerId: data.user.id,
		},
		include_all,
	);

	if (!existingCustomer) {
		console.error("Customer not found");
		return null;
	}

	return existingCustomer;
}

export async function getCustomerSession(): Promise<Session | null> {
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
