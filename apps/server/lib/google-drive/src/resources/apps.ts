// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../internal/request-options";
import { APIPromise } from "../core/api-promise";
import { APIResource } from "../core/resource";
import { path } from "../internal/utils/path";

export class Apps extends APIResource {
	/**
	 * Gets a specific app.
	 */
	retrieve(appID: string, query: AppRetrieveParams | null | undefined = {}, options?: RequestOptions): APIPromise<App> {
		return this._client.get(path`/apps/${appID}`, { query, ...options });
	}

	/**
	 * Lists a user's installed apps.
	 */
	list(query: AppListParams | null | undefined = {}, options?: RequestOptions): APIPromise<AppListResponse> {
		return this._client.get("/apps", { query, ...options });
	}
}

/**
 * The `apps` resource provides a list of apps that a user has installed, with
 * information about each app's supported MIME types, file extensions, and other
 * details. Some resource methods (such as `apps.get`) require an `appId`. Use the
 * `apps.list` method to retrieve the ID for an installed application.
 */
export interface App {
	/**
	 * The ID of the app.
	 */
	id?: string;

	/**
	 * Whether the app is authorized to access data on the user's Drive.
	 */
	authorized?: boolean;

	/**
	 * The template URL to create a file with this app in a given folder. The template
	 * contains the {folderId} to be replaced by the folder ID house the new file.
	 */
	createInFolderTemplate?: string;

	/**
	 * The URL to create a file with this app.
	 */
	createUrl?: string;

	/**
	 * Whether the app has Drive-wide scope. An app with Drive-wide scope can access
	 * all files in the user's Drive.
	 */
	hasDriveWideScope?: boolean;

	/**
	 * The various icons for the app.
	 */
	icons?: Array<App.Icon>;

	/**
	 * Whether the app is installed.
	 */
	installed?: boolean;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * "drive#app".
	 */
	kind?: string;

	/**
	 * A long description of the app.
	 */
	longDescription?: string;

	/**
	 * The name of the app.
	 */
	name?: string;

	/**
	 * The type of object this app creates such as a Chart. If empty, the app name
	 * should be used instead.
	 */
	objectType?: string;

	/**
	 * The template URL for opening files with this app. The template contains {ids} or
	 * {exportIds} to be replaced by the actual file IDs. For more information, see
	 * Open Files for the full documentation.
	 */
	openUrlTemplate?: string;

	/**
	 * The list of primary file extensions.
	 */
	primaryFileExtensions?: Array<string>;

	/**
	 * The list of primary MIME types.
	 */
	primaryMimeTypes?: Array<string>;

	/**
	 * The ID of the product listing for this app.
	 */
	productId?: string;

	/**
	 * A link to the product listing for this app.
	 */
	productUrl?: string;

	/**
	 * The list of secondary file extensions.
	 */
	secondaryFileExtensions?: Array<string>;

	/**
	 * The list of secondary MIME types.
	 */
	secondaryMimeTypes?: Array<string>;

	/**
	 * A short description of the app.
	 */
	shortDescription?: string;

	/**
	 * Whether this app supports creating objects.
	 */
	supportsCreate?: boolean;

	/**
	 * Whether this app supports importing from Google Docs.
	 */
	supportsImport?: boolean;

	/**
	 * Whether this app supports opening more than one file.
	 */
	supportsMultiOpen?: boolean;

	/**
	 * Whether this app supports creating files when offline.
	 */
	supportsOfflineCreate?: boolean;

	/**
	 * Whether the app is selected as the default handler for the types it supports.
	 */
	useByDefault?: boolean;
}

export namespace App {
	export interface Icon {
		/**
		 * Category of the icon. Allowed values are: _ `application` - The icon for the
		 * application. _ `document` - The icon for a file associated with the app. \*
		 * `documentShared` - The icon for a shared file associated with the app.
		 */
		category?: string;

		/**
		 * URL for the icon.
		 */
		iconUrl?: string;

		/**
		 * Size of the icon. Represented as the maximum of the width and height.
		 */
		size?: number;
	}
}

/**
 * A list of third-party applications which the user has installed or given access
 * to Google Drive.
 */
export interface AppListResponse {
	/**
	 * The list of app IDs that the user has specified to use by default. The list is
	 * in reverse-priority order (lowest to highest).
	 */
	defaultAppIds?: Array<string>;

	/**
	 * The list of apps.
	 */
	items?: Array<App>;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * "drive#appList".
	 */
	kind?: string;

	/**
	 * A link back to this list.
	 */
	selfLink?: string;
}

export interface AppRetrieveParams {
	$?: AppRetrieveParams._;

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

export namespace AppRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface AppListParams {
	$?: AppListParams._;

	/**
	 * OAuth access token.
	 */
	access_token?: string;

	/**
	 * Data format for response.
	 */
	alt?: "json" | "media" | "proto";

	/**
	 * A comma-separated list of file extensions to limit returned results. All results
	 * within the given app query scope which can open any of the given file extensions
	 * are included in the response. If `appFilterMimeTypes` are provided as well, the
	 * result is a union of the two resulting app lists.
	 */
	appFilterExtensions?: string;

	/**
	 * A comma-separated list of file extensions to limit returned results. All results
	 * within the given app query scope which can open any of the given MIME types will
	 * be included in the response. If `appFilterExtensions` are provided as well, the
	 * result is a union of the two resulting app lists.
	 */
	appFilterMimeTypes?: string;

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
	 * A language or locale code, as defined by BCP 47, with some extensions from
	 * Unicode's LDML format (http://www.unicode.org/reports/tr35/).
	 */
	languageCode?: string;

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

export namespace AppListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Apps {
	export { type App, type AppListResponse, type AppRetrieveParams, type AppListParams };
}
