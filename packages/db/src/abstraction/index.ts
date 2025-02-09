import { BilledPlanDataService } from "./billed-plan";
import { BilledUsageDataService } from "./billed-usage";
import { CompletionDataService } from "./completion";
import { CustomerDataService } from "./customer";
import { MemoryDataService } from "./memory";

export const completion = new CompletionDataService();
export const memory = new MemoryDataService();
export const customer = new CustomerDataService();
export const billedPlan = new BilledPlanDataService();
export const billedUsage = new BilledUsageDataService();
