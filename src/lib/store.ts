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
		 *
		 * @param method
		 * @returns
		 */
		/**
		 * Send this event to signify that a user has logged in.
		 *
		 * @param method - The method used to login.
		 *
		 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#parameters_14}
		 * @example
		 *
		 * pa.login('Google');
		 **/
		login: (method?: string) => addEvent('login', { method }),

		/**
		 * Use this event to contextualize search operations. This event can help
		 * you identify the most popular content in your app.
		 *
		 * @param search_term - The term that was searched for.
		 *
		 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#search}
		 * @example
		 *
		 * pa.search('t-shirts');
		 */
		search: (search_term: string) => addEvent('search', { search_term }),

		/**
		 * Use this event when a user has shared content.
		 *
		 * @param method - The method in which the content is shared.
		 * @param content_type - The type of content shared.
		 * @param item_id - The ID of the shared content.
		 *
		 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#share}
		 * @example
		 *
		 * pa.share('Twitter', 'image', 'C_12345');
		 */
		share: (method?: string, content_type?: string, item_id?: string) =>
			addEvent('share', { method, content_type, item_id }),

		/**
		 * This event indicates that a user has signed up for an account. Use this
		 * event to understand the different behaviors of logged in and logged out
		 * users.
		 *
		 * @param method - The method used for sign up.
		 *
		 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#sign_up}
		 * @example
		 *
		 * pa.signup('Google');
		 */
		signUp: (method?: string) => addEvent('sign_up', { method })
	};
})();
