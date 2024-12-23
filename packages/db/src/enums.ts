import * as schema from "@prisma/client";

const enums = schema.$Enums;

type EnumType = keyof typeof enums;

function isValidEnumValue<T extends EnumType>(
	enumObj: (typeof enums)[T],
	value: unknown,
): (typeof enums)[T][keyof (typeof enums)[T]] | null {
	const enumValues = Object.values(enumObj);
	return enumValues.includes(value as any)
		? (value as (typeof enums)[T][keyof (typeof enums)[T]])
		: null;
}

export { enums, isValidEnumValue };
