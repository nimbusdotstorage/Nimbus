// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type {
	Reply,
	ReplyCreateParams,
	ReplyDeleteParams,
	ReplyListParams,
	ReplyListResponse,
	ReplyRetrieveParams,
	ReplyUpdateParams,
} from "./replies";
import { type RequestOptions } from "../../../internal/request-options";
import { buildHeaders } from "../../../internal/headers";
import { APIPromise } from "../../../core/api-promise";
import { APIResource } from "../../../core/resource";
import { path } from "../../../internal/utils/path";
import * as AboutAPI from "../../about";
import * as RepliesAPI from "./replies";
import { Replies } from "./replies";

export class Comments extends APIResource {
	replies: RepliesAPI.Replies = new RepliesAPI.Replies(this._client);

	/**
	 * Creates a comment on a file.
	 */
	create(
		fileID: string,
		params: CommentCreateParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<Comment> {
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
		return this._client.post(path`/files/${fileID}/comments`, {
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
	 * Gets a comment by ID.
	 */
	retrieve(commentID: string, params: CommentRetrieveParams, options?: RequestOptions): APIPromise<Comment> {
		const { fileId, ...query } = params;
		return this._client.get(path`/files/${fileId}/comments/${commentID}`, { query, ...options });
	}

	/**
	 * Updates a comment with patch semantics.
	 */
	update(commentID: string, params: CommentUpdateParams, options?: RequestOptions): APIPromise<Comment> {
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
		return this._client.patch(path`/files/${fileId}/comments/${commentID}`, {
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
	 * Lists a file's comments.
	 */
	list(
		fileID: string,
		query: CommentListParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<CommentListResponse> {
		return this._client.get(path`/files/${fileID}/comments`, { query, ...options });
	}

	/**
	 * Deletes a comment.
	 */
	delete(commentID: string, params: CommentDeleteParams, options?: RequestOptions): APIPromise<void> {
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
		return this._client.delete(path`/files/${fileId}/comments/${commentID}`, {
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
 * A comment on a file. Some resource methods (such as `comments.update`) require a
 * `commentId`. Use the `comments.list` method to retrieve the ID for a comment in
 * a file.
 */
export interface Comment {
	/**
	 * Output only. The ID of the comment.
	 */
	id?: string;

	/**
	 * A region of the document represented as a JSON string. For details on defining
	 * anchor properties, refer to
	 * [Manage comments and replies](https://developers.google.com/drive/api/v3/manage-comments).
	 */
	anchor?: string;

	/**
	 * Output only. The author of the comment. The author's email address and
	 * permission ID will not be populated.
	 */
	author?: AboutAPI.User;

	/**
	 * The plain text content of the comment. This field is used for setting the
	 * content, while `htmlContent` should be displayed.
	 */
	content?: string;

	/**
	 * The time at which the comment was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Output only. Whether the comment has been deleted. A deleted comment has no
	 * content.
	 */
	deleted?: boolean;

	/**
	 * Output only. The content of the comment with HTML formatting.
	 */
	htmlContent?: string;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#comment"`.
	 */
	kind?: string;

	/**
	 * The last time the comment or any of its replies was modified (RFC 3339
	 * date-time).
	 */
	modifiedTime?: string;

	/**
	 * The file content to which the comment refers, typically within the anchor
	 * region. For a text file, for example, this would be the text at the location of
	 * the comment.
	 */
	quotedFileContent?: Comment.QuotedFileContent;

	/**
	 * Output only. The full list of replies to the comment in chronological order.
	 */
	replies?: Array<RepliesAPI.Reply>;

	/**
	 * Output only. Whether the comment has been resolved by one of its replies.
	 */
	resolved?: boolean;
}

export namespace Comment {
	/**
	 * The file content to which the comment refers, typically within the anchor
	 * region. For a text file, for example, this would be the text at the location of
	 * the comment.
	 */
	export interface QuotedFileContent {
		/**
		 * The MIME type of the quoted content.
		 */
		mimeType?: string;

		/**
		 * The quoted content itself. This is interpreted as plain text if set through the
		 * API.
		 */
		value?: string;
	}
}

/**
 * A list of comments on a file.
 */
export interface CommentListResponse {
	/**
	 * The list of comments. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	comments?: Array<Comment>;

	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#commentList"`.
	 */
	kind?: string;

	/**
	 * The page token for the next page of comments. This will be absent if the end of
	 * the comments list has been reached. If the token is rejected for any reason, it
	 * should be discarded, and pagination should be restarted from the first page of
	 * results. The page token is typically valid for several hours. However, if new
	 * items are added or removed, your expected results might differ.
	 */
	nextPageToken?: string;
}

export interface CommentCreateParams {
	/**
	 * Query param:
	 */
	$?: CommentCreateParams._;

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
	 * Body param: Output only. The ID of the comment.
	 */
	id?: string;

	/**
	 * Body param: A region of the document represented as a JSON string. For details
	 * on defining anchor properties, refer to
	 * [Manage comments and replies](https://developers.google.com/drive/api/v3/manage-comments).
	 */
	anchor?: string;

	/**
	 * Body param: Output only. The author of the comment. The author's email address
	 * and permission ID will not be populated.
	 */
	author?: AboutAPI.User;

	/**
	 * Body param: The plain text content of the comment. This field is used for
	 * setting the content, while `htmlContent` should be displayed.
	 */
	content?: string;

	/**
	 * Body param: The time at which the comment was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Output only. Whether the comment has been deleted. A deleted comment
	 * has no content.
	 */
	deleted?: boolean;

	/**
	 * Body param: Output only. The content of the comment with HTML formatting.
	 */
	htmlContent?: string;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#comment"`.
	 */
	kind?: string;

	/**
	 * Body param: The last time the comment or any of its replies was modified (RFC
	 * 3339 date-time).
	 */
	modifiedTime?: string;

	/**
	 * Body param: The file content to which the comment refers, typically within the
	 * anchor region. For a text file, for example, this would be the text at the
	 * location of the comment.
	 */
	quotedFileContent?: CommentCreateParams.QuotedFileContent;

	/**
	 * Body param: Output only. The full list of replies to the comment in
	 * chronological order.
	 */
	replies?: Array<RepliesAPI.Reply>;

	/**
	 * Body param: Output only. Whether the comment has been resolved by one of its
	 * replies.
	 */
	resolved?: boolean;
}

export namespace CommentCreateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * The file content to which the comment refers, typically within the anchor
	 * region. For a text file, for example, this would be the text at the location of
	 * the comment.
	 */
	export interface QuotedFileContent {
		/**
		 * The MIME type of the quoted content.
		 */
		mimeType?: string;

		/**
		 * The quoted content itself. This is interpreted as plain text if set through the
		 * API.
		 */
		value?: string;
	}
}

export interface CommentRetrieveParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: CommentRetrieveParams._;

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
	 * Query param: Whether to return deleted comments. Deleted comments will not
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

export namespace CommentRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface CommentUpdateParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: CommentUpdateParams._;

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
	 * Body param: Output only. The ID of the comment.
	 */
	id?: string;

	/**
	 * Body param: A region of the document represented as a JSON string. For details
	 * on defining anchor properties, refer to
	 * [Manage comments and replies](https://developers.google.com/drive/api/v3/manage-comments).
	 */
	anchor?: string;

	/**
	 * Body param: Output only. The author of the comment. The author's email address
	 * and permission ID will not be populated.
	 */
	author?: AboutAPI.User;

	/**
	 * Body param: The plain text content of the comment. This field is used for
	 * setting the content, while `htmlContent` should be displayed.
	 */
	content?: string;

	/**
	 * Body param: The time at which the comment was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: Output only. Whether the comment has been deleted. A deleted comment
	 * has no content.
	 */
	deleted?: boolean;

	/**
	 * Body param: Output only. The content of the comment with HTML formatting.
	 */
	htmlContent?: string;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#comment"`.
	 */
	kind?: string;

	/**
	 * Body param: The last time the comment or any of its replies was modified (RFC
	 * 3339 date-time).
	 */
	modifiedTime?: string;

	/**
	 * Body param: The file content to which the comment refers, typically within the
	 * anchor region. For a text file, for example, this would be the text at the
	 * location of the comment.
	 */
	quotedFileContent?: CommentUpdateParams.QuotedFileContent;

	/**
	 * Body param: Output only. The full list of replies to the comment in
	 * chronological order.
	 */
	replies?: Array<RepliesAPI.Reply>;

	/**
	 * Body param: Output only. Whether the comment has been resolved by one of its
	 * replies.
	 */
	resolved?: boolean;
}

export namespace CommentUpdateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * The file content to which the comment refers, typically within the anchor
	 * region. For a text file, for example, this would be the text at the location of
	 * the comment.
	 */
	export interface QuotedFileContent {
		/**
		 * The MIME type of the quoted content.
		 */
		mimeType?: string;

		/**
		 * The quoted content itself. This is interpreted as plain text if set through the
		 * API.
		 */
		value?: string;
	}
}

export interface CommentListParams {
	$?: CommentListParams._;

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
	 * Whether to include deleted comments. Deleted comments will not include their
	 * original content.
	 */
	includeDeleted?: boolean;

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
	 * The maximum number of comments to return per page.
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
	 * The minimum value of 'modifiedTime' for the result comments (RFC 3339
	 * date-time).
	 */
	startModifiedTime?: string;

	/**
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace CommentListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface CommentDeleteParams {
	/**
	 * Path param: The ID of the file.
	 */
	fileId: string;

	/**
	 * Query param:
	 */
	$?: CommentDeleteParams._;

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

export namespace CommentDeleteParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

Comments.Replies = Replies;

export declare namespace Comments {
	export type {
		Comment,
		CommentListResponse,
		CommentCreateParams,
		CommentRetrieveParams,
		CommentUpdateParams,
		CommentListParams,
		CommentDeleteParams,
	};

	export { Replies };
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
