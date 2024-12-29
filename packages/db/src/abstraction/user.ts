import prisma from "../..";

export class UserDataService {
	private get db() {
		return prisma.user;
	}

	async create(data: unknown) {}
}
