// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../internal/request-options";
import { buildHeaders } from "../internal/headers";
import { APIPromise } from "../core/api-promise";
import { APIResource } from "../core/resource";
import { path } from "../internal/utils/path";

export class Drives extends APIResource {
	/**
	 * Creates a shared drive.
	 */
	create(params: DriveCreateParams, options?: RequestOptions): APIPromise<Drive> {
		const {
			requestId,
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
		} = params;
		return this._client.post("/drives", {
			query: {
				requestId,
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
		});
	}

	/**
	 * Gets a shared drive's metadata by ID.
	 */
	retrieve(
		driveID: string,
		query: DriveRetrieveParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<Drive> {
		return this._client.get(path`/drives/${driveID}`, { query, ...options });
	}

	/**
	 * Updates the metadate for a shared drive.
	 */
	update(
		driveID: string,
		params: DriveUpdateParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<Drive> {
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
			useDomainAdminAccess,
			...body
		} = params ?? {};
		return this._client.patch(path`/drives/${driveID}`, {
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
				useDomainAdminAccess,
			},
			body,
			...options,
		});
	}

	/**
	 * Lists the user's shared drives. This method accepts the `q` parameter, which is
	 * a search query combining one or more search terms. For more information, see the
	 * [Search for shared drives](/drive/api/guides/search-shareddrives) guide.
	 */
	list(query: DriveListParams | null | undefined = {}, options?: RequestOptions): APIPromise<DriveListResponse> {
		return this._client.get("/drives", { query, ...options });
	}

	/**
	 * Permanently deletes a shared drive for which the user is an `organizer`. The
	 * shared drive cannot contain any untrashed items.
	 */
	delete(
		driveID: string,
		params: DriveDeleteParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<void> {
		const {
			$,
			access_token,
			allowItemDeletion,
			alt,
			callback,
			fields,
			key,
			oauth_token,
			prettyPrint,
			quotaUser,
			upload_protocol,
			uploadType,
			useDomainAdminAccess,
		} = params ?? {};
		return this._client.delete(path`/drives/${driveID}`, {
			query: {
				$,
				access_token,
				allowItemDeletion,
				alt,
				callback,
				fields,
				key,
				oauth_token,
				prettyPrint,
				quotaUser,
				upload_protocol,
				uploadType,
				useDomainAdminAccess,
			},
			...options,
			headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
		});
	}

	/**
	 * Hides a shared drive from the default view.
	 */
	hide(driveID: string, params: DriveHideParams | null | undefined = {}, options?: RequestOptions): APIPromise<Drive> {
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
		} = params ?? {};
		return this._client.post(path`/drives/${driveID}/hide`, {
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
			...options,
		});
	}

	/**
	 * Restores a shared drive to the default view.
	 */
	unhide(
		driveID: string,
		params: DriveUnhideParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<Drive> {
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
		} = params ?? {};
		return this._client.post(path`/drives/${driveID}/unhide`, {
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
			...options,
		});
	}
}

/**
 * Representation of a shared drive. Some resource methods (such as
 * `drives.update`) require a `driveId`. Use the `drives.list` method to retrieve
 * the ID for a shared drive.
 */
export interface Drive {
	/**
	 * Output only. The ID of this shared drive which is also the ID of the top level
	 * folder of this shared drive.
	 */
	id?: string;

	/**
	 * An image file and cropping parameters from which a background image for this
	 * shared drive is set. This is a write only field; it can only be set on
	 * `drive.drives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	backgroundImageFile?: Drive.BackgroundImageFile;

	/**
	 * Output only. A short-lived link to this shared drive's background image.
	 */
	backgroundImageLink?: string;

	/**
	 * Output only. Capabilities the current user has on this shared drive.
	 */
	capabilities?: Drive.Capabilities;

	/**
	 * The color of this shared drive as an RGB hex string. It can only be set on a
	 * `drive.drives.update` request that does not set `themeId`.
	 */
	colorRgb?: string;

	/**
	 * The time at which the shared drive was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Whether the shared drive is hidden from default view.
	 */
	hidden?: boolean;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#drive"`.
	 */
	kind?: string;

