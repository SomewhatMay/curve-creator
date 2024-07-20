/* Just use the joinBindings function from @rbxts/pretty-react-hooks */

import { BindingOrValue, isBinding } from "@rbxts/pretty-react-hooks";
import { Binding, createBinding, joinBindings, useMemo } from "@rbxts/react";

function joinAnyBindings<T extends readonly unknown[]>(bindings: T): Binding<T> {
	// const newBinding = useMemo(() => {
	const bindingType: boolean[] = [];
	const trueBindings: Binding<unknown>[] = [];

	for (const [_, binding] of ipairs(bindings)) {
		if (isBinding(binding)) {
			bindingType.push(true);
			trueBindings.push(binding);
		} else {
			bindingType.push(false);
		}
	}

	let newBinding;

	if (trueBindings.size() === 0) {
		const [temporaryBinding, _] = createBinding(bindings);
		newBinding = temporaryBinding;
	} else {
		const temporaryBinding = joinBindings(trueBindings);
		newBinding = temporaryBinding.map((combinedBindings) => {
			let mixedBindings: Writable<T> = [] as unknown as Writable<T>;
			let trueBindingIndex = 0;

			for (const [index, binding] of ipairs(bindings)) {
				if (bindingType[index - 1]) {
					mixedBindings[index - 1] = combinedBindings[trueBindingIndex];
					trueBindingIndex += 1;
				} else {
					mixedBindings[index - 1] = binding;
				}
			}

			return mixedBindings;
		});
	}

	return newBinding;
	// }, [...bindings]);

	// return newBinding;
}
