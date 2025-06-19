// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../internal/request-options";
import { buildHeaders } from "../internal/headers";
import { APIPromise } from "../core/api-promise";
import { APIResource } from "../core/resource";
import { path } from "../internal/utils/path";

export class Teamdrives extends APIResource {
	/**
	 * Deprecated: Use `drives.create` instead.
	 */
	create(params: TeamdriveCreateParams, options?: RequestOptions): APIPromise<TeamDrive> {
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
		return this._client.post("/teamdrives", {
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
	 * Deprecated: Use `drives.get` instead.
	 */
	retrieve(
		teamDriveID: string,
		query: TeamdriveRetrieveParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<TeamDrive> {
		return this._client.get(path`/teamdrives/${teamDriveID}`, { query, ...options });
	}

	/**
	 * Deprecated: Use `drives.update` instead.
	 */
	update(
		teamDriveID: string,
		params: TeamdriveUpdateParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<TeamDrive> {
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
		return this._client.patch(path`/teamdrives/${teamDriveID}`, {
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
	 * Deprecated: Use `drives.list` instead.
	 */
	list(
		query: TeamdriveListParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<TeamdriveListResponse> {
		return this._client.get("/teamdrives", { query, ...options });
	}

	/**
	 * Deprecated: Use `drives.delete` instead.
	 */
	delete(
		teamDriveID: string,
		params: TeamdriveDeleteParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<void> {
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
		return this._client.delete(path`/teamdrives/${teamDriveID}`, {
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
			headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
		});
	}
}

/**
 * Deprecated: use the drive collection instead.
 */
export interface TeamDrive {
	/**
	 * The ID of this Team Drive which is also the ID of the top level folder of this
	 * Team Drive.
	 */
	id?: string;

	/**
	 * An image file and cropping parameters from which a background image for this
	 * Team Drive is set. This is a write only field; it can only be set on
	 * `drive.teamdrives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	backgroundImageFile?: TeamDrive.BackgroundImageFile;

	/**
	 * A short-lived link to this Team Drive's background image.
	 */
	backgroundImageLink?: string;

	/**
	 * Capabilities the current user has on this Team Drive.
	 */
	capabilities?: TeamDrive.Capabilities;

	/**
	 * The color of this Team Drive as an RGB hex string. It can only be set on a
	 * `drive.teamdrives.update` request that does not set `themeId`.
	 */
	colorRgb?: string;

	/**
	 * The time at which the Team Drive was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#teamDrive"`.
	 */
	kind?: string;

	/**
	 * The name of this Team Drive.
	 */
	name?: string;

	/**
	 * The organizational unit of this shared drive. This field is only populated on
	 * `drives.list` responses when the `useDomainAdminAccess` parameter is set to
	 * `true`.
	 */
	orgUnitId?: string;

	/**
	 * A set of restrictions that apply to this Team Drive or items inside this Team
	 * Drive.
	 */
	restrictions?: TeamDrive.Restrictions;

	/**
	 * The ID of the theme from which the background image and color will be set. The
	 * set of possible `teamDriveThemes` can be retrieved from a `drive.about.get`
	 * response. When not specified on a `drive.teamdrives.create` request, a random
	 * theme is chosen from which the background image and color are set. This is a
	 * write-only field; it can only be set on requests that don't set `colorRgb` or
	 * `backgroundImageFile`.
	 */
	themeId?: string;
}

export namespace TeamDrive {
	/**
	 * An image file and cropping parameters from which a background image for this
	 * Team Drive is set. This is a write only field; it can only be set on
	 * `drive.teamdrives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	export interface BackgroundImageFile {
		/**
		 * The ID of an image file in Drive to use for the background image.
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
	 * Capabilities the current user has on this Team Drive.
	 */
	export interface Capabilities {
		/**
		 * Whether the current user can add children to folders in this Team Drive.
		 */
		canAddChildren?: boolean;

		/**
		 * Whether the current user can change the `copyRequiresWriterPermission`
		 * restriction of this Team Drive.
		 */
		canChangeCopyRequiresWriterPermissionRestriction?: boolean;

		/**
		 * Whether the current user can change the `domainUsersOnly` restriction of this
		 * Team Drive.
		 */
		canChangeDomainUsersOnlyRestriction?: boolean;

		/**
		 * Whether the current user can change the
		 * `sharingFoldersRequiresOrganizerPermission` restriction of this Team Drive.
		 */
		canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;

		/**
		 * Whether the current user can change the background of this Team Drive.
		 */
		canChangeTeamDriveBackground?: boolean;

		/**
		 * Whether the current user can change the `teamMembersOnly` restriction of this
		 * Team Drive.
		 */
		canChangeTeamMembersOnlyRestriction?: boolean;

		/**
		 * Whether the current user can comment on files in this Team Drive.
		 */
		canComment?: boolean;

		/**
		 * Whether the current user can copy files in this Team Drive.
		 */
		canCopy?: boolean;

		/**
		 * Whether the current user can delete children from folders in this Team Drive.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Whether the current user can delete this Team Drive. Attempting to delete the
		 * Team Drive may still fail if there are untrashed items inside the Team Drive.
		 */
		canDeleteTeamDrive?: boolean;

		/**
		 * Whether the current user can download files in this Team Drive.
		 */
		canDownload?: boolean;

		/**
		 * Whether the current user can edit files in this Team Drive
		 */
		canEdit?: boolean;

		/**
		 * Whether the current user can list the children of folders in this Team Drive.
		 */
		canListChildren?: boolean;

		/**
		 * Whether the current user can add members to this Team Drive or remove them or
		 * change their role.
		 */
		canManageMembers?: boolean;

		/**
		 * Whether the current user can read the revisions resource of files in this Team
		 * Drive.
		 */
		canReadRevisions?: boolean;

		/**
		 * @deprecated Deprecated: Use `canDeleteChildren` or `canTrashChildren` instead.
		 */
		canRemoveChildren?: boolean;

		/**
		 * Whether the current user can rename files or folders in this Team Drive.
		 */
		canRename?: boolean;

		/**
		 * Whether the current user can rename this Team Drive.
		 */
		canRenameTeamDrive?: boolean;

		/**
		 * Whether the current user can reset the Team Drive restrictions to defaults.
		 */
		canResetTeamDriveRestrictions?: boolean;

		/**
		 * Whether the current user can share files or folders in this Team Drive.
		 */
		canShare?: boolean;

		/**
		 * Whether the current user can trash children from folders in this Team Drive.
		 */
		canTrashChildren?: boolean;
	}

	/**
	 * A set of restrictions that apply to this Team Drive or items inside this Team
	 * Drive.
	 */
	export interface Restrictions {
		/**
		 * Whether administrative privileges on this Team Drive are required to modify
		 * restrictions.
		 */
		adminManagedRestrictions?: boolean;

		/**
		 * Whether the options to copy, print, or download files inside this Team Drive,
		 * should be disabled for readers and commenters. When this restriction is set to
		 * `true`, it will override the similarly named field to `true` for any file inside
		 * this Team Drive.
		 */
		copyRequiresWriterPermission?: boolean;

		/**
		 * Whether access to this Team Drive and items inside this Team Drive is restricted
		 * to users of the domain to which this Team Drive belongs. This restriction may be
		 * overridden by other sharing policies controlled outside of this Team Drive.
		 */
		domainUsersOnly?: boolean;

		/**
		 * If true, only users with the organizer role can share folders. If false, users
		 * with either the organizer role or the file organizer role can share folders.
		 */
		sharingFoldersRequiresOrganizerPermission?: boolean;

		/**
		 * Whether access to items inside this Team Drive is restricted to members of this
		 * Team Drive.
		 */
		teamMembersOnly?: boolean;
	}
}

/**
 * A list of Team Drives.
 */
export interface TeamdriveListResponse {
	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#teamDriveList"`.
	 */
	kind?: string;

	/**
	 * The page token for the next page of Team Drives. This will be absent if the end
	 * of the Team Drives list has been reached. If the token is rejected for any
	 * reason, it should be discarded, and pagination should be restarted from the
	 * first page of results. The page token is typically valid for several hours.
	 * However, if new items are added or removed, your expected results might differ.
	 */
	nextPageToken?: string;

	/**
	 * The list of Team Drives. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	teamDrives?: Array<TeamDrive>;
}

export interface TeamdriveCreateParams {
	/**
	 * Query param: Required. An ID, such as a random UUID, which uniquely identifies
	 * this user's request for idempotent creation of a Team Drive. A repeated request
	 * by the same user and with the same request ID will avoid creating duplicates by
	 * attempting to create the same Team Drive. If the Team Drive already exists a 409
	 * error will be returned.
	 */
	requestId: string;

	/**
	 * Query param:
	 */
	$?: TeamdriveCreateParams._;

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
	 * Body param: The ID of this Team Drive which is also the ID of the top level
	 * folder of this Team Drive.
	 */
	id?: string;

	/**
	 * Body param: An image file and cropping parameters from which a background image
	 * for this Team Drive is set. This is a write only field; it can only be set on
	 * `drive.teamdrives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	backgroundImageFile?: TeamdriveCreateParams.BackgroundImageFile;

	/**
	 * Body param: A short-lived link to this Team Drive's background image.
	 */
	backgroundImageLink?: string;

	/**
	 * Body param: Capabilities the current user has on this Team Drive.
	 */
	capabilities?: TeamdriveCreateParams.Capabilities;

	/**
	 * Body param: The color of this Team Drive as an RGB hex string. It can only be
	 * set on a `drive.teamdrives.update` request that does not set `themeId`.
	 */
	colorRgb?: string;

	/**
	 * Body param: The time at which the Team Drive was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#teamDrive"`.
	 */
	kind?: string;

	/**
	 * Body param: The name of this Team Drive.
	 */
	name?: string;

	/**
	 * Body param: The organizational unit of this shared drive. This field is only
	 * populated on `drives.list` responses when the `useDomainAdminAccess` parameter
	 * is set to `true`.
	 */
	orgUnitId?: string;

	/**
	 * Body param: A set of restrictions that apply to this Team Drive or items inside
	 * this Team Drive.
	 */
	restrictions?: TeamdriveCreateParams.Restrictions;

	/**
	 * Body param: The ID of the theme from which the background image and color will
	 * be set. The set of possible `teamDriveThemes` can be retrieved from a
	 * `drive.about.get` response. When not specified on a `drive.teamdrives.create`
	 * request, a random theme is chosen from which the background image and color are
	 * set. This is a write-only field; it can only be set on requests that don't set
	 * `colorRgb` or `backgroundImageFile`.
	 */
	themeId?: string;
}

export namespace TeamdriveCreateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * An image file and cropping parameters from which a background image for this
	 * Team Drive is set. This is a write only field; it can only be set on
	 * `drive.teamdrives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	export interface BackgroundImageFile {
		/**
		 * The ID of an image file in Drive to use for the background image.
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
	 * Capabilities the current user has on this Team Drive.
	 */
	export interface Capabilities {
		/**
		 * Whether the current user can add children to folders in this Team Drive.
		 */
		canAddChildren?: boolean;

		/**
		 * Whether the current user can change the `copyRequiresWriterPermission`
		 * restriction of this Team Drive.
		 */
		canChangeCopyRequiresWriterPermissionRestriction?: boolean;

		/**
		 * Whether the current user can change the `domainUsersOnly` restriction of this
		 * Team Drive.
		 */
		canChangeDomainUsersOnlyRestriction?: boolean;

		/**
		 * Whether the current user can change the
		 * `sharingFoldersRequiresOrganizerPermission` restriction of this Team Drive.
		 */
		canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;

		/**
		 * Whether the current user can change the background of this Team Drive.
		 */
		canChangeTeamDriveBackground?: boolean;

		/**
		 * Whether the current user can change the `teamMembersOnly` restriction of this
		 * Team Drive.
		 */
		canChangeTeamMembersOnlyRestriction?: boolean;

		/**
		 * Whether the current user can comment on files in this Team Drive.
		 */
		canComment?: boolean;

		/**
		 * Whether the current user can copy files in this Team Drive.
		 */
		canCopy?: boolean;

		/**
		 * Whether the current user can delete children from folders in this Team Drive.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Whether the current user can delete this Team Drive. Attempting to delete the
		 * Team Drive may still fail if there are untrashed items inside the Team Drive.
		 */
		canDeleteTeamDrive?: boolean;

		/**
		 * Whether the current user can download files in this Team Drive.
		 */
		canDownload?: boolean;

		/**
		 * Whether the current user can edit files in this Team Drive
		 */
		canEdit?: boolean;

		/**
		 * Whether the current user can list the children of folders in this Team Drive.
		 */
		canListChildren?: boolean;

		/**
		 * Whether the current user can add members to this Team Drive or remove them or
		 * change their role.
		 */
		canManageMembers?: boolean;

		/**
		 * Whether the current user can read the revisions resource of files in this Team
		 * Drive.
		 */
		canReadRevisions?: boolean;

		/**
		 * @deprecated Deprecated: Use `canDeleteChildren` or `canTrashChildren` instead.
		 */
		canRemoveChildren?: boolean;

		/**
		 * Whether the current user can rename files or folders in this Team Drive.
		 */
		canRename?: boolean;

		/**
		 * Whether the current user can rename this Team Drive.
		 */
		canRenameTeamDrive?: boolean;

		/**
		 * Whether the current user can reset the Team Drive restrictions to defaults.
		 */
		canResetTeamDriveRestrictions?: boolean;

		/**
		 * Whether the current user can share files or folders in this Team Drive.
		 */
		canShare?: boolean;

		/**
		 * Whether the current user can trash children from folders in this Team Drive.
		 */
		canTrashChildren?: boolean;
	}

	/**
	 * A set of restrictions that apply to this Team Drive or items inside this Team
	 * Drive.
	 */
	export interface Restrictions {
		/**
		 * Whether administrative privileges on this Team Drive are required to modify
		 * restrictions.
		 */
		adminManagedRestrictions?: boolean;

		/**
		 * Whether the options to copy, print, or download files inside this Team Drive,
		 * should be disabled for readers and commenters. When this restriction is set to
		 * `true`, it will override the similarly named field to `true` for any file inside
		 * this Team Drive.
		 */
		copyRequiresWriterPermission?: boolean;

		/**
		 * Whether access to this Team Drive and items inside this Team Drive is restricted
		 * to users of the domain to which this Team Drive belongs. This restriction may be
		 * overridden by other sharing policies controlled outside of this Team Drive.
		 */
		domainUsersOnly?: boolean;

		/**
		 * If true, only users with the organizer role can share folders. If false, users
		 * with either the organizer role or the file organizer role can share folders.
		 */
		sharingFoldersRequiresOrganizerPermission?: boolean;

		/**
		 * Whether access to items inside this Team Drive is restricted to members of this
		 * Team Drive.
		 */
		teamMembersOnly?: boolean;
	}
}

export interface TeamdriveRetrieveParams {
	$?: TeamdriveRetrieveParams._;

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
	 * Team Drive belongs.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace TeamdriveRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface TeamdriveUpdateParams {
	/**
	 * Query param:
	 */
	$?: TeamdriveUpdateParams._;

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
	 * to which the Team Drive belongs.
	 */
	useDomainAdminAccess?: boolean;

	/**
	 * Body param: The ID of this Team Drive which is also the ID of the top level
	 * folder of this Team Drive.
	 */
	id?: string;

	/**
	 * Body param: An image file and cropping parameters from which a background image
	 * for this Team Drive is set. This is a write only field; it can only be set on
	 * `drive.teamdrives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	backgroundImageFile?: TeamdriveUpdateParams.BackgroundImageFile;

	/**
	 * Body param: A short-lived link to this Team Drive's background image.
	 */
	backgroundImageLink?: string;

	/**
	 * Body param: Capabilities the current user has on this Team Drive.
	 */
	capabilities?: TeamdriveUpdateParams.Capabilities;

	/**
	 * Body param: The color of this Team Drive as an RGB hex string. It can only be
	 * set on a `drive.teamdrives.update` request that does not set `themeId`.
	 */
	colorRgb?: string;

	/**
	 * Body param: The time at which the Team Drive was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#teamDrive"`.
	 */
	kind?: string;

	/**
	 * Body param: The name of this Team Drive.
	 */
	name?: string;

	/**
	 * Body param: The organizational unit of this shared drive. This field is only
	 * populated on `drives.list` responses when the `useDomainAdminAccess` parameter
	 * is set to `true`.
	 */
	orgUnitId?: string;

	/**
	 * Body param: A set of restrictions that apply to this Team Drive or items inside
	 * this Team Drive.
	 */
	restrictions?: TeamdriveUpdateParams.Restrictions;

	/**
	 * Body param: The ID of the theme from which the background image and color will
	 * be set. The set of possible `teamDriveThemes` can be retrieved from a
	 * `drive.about.get` response. When not specified on a `drive.teamdrives.create`
	 * request, a random theme is chosen from which the background image and color are
	 * set. This is a write-only field; it can only be set on requests that don't set
	 * `colorRgb` or `backgroundImageFile`.
	 */
	themeId?: string;
}

export namespace TeamdriveUpdateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * An image file and cropping parameters from which a background image for this
	 * Team Drive is set. This is a write only field; it can only be set on
	 * `drive.teamdrives.update` requests that don't set `themeId`. When specified, all
	 * fields of the `backgroundImageFile` must be set.
	 */
	export interface BackgroundImageFile {
		/**
		 * The ID of an image file in Drive to use for the background image.
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
	 * Capabilities the current user has on this Team Drive.
	 */
	export interface Capabilities {
		/**
		 * Whether the current user can add children to folders in this Team Drive.
		 */
		canAddChildren?: boolean;

		/**
		 * Whether the current user can change the `copyRequiresWriterPermission`
		 * restriction of this Team Drive.
		 */
		canChangeCopyRequiresWriterPermissionRestriction?: boolean;

		/**
		 * Whether the current user can change the `domainUsersOnly` restriction of this
		 * Team Drive.
		 */
		canChangeDomainUsersOnlyRestriction?: boolean;

		/**
		 * Whether the current user can change the
		 * `sharingFoldersRequiresOrganizerPermission` restriction of this Team Drive.
		 */
		canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean;

		/**
		 * Whether the current user can change the background of this Team Drive.
		 */
		canChangeTeamDriveBackground?: boolean;

		/**
		 * Whether the current user can change the `teamMembersOnly` restriction of this
		 * Team Drive.
		 */
		canChangeTeamMembersOnlyRestriction?: boolean;

		/**
		 * Whether the current user can comment on files in this Team Drive.
		 */
		canComment?: boolean;

		/**
		 * Whether the current user can copy files in this Team Drive.
		 */
		canCopy?: boolean;

		/**
		 * Whether the current user can delete children from folders in this Team Drive.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Whether the current user can delete this Team Drive. Attempting to delete the
		 * Team Drive may still fail if there are untrashed items inside the Team Drive.
		 */
		canDeleteTeamDrive?: boolean;

		/**
		 * Whether the current user can download files in this Team Drive.
		 */
		canDownload?: boolean;

		/**
		 * Whether the current user can edit files in this Team Drive
		 */
		canEdit?: boolean;

		/**
		 * Whether the current user can list the children of folders in this Team Drive.
		 */
		canListChildren?: boolean;

		/**
		 * Whether the current user can add members to this Team Drive or remove them or
		 * change their role.
		 */
		canManageMembers?: boolean;

		/**
		 * Whether the current user can read the revisions resource of files in this Team
		 * Drive.
		 */
		canReadRevisions?: boolean;

		/**
		 * @deprecated Deprecated: Use `canDeleteChildren` or `canTrashChildren` instead.
		 */
		canRemoveChildren?: boolean;

		/**
		 * Whether the current user can rename files or folders in this Team Drive.
		 */
		canRename?: boolean;

		/**
		 * Whether the current user can rename this Team Drive.
		 */
		canRenameTeamDrive?: boolean;

		/**
		 * Whether the current user can reset the Team Drive restrictions to defaults.
		 */
		canResetTeamDriveRestrictions?: boolean;

		/**
		 * Whether the current user can share files or folders in this Team Drive.
		 */
		canShare?: boolean;

		/**
		 * Whether the current user can trash children from folders in this Team Drive.
		 */
		canTrashChildren?: boolean;
	}

	/**
	 * A set of restrictions that apply to this Team Drive or items inside this Team
	 * Drive.
	 */
	export interface Restrictions {
		/**
		 * Whether administrative privileges on this Team Drive are required to modify
		 * restrictions.
		 */
		adminManagedRestrictions?: boolean;

		/**
		 * Whether the options to copy, print, or download files inside this Team Drive,
		 * should be disabled for readers and commenters. When this restriction is set to
		 * `true`, it will override the similarly named field to `true` for any file inside
		 * this Team Drive.
		 */
		copyRequiresWriterPermission?: boolean;

		/**
		 * Whether access to this Team Drive and items inside this Team Drive is restricted
		 * to users of the domain to which this Team Drive belongs. This restriction may be
		 * overridden by other sharing policies controlled outside of this Team Drive.
		 */
		domainUsersOnly?: boolean;

		/**
		 * If true, only users with the organizer role can share folders. If false, users
		 * with either the organizer role or the file organizer role can share folders.
		 */
		sharingFoldersRequiresOrganizerPermission?: boolean;

		/**
		 * Whether access to items inside this Team Drive is restricted to members of this
		 * Team Drive.
		 */
		teamMembersOnly?: boolean;
	}
}

export interface TeamdriveListParams {
	$?: TeamdriveListParams._;

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
	 * Maximum number of Team Drives to return.
	 */
	pageSize?: number;

	/**
	 * Page token for Team Drives.
	 */
	pageToken?: string;

	/**
	 * Returns response with indentations and line breaks.
	 */
	prettyPrint?: boolean;

	/**
	 * Query string for searching Team Drives.
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
	 * Issue the request as a domain administrator; if set to true, then all Team
	 * Drives of the domain in which the requester is an administrator are returned.
	 */
	useDomainAdminAccess?: boolean;
}

export namespace TeamdriveListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface TeamdriveDeleteParams {
	$?: TeamdriveDeleteParams._;

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

export namespace TeamdriveDeleteParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Teamdrives {
	export type {
		TeamDrive,
		TeamdriveListResponse,
		TeamdriveCreateParams,
		TeamdriveRetrieveParams,
		TeamdriveUpdateParams,
		TeamdriveListParams,
		TeamdriveDeleteParams,
	};
}
