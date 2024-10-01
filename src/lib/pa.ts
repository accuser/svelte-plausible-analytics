import addEvent from './events/add-event.js';
import props from './props.js';

export default {
	addEvent,

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
	login: (method?: string) => addEvent('login', { ...props({ method }) }),

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
	search: (search_term: string) => addEvent('search', { ...props({ search_term }) }),

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
	share: (method?: string, content_type?: string, item_id?: string) => {
		addEvent('share', { ...props({ method, content_type, item_id }) });
	},

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
	signUp: (method?: string) => addEvent('sign_up', { ...props({ method }) })
};
