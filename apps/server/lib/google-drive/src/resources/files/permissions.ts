// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../../internal/request-options";
import { buildHeaders } from "../../internal/headers";
import { APIPromise } from "../../core/api-promise";
import { APIResource } from "../../core/resource";
import { path } from "../../internal/utils/path";

export class Permissions extends APIResource {
	/**
	 * Creates a permission for a file or shared drive. **Warning:** Concurrent
	 * permissions operations on the same file are not supported; only the last update
	 * is applied.
	 */
	create(
		fileID: string,
		params: PermissionCreateParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<Permission> {
		const {
			$,
			access_token,
			alt,
			callback,
			emailMessage,
			enforceSingleParent,
			fields,
			key,
			moveToNewOwnersRoot,
			oauth_token,
			prettyPrint,
			quotaUser,
			sendNotificationEmail,
			supportsAllDrives,
			supportsTeamDrives,
			transferOwnership,
			upload_protocol,
			uploadType,
			useDomainAdminAccess,
			...body
		} = params ?? {};
		return this._client.post(path`/files/${fileID}/permissions`, {
			query: {
				$,
				access_token,
				alt,
				callback,
				emailMessage,
				enforceSingleParent,
				fields,
				key,
				moveToNewOwnersRoot,
				oauth_token,
				prettyPrint,
				quotaUser,
				sendNotificationEmail,
				supportsAllDrives,
				supportsTeamDrives,
				transferOwnership,
				upload_protocol,
				uploadType,
				useDomainAdminAccess,
			},
			body,
			...options,
		});
	}

	/**
	 * Gets a permission by ID.
	 */
	retrieve(permissionID: string, params: PermissionRetrieveParams, options?: RequestOptions): APIPromise<Permission> {
		const { fileId, ...query } = params;
		return this._client.get(path`/files/${fileId}/permissions/${permissionID}`, { query, ...options });
	}

	/**
	 * Updates a permission with patch semantics. **Warning:** Concurrent permissions
	 * operations on the same file are not supported; only the last update is applied.
	 */
	update(permissionID: string, params: PermissionUpdateParams, options?: RequestOptions): APIPromise<Permission> {
		const {
			fileId,
			$,
			access_token,
			alt,
			callback,
			fields,
			key,
			oauth_token,
			prettyPrint,
			quotaUser,
			removeExpiration,
			supportsAllDrives,
			supportsTeamDrives,
			transferOwnership,
			upload_protocol,
			uploadType,
			useDomainAdminAccess,
			...body
		} = params;
		return this._client.patch(path`/files/${fileId}/permissions/${permissionID}`, {
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
				removeExpiration,
				supportsAllDrives,
				supportsTeamDrives,
				transferOwnership,
				upload_protocol,
				uploadType,
				useDomainAdminAccess,
			},
			body,
			...options,
		});
	}

	/**
	 * Lists a file's or shared drive's permissions.
	 */
	list(
		fileID: string,
		query: PermissionListParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<PermissionListResponse> {
		return this._client.get(path`/files/${fileID}/permissions`, { query, ...options });
	}

	/**
	 * Deletes a permission. **Warning:** Concurrent permissions operations on the same
	 * file are not supported; only the last update is applied.
	 */
	delete(permissionID: string, params: PermissionDeleteParams, options?: RequestOptions): APIPromise<void> {
		const {
			fileId,
			$,
			access_token,
			alt,
			callback,
			fields,
			key,
			oauth_token,
			prettyPrint,
			quotaUser,
			supportsAllDrives,
			supportsTeamDrives,
			upload_protocol,
			uploadType,
			useDomainAdminAccess,
		} = params;
		return this._client.delete(path`/files/${fileId}/permissions/${permissionID}`, {
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
				supportsAllDrives,
				supportsTeamDrives,
				upload_protocol,
				uploadType,
				useDomainAdminAccess,
			},
			...options,
			headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
		});
	}
}

/**
 * A permission for a file. A permission grants a user, group, domain, or the world
 * access to a file or a folder hierarchy. Some resource methods (such as
 * `permissions.update`) require a `permissionId`. Use the `permissions.list`
 * method to retrieve the ID for a file, folder, or shared drive.
 */
export interface Permission {
	/**
	 * Output only. The ID of this permission. This is a unique identifier for the
	 * grantee, and is published in User resources as `permissionId`. IDs should be
	 * treated as opaque values.
	 */
	id?: string;

	/**
	 * Whether the permission allows the file to be discovered through search. This is
	 * only applicable for permissions of type `domain` or `anyone`.
	 */
	allowFileDiscovery?: boolean;

	/**
	 * Output only. Whether the account associated with this permission has been
	 * deleted. This field only pertains to user and group permissions.
	 */
	deleted?: boolean;

