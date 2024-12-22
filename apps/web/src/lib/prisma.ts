import { PrismaClient } from '@prisma/client';

declare global {
  let prisma: PrismaClient;
}

const globalForPrisma = global as typeof globalThis & { prisma: PrismaClient };

globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();

export default globalForPrisma.prisma;