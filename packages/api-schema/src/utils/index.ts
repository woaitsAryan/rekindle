export type CreateGenericJson<T> = {
	in: {
		json: T;
	};
	out: {
		json: T;
	};
};

export type CreateGenericQuery<T> = {
	in: {
		query: T;
	};
	out: {
		query: T;
	}
}
