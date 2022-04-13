import { writable } from 'svelte/store';

interface PlausibleEvent {
	event: string;
	data?: unknown;
}

/**
 * Plausible Analytics event store.
 */
export const pa = (() => {
	const { subscribe, update } = writable<PlausibleEvent[]>([]);

	const addEvent = (event: string, data?: unknown) => {
		update((events) => [...events, { event, data }]);
	};

	return {
		subscribe,
		addEvent,

		/**
		 * Send this event to signify that a user has logged in.
		 *
		 * @param method - The method used to login.
     * @example
		 *
		 * pa.login('Google');
		 **/
		login: (method?: string) => addEvent('login', { method }),

		/**
		 * Use this event when a user has shared content.
		 *
		 * @param method - The method in which the content is shared.
		 * @param content_type - The type of content shared.
		 * @param item_id - The ID of the shared content.
		 * @example
		 *
		 * pa.share('Twitter', 'image', 'C_12345');
		 */
		share: (method?: string, content_type?: string, item_id?: string) =>
			addEvent('share', { method, content_type, item_id })
	};
})();
