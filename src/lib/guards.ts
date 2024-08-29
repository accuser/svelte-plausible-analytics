import { type PageviewProp, type PageviewProps } from './PlausibleAnalytics.svelte';

/**
 * Handles various value types and issues warnings if the values are not suitable for passing to Plausible.
 * Specifically checks for DOMTokenList, HTMLInputElement, Array, RegExp, and Date instances,
 * and warns about potential errors if these are not parsed as strings.
 * @see {@link https://plausible.io/docs/custom-props/introduction#accepted-values}
 *
 * @param {unknown} value - The value to be handled and checked.
 * @returns {boolean} Returns true if the value is acceptable, otherwise throws an error.
 * @throws {Error} Throws an error if the value is neither a number nor a string.
 */
export const handleEntry = function handleEntry(entry: unknown): boolean {
	const typeName = Object.prototype.toString.call(entry).slice(8, -1);

	const warn = (type: string) =>
		console.warn(
			`Warning: Passing ${type} to Plausible may result in error unless parsed as a string.`
		);

	switch (typeName) {
		case 'DOMTokenList':
		case 'HTMLInputElement':
		case 'Array':
		case 'RegExp':
		case 'Date':
			warn(typeName);
			return true;

		case 'String':
		case 'Number':
			return true;

		default:
			console.warn(
				`Plausible Error: Custom property entry ${entry} is not a boolean, number, or string.`
			);
			return false;
	}
};

/**
 * Checks if the number of custom properties in a PageviewProps object exceeds a specified limit.
 * @see {@link https://plausible.io/docs/custom-props/introduction#limits}
 *
 * @param {PageviewProps} props - The PageviewProps object to check.
 * @returns {boolean} Returns true if the number of properties is within the limit, otherwise returns false and logs an error.
 */
export const isCustomPropsLimit = function isCustomPropsLimit(
	props: PageviewProps
): props is PageviewProps {
	const limit = 30;
	const length = Object.entries(props).length;

	if (typeof props === 'object' && length > limit) {
		return false;
	}

	return true;
};

/**
 * Checks if the length of a custom property name or value exceeds a specified limit.
 * @see {@link https://plausible.io/docs/custom-props/introduction#limits}
 * 
 * @param {number} limit - The maximum allowed character length.
 * @param {PageviewProp} entry - The custom property entry to check.
 * @returns {boolean} Returns true if the entry's length does not exceed the limit,  otherwise logs a warning.
 */
export const isCustomPropEntryLimit = function isCustomPropEntryLimit(
	limit: number,
	entry: PageviewProp
): entry is PageviewProp {
	const asString = entry.toString();

	// No limit checks needed for boolean
	if (typeof entry === 'boolean') return true;

	// Check character length of number with `toString()`
	if (typeof entry === 'number' && asString.length > limit) {
		return false;
	}

	// Error if DOM node passed as prop name or value
	if (!handleEntry(entry)) return false;

	if (asString.length > limit) {
		return false;
	}

	return true;
};