	/**
	 * The name of this shared drive.
	 */
	name?: string;

	/**
	 * Output only. The organizational unit of this shared drive. This field is only
	 * populated on `drives.list` responses when the `useDomainAdminAccess` parameter
	 * is set to `true`.
	 */
	orgUnitId?: string;

	/**
	 * A set of restrictions that apply to this shared drive or items inside this
	 * shared drive. Note that restrictions can't be set when creating a shared drive.
	 * To add a restriction, first create a shared drive and then use `drives.update`
	 * to add restrictions.
	 */
	restrictions?: Drive.Restrictions;

	/**
	 * The ID of the theme from which the background image and color will be set. The
	 * set of possible `driveThemes` can be retrieved from a `drive.about.get`
	 * response. When not specified on a `drive.drives.create` request, a random theme
	 * is chosen from which the background image and color are set. This is a
	 * write-only field; it can only be set on requests that don't set `colorRgb` or
	 * `backgroundImageFile`.
	 */
	themeId?: string;
}

export namespace Drive {
	/**
	 * An image file and cropping parameters from which a background image for this
	 * shared drive is set. This is a write only field; it can only be set on
	 * `drive.drives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	export interface BackgroundImageFile {
		/**
		 * The ID of an image file in Google Drive to use for the background image.
		 */
		id?: string;

		/**
		 * The width of the cropped image in the closed range of 0 to 1. This value
		 * represents the width of the cropped image divided by the width of the entire
		 * image. The height is computed by applying a width to height aspect ratio of 80
		 * to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high.
		 */
		width?: number;

		/**
		 * The X coordinate of the upper left corner of the cropping area in the background
		 * image. This is a value in the closed range of 0 to 1. This value represents the
		 * horizontal distance from the left side of the entire image to the left side of
		 * the cropping area divided by the width of the entire image.
		 */
		xCoordinate?: number;

		/**
		 * The Y coordinate of the upper left corner of the cropping area in the background
		 * image. This is a value in the closed range of 0 to 1. This value represents the
		 * vertical distance from the top side of the entire image to the top side of the
		 * cropping area divided by the height of the entire image.
		 */
		yCoordinate?: number;
	}

	/**
	 * Output only. Capabilities the current user has on this shared drive.
	 */
	export interface Capabilities {
		/**
		 * Output only. Whether the current user can add children to folders in this shared
		 * drive.
		 */
		canAddChildren?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `copyRequiresWriterPermission` restriction of this shared drive.
		 */
		canChangeCopyRequiresWriterPermissionRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the `domainUsersOnly`
		 * restriction of this shared drive.
		 */
		canChangeDomainUsersOnlyRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the background of this shared
		 * drive.
		 */
		canChangeDriveBackground?: boolean;

		/**
		 * Output only. Whether the current user can change the `driveMembersOnly`
		 * restriction of this shared drive.
		 */
		canChangeDriveMembersOnlyRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `sharingFoldersRequiresOrganizerPermission` restriction of this shared drive.
		 */
		canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;

		/**
		 * Output only. Whether the current user can comment on files in this shared drive.
		 */
		canComment?: boolean;

		/**
		 * Output only. Whether the current user can copy files in this shared drive.
		 */
		canCopy?: boolean;

		/**
		 * Output only. Whether the current user can delete children from folders in this
		 * shared drive.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Output only. Whether the current user can delete this shared drive. Attempting
		 * to delete the shared drive may still fail if there are untrashed items inside
		 * the shared drive.
		 */
		canDeleteDrive?: boolean;

		/**
		 * Output only. Whether the current user can download files in this shared drive.
		 */
		canDownload?: boolean;

		/**
		 * Output only. Whether the current user can edit files in this shared drive
		 */
		canEdit?: boolean;

		/**
		 * Output only. Whether the current user can list the children of folders in this
		 * shared drive.
		 */
		canListChildren?: boolean;

		/**
		 * Output only. Whether the current user can add members to this shared drive or
		 * remove them or change their role.
		 */
		canManageMembers?: boolean;

