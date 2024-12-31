import { CompletionDataService } from "./completion";
import { MemoryDataService } from "./memory";
import { CustomerDataService } from "./customer";
import { BilledPlanDataService } from "./billed-plan";

export const completion = new CompletionDataService();
export const memory = new MemoryDataService();
export const customer = new CustomerDataService();
export const billedPlan = new BilledPlanDataService()