	/**
	 * Output only. The "pretty" name of the value of the permission. The following is
	 * a list of examples for each type of permission: _ `user` - User's full name, as
	 * defined for their Google account, such as "Joe Smith." _ `group` - Name of the
	 * Google Group, such as "The Company Administrators." _ `domain` - String domain
	 * name, such as "thecompany.com." _ `anyone` - No `displayName` is present.
	 */
	displayName?: string;

	/**
	 * The domain to which this permission refers.
	 */
	domain?: string;

	/**
	 * The email address of the user or group to which this permission refers.
	 */
	emailAddress?: string;

	/**
	 * The time at which this permission will expire (RFC 3339 date-time). Expiration
	 * times have the following restrictions: - They can only be set on user and group
	 * permissions - The time must be in the future - The time cannot be more than a
	 * year in the future
	 */
	expirationTime?: string;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#permission"`.
	 */
	kind?: string;

	/**
	 * Whether the account associated with this permission is a pending owner. Only
	 * populated for `user` type permissions for files that are not in a shared drive.
	 */
	pendingOwner?: boolean;

	/**
	 * Output only. Details of whether the permissions on this shared drive item are
	 * inherited or directly on this item. This is an output-only field which is
	 * present only for shared drive items.
	 */
	permissionDetails?: Array<Permission.PermissionDetail>;

	/**
	 * Output only. A link to the user's profile photo, if available.
	 */
	photoLink?: string;

	/**
	 * The role granted by this permission. While new values may be supported in the
	 * future, the following are currently allowed: _ `owner` _ `organizer` _
	 * `fileOrganizer` _ `writer` _ `commenter` _ `reader`
	 */
	role?: string;

	/**
	 * @deprecated Output only. Deprecated: Output only. Use `permissionDetails`
	 * instead.
	 */
	teamDrivePermissionDetails?: Array<Permission.TeamDrivePermissionDetail>;

	/**
	 * The type of the grantee. Valid values are: _ `user` _ `group` _ `domain` _
	 * `anyone` When creating a permission, if `type` is `user` or `group`, you must
	 * provide an `emailAddress` for the user or group. When `type` is `domain`, you
	 * must provide a `domain`. There isn't extra information required for an `anyone`
	 * type.
	 */
	type?: string;

	/**
	 * Indicates the view for this permission. Only populated for permissions that
	 * belong to a view. 'published' is the only supported value.
	 */
	view?: string;
}

export namespace Permission {
	export interface PermissionDetail {
		/**
		 * Output only. Whether this permission is inherited. This field is always
		 * populated. This is an output-only field.
		 */
		inherited?: boolean;

		/**
		 * Output only. The ID of the item from which this permission is inherited. This is
		 * an output-only field.
		 */
		inheritedFrom?: string;

		/**
		 * Output only. The permission type for this user. While new values may be added in
		 * future, the following are currently possible: _ `file` _ `member`
		 */
		permissionType?: string;

		/**
		 * Output only. The primary role for this user. While new values may be added in
		 * the future, the following are currently possible: _ `organizer` _
		 * `fileOrganizer` _ `writer` _ `commenter` \* `reader`
		 */
		role?: string;
	}

	export interface TeamDrivePermissionDetail {
		/**
		 * @deprecated Deprecated: Output only. Use `permissionDetails/inherited` instead.
		 */
		inherited?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `permissionDetails/inheritedFrom`
		 * instead.
		 */
		inheritedFrom?: string;

		/**
		 * @deprecated Deprecated: Output only. Use `permissionDetails/role` instead.
		 */
		role?: string;

		/**
		 * @deprecated Deprecated: Output only. Use `permissionDetails/permissionType`
		 * instead.
		 */
		teamDrivePermissionType?: string;
	}
}

/**
 * A list of permissions for a file.
 */
export interface PermissionListResponse {
	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#permissionList"`.
	 */
	kind?: string;

	/**
	 * The page token for the next page of permissions. This field will be absent if
	 * the end of the permissions list has been reached. If the token is rejected for
	 * any reason, it should be discarded, and pagination should be restarted from the
	 * first page of results. The page token is typically valid for several hours.
	 * However, if new items are added or removed, your expected results might differ.
	 */
	nextPageToken?: string;

	/**
	 * The list of permissions. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	permissions?: Array<Permission>;
}

export interface PermissionCreateParams {
	/**
	 * Query param:
	 */
	$?: PermissionCreateParams._;

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
	 * Query param: A plain text custom message to include in the notification email.
	 */
	emailMessage?: string;

