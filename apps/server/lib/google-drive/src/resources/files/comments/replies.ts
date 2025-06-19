// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type RequestOptions } from "../../../internal/request-options";
import { buildHeaders } from "../../../internal/headers";
import { APIPromise } from "../../../core/api-promise";
import { APIResource } from "../../../core/resource";
import { path } from "../../../internal/utils/path";
import * as AboutAPI from "../../about";

export class Replies extends APIResource {
	/**
	 * Creates a reply to a comment.
	 */
	create(commentID: string, params: ReplyCreateParams, options?: RequestOptions): APIPromise<Reply> {
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
		return this._client.post(path`/files/${fileId}/comments/${commentID}/replies`, {
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
	 * Gets a reply by ID.
	 */
	retrieve(replyID: string, params: ReplyRetrieveParams, options?: RequestOptions): APIPromise<Reply> {
		const { fileId, commentId, ...query } = params;
		return this._client.get(path`/files/${fileId}/comments/${commentId}/replies/${replyID}`, {
			query,
			...options,
		});
	}

	/**
	 * Updates a reply with patch semantics.
	 */
	update(replyID: string, params: ReplyUpdateParams, options?: RequestOptions): APIPromise<Reply> {
		const {
			fileId,
			commentId,
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
		return this._client.patch(path`/files/${fileId}/comments/${commentId}/replies/${replyID}`, {
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
	 * Lists a comment's replies.
	 */
	list(commentID: string, params: ReplyListParams, options?: RequestOptions): APIPromise<ReplyListResponse> {
		const { fileId, ...query } = params;
		return this._client.get(path`/files/${fileId}/comments/${commentID}/replies`, { query, ...options });
	}

	/**
	 * Deletes a reply.
	 */
	delete(replyID: string, params: ReplyDeleteParams, options?: RequestOptions): APIPromise<void> {
		const {
			fileId,
			commentId,
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
		return this._client.delete(path`/files/${fileId}/comments/${commentId}/replies/${replyID}`, {
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
 * A reply to a comment on a file. Some resource methods (such as `replies.update`)
 * require a `replyId`. Use the `replies.list` method to retrieve the ID for a
 * reply.
 */
export interface Reply {
	/**
	 * Output only. The ID of the reply.
	 */
	id?: string;

	/**
	 * The action the reply performed to the parent comment. Valid values are: _
	 * `resolve` _ `reopen`
	 */
	action?: string;

	/**
	 * Output only. The author of the reply. The author's email address and permission
	 * ID will not be populated.
	 */
	author?: AboutAPI.User;

	/**
	 * The plain text content of the reply. This field is used for setting the content,
	 * while `htmlContent` should be displayed. This is required on creates if no
	 * `action` is specified.
	 */
	content?: string;

	/**
	 * The time at which the reply was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Output only. Whether the reply has been deleted. A deleted reply has no content.
	 */
	deleted?: boolean;

	/**
	 * Output only. The content of the reply with HTML formatting.
	 */
	htmlContent?: string;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#reply"`.
	 */
	kind?: string;

	/**
	 * The last time the reply was modified (RFC 3339 date-time).
	 */
	modifiedTime?: string;
}

/**
 * A list of replies to a comment on a file.
 */
export interface ReplyListResponse {
	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#replyList"`.
	 */
	kind?: string;

	/**
	 * The page token for the next page of replies. This will be absent if the end of
	 * the replies list has been reached. If the token is rejected for any reason, it
	 * should be discarded, and pagination should be restarted from the first page of
	 * results. The page token is typically valid for several hours. However, if new
	 * items are added or removed, your expected results might differ.
	 */
	nextPageToken?: string;

	/**
	 * The list of replies. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	replies?: Array<Reply>;
}

export interface ReplyCreateParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: ReplyCreateParams._;

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
	 * Body param: Output only. The ID of the reply.
	 */
	id?: string;

	/**
	 * Body param: The action the reply performed to the parent comment. Valid values
	 * are: _ `resolve` _ `reopen`
	 */
	action?: string;

	/**
	 * Body param: Output only. The author of the reply. The author's email address and
	 * permission ID will not be populated.
	 */
	author?: AboutAPI.User;

	/**
	 * Body param: The plain text content of the reply. This field is used for setting
	 * the content, while `htmlContent` should be displayed. This is required on
	 * creates if no `action` is specified.
	 */
	content?: string;

	/**
	 * Body param: The time at which the reply was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Output only. Whether the reply has been deleted. A deleted reply has
	 * no content.
	 */
	deleted?: boolean;

	/**
	 * Body param: Output only. The content of the reply with HTML formatting.
	 */
	htmlContent?: string;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#reply"`.
	 */
	kind?: string;

	/**
	 * Body param: The last time the reply was modified (RFC 3339 date-time).
	 */
	modifiedTime?: string;
}

export namespace ReplyCreateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface ReplyRetrieveParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Path param: The ID of the comment.
	 */
	commentId: string;

	/**
	 * Query param:
	 */
	$?: ReplyRetrieveParams._;

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
	 * Query param: Whether to return deleted replies. Deleted replies will not include
	 * their original content.
	 */
	includeDeleted?: boolean;

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

export namespace ReplyRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface ReplyUpdateParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Path param: The ID of the comment.
	 */
	commentId: string;

	/**
	 * Query param:
	 */
	$?: ReplyUpdateParams._;

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
	 * Body param: Output only. The ID of the reply.
	 */
	id?: string;

	/**
	 * Body param: The action the reply performed to the parent comment. Valid values
	 * are: _ `resolve` _ `reopen`
	 */
	action?: string;

	/**
	 * Body param: Output only. The author of the reply. The author's email address and
	 * permission ID will not be populated.
	 */
	author?: AboutAPI.User;

	/**
	 * Body param: The plain text content of the reply. This field is used for setting
	 * the content, while `htmlContent` should be displayed. This is required on
	 * creates if no `action` is specified.
	 */
	content?: string;

	/**
	 * Body param: The time at which the reply was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Output only. Whether the reply has been deleted. A deleted reply has
	 * no content.
	 */
	deleted?: boolean;

	/**
	 * Body param: Output only. The content of the reply with HTML formatting.
	 */
	htmlContent?: string;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#reply"`.
	 */
	kind?: string;

	/**
	 * Body param: The last time the reply was modified (RFC 3339 date-time).
	 */
	modifiedTime?: string;
}

export namespace ReplyUpdateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface ReplyListParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: ReplyListParams._;

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
	 * Query param: Whether to include deleted replies. Deleted replies will not
	 * include their original content.
	 */
	includeDeleted?: boolean;

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
	 * Query param: The maximum number of replies to return per page.
	 */
	pageSize?: number;

	/**
	 * Query param: The token for continuing a previous list request on the next page.
	 * This should be set to the value of 'nextPageToken' from the previous response.
	 */
	pageToken?: string;

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

export namespace ReplyListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface ReplyDeleteParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Path param: The ID of the comment.
	 */
	commentId: string;

	/**
	 * Query param:
	 */
	$?: ReplyDeleteParams._;

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

export namespace ReplyDeleteParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export declare namespace Replies {
	export type {
		Reply,
		ReplyListResponse,
		ReplyCreateParams,
		ReplyRetrieveParams,
		ReplyUpdateParams,
		ReplyListParams,
		ReplyDeleteParams,
	};
}