		/**
		 * Output only. Whether the current user can read the revisions resource of files
		 * in this shared drive.
		 */
		canReadRevisions?: boolean;

		/**
		 * Output only. Whether the current user can rename files or folders in this shared
		 * drive.
		 */
		canRename?: boolean;

		/**
		 * Output only. Whether the current user can rename this shared drive.
		 */
		canRenameDrive?: boolean;

		/**
		 * Output only. Whether the current user can reset the shared drive restrictions to
		 * defaults.
		 */
		canResetDriveRestrictions?: boolean;

		/**
		 * Output only. Whether the current user can share files or folders in this shared
		 * drive.
		 */
		canShare?: boolean;

		/**
		 * Output only. Whether the current user can trash children from folders in this
		 * shared drive.
		 */
		canTrashChildren?: boolean;
	}

	/**
	 * A set of restrictions that apply to this shared drive or items inside this
	 * shared drive. Note that restrictions can't be set when creating a shared drive.
	 * To add a restriction, first create a shared drive and then use `drives.update`
	 * to add restrictions.
	 */
	export interface Restrictions {
		/**
		 * Whether administrative privileges on this shared drive are required to modify
		 * restrictions.
		 */
		adminManagedRestrictions?: boolean;

		/**
		 * Whether the options to copy, print, or download files inside this shared drive,
		 * should be disabled for readers and commenters. When this restriction is set to
		 * `true`, it will override the similarly named field to `true` for any file inside
		 * this shared drive.
		 */
		copyRequiresWriterPermission?: boolean;

		/**
		 * Whether access to this shared drive and items inside this shared drive is
		 * restricted to users of the domain to which this shared drive belongs. This
		 * restriction may be overridden by other sharing policies controlled outside of
		 * this shared drive.
		 */
		domainUsersOnly?: boolean;

		/**
		 * Whether access to items inside this shared drive is restricted to its members.
		 */
		driveMembersOnly?: boolean;

		/**
		 * If true, only users with the organizer role can share folders. If false, users
		 * with either the organizer role or the file organizer role can share folders.
		 */
		sharingFoldersRequiresOrganizerPermission?: boolean;
	}
}

/**
 * A list of shared drives.
 */
export interface DriveListResponse {
	/**
	 * The list of shared drives. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	drives?: Array<Drive>;

	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#driveList"`.
	 */
	kind?: string;

	/**
	 * The page token for the next page of shared drives. This will be absent if the
	 * end of the list has been reached. If the token is rejected for any reason, it
	 * should be discarded, and pagination should be restarted from the first page of
	 * results. The page token is typically valid for several hours. However, if new
	 * items are added or removed, your expected results might differ.
	 */
	nextPageToken?: string;
}

export interface DriveCreateParams {
	/**
	 * Query param: Required. An ID, such as a random UUID, which uniquely identifies
	 * this user's request for idempotent creation of a shared drive. A repeated
	 * request by the same user and with the same request ID will avoid creating
	 * duplicates by attempting to create the same shared drive. If the shared drive
	 * already exists a 409 error will be returned.
	 */
	requestId: string;

	/**
	 * Query param:
	 */
	$?: DriveCreateParams._;

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
	 * Body param: Output only. The ID of this shared drive which is also the ID of the
	 * top level folder of this shared drive.
	 */
	id?: string;

	/**
	 * Body param: An image file and cropping parameters from which a background image
	 * for this shared drive is set. This is a write only field; it can only be set on
	 * `drive.drives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	backgroundImageFile?: DriveCreateParams.BackgroundImageFile;

	/**
	 * Body param: Output only. A short-lived link to this shared drive's background
	 * image.
	 */
	backgroundImageLink?: string;

	/**
	 * Body param: Output only. Capabilities the current user has on this shared drive.
	 */
	capabilities?: DriveCreateParams.Capabilities;

	/**
	 * Body param: The color of this shared drive as an RGB hex string. It can only be
	 * set on a `drive.drives.update` request that does not set `themeId`.
	 */
	colorRgb?: string;

