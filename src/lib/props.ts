/**
 * Convert an object to a props object, filtering out any undefined values.
 *
 * @param o - The object to convert to props.
 * @returns The props object.
 */
const asProps = <T extends unknown = string | number | boolean>(o: {
	[key: string]: T | undefined;
}) =>
	Object.fromEntries(Object.entries(o).filter(([, value]) => value !== undefined)) as {
		[k: string]: T;
	};

export default (o: any) => {
	const props = asProps(o);

	return Object.keys(props).length === 0 ? undefined : { props };
};
