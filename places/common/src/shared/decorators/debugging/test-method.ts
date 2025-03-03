import Log from "@rbxts/log";

import { IS_PROD } from "common/shared/constants/core";

export function TestMethod<T extends object, P extends Array<unknown>>(...args: P) {
	return (
		target: T,
		propertyKey: string,
		descriptor: TypedPropertyDescriptor<(this: T, ...args: P) => unknown>,
	) => {
		if (IS_PROD) {
			return;
		}

		Log.Debug(`running ${target}.${propertyKey} with arguments: {args}`, args);

		const returnValue = descriptor.value(target, ...args);

		Log.Debug(`${target}.${propertyKey} returned: {returnValue}`, returnValue);
	};
}
