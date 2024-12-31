"use server";
import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import prisma, { DB } from "@rekindle/db";
import type { User } from "@supabase/supabase-js";
import { enums } from "@rekindle/db/enums"

console.warn = () => { };

export async function getCustomer(user: User) {
	if (!user.email) {
		logger.error("No email found!");
		throw new Error("No email found");
	}

	if (!user.user_metadata.full_name) {
		logger.error("Full name not found in user")
		throw new Error("Full name not found")
	}

	const freePlan = await DB.billedPlan.findUnique({
		type: enums.PlanType.FREE,
		billingPeriod: enums.BillingPeriod.INFINITE
	})

	if (!freePlan) {
		logger.error("Free billed plan not found")
		throw new Error("Free billed plan not found")
	}

	const customer = DB.customer.upsert({
		email: user.email,
		userId: user.id,
		metadata: user.user_metadata,
		name: user.user_metadata.full_name,
		billedPlanId: freePlan.id
	})

	return customer;
}

export async function getCustomerFromCookies() {
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

	const existingCustomer = await DB.customer.findUnique({
		userId: data.user.id
	})

	if (!existingCustomer) {
		console.error("Customer not found");
		return null;
	}

	return existingCustomer;
}

export async function getCustomerSession() {
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
