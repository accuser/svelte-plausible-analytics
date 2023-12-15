import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
             * The API host.
             *
             * @defaultValue 'https://plausible.io'
             */ apiHost?: string | undefined;
        /**
             * Compatibility mode for tracking users on Internet Explorer.
             *
             * @defaultValue false
             */ compat?: boolean | undefined;
        /**
             * The domain name(s) of the website(s) to track.
             *
             * @defaultValue current hostname.
             */ domain?: string | string[] | undefined;
        /**
             * Enable analytics.
             *
             * @defaultValue `true` in production mode, `false` in development mode.
             */ enabled?: boolean | undefined;
        /**
             * Automatically track file downloads
             * (Requires manual goal configuration on Plausible.)
             * @defaultValue `false`
             */ fileDownloads?: boolean | undefined;
        /**
             * Automatically follow frontend navigation when using hash-based routing.
             *
             * @defaultValue `false`
             */ hash?: boolean | undefined;
        /**
             * Allow analytics to track on localhost (useful in hybrid apps).
             * @defaultValue `false`, unless `enabled` is `true` in development mode.
             */ local?: boolean | undefined;
        /**
             * Automatically track clicks on outbound links from your website.
             * (Requires manual goal configuration on Plausible.)
             * @defaultValue `false`
             */ outboundLinks?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PlausibleAnalyticsProps = typeof __propDef.props;
export type PlausibleAnalyticsEvents = typeof __propDef.events;
export type PlausibleAnalyticsSlots = typeof __propDef.slots;
export default class PlausibleAnalytics extends SvelteComponent<PlausibleAnalyticsProps, PlausibleAnalyticsEvents, PlausibleAnalyticsSlots> {
}
export {};