	/**
	 * Body param: The time at which the shared drive was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Whether the shared drive is hidden from default view.
	 */
	hidden?: boolean;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#drive"`.
	 */
	kind?: string;

	/**
	 * Body param: The name of this shared drive.
	 */
	name?: string;

	/**
	 * Body param: Output only. The organizational unit of this shared drive. This
	 * field is only populated on `drives.list` responses when the
	 * `useDomainAdminAccess` parameter is set to `true`.
	 */
	orgUnitId?: string;

	/**
	 * Body param: A set of restrictions that apply to this shared drive or items
	 * inside this shared drive. Note that restrictions can't be set when creating a
	 * shared drive. To add a restriction, first create a shared drive and then use
	 * `drives.update` to add restrictions.
	 */
	restrictions?: DriveCreateParams.Restrictions;

	/**
	 * Body param: The ID of the theme from which the background image and color will
	 * be set. The set of possible `driveThemes` can be retrieved from a
	 * `drive.about.get` response. When not specified on a `drive.drives.create`
	 * request, a random theme is chosen from which the background image and color are
	 * set. This is a write-only field; it can only be set on requests that don't set
	 * `colorRgb` or `backgroundImageFile`.
	 */
	themeId?: string;
}

export namespace DriveCreateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * An image file and cropping parameters from which a background image for this
	 * shared drive is set. This is a write only field; it can only be set on
	 * `drive.drives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	export interface BackgroundImageFile {
		/**
		 * The ID of an image file in Google Drive to use for the background image.
		 */
		id?: string;

		/**
		 * The width of the cropped image in the closed range of 0 to 1. This value
		 * represents the width of the cropped image divided by the width of the entire
		 * image. The height is computed by applying a width to height aspect ratio of 80
		 * to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high.
		 */
		width?: number;

		/**
		 * The X coordinate of the upper left corner of the cropping area in the background
		 * image. This is a value in the closed range of 0 to 1. This value represents the
		 * horizontal distance from the left side of the entire image to the left side of
		 * the cropping area divided by the width of the entire image.
		 */
		xCoordinate?: number;

		/**
		 * The Y coordinate of the upper left corner of the cropping area in the background
		 * image. This is a value in the closed range of 0 to 1. This value represents the
		 * vertical distance from the top side of the entire image to the top side of the
		 * cropping area divided by the height of the entire image.
		 */
		yCoordinate?: number;
	}

	/**
	 * Output only. Capabilities the current user has on this shared drive.
	 */
	export interface Capabilities {
		/**
		 * Output only. Whether the current user can add children to folders in this shared
		 * drive.
		 */
		canAddChildren?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `copyRequiresWriterPermission` restriction of this shared drive.
		 */
		canChangeCopyRequiresWriterPermissionRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the `domainUsersOnly`
		 * restriction of this shared drive.
		 */
		canChangeDomainUsersOnlyRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the background of this shared
		 * drive.
		 */
		canChangeDriveBackground?: boolean;

		/**
		 * Output only. Whether the current user can change the `driveMembersOnly`
		 * restriction of this shared drive.
		 */
		canChangeDriveMembersOnlyRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `sharingFoldersRequiresOrganizerPermission` restriction of this shared drive.
		 */
		canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;

		/**
		 * Output only. Whether the current user can comment on files in this shared drive.
		 */
		canComment?: boolean;

		/**
		 * Output only. Whether the current user can copy files in this shared drive.
		 */
		canCopy?: boolean;

		/**
		 * Output only. Whether the current user can delete children from folders in this
		 * shared drive.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Output only. Whether the current user can delete this shared drive. Attempting
		 * to delete the shared drive may still fail if there are untrashed items inside
		 * the shared drive.
		 */
		canDeleteDrive?: boolean;

		/**
		 * Output only. Whether the current user can download files in this shared drive.
		 */
		canDownload?: boolean;

		/**
		 * Output only. Whether the current user can edit files in this shared drive
		 */
		canEdit?: boolean;

		/**
		 * Output only. Whether the current user can list the children of folders in this
		 * shared drive.
		 */
		canListChildren?: boolean;

		/**
		 * Output only. Whether the current user can add members to this shared drive or
		 * remove them or change their role.
		 */
		canManageMembers?: boolean;

		/**
		 * Output only. Whether the current user can read the revisions resource of files
		 * in this shared drive.
		 */
		canReadRevisions?: boolean;

		/**
		 * Output only. Whether the current user can rename files or folders in this shared
		 * drive.
		 */
		canRename?: boolean;

		/**
		 * Output only. Whether the current user can rename this shared drive.
		 */
		canRenameDrive?: boolean;

		/**
		 * Output only. Whether the current user can reset the shared drive restrictions to
		 * defaults.
		 */
		canResetDriveRestrictions?: boolean;

		/**
		 * Output only. Whether the current user can share files or folders in this shared
		 * drive.
		 */
		canShare?: boolean;

		/**
		 * Output only. Whether the current user can trash children from folders in this
		 * shared drive.
		 */
		canTrashChildren?: boolean;
	}

	/**
	 * A set of restrictions that apply to this shared drive or items inside this
	 * shared drive. Note that restrictions can't be set when creating a shared drive.
	 * To add a restriction, first create a shared drive and then use `drives.update`
	 * to add restrictions.
	 */
	export interface Restrictions {
		/**
		 * Whether administrative privileges on this shared drive are required to modify
		 * restrictions.
		 */
		adminManagedRestrictions?: boolean;

		/**
		 * Whether the options to copy, print, or download files inside this shared drive,
		 * should be disabled for readers and commenters. When this restriction is set to
		 * `true`, it will override the similarly named field to `true` for any file inside
		 * this shared drive.
		 */
		copyRequiresWriterPermission?: boolean;

		/**
		 * Whether access to this shared drive and items inside this shared drive is
		 * restricted to users of the domain to which this shared drive belongs. This
		 * restriction may be overridden by other sharing policies controlled outside of
		 * this shared drive.
		 */
		domainUsersOnly?: boolean;

		/**
		 * Whether access to items inside this shared drive is restricted to its members.
		 */
		driveMembersOnly?: boolean;

		/**
		 * If true, only users with the organizer role can share folders. If false, users
		 * with either the organizer role or the file organizer role can share folders.
		 */
		sharingFoldersRequiresOrganizerPermission?: boolean;
	}
}

export interface DriveRetrieveParams {
	$?: DriveRetrieveParams._;

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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Issue the request as a domain administrator; if set to true, then the requester
	 * will be granted access if they are an administrator of the domain to which the
	 * shared drive belongs.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace DriveRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface DriveUpdateParams {
	/**
	 * Query param:
	 */
	$?: DriveUpdateParams._;

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
	 * Query param: Issue the request as a domain administrator; if set to true, then
	 * the requester will be granted access if they are an administrator of the domain
	 * to which the shared drive belongs.
	 */
	useDomainAdminAccess?: boolean;

	/**
	 * Body param: Output only. The ID of this shared drive which is also the ID of the
	 * top level folder of this shared drive.
	 */
	id?: string;

	/**
	 * Body param: An image file and cropping parameters from which a background image
	 * for this shared drive is set. This is a write only field; it can only be set on
	 * `drive.drives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	backgroundImageFile?: DriveUpdateParams.BackgroundImageFile;

	/**
	 * Body param: Output only. A short-lived link to this shared drive's background
	 * image.
	 */
	backgroundImageLink?: string;

	/**
	 * Body param: Output only. Capabilities the current user has on this shared drive.
	 */
	capabilities?: DriveUpdateParams.Capabilities;

	/**
	 * Body param: The color of this shared drive as an RGB hex string. It can only be
	 * set on a `drive.drives.update` request that does not set `themeId`.
	 */
	colorRgb?: string;

	/**
	 * Body param: The time at which the shared drive was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Whether the shared drive is hidden from default view.
	 */
	hidden?: boolean;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#drive"`.
	 */
	kind?: string;

	/**
	 * Body param: The name of this shared drive.
	 */
	name?: string;

	/**
	 * Body param: Output only. The organizational unit of this shared drive. This
	 * field is only populated on `drives.list` responses when the
	 * `useDomainAdminAccess` parameter is set to `true`.
	 */
	orgUnitId?: string;

	/**
	 * Body param: A set of restrictions that apply to this shared drive or items
	 * inside this shared drive. Note that restrictions can't be set when creating a
	 * shared drive. To add a restriction, first create a shared drive and then use
	 * `drives.update` to add restrictions.
	 */
	restrictions?: DriveUpdateParams.Restrictions;

	/**
	 * Body param: The ID of the theme from which the background image and color will
	 * be set. The set of possible `driveThemes` can be retrieved from a
	 * `drive.about.get` response. When not specified on a `drive.drives.create`
	 * request, a random theme is chosen from which the background image and color are
	 * set. This is a write-only field; it can only be set on requests that don't set
	 * `colorRgb` or `backgroundImageFile`.
	 */
	themeId?: string;
}

