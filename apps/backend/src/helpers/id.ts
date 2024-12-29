import { randomBytes } from 'node:crypto';

export function generateMemberId(size: number, prefix?: string): string {
	const randomHex = randomBytes(Math.floor(size / 2)).toString('hex');
	if (!prefix) return randomHex
	return `${prefix}${randomHex}` 
};