// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../internal/request-options";
import { buildHeaders } from "../internal/headers";
import { APIPromise } from "../core/api-promise";
import { APIResource } from "../core/resource";

export class Channels extends APIResource {
	/**
	 * Stops watching resources through this channel.
	 */
	stopWatching(params: ChannelStopWatchingParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
		const {
			$,
			access_token,
			alt,
			callback,
			fields,
			key,
			oauth_token,
			prettyPrint,
			quotaUser,
			upload_protocol,
			uploadType,
			...body
		} = params ?? {};
		return this._client.post("/channels/stop", {
			query: {
				$,
				access_token,
				alt,
				callback,
				fields,
				key,
				oauth_token,
				prettyPrint,
				quotaUser,
				upload_protocol,
				uploadType,
			},
			body,
			...options,
			headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
		});
	}
}

export interface ChannelStopWatchingParams {
	/**
	 * Query param:
	 */
	$?: ChannelStopWatchingParams._;

	/**
	 * Query param: OAuth access token.
	 */
	access_token?: string;

	/**
	 * Query param: Data format for response.
	 */
	alt?: "json" | "media" | "proto";

	/**
	 * Query param: JSONP
	 */
	callback?: string;

	/**
	 * Query param: Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

	/**
	 * Query param: API key. Your API key identifies your project and provides you with
	 * API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
	 */
	key?: string;

	/**
	 * Query param: OAuth 2.0 token for the current user.
	 */
	oauth_token?: string;

	/**
	 * Query param: Returns response with indentations and line breaks.
	 */
	prettyPrint?: boolean;

	/**
	 * Query param: Available to use for quota purposes for server-side applications.
	 * Can be any arbitrary string assigned to a user, but should not exceed 40
	 * characters.
	 */
	quotaUser?: string;

	/**
	 * Query param: Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Query param: Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Body param: A UUID or similar unique string that identifies this channel.
	 */
	id?: string;

	/**
	 * Body param: An arbitrary string delivered to the target address with each
	 * notification delivered over this channel. Optional.
	 */
	token?: string;

	/**
	 * Body param: The address where notifications are delivered for this channel.
	 */
	address?: string;

	/**
	 * Body param: Date and time of notification channel expiration, expressed as a
	 * Unix timestamp, in milliseconds. Optional.
	 */
	expiration?: string;

	/**
	 * Body param: Identifies this as a notification channel used to watch for changes
	 * to a resource, which is `api#channel`.
	 */
	kind?: string;

	/**
	 * Body param: Additional parameters controlling delivery channel behavior.
	 * Optional.
	 */
	params?: Record<string, string>;

	/**
	 * Body param: A Boolean value to indicate whether payload is wanted. Optional.
	 */
	payload?: boolean;

	/**
	 * Body param: An opaque ID that identifies the resource being watched on this
	 * channel. Stable across different API versions.
	 */
	resourceId?: string;

	/**
	 * Body param: A version-specific identifier for the watched resource.
	 */
	resourceUri?: string;

	/**
	 * Body param: The type of delivery mechanism used for this channel. Valid values
	 * are "web_hook" or "webhook".
	 */
	type?: string;
}

export namespace ChannelStopWatchingParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Channels {
	export { type ChannelStopWatchingParams };
}
