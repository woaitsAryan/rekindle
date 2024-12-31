import { enums } from "./enums";
import prisma, { DB } from '../index'

const BILLED_PLAN_CONFIGURATION = {
	[enums.PlanType.FREE]: [
		{
			name: "Free plan",
			usageLimit: 10000,
			rateLimit: 10000,
			billingPeriod: enums.BillingPeriod.INFINITE,
		},
	],
	[enums.PlanType.PAID]: [
		{
			name: "Weekly paid plan",
			usageLimit: 20000,
			rateLimit: 20000,
			billingPeriod: enums.BillingPeriod.WEEKLY,
		},
		{
			name: "Monthly paid plan",
			usageLimit: 50000,
			rateLimit: 50000,
			billingPeriod: enums.BillingPeriod.MONTHLY,
		},
	],
};

async function main() {
	try {
		await prisma.$connect()

		const freePlans = BILLED_PLAN_CONFIGURATION[enums.PlanType.FREE]
		const paidPlans = BILLED_PLAN_CONFIGURATION[enums.PlanType.PAID]

		for (const freePlan of freePlans) {
			await DB.billedPlan.upsert({
				type: enums.PlanType.FREE,
				name: freePlan.name,
				usageLimit: freePlan.usageLimit,
				rateLimit: freePlan.rateLimit,
				billingPeriod: freePlan.billingPeriod
			})
			console.log("Added", enums.PlanType.FREE, "plan for billing period", freePlan.billingPeriod)
		}

		for (const paidPlan of paidPlans) {
			await DB.billedPlan.upsert({
				type: enums.PlanType.PAID,
				name: paidPlan.name,
				usageLimit: paidPlan.usageLimit,
				rateLimit: paidPlan.rateLimit,
				billingPeriod: paidPlan.billingPeriod
			})
			console.log("Added", enums.PlanType.PAID, "plan for billing period", paidPlan.billingPeriod)
		}
	} catch (error) {
		console.error(error)
	} finally {
		await prisma.$disconnect()
		console.log("Seed script finished!")
	}
}

main()