export namespace DriveUpdateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * An image file and cropping parameters from which a background image for this
	 * shared drive is set. This is a write only field; it can only be set on
	 * `drive.drives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	export interface BackgroundImageFile {
		/**
		 * The ID of an image file in Google Drive to use for the background image.
		 */
		id?: string;

		/**
		 * The width of the cropped image in the closed range of 0 to 1. This value
		 * represents the width of the cropped image divided by the width of the entire
		 * image. The height is computed by applying a width to height aspect ratio of 80
		 * to 9. The resulting image must be at least 1280 pixels wide and 144 pixels high.
		 */
		width?: number;

		/**
		 * The X coordinate of the upper left corner of the cropping area in the background
		 * image. This is a value in the closed range of 0 to 1. This value represents the
		 * horizontal distance from the left side of the entire image to the left side of
		 * the cropping area divided by the width of the entire image.
		 */
		xCoordinate?: number;

		/**
		 * The Y coordinate of the upper left corner of the cropping area in the background
		 * image. This is a value in the closed range of 0 to 1. This value represents the
		 * vertical distance from the top side of the entire image to the top side of the
		 * cropping area divided by the height of the entire image.
		 */
		yCoordinate?: number;
	}

	/**
	 * Output only. Capabilities the current user has on this shared drive.
	 */
	export interface Capabilities {
		/**
		 * Output only. Whether the current user can add children to folders in this shared
		 * drive.
		 */
		canAddChildren?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `copyRequiresWriterPermission` restriction of this shared drive.
		 */
		canChangeCopyRequiresWriterPermissionRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the `domainUsersOnly`
		 * restriction of this shared drive.
		 */
		canChangeDomainUsersOnlyRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the background of this shared
		 * drive.
		 */
		canChangeDriveBackground?: boolean;

		/**
		 * Output only. Whether the current user can change the `driveMembersOnly`
		 * restriction of this shared drive.
		 */
		canChangeDriveMembersOnlyRestriction?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `sharingFoldersRequiresOrganizerPermission` restriction of this shared drive.
		 */
		canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;

		/**
		 * Output only. Whether the current user can comment on files in this shared drive.
		 */
		canComment?: boolean;

		/**
		 * Output only. Whether the current user can copy files in this shared drive.
		 */
		canCopy?: boolean;

		/**
		 * Output only. Whether the current user can delete children from folders in this
		 * shared drive.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Output only. Whether the current user can delete this shared drive. Attempting
		 * to delete the shared drive may still fail if there are untrashed items inside
		 * the shared drive.
		 */
		canDeleteDrive?: boolean;

		/**
		 * Output only. Whether the current user can download files in this shared drive.
		 */
		canDownload?: boolean;

		/**
		 * Output only. Whether the current user can edit files in this shared drive
		 */
		canEdit?: boolean;

		/**
		 * Output only. Whether the current user can list the children of folders in this
		 * shared drive.
		 */
		canListChildren?: boolean;

		/**
		 * Output only. Whether the current user can add members to this shared drive or
		 * remove them or change their role.
		 */
		canManageMembers?: boolean;

		/**
		 * Output only. Whether the current user can read the revisions resource of files
		 * in this shared drive.
		 */
		canReadRevisions?: boolean;

		/**
		 * Output only. Whether the current user can rename files or folders in this shared
		 * drive.
		 */
		canRename?: boolean;

		/**
		 * Output only. Whether the current user can rename this shared drive.
		 */
		canRenameDrive?: boolean;

		/**
		 * Output only. Whether the current user can reset the shared drive restrictions to
		 * defaults.
		 */
		canResetDriveRestrictions?: boolean;

		/**
		 * Output only. Whether the current user can share files or folders in this shared
		 * drive.
		 */
		canShare?: boolean;

		/**
		 * Output only. Whether the current user can trash children from folders in this
		 * shared drive.
		 */
		canTrashChildren?: boolean;
	}

	/**
	 * A set of restrictions that apply to this shared drive or items inside this
	 * shared drive. Note that restrictions can't be set when creating a shared drive.
	 * To add a restriction, first create a shared drive and then use `drives.update`
	 * to add restrictions.
	 */
	export interface Restrictions {
		/**
		 * Whether administrative privileges on this shared drive are required to modify
		 * restrictions.
		 */
		adminManagedRestrictions?: boolean;

		/**
		 * Whether the options to copy, print, or download files inside this shared drive,
		 * should be disabled for readers and commenters. When this restriction is set to
		 * `true`, it will override the similarly named field to `true` for any file inside
		 * this shared drive.
		 */
		copyRequiresWriterPermission?: boolean;

		/**
		 * Whether access to this shared drive and items inside this shared drive is
		 * restricted to users of the domain to which this shared drive belongs. This
		 * restriction may be overridden by other sharing policies controlled outside of
		 * this shared drive.
		 */
		domainUsersOnly?: boolean;

		/**
		 * Whether access to items inside this shared drive is restricted to its members.
		 */
		driveMembersOnly?: boolean;

		/**
		 * If true, only users with the organizer role can share folders. If false, users
		 * with either the organizer role or the file organizer role can share folders.
		 */
		sharingFoldersRequiresOrganizerPermission?: boolean;
	}
}

export interface DriveListParams {
	$?: DriveListParams._;

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
	 * API key. Your API key identifies your project and provides you with API access,
	 * quota, and reports. Required unless you provide an OAuth 2.0 token.
	 */
	key?: string;

	/**
	 * OAuth 2.0 token for the current user.
	 */
	oauth_token?: string;

	/**
	 * Maximum number of shared drives to return per page.
	 */
	pageSize?: number;

	/**
	 * Page token for shared drives.
	 */
	pageToken?: string;

	/**
	 * Returns response with indentations and line breaks.
	 */
	prettyPrint?: boolean;

	/**
	 * Query string for searching shared drives.
	 */
	q?: string;

	/**
	 * Available to use for quota purposes for server-side applications. Can be any
	 * arbitrary string assigned to a user, but should not exceed 40 characters.
	 */
	quotaUser?: string;

	/**
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Issue the request as a domain administrator; if set to true, then all shared
	 * drives of the domain in which the requester is an administrator are returned.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace DriveListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface DriveDeleteParams {
	$?: DriveDeleteParams._;

	/**
	 * OAuth access token.
	 */
	access_token?: string;

	/**
	 * Whether any items inside the shared drive should also be deleted. This option is
	 * only supported when `useDomainAdminAccess` is also set to `true`.
	 */
	allowItemDeletion?: boolean;

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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;

	/**
	 * Issue the request as a domain administrator; if set to true, then the requester
	 * will be granted access if they are an administrator of the domain to which the
	 * shared drive belongs.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace DriveDeleteParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface DriveHideParams {
	$?: DriveHideParams._;

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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace DriveHideParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface DriveUnhideParams {
	$?: DriveUnhideParams._;

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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace DriveUnhideParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Drives {
	export type {
		Drive,
		DriveListResponse,
		DriveCreateParams,
		DriveRetrieveParams,
		DriveUpdateParams,
		DriveListParams,
		DriveDeleteParams,
		DriveHideParams,
		DriveUnhideParams,
	};
}
