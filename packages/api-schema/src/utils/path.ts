type ExtractPathParams<Path extends string> =
	Path extends `${string}:${infer Param}/${infer Rest}`
		? Param | ExtractPathParams<`/${Rest}`>
		: Path extends `${string}:${infer Param}`
			? Param
			: never;

export function interpretPath<P extends string>(
	path: P,
	params: Record<ExtractPathParams<P>, string>,
): string {
	let result = path;
	for (const [key, value] of Object.entries(params) as [string, string][]) {
		result = result.replace(`:${key}`, value) as P;
	}
	return result;
}
