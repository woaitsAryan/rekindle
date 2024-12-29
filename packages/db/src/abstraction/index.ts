import { CompletionDataService } from "./completion";
import { MemoryDataService } from "./memory";
import { UserDataService } from "./user";

export const completion = new CompletionDataService();
export const memory = new MemoryDataService();
export const user = new UserDataService();
