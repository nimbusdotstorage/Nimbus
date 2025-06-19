// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../internal/request-options";
import { APIPromise } from "../core/api-promise";
import { APIResource } from "../core/resource";
import * as TeamdrivesAPI from "./teamdrives";
import * as FilesAPI from "./files/files";
import * as DrivesAPI from "./drives";

export class Changes extends APIResource {
	/**
	 * Lists the changes for a user or shared drive.
	 */
	list(query: ChangeListParams, options?: RequestOptions): APIPromise<ChangeListResponse> {
		return this._client.get("/changes", { query, ...options });
	}

	/**
	 * Gets the starting pageToken for listing future changes.
	 */
	getStartPageToken(
		query: ChangeGetStartPageTokenParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<ChangeGetStartPageTokenResponse> {
		return this._client.get("/changes/startPageToken", { query, ...options });
	}

	/**
	 * Subscribes to changes for a user.
	 */
	subscribe(params: ChangeSubscribeParams, options?: RequestOptions): APIPromise<Channel> {
		const {
			pageToken,
			$,
			access_token,
			alt,
			callback,
			driveId,
			fields,
			includeCorpusRemovals,
			includeItemsFromAllDrives,
			includeLabels,
			includePermissionsForView,
			includeRemoved,
			includeTeamDriveItems,
			key,
			oauth_token,
			pageSize,
			prettyPrint,
			quotaUser,
			restrictToMyDrive,
			spaces,
			supportsAllDrives,
			supportsTeamDrives,
			teamDriveId,
			upload_protocol,
			uploadType,
			...body
		} = params;
		return this._client.post("/changes/watch", {
			query: {
				pageToken,
				$,
				access_token,
				alt,
				callback,
				driveId,
				fields,
				includeCorpusRemovals,
				includeItemsFromAllDrives,
				includeLabels,
				includePermissionsForView,
				includeRemoved,
				includeTeamDriveItems,
				key,
				oauth_token,
				pageSize,
				prettyPrint,
				quotaUser,
				restrictToMyDrive,
				spaces,
				supportsAllDrives,
				supportsTeamDrives,
				teamDriveId,
				upload_protocol,
				uploadType,
			},
			body,
			...options,
		});
	}
}

/**
 * A notification channel used to watch for resource changes.
 */
export interface Channel {
	/**
	 * A UUID or similar unique string that identifies this channel.
	 */
	id?: string;

	/**
	 * An arbitrary string delivered to the target address with each notification
	 * delivered over this channel. Optional.
	 */
	token?: string;

	/**
	 * The address where notifications are delivered for this channel.
	 */
	address?: string;

	/**
	 * Date and time of notification channel expiration, expressed as a Unix timestamp,
	 * in milliseconds. Optional.
	 */
	expiration?: string;

	/**
	 * Identifies this as a notification channel used to watch for changes to a
	 * resource, which is `api#channel`.
	 */
	kind?: string;

	/**
	 * Additional parameters controlling delivery channel behavior. Optional.
	 */
	params?: Record<string, string>;

	/**
	 * A Boolean value to indicate whether payload is wanted. Optional.
	 */
	payload?: boolean;

	/**
	 * An opaque ID that identifies the resource being watched on this channel. Stable
	 * across different API versions.
	 */
	resourceId?: string;

	/**
	 * A version-specific identifier for the watched resource.
	 */
	resourceUri?: string;

	/**
	 * The type of delivery mechanism used for this channel. Valid values are
	 * "web_hook" or "webhook".
	 */
	type?: string;
}

/**
 * A list of changes for a user.
 */
export interface ChangeListResponse {
	/**
	 * The list of changes. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	changes?: Array<ChangeListResponse.Change>;

	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#changeList"`.
	 */
	kind?: string;

	/**
	 * The starting page token for future changes. This will be present only if the end
	 * of the current changes list has been reached. The page token doesn't expire.
	 */
	newStartPageToken?: string;

	/**
	 * The page token for the next page of changes. This will be absent if the end of
	 * the changes list has been reached. The page token doesn't expire.
	 */
	nextPageToken?: string;
}

export namespace ChangeListResponse {
	/**
	 * A change to a file or shared drive.
	 */
	export interface Change {
		/**
		 * The type of the change. Possible values are `file` and `drive`.
		 */
		changeType?: string;

