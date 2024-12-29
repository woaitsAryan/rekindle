export type CreateGenericBody<T> = {
	in: {
		json: T;
	};
	out: {
		json: T;
	};
};