	/**
	 * Query param: Deprecated: See `moveToNewOwnersRoot` for details.
	 */
	enforceSingleParent?: boolean;

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
	 * Query param: This parameter will only take effect if the item is not in a shared
	 * drive and the request is attempting to transfer the ownership of the item. If
	 * set to `true`, the item will be moved to the new owner's My Drive root folder
	 * and all prior parents removed. If set to `false`, parents are not changed.
	 */
	moveToNewOwnersRoot?: boolean;

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
	 * Query param: Whether to send a notification email when sharing to users or
	 * groups. This defaults to true for users and groups, and is not allowed for other
	 * requests. It must not be disabled for ownership transfers.
	 */
	sendNotificationEmail?: boolean;

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
	 * Query param: Whether to transfer ownership to the specified user and downgrade
	 * the current owner to a writer. This parameter is required as an acknowledgement
	 * of the side effect.
	 */
	transferOwnership?: boolean;

	/**
	 * Query param: Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Query param: Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Query param: Issue the request as a domain administrator; if set to true, then
	 * the requester will be granted access if the file ID parameter refers to a shared
	 * drive and the requester is an administrator of the domain to which the shared
	 * drive belongs.
	 */
	useDomainAdminAccess?: boolean;

	/**
	 * Body param: Output only. The ID of this permission. This is a unique identifier
	 * for the grantee, and is published in User resources as `permissionId`. IDs
	 * should be treated as opaque values.
	 */
	id?: string;

	/**
	 * Body param: Whether the permission allows the file to be discovered through
	 * search. This is only applicable for permissions of type `domain` or `anyone`.
	 */
	allowFileDiscovery?: boolean;

	/**
	 * Body param: Output only. Whether the account associated with this permission has
	 * been deleted. This field only pertains to user and group permissions.
	 */
	deleted?: boolean;

	/**
	 * Body param: Output only. The "pretty" name of the value of the permission. The
	 * following is a list of examples for each type of permission: _ `user` - User's
	 * full name, as defined for their Google account, such as "Joe Smith." _ `group` -
	 * Name of the Google Group, such as "The Company Administrators." _ `domain` -
	 * String domain name, such as "thecompany.com." _ `anyone` - No `displayName` is
	 * present.
	 */
	displayName?: string;

	/**
	 * Body param: The domain to which this permission refers.
	 */
	domain?: string;

	/**
	 * Body param: The email address of the user or group to which this permission
	 * refers.
	 */
	emailAddress?: string;

	/**
	 * Body param: The time at which this permission will expire (RFC 3339 date-time).
	 * Expiration times have the following restrictions: - They can only be set on user
	 * and group permissions - The time must be in the future - The time cannot be more
	 * than a year in the future
	 */
	expirationTime?: string;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#permission"`.
	 */
	kind?: string;

	/**
	 * Body param: Whether the account associated with this permission is a pending
	 * owner. Only populated for `user` type permissions for files that are not in a
	 * shared drive.
	 */
	pendingOwner?: boolean;

	/**
	 * Body param: Output only. A link to the user's profile photo, if available.
	 */
	photoLink?: string;

	/**
	 * Body param: The role granted by this permission. While new values may be
	 * supported in the future, the following are currently allowed: _ `owner` _
	 * `organizer` _ `fileOrganizer` _ `writer` _ `commenter` _ `reader`
	 */
	role?: string;

	/**
	 * Body param: The type of the grantee. Valid values are: _ `user` _ `group` _
	 * `domain` _ `anyone` When creating a permission, if `type` is `user` or `group`,
	 * you must provide an `emailAddress` for the user or group. When `type` is
	 * `domain`, you must provide a `domain`. There isn't extra information required
	 * for an `anyone` type.
	 */
	type?: string;

	/**
	 * Body param: Indicates the view for this permission. Only populated for
	 * permissions that belong to a view. 'published' is the only supported value.
	 */
	view?: string;
}

