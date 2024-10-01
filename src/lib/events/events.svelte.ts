import type { EventOptions, PlausibleOptions } from 'plausible-tracker';

const events = $state<
	{ eventName: string; options?: EventOptions; eventData?: PlausibleOptions }[]
>([]);

export default events;
