// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../../internal/request-options";
import { buildHeaders } from "../../internal/headers";
import { APIPromise } from "../../core/api-promise";
import { APIResource } from "../../core/resource";
import { path } from "../../internal/utils/path";
import * as AboutAPI from "../about";

export class Revisions extends APIResource {
	/**
	 * Gets a revision's metadata or content by ID.
	 */
	retrieve(revisionID: string, params: RevisionRetrieveParams, options?: RequestOptions): APIPromise<Revision> {
		const { fileId, ...query } = params;
		return this._client.get(path`/files/${fileId}/revisions/${revisionID}`, { query, ...options });
	}

	/**
	 * Updates a revision with patch semantics.
	 */
	update(revisionID: string, params: RevisionUpdateParams, options?: RequestOptions): APIPromise<Revision> {
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
			upload_protocol,
			uploadType,
			...body
		} = params;
		return this._client.patch(path`/files/${fileId}/revisions/${revisionID}`, {
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
		});
	}

	/**
	 * Lists a file's revisions.
	 */
	list(
		fileID: string,
		query: RevisionListParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<RevisionListResponse> {
		return this._client.get(path`/files/${fileID}/revisions`, { query, ...options });
	}

	/**
	 * Permanently deletes a file version. You can only delete revisions for files with
	 * binary content in Google Drive, like images or videos. Revisions for other
	 * files, like Google Docs or Sheets, and the last remaining file version can't be
	 * deleted.
	 */
	delete(revisionID: string, params: RevisionDeleteParams, options?: RequestOptions): APIPromise<void> {
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
			upload_protocol,
			uploadType,
		} = params;
		return this._client.delete(path`/files/${fileId}/revisions/${revisionID}`, {
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
 * The metadata for a revision to a file. Some resource methods (such as
 * `revisions.update`) require a `revisionId`. Use the `revisions.list` method to
 * retrieve the ID for a revision.
 */
export interface Revision {
	/**
	 * Output only. The ID of the revision.
	 */
	id?: string;

	/**
	 * Output only. Links for exporting Docs Editors files to specific formats.
	 */
	exportLinks?: Record<string, string>;

	/**
	 * Whether to keep this revision forever, even if it is no longer the head
	 * revision. If not set, the revision will be automatically purged 30 days after
	 * newer content is uploaded. This can be set on a maximum of 200 revisions for a
	 * file. This field is only applicable to files with binary content in Drive.
	 */
	keepForever?: boolean;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#revision"`.
	 */
	kind?: string;

	/**
	 * Output only. The last user to modify this revision.
	 */
	lastModifyingUser?: AboutAPI.User;

	/**
	 * Output only. The MD5 checksum of the revision's content. This is only applicable
	 * to files with binary content in Drive.
	 */
	md5Checksum?: string;

	/**
	 * Output only. The MIME type of the revision.
	 */
	mimeType?: string;

	/**
	 * The last time the revision was modified (RFC 3339 date-time).
	 */
	modifiedTime?: string;

	/**
	 * Output only. The original filename used to create this revision. This is only
	 * applicable to files with binary content in Drive.
	 */
	originalFilename?: string;

	/**
	 * Whether subsequent revisions will be automatically republished. This is only
	 * applicable to Docs Editors files.
	 */
	publishAuto?: boolean;

	/**
	 * Whether this revision is published. This is only applicable to Docs Editors
	 * files.
	 */
	published?: boolean;

	/**
	 * Output only. A link to the published revision. This is only populated for Google
	 * Sites files.
	 */
	publishedLink?: string;

	/**
	 * Whether this revision is published outside the domain. This is only applicable
	 * to Docs Editors files.
	 */
	publishedOutsideDomain?: boolean;

	/**
	 * Output only. The size of the revision's content in bytes. This is only
	 * applicable to files with binary content in Drive.
	 */
	size?: string;
}

/**
 * A list of revisions of a file.
 */
export interface RevisionListResponse {
	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#revisionList"`.
	 */
	kind?: string;

	/**
	 * The page token for the next page of revisions. This will be absent if the end of
	 * the revisions list has been reached. If the token is rejected for any reason, it
	 * should be discarded, and pagination should be restarted from the first page of
	 * results. The page token is typically valid for several hours. However, if new
	 * items are added or removed, your expected results might differ.
	 */
	nextPageToken?: string;

	/**
	 * The list of revisions. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	revisions?: Array<Revision>;
}

export interface RevisionRetrieveParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: RevisionRetrieveParams._;

	/**
	 * Query param: OAuth access token.
	 */
	access_token?: string;

	/**
	 * Query param: Whether the user is acknowledging the risk of downloading known
	 * malware or other abusive files. This is only applicable when alt=media.
	 */
	acknowledgeAbuse?: boolean;

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
}

export namespace RevisionRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface RevisionUpdateParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: RevisionUpdateParams._;

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
	 * Body param: Output only. The ID of the revision.
	 */
	id?: string;

	/**
	 * Body param: Output only. Links for exporting Docs Editors files to specific
	 * formats.
	 */
	exportLinks?: Record<string, string>;

	/**
	 * Body param: Whether to keep this revision forever, even if it is no longer the
	 * head revision. If not set, the revision will be automatically purged 30 days
	 * after newer content is uploaded. This can be set on a maximum of 200 revisions
	 * for a file. This field is only applicable to files with binary content in Drive.
	 */
	keepForever?: boolean;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#revision"`.
	 */
	kind?: string;

	/**
	 * Body param: Output only. The last user to modify this revision.
	 */
	lastModifyingUser?: AboutAPI.User;

	/**
	 * Body param: Output only. The MD5 checksum of the revision's content. This is
	 * only applicable to files with binary content in Drive.
	 */
	md5Checksum?: string;

	/**
	 * Body param: Output only. The MIME type of the revision.
	 */
	mimeType?: string;

	/**
	 * Body param: The last time the revision was modified (RFC 3339 date-time).
	 */
	modifiedTime?: string;

	/**
	 * Body param: Output only. The original filename used to create this revision.
	 * This is only applicable to files with binary content in Drive.
	 */
	originalFilename?: string;

	/**
	 * Body param: Whether subsequent revisions will be automatically republished. This
	 * is only applicable to Docs Editors files.
	 */
	publishAuto?: boolean;

	/**
	 * Body param: Whether this revision is published. This is only applicable to Docs
	 * Editors files.
	 */
	published?: boolean;

	/**
	 * Body param: Output only. A link to the published revision. This is only
	 * populated for Google Sites files.
	 */
	publishedLink?: string;

	/**
	 * Body param: Whether this revision is published outside the domain. This is only
	 * applicable to Docs Editors files.
	 */
	publishedOutsideDomain?: boolean;

	/**
	 * Body param: Output only. The size of the revision's content in bytes. This is
	 * only applicable to files with binary content in Drive.
	 */
	size?: string;
}

export namespace RevisionUpdateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface RevisionListParams {
	$?: RevisionListParams._;

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
	 * The maximum number of revisions to return per page.
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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace RevisionListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface RevisionDeleteParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: RevisionDeleteParams._;

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
}

export namespace RevisionDeleteParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Revisions {
	export type {
		Revision,
		RevisionListResponse,
		RevisionRetrieveParams,
		RevisionUpdateParams,
		RevisionListParams,
		RevisionDeleteParams,
	};
}