		/**
		 * The updated state of the shared drive. Present if the changeType is drive, the
		 * user is still a member of the shared drive, and the shared drive has not been
		 * deleted.
		 */
		drive?: DrivesAPI.Drive;

		/**
		 * The ID of the shared drive associated with this change.
		 */
		driveId?: string;

		/**
		 * The updated state of the file. Present if the type is file and the file has not
		 * been removed from this list of changes.
		 */
		file?: FilesAPI.File;

		/**
		 * The ID of the file which has changed.
		 */
		fileId?: string;

		/**
		 * Identifies what kind of resource this is. Value: the fixed string
		 * `"drive#change"`.
		 */
		kind?: string;

		/**
		 * Whether the file or shared drive has been removed from this list of changes, for
		 * example by deletion or loss of access.
		 */
		removed?: boolean;

		/**
		 * @deprecated Deprecated: Use `drive` instead.
		 */
		teamDrive?: TeamdrivesAPI.TeamDrive;

		/**
		 * @deprecated Deprecated: Use `driveId` instead.
		 */
		teamDriveId?: string;

		/**
		 * The time of this change (RFC 3339 date-time).
		 */
		time?: string;

		/**
		 * @deprecated Deprecated: Use `changeType` instead.
		 */
		type?: string;
	}
}

export interface ChangeGetStartPageTokenResponse {
	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#startPageToken"`.
	 */
	kind?: string;

	/**
	 * The starting page token for listing future changes. The page token doesn't
	 * expire.
	 */
	startPageToken?: string;
}

export interface ChangeListParams {
	/**
	 * The token for continuing a previous list request on the next page. This should
	 * be set to the value of 'nextPageToken' from the previous response or to the
	 * response from the getStartPageToken method.
	 */
	pageToken: string;

	$?: ChangeListParams._;

	/**
	 * OAuth access token.
	 */
	access_token?: string;

	/**
	 * Data format for response.
	 */
	alt?: "json" | "media" | "proto";

	/**
	 * JSONP
	 */
	callback?: string;

	/**
	 * The shared drive from which changes will be returned. If specified the change
	 * IDs will be reflective of the shared drive; use the combined drive ID and change
	 * ID as an identifier.
	 */
	driveId?: string;

	/**
	 * Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

	/**
	 * Whether changes should include the file resource if the file is still accessible
	 * by the user at the time of the request, even when a file was removed from the
	 * list of changes and there will be no further change entries for this file.
	 */
	includeCorpusRemovals?: boolean;

	/**
	 * Whether both My Drive and shared drive items should be included in results.
	 */
	includeItemsFromAllDrives?: boolean;

	/**
	 * A comma-separated list of IDs of labels to include in the `labelInfo` part of
	 * the response.
	 */
	includeLabels?: string;

	/**
	 * Specifies which additional view's permissions to include in the response. Only
	 * 'published' is supported.
	 */
	includePermissionsForView?: string;

	/**
	 * Whether to include changes indicating that items have been removed from the list
	 * of changes, for example by deletion or loss of access.
	 */
	includeRemoved?: boolean;

	/**
	 * Deprecated: Use `includeItemsFromAllDrives` instead.
	 */
	includeTeamDriveItems?: boolean;

	/**
	 * API key. Your API key identifies your project and provides you with API access,
	 * quota, and reports. Required unless you provide an OAuth 2.0 token.
	 */
	key?: string;

	/**
	 * OAuth 2.0 token for the current user.
	 */
	oauth_token?: string;

	/**
	 * The maximum number of changes to return per page.
	 */
	pageSize?: number;

	/**
	 * Returns response with indentations and line breaks.
	 */
	prettyPrint?: boolean;

	/**
	 * Available to use for quota purposes for server-side applications. Can be any
	 * arbitrary string assigned to a user, but should not exceed 40 characters.
	 */
	quotaUser?: string;

	/**
	 * Whether to restrict the results to changes inside the My Drive hierarchy. This
	 * omits changes to files such as those in the Application Data folder or shared
	 * files which have not been added to My Drive.
	 */
	restrictToMyDrive?: boolean;

	/**
	 * A comma-separated list of spaces to query within the corpora. Supported values
	 * are 'drive' and 'appDataFolder'.
	 */
	spaces?: string;

	/**
	 * Whether the requesting application supports both My Drives and shared drives.
	 */
	supportsAllDrives?: boolean;

	/**
	 * Deprecated: Use `supportsAllDrives` instead.
	 */
	supportsTeamDrives?: boolean;

