// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../internal/request-options";
import { APIPromise } from "../core/api-promise";
import { APIResource } from "../core/resource";

export class About extends APIResource {
	/**
	 * Gets information about the user, the user's Drive, and system capabilities.
	 */
	retrieve(
		query: AboutRetrieveParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<AboutRetrieveResponse> {
		return this._client.get("/about", { query, ...options });
	}
}

/**
 * Information about a Drive user.
 */
export interface User {
	/**
	 * Output only. A plain text displayable name for this user.
	 */
	displayName?: string;

	/**
	 * Output only. The email address of the user. This may not be present in certain
	 * contexts if the user has not made their email address visible to the requester.
	 */
	emailAddress?: string;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#user"`.
	 */
	kind?: string;

	/**
	 * Output only. Whether this user is the requesting user.
	 */
	me?: boolean;

	/**
	 * Output only. The user's ID as visible in Permission resources.
	 */
	permissionId?: string;

	/**
	 * Output only. A link to the user's profile photo, if available.
	 */
	photoLink?: string;
}

/**
 * Information about the user, the user's Drive, and system capabilities.
 */
export interface AboutRetrieveResponse {
	/**
	 * Whether the user has installed the requesting app.
	 */
	appInstalled?: boolean;

	/**
	 * Whether the user can create shared drives.
	 */
	canCreateDrives?: boolean;

	/**
	 * @deprecated Deprecated: Use `canCreateDrives` instead.
	 */
	canCreateTeamDrives?: boolean;

	/**
	 * A list of themes that are supported for shared drives.
	 */
	driveThemes?: Array<AboutRetrieveResponse.DriveTheme>;

	/**
	 * A map of source MIME type to possible targets for all supported exports.
	 */
	exportFormats?: Record<string, Array<string>>;

	/**
	 * The currently supported folder colors as RGB hex strings.
	 */
	folderColorPalette?: Array<string>;

	/**
	 * A map of source MIME type to possible targets for all supported imports.
	 */
	importFormats?: Record<string, Array<string>>;

	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#about"`.
	 */
	kind?: string;

	/**
	 * A map of maximum import sizes by MIME type, in bytes.
	 */
	maxImportSizes?: Record<string, string>;

	/**
	 * The maximum upload size in bytes.
	 */
	maxUploadSize?: string;

	/**
	 * The user's storage quota limits and usage. All fields are measured in bytes.
	 */
	storageQuota?: AboutRetrieveResponse.StorageQuota;

	/**
	 * @deprecated Deprecated: Use `driveThemes` instead.
	 */
	teamDriveThemes?: Array<AboutRetrieveResponse.TeamDriveTheme>;

	/**
	 * The authenticated user.
	 */
	user?: User;
}

export namespace AboutRetrieveResponse {
	export interface DriveTheme {
		/**
		 * The ID of the theme.
		 */
		id?: string;

		/**
		 * A link to this theme's background image.
		 */
		backgroundImageLink?: string;

		/**
		 * The color of this theme as an RGB hex string.
		 */
		colorRgb?: string;
	}

	/**
	 * The user's storage quota limits and usage. All fields are measured in bytes.
	 */
	export interface StorageQuota {
		/**
		 * The usage limit, if applicable. This will not be present if the user has
		 * unlimited storage.
		 */
		limit?: string;

		/**
		 * The total usage across all services.
		 */
		usage?: string;

		/**
		 * The usage by all files in Google Drive.
		 */
		usageInDrive?: string;

		/**
		 * The usage by trashed files in Google Drive.
		 */
		usageInDriveTrash?: string;
	}

	export interface TeamDriveTheme {
		/**
		 * @deprecated Deprecated: Use `driveThemes/id` instead.
		 */
		id?: string;

		/**
		 * @deprecated Deprecated: Use `driveThemes/backgroundImageLink` instead.
		 */
		backgroundImageLink?: string;

		/**
		 * @deprecated Deprecated: Use `driveThemes/colorRgb` instead.
		 */
		colorRgb?: string;
	}
}

export interface AboutRetrieveParams {
	$?: AboutRetrieveParams._;

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

export namespace AboutRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace About {
	export { type User, type AboutRetrieveResponse, type AboutRetrieveParams };
}
