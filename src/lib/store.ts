import { writable } from 'svelte/store';

interface PlausibleEvent {
	event: string;
	data?: unknown;
}

export const pa = (() => {
	const { subscribe, update } = writable<PlausibleEvent[]>([]);

	const addEvent = (event: string, data?: unknown) => {
		update((events) => [...events, { event, data }]);
	};

	return {
		subscribe,
		addEvent,

		login: (method: string, send_to: string) => addEvent('login', { method, send_to })
	};
})();