	/**
	 * Deprecated: Use `driveId` instead.
	 */
	teamDriveId?: string;

	/**
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace ChangeListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface ChangeGetStartPageTokenParams {
	$?: ChangeGetStartPageTokenParams._;

	/**
	 * OAuth access token.
	 */
	access_token?: string;

	/**
	 * Data format for response.
	 */
	alt?: "json" | "media" | "proto";

	/**
	 * JSONP
	 */
	callback?: string;

	/**
	 * The ID of the shared drive for which the starting pageToken for listing future
	 * changes from that shared drive will be returned.
	 */
	driveId?: string;

	/**
	 * Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

	/**
	 * API key. Your API key identifies your project and provides you with API access,
	 * quota, and reports. Required unless you provide an OAuth 2.0 token.
	 */
	key?: string;

	/**
	 * OAuth 2.0 token for the current user.
	 */
	oauth_token?: string;

	/**
	 * Returns response with indentations and line breaks.
	 */
	prettyPrint?: boolean;

	/**
	 * Available to use for quota purposes for server-side applications. Can be any
	 * arbitrary string assigned to a user, but should not exceed 40 characters.
	 */
	quotaUser?: string;

	/**
	 * Whether the requesting application supports both My Drives and shared drives.
	 */
	supportsAllDrives?: boolean;

	/**
	 * Deprecated: Use `supportsAllDrives` instead.
	 */
	supportsTeamDrives?: boolean;

	/**
	 * Deprecated: Use `driveId` instead.
	 */
	teamDriveId?: string;

	/**
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace ChangeGetStartPageTokenParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface ChangeSubscribeParams {
	/**
	 * Query param: The token for continuing a previous list request on the next page.
	 * This should be set to the value of 'nextPageToken' from the previous response or
	 * to the response from the getStartPageToken method.
	 */
	pageToken: string;

	/**
	 * Query param:
	 */
	$?: ChangeSubscribeParams._;

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
	 * Query param: The shared drive from which changes will be returned. If specified
	 * the change IDs will be reflective of the shared drive; use the combined drive ID
	 * and change ID as an identifier.
	 */
	driveId?: string;

	/**
	 * Query param: Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

	/**
	 * Query param: Whether changes should include the file resource if the file is
	 * still accessible by the user at the time of the request, even when a file was
	 * removed from the list of changes and there will be no further change entries for
	 * this file.
	 */
	includeCorpusRemovals?: boolean;

	/**
	 * Query param: Whether both My Drive and shared drive items should be included in
	 * results.
	 */
	includeItemsFromAllDrives?: boolean;

	/**
	 * Query param: A comma-separated list of IDs of labels to include in the
	 * `labelInfo` part of the response.
	 */
	includeLabels?: string;

	/**
	 * Query param: Specifies which additional view's permissions to include in the
	 * response. Only 'published' is supported.
	 */
	includePermissionsForView?: string;

	/**
	 * Query param: Whether to include changes indicating that items have been removed
	 * from the list of changes, for example by deletion or loss of access.
	 */
	includeRemoved?: boolean;

	/**
	 * Query param: Deprecated: Use `includeItemsFromAllDrives` instead.
	 */
	includeTeamDriveItems?: boolean;

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
	 * Query param: The maximum number of changes to return per page.
	 */
	pageSize?: number;

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
	 * Query param: Whether to restrict the results to changes inside the My Drive
	 * hierarchy. This omits changes to files such as those in the Application Data
	 * folder or shared files which have not been added to My Drive.
	 */
	restrictToMyDrive?: boolean;

	/**
	 * Query param: A comma-separated list of spaces to query within the corpora.
	 * Supported values are 'drive' and 'appDataFolder'.
	 */
	spaces?: string;

	/**
	 * Query param: Whether the requesting application supports both My Drives and
	 * shared drives.
	 */
	supportsAllDrives?: boolean;

	/**
	 * Query param: Deprecated: Use `supportsAllDrives` instead.
	 */
	supportsTeamDrives?: boolean;

	/**
	 * Query param: Deprecated: Use `driveId` instead.
	 */
	teamDriveId?: string;

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

export namespace ChangeSubscribeParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Changes {
	export type {
		Channel,
		ChangeListResponse,
		ChangeGetStartPageTokenResponse,
		ChangeListParams,
		ChangeGetStartPageTokenParams,
		ChangeSubscribeParams,
	};
}
