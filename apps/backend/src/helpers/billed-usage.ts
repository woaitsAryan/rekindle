import type { BilledUsage } from "@rekindle/db/types";

export function getMatchingBilledUsage(
	billedUsages: BilledUsage[],
): BilledUsage | null {
	const currentDate = new Date();

	for (const billedUsage of billedUsages) {
		if (
			billedUsage.periodStart < currentDate &&
			(!billedUsage.periodEnd || billedUsage.periodEnd > currentDate)
		) {
			return billedUsage;
		}
	}
	return null;
}