export namespace PermissionCreateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface PermissionRetrieveParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: PermissionRetrieveParams._;

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
	 * Query param: Whether the requesting application supports both My Drives and
	 * shared drives.
	 */
	supportsAllDrives?: boolean;

	/**
	 * Query param: Deprecated: Use `supportsAllDrives` instead.
	 */
	supportsTeamDrives?: boolean;

	/**
	 * Query param: Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Query param: Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Query param: Issue the request as a domain administrator; if set to true, then
	 * the requester will be granted access if the file ID parameter refers to a shared
	 * drive and the requester is an administrator of the domain to which the shared
	 * drive belongs.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace PermissionRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface PermissionUpdateParams {
	/**
	 * Path param: The ID of the file or shared drive.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: PermissionUpdateParams._;

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
	 * Query param: Whether to remove the expiration date.
	 */
	removeExpiration?: boolean;

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
	 * Query param: Whether to transfer ownership to the specified user and downgrade
	 * the current owner to a writer. This parameter is required as an acknowledgement
	 * of the side effect.
	 */
	transferOwnership?: boolean;

	/**
	 * Query param: Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Query param: Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Query param: Issue the request as a domain administrator; if set to true, then
	 * the requester will be granted access if the file ID parameter refers to a shared
	 * drive and the requester is an administrator of the domain to which the shared
	 * drive belongs.
	 */
	useDomainAdminAccess?: boolean;

	/**
	 * Body param: Output only. The ID of this permission. This is a unique identifier
	 * for the grantee, and is published in User resources as `permissionId`. IDs
	 * should be treated as opaque values.
	 */
	id?: string;

	/**
	 * Body param: Whether the permission allows the file to be discovered through
	 * search. This is only applicable for permissions of type `domain` or `anyone`.
	 */
	allowFileDiscovery?: boolean;

	/**
	 * Body param: Output only. Whether the account associated with this permission has
	 * been deleted. This field only pertains to user and group permissions.
	 */
	deleted?: boolean;

	/**
	 * Body param: Output only. The "pretty" name of the value of the permission. The
	 * following is a list of examples for each type of permission: _ `user` - User's
	 * full name, as defined for their Google account, such as "Joe Smith." _ `group` -
	 * Name of the Google Group, such as "The Company Administrators." _ `domain` -
	 * String domain name, such as "thecompany.com." _ `anyone` - No `displayName` is
	 * present.
	 */
	displayName?: string;

	/**
	 * Body param: The domain to which this permission refers.
	 */
	domain?: string;

	/**
	 * Body param: The email address of the user or group to which this permission
	 * refers.
	 */
	emailAddress?: string;

	/**
	 * Body param: The time at which this permission will expire (RFC 3339 date-time).
	 * Expiration times have the following restrictions: - They can only be set on user
	 * and group permissions - The time must be in the future - The time cannot be more
	 * than a year in the future
	 */
	expirationTime?: string;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#permission"`.
	 */
	kind?: string;

	/**
	 * Body param: Whether the account associated with this permission is a pending
	 * owner. Only populated for `user` type permissions for files that are not in a
	 * shared drive.
	 */
	pendingOwner?: boolean;

	/**
	 * Body param: Output only. A link to the user's profile photo, if available.
	 */
	photoLink?: string;

	/**
	 * Body param: The role granted by this permission. While new values may be
	 * supported in the future, the following are currently allowed: _ `owner` _
	 * `organizer` _ `fileOrganizer` _ `writer` _ `commenter` _ `reader`
	 */
	role?: string;

	/**
	 * Body param: The type of the grantee. Valid values are: _ `user` _ `group` _
	 * `domain` _ `anyone` When creating a permission, if `type` is `user` or `group`,
	 * you must provide an `emailAddress` for the user or group. When `type` is
	 * `domain`, you must provide a `domain`. There isn't extra information required
	 * for an `anyone` type.
	 */
	type?: string;

	/**
	 * Body param: Indicates the view for this permission. Only populated for
	 * permissions that belong to a view. 'published' is the only supported value.
	 */
	view?: string;
}

export namespace PermissionUpdateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface PermissionListParams {
	$?: PermissionListParams._;

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
	 * Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

	/**
	 * Specifies which additional view's permissions to include in the response. Only
	 * 'published' is supported.
	 */
	includePermissionsForView?: string;

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
	 * The maximum number of permissions to return per page. When not set for files in
	 * a shared drive, at most 100 results will be returned. When not set for files
	 * that are not in a shared drive, the entire list will be returned.
	 */
	pageSize?: number;

	/**
	 * The token for continuing a previous list request on the next page. This should
	 * be set to the value of 'nextPageToken' from the previous response.
	 */
	pageToken?: string;

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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Issue the request as a domain administrator; if set to true, then the requester
	 * will be granted access if the file ID parameter refers to a shared drive and the
	 * requester is an administrator of the domain to which the shared drive belongs.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace PermissionListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface PermissionDeleteParams {
	/**
	 * Path param: The ID of the file or shared drive.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: PermissionDeleteParams._;

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
	 * Query param: Whether the requesting application supports both My Drives and
	 * shared drives.
	 */
	supportsAllDrives?: boolean;

	/**
	 * Query param: Deprecated: Use `supportsAllDrives` instead.
	 */
	supportsTeamDrives?: boolean;

	/**
	 * Query param: Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Query param: Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Query param: Issue the request as a domain administrator; if set to true, then
	 * the requester will be granted access if the file ID parameter refers to a shared
	 * drive and the requester is an administrator of the domain to which the shared
	 * drive belongs.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace PermissionDeleteParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Permissions {
	export type {
		Permission,
		PermissionListResponse,
		PermissionCreateParams,
		PermissionRetrieveParams,
		PermissionUpdateParams,
		PermissionListParams,
		PermissionDeleteParams,
	};
}
