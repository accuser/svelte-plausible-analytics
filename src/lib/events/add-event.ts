import type { EventOptions, PlausibleOptions } from 'plausible-tracker';
import events from './events.svelte.js';

export default (eventName: string, options?: EventOptions, eventData?: PlausibleOptions) => {
	events.push({ eventName, options, eventData });
};
