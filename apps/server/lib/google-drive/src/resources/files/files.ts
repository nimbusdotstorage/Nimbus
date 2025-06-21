// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import {
	type Permission,
	type PermissionCreateParams,
	type PermissionDeleteParams,
	type PermissionListParams,
	type PermissionListResponse,
	type PermissionRetrieveParams,
	type PermissionUpdateParams,
	Permissions,
} from "./permissions";
import {
	type Comment,
	type CommentCreateParams,
	type CommentDeleteParams,
	type CommentListParams,
	type CommentListResponse,
	type CommentRetrieveParams,
	type CommentUpdateParams,
	Comments,
} from "./comments/comments";
import {
	type Revision,
	type RevisionDeleteParams,
	type RevisionListParams,
	type RevisionListResponse,
	type RevisionRetrieveParams,
	type RevisionUpdateParams,
	Revisions,
} from "./revisions";
import type { RequestOptions } from "../../internal/request-options";
import { buildHeaders } from "../../internal/headers";
import { APIPromise } from "../../core/api-promise";
import * as CommentsAPI from "./comments/comments";
import { APIResource } from "../../core/resource";
import { path } from "../../internal/utils/path";
import * as PermissionsAPI from "./permissions";
import * as RevisionsAPI from "./revisions";
import * as ChangesAPI from "../changes";
import * as AboutAPI from "../about";
import * as FilesAPI from "./files";

export class Files extends APIResource {
	comments: CommentsAPI.Comments = new CommentsAPI.Comments(this._client);
	permissions: PermissionsAPI.Permissions = new PermissionsAPI.Permissions(this._client);
	revisions: RevisionsAPI.Revisions = new RevisionsAPI.Revisions(this._client);

	/**
	 * Creates a new file. This method supports an _/upload_ URI and accepts uploaded
	 * media with the following characteristics: - _Maximum file size:_ 5,120 GB -
	 * _Accepted Media MIME types:_`* /*` Note: Specify a valid MIME type, rather than
	 * the literal `* /*` value. The literal `* /*` is only used to indicate that any
	 * valid MIME type can be uploaded. For more information on uploading files, see
	 * [Upload file data](/drive/api/guides/manage-uploads). Apps creating shortcuts
	 * with `files.create` must specify the MIME type
	 * `application/vnd.google-apps.shortcut`. Apps should specify a file extension in
	 * the `name` property when inserting files with the API. For example, an operation
	 * to insert a JPEG file should specify something like `"name": "cat.jpg"` in the
	 * metadata. Subsequent `GET` requests include the read-only `fileExtension`
	 * property populated with the extension originally specified in the `title`
	 * property. When a Google Drive user requests to download a file, or when the file
	 * is downloaded through the sync client, Drive builds a full filename (with
	 * extension) based on the title. In cases where the extension is missing, Drive
	 * attempts to determine the extension based on the file's MIME type.
	 */
	create(params: FileCreateParams | null | undefined = {}, options?: RequestOptions): APIPromise<File> {
		const {
			$,
			access_token,
			alt,
			callback,
			enforceSingleParent,
			fields,
			ignoreDefaultVisibility,
			includeLabels,
			includePermissionsForView,
			keepRevisionForever,
			key,
			oauth_token,
			ocrLanguage,
			prettyPrint,
			quotaUser,
			supportsAllDrives,
			supportsTeamDrives,
			upload_protocol,
			uploadType,
			useContentAsIndexableText,
			...body
		} = params ?? {};
		return this._client.post("/files", {
			query: {
				$,
				access_token,
				alt,
				callback,
				enforceSingleParent,
				fields,
				ignoreDefaultVisibility,
				includeLabels,
				includePermissionsForView,
				keepRevisionForever,
				key,
				oauth_token,
				ocrLanguage,
				prettyPrint,
				quotaUser,
				supportsAllDrives,
				supportsTeamDrives,
				upload_protocol,
				uploadType,
				useContentAsIndexableText,
			},
			body,
			...options,
			headers: buildHeaders([{ "Content-Type": "application/octet-stream" }, options?.headers]),
		});
	}

	/**
	 * Gets a file's metadata or content by ID. If you provide the URL parameter
	 * `alt=media`, then the response includes the file contents in the response body.
	 * Downloading content with `alt=media` only works if the file is stored in Drive.
	 * To download Google Docs, Sheets, and Slides use
	 * [`files.export`](/drive/api/reference/rest/v3/files/export) instead. For more
	 * information, see [Download & export files](/drive/api/guides/manage-downloads).
	 */
	retrieve(
		fileID: string,
		query: FileRetrieveParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<File> {
		return this._client.get(path`/files/${fileID}`, { query, ...options });
	}

	/**
	 * Updates a file's metadata and/or content. When calling this method, only
	 * populate fields in the request that you want to modify. When updating fields,
	 * some fields might be changed automatically, such as `modifiedDate`. This method
	 * supports patch semantics. This method supports an _/upload_ URI and accepts
	 * uploaded media with the following characteristics: - _Maximum file size:_ 5,120
	 * GB - _Accepted Media MIME types:_`* /*` Note: Specify a valid MIME type, rather
	 * than the literal `* /*` value. The literal `* /*` is only used to indicate that
	 * any valid MIME type can be uploaded. For more information on uploading files,
	 * see [Upload file data](/drive/api/guides/manage-uploads).
	 */
	update(fileID: string, params: FileUpdateParams | null | undefined = {}, options?: RequestOptions): APIPromise<File> {
		const {
			$,
			access_token,
			addParents,
			alt,
			callback,
			enforceSingleParent,
			fields,
			includeLabels,
			includePermissionsForView,
			keepRevisionForever,
			key,
			oauth_token,
			ocrLanguage,
			prettyPrint,
			quotaUser,
			removeParents,
			supportsAllDrives,
			supportsTeamDrives,
			upload_protocol,
			uploadType,
			useContentAsIndexableText,
			...body
		} = params ?? {};
		return this._client.patch(path`/files/${fileID}`, {
			query: {
				$,
				access_token,
				addParents,
				alt,
				callback,
				enforceSingleParent,
				fields,
				includeLabels,
				includePermissionsForView,
				keepRevisionForever,
				key,
				oauth_token,
				ocrLanguage,
				prettyPrint,
				quotaUser,
				removeParents,
				supportsAllDrives,
				supportsTeamDrives,
				upload_protocol,
				uploadType,
				useContentAsIndexableText,
			},
			body,
			...options,
			headers: buildHeaders([{ "Content-Type": "application/octet-stream" }, options?.headers]),
		});
	}

	/**
	 * Lists the user's files. This method accepts the `q` parameter, which is a search
	 * query combining one or more search terms. For more information, see the
	 * [Search for files & folders](/drive/api/guides/search-files) guide. _Note:_ This
	 * method returns _all_ files by default, including trashed files. If you don't
	 * want trashed files to appear in the list, use the `trashed=false` query
	 * parameter to remove trashed files from the results.
	 */
	list(query: FileListParams | null | undefined = {}, options?: RequestOptions): APIPromise<FileListResponse> {
		return this._client.get("/files", { query, ...options });
	}

	/**
	 * Permanently deletes a file owned by the user without moving it to the trash. If
	 * the file belongs to a shared drive, the user must be an `organizer` on the
	 * parent folder. If the target is a folder, all descendants owned by the user are
	 * also deleted.
	 */
	delete(fileID: string, params: FileDeleteParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
		const {
			$,
			access_token,
			alt,
			callback,
			enforceSingleParent,
			fields,
			key,
			oauth_token,
			prettyPrint,
			quotaUser,
			supportsAllDrives,
			supportsTeamDrives,
			upload_protocol,
			uploadType,
		} = params ?? {};
		return this._client.delete(path`/files/${fileID}`, {
			query: {
				$,
				access_token,
				alt,
				callback,
				enforceSingleParent,
				fields,
				key,
				oauth_token,
				prettyPrint,
				quotaUser,
				supportsAllDrives,
				supportsTeamDrives,
				upload_protocol,
				uploadType,
			},
			...options,
			headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
		});
	}

	/**
	 * Creates a copy of a file and applies any requested updates with patch semantics.
	 */
	copy(fileID: string, params: FileCopyParams | null | undefined = {}, options?: RequestOptions): APIPromise<File> {
		const {
			$,
			access_token,
			alt,
			callback,
			enforceSingleParent,
			fields,
			ignoreDefaultVisibility,
			includeLabels,
			includePermissionsForView,
			keepRevisionForever,
			key,
			oauth_token,
			ocrLanguage,
			prettyPrint,
			quotaUser,
			supportsAllDrives,
			supportsTeamDrives,
			upload_protocol,
			uploadType,
			...body
		} = params ?? {};
		return this._client.post(path`/files/${fileID}/copy`, {
			query: {
				$,
				access_token,
				alt,
				callback,
				enforceSingleParent,
				fields,
				ignoreDefaultVisibility,
				includeLabels,
				includePermissionsForView,
				keepRevisionForever,
				key,
				oauth_token,
				ocrLanguage,
				prettyPrint,
				quotaUser,
				supportsAllDrives,
				supportsTeamDrives,
				upload_protocol,
				uploadType,
			},
			body,
			...options,
		});
	}

	/**
	 * Permanently deletes all of the user's trashed files.
	 */
	deleteTrashed(params: FileDeleteTrashedParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
		const {
			$,
			access_token,
			alt,
			callback,
			driveId,
			enforceSingleParent,
			fields,
			key,
			oauth_token,
			prettyPrint,
			quotaUser,
			upload_protocol,
			uploadType,
		} = params ?? {};
		return this._client.delete("/files/trash", {
			query: {
				$,
				access_token,
				alt,
				callback,
				driveId,
				enforceSingleParent,
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

	/**
	 * Exports a Google Workspace document to the requested MIME type and returns
	 * exported byte content. Note that the exported content is limited to 10MB.
	 */
	export(fileID: string, query: FileExportParams, options?: RequestOptions): APIPromise<void> {
		return this._client.get(path`/files/${fileID}/export`, {
			query,
			...options,
			headers: buildHeaders([{ Accept: "*/*" }, options?.headers]),
		});
	}

	/**
	 * Generates a set of file IDs which can be provided in create or copy requests.
	 */
	generateIDs(
		query: FileGenerateIDsParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<FileGenerateIDsResponse> {
		return this._client.get("/files/generateIds", { query, ...options });
	}

	/**
	 * Lists the labels on a file.
	 */
	listLabels(
		fileID: string,
		query: FileListLabelsParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<FileListLabelsResponse> {
		return this._client.get(path`/files/${fileID}/listLabels`, { query, ...options });
	}

	/**
	 * Modifies the set of labels applied to a file. Returns a list of the labels that
	 * were added or modified.
	 */
	modifyLabels(
		fileID: string,
		params: FileModifyLabelsParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<FileModifyLabelsResponse> {
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
		return this._client.post(path`/files/${fileID}/modifyLabels`, {
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
	 * Subscribes to changes to a file.
	 */
	watch(
		fileID: string,
		params: FileWatchParams | null | undefined = {},
		options?: RequestOptions
	): APIPromise<ChangesAPI.Channel> {
		const {
			$,
			access_token,
			acknowledgeAbuse,
			alt,
			callback,
			fields,
			includeLabels,
			includePermissionsForView,
			key,
			oauth_token,
			prettyPrint,
			quotaUser,
			supportsAllDrives,
			supportsTeamDrives,
			upload_protocol,
			uploadType,
			...body
		} = params ?? {};
		return this._client.post(path`/files/${fileID}/watch`, {
			query: {
				$,
				access_token,
				acknowledgeAbuse,
				alt,
				callback,
				fields,
				includeLabels,
				includePermissionsForView,
				key,
				oauth_token,
				prettyPrint,
				quotaUser,
				supportsAllDrives,
				supportsTeamDrives,
				upload_protocol,
				uploadType,
			},
			body,
			...options,
		});
	}
}

/**
 * The metadata for a file. Some resource methods (such as `files.update`) require
 * a `fileId`. Use the `files.list` method to retrieve the ID for a file.
 */
export interface File {
	/**
	 * The ID of the file.
	 */
	id?: string;

	/**
	 * A collection of arbitrary key-value pairs which are private to the requesting
	 * app. Entries with null values are cleared in update and copy requests. These
	 * properties can only be retrieved using an authenticated request. An
	 * authenticated request uses an access token obtained with a OAuth 2 client ID.
	 * You cannot use an API key to retrieve private properties.
	 */
	appProperties?: Record<string, string>;

	/**
	 * Output only. Capabilities the current user has on this file. Each capability
	 * corresponds to a fine-grained action that a user may take.
	 */
	capabilities?: File.Capabilities;

	/**
	 * Additional information about the content of the file. These fields are never
	 * populated in responses.
	 */
	contentHints?: File.ContentHints;

	/**
	 * Restrictions for accessing the content of the file. Only populated if such a
	 * restriction exists.
	 */
	contentRestrictions?: Array<File.ContentRestriction>;

	/**
	 * Whether the options to copy, print, or download this file, should be disabled
	 * for readers and commenters.
	 */
	copyRequiresWriterPermission?: boolean;

	/**
	 * The time at which the file was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * A short description of the file.
	 */
	description?: string;

	/**
	 * Output only. ID of the shared drive the file resides in. Only populated for
	 * items in shared drives.
	 */
	driveId?: string;

	/**
	 * Output only. Whether the file has been explicitly trashed, as opposed to
	 * recursively trashed from a parent folder.
	 */
	explicitlyTrashed?: boolean;

	/**
	 * Output only. Links for exporting Docs Editors files to specific formats.
	 */
	exportLinks?: Record<string, string>;

	/**
	 * Output only. The final component of `fullFileExtension`. This is only available
	 * for files with binary content in Google Drive.
	 */
	fileExtension?: string;

	/**
	 * The color for a folder or a shortcut to a folder as an RGB hex string. The
	 * supported colors are published in the `folderColorPalette` field of the About
	 * resource. If an unsupported color is specified, the closest color in the palette
	 * is used instead.
	 */
	folderColorRgb?: string;

	/**
	 * Output only. The full file extension extracted from the `name` field. May
	 * contain multiple concatenated extensions, such as "tar.gz". This is only
	 * available for files with binary content in Google Drive. This is automatically
	 * updated when the `name` field changes, however it is not cleared if the new name
	 * does not contain a valid extension.
	 */
	fullFileExtension?: string;

	/**
	 * Output only. Whether there are permissions directly on this file. This field is
	 * only populated for items in shared drives.
	 */
	hasAugmentedPermissions?: boolean;

	/**
	 * Output only. Whether this file has a thumbnail. This does not indicate whether
	 * the requesting app has access to the thumbnail. To check access, look for the
	 * presence of the thumbnailLink field.
	 */
	hasThumbnail?: boolean;

	/**
	 * Output only. The ID of the file's head revision. This is currently only
	 * available for files with binary content in Google Drive.
	 */
	headRevisionId?: string;

	/**
	 * Output only. A static, unauthenticated link to the file's icon.
	 */
	iconLink?: string;

	/**
	 * Output only. Additional metadata about image media, if available.
	 */
	imageMediaMetadata?: File.ImageMediaMetadata;

	/**
	 * Output only. Whether the file was created or opened by the requesting app.
	 */
	isAppAuthorized?: boolean;

	/**
	 * Output only. Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#file"`.
	 */
	kind?: string;

	/**
	 * Output only. An overview of the labels on the file.
	 */
	labelInfo?: File.LabelInfo;

	/**
	 * Output only. The last user to modify the file.
	 */
	lastModifyingUser?: AboutAPI.User;

	/**
	 * Contains details about the link URLs that clients are using to refer to this
	 * item.
	 */
	linkShareMetadata?: File.LinkShareMetadata;

	/**
	 * Output only. The MD5 checksum for the content of the file. This is only
	 * applicable to files with binary content in Google Drive.
	 */
	md5Checksum?: string;

	/**
	 * The MIME type of the file. Google Drive attempts to automatically detect an
	 * appropriate value from uploaded content, if no value is provided. The value
	 * cannot be changed unless a new revision is uploaded. If a file is created with a
	 * Google Doc MIME type, the uploaded content is imported, if possible. The
	 * supported import formats are published in the About resource.
	 */
	mimeType?: string;

	/**
	 * Output only. Whether the file has been modified by this user.
	 */
	modifiedByMe?: boolean;

	/**
	 * The last time the file was modified by the user (RFC 3339 date-time).
	 */
	modifiedByMeTime?: string;

	/**
	 * he last time the file was modified by anyone (RFC 3339 date-time). Note that
	 * setting modifiedTime will also update modifiedByMeTime for the user.
	 */
	modifiedTime?: string;

	/**
	 * The name of the file. This is not necessarily unique within a folder. Note that
	 * for immutable items such as the top level folders of shared drives, My Drive
	 * root folder, and Application Data folder the name is constant.
	 */
	name?: string;

	/**
	 * The original filename of the uploaded content if available, or else the original
	 * value of the `name` field. This is only available for files with binary content
	 * in Google Drive.
	 */
	originalFilename?: string;

	/**
	 * Output only. Whether the user owns the file. Not populated for items in shared
	 * drives.
	 */
	ownedByMe?: boolean;

	/**
	 * Output only. The owner of this file. Only certain legacy files may have more
	 * than one owner. This field isn't populated for items in shared drives.
	 */
	owners?: Array<AboutAPI.User>;

	/**
	 * The IDs of the parent folders which contain the file. If not specified as part
	 * of a create request, the file is placed directly in the user's My Drive folder.
	 * If not specified as part of a copy request, the file inherits any discoverable
	 * parents of the source file. Update requests must use the `addParents` and
	 * `removeParents` parameters to modify the parents list.
	 */
	parents?: Array<string>;

	/**
	 * Output only. List of permission IDs for users with access to this file.
	 */
	permissionIds?: Array<string>;

	/**
	 * Output only. The full list of permissions for the file. This is only available
	 * if the requesting user can share the file. Not populated for items in shared
	 * drives.
	 */
	permissions?: Array<PermissionsAPI.Permission>;

	/**
	 * A collection of arbitrary key-value pairs which are visible to all apps. Entries
	 * with null values are cleared in update and copy requests.
	 */
	properties?: Record<string, string>;

	/**
	 * Output only. The number of storage quota bytes used by the file. This includes
	 * the head revision as well as previous revisions with `keepForever` enabled.
	 */
	quotaBytesUsed?: string;

	/**
	 * Output only. A key needed to access the item via a shared link.
	 */
	resourceKey?: string;

	/**
	 * Output only. The SHA1 checksum associated with this file, if available. This
	 * field is only populated for files with content stored in Google Drive; it is not
	 * populated for Docs Editors or shortcut files.
	 */
	sha1Checksum?: string;

	/**
	 * Output only. The SHA256 checksum associated with this file, if available. This
	 * field is only populated for files with content stored in Google Drive; it is not
	 * populated for Docs Editors or shortcut files.
	 */
	sha256Checksum?: string;

	/**
	 * Output only. Whether the file has been shared. Not populated for items in shared
	 * drives.
	 */
	shared?: boolean;

	/**
	 * The time at which the file was shared with the user, if applicable (RFC 3339
	 * date-time).
	 */
	sharedWithMeTime?: string;

	/**
	 * Output only. The user who shared the file with the requesting user, if
	 * applicable.
	 */
	sharingUser?: AboutAPI.User;

	/**
	 * Shortcut file details. Only populated for shortcut files, which have the
	 * mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	shortcutDetails?: File.ShortcutDetails;

	/**
	 * Output only. Size in bytes of blobs and first party editor files. Won't be
	 * populated for files that have no size, like shortcuts and folders.
	 */
	size?: string;

	/**
	 * Output only. The list of spaces which contain the file. The currently supported
	 * values are 'drive', 'appDataFolder' and 'photos'.
	 */
	spaces?: Array<string>;

	/**
	 * Whether the user has starred the file.
	 */
	starred?: boolean;

	/**
	 * @deprecated Deprecated: Output only. Use `driveId` instead.
	 */
	teamDriveId?: string;

	/**
	 * Output only. A short-lived link to the file's thumbnail, if available. Typically
	 * lasts on the order of hours. Only populated when the requesting app can access
	 * the file's content. If the file isn't shared publicly, the URL returned in
	 * `Files.thumbnailLink` must be fetched using a credentialed request.
	 */
	thumbnailLink?: string;

	/**
	 * Output only. The thumbnail version for use in thumbnail cache invalidation.
	 */
	thumbnailVersion?: string;

	/**
	 * Whether the file has been trashed, either explicitly or from a trashed parent
	 * folder. Only the owner may trash a file, and other users cannot see files in the
	 * owner's trash.
	 */
	trashed?: boolean;

	/**
	 * The time that the item was trashed (RFC 3339 date-time). Only populated for
	 * items in shared drives.
	 */
	trashedTime?: string;

	/**
	 * Output only. If the file has been explicitly trashed, the user who trashed it.
	 * Only populated for items in shared drives.
	 */
	trashingUser?: AboutAPI.User;

	/**
	 * Output only. A monotonically increasing version number for the file. This
	 * reflects every change made to the file on the server, even those not visible to
	 * the user.
	 */
	version?: string;

	/**
	 * Output only. Additional metadata about video media. This may not be available
	 * immediately upon upload.
	 */
	videoMediaMetadata?: File.VideoMediaMetadata;

	/**
	 * Output only. Whether the file has been viewed by this user.
	 */
	viewedByMe?: boolean;

	/**
	 * The last time the file was viewed by the user (RFC 3339 date-time).
	 */
	viewedByMeTime?: string;

	/**
	 * @deprecated Deprecated: Use `copyRequiresWriterPermission` instead.
	 */
	viewersCanCopyContent?: boolean;

	/**
	 * Output only. A link for downloading the content of the file in a browser. This
	 * is only available for files with binary content in Google Drive.
	 */
	webContentLink?: string;

	/**
	 * Output only. A link for opening the file in a relevant Google editor or viewer
	 * in a browser.
	 */
	webViewLink?: string;

	/**
	 * Whether users with only `writer` permission can modify the file's permissions.
	 * Not populated for items in shared drives.
	 */
	writersCanShare?: boolean;
}

export namespace File {
	/**
	 * Output only. Capabilities the current user has on this file. Each capability
	 * corresponds to a fine-grained action that a user may take.
	 */
	export interface Capabilities {
		/**
		 * Output only. Whether the current user is the pending owner of the file. Not
		 * populated for shared drive files.
		 */
		canAcceptOwnership?: boolean;

		/**
		 * Output only. Whether the current user can add children to this folder. This is
		 * always false when the item is not a folder.
		 */
		canAddChildren?: boolean;

		/**
		 * Output only. Whether the current user can add a folder from another drive
		 * (different shared drive or My Drive) to this folder. This is false when the item
		 * is not a folder. Only populated for items in shared drives.
		 */
		canAddFolderFromAnotherDrive?: boolean;

		/**
		 * Output only. Whether the current user can add a parent for the item without
		 * removing an existing parent in the same request. Not populated for shared drive
		 * files.
		 */
		canAddMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `copyRequiresWriterPermission` restriction of this file.
		 */
		canChangeCopyRequiresWriterPermission?: boolean;

		/**
		 * Output only. Whether the current user can change the securityUpdateEnabled field
		 * on link share metadata.
		 */
		canChangeSecurityUpdateEnabled?: boolean;

		/**
		 * @deprecated Deprecated: Output only.
		 */
		canChangeViewersCanCopyContent?: boolean;

		/**
		 * Output only. Whether the current user can comment on this file.
		 */
		canComment?: boolean;

		/**
		 * Output only. Whether the current user can copy this file. For an item in a
		 * shared drive, whether the current user can copy non-folder descendants of this
		 * item, or this item itself if it is not a folder.
		 */
		canCopy?: boolean;

		/**
		 * Output only. Whether the current user can delete this file.
		 */
		canDelete?: boolean;

		/**
		 * Output only. Whether the current user can delete children of this folder. This
		 * is false when the item is not a folder. Only populated for items in shared
		 * drives.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Output only. Whether the current user can download this file.
		 */
		canDownload?: boolean;

		/**
		 * Output only. Whether the current user can edit this file. Other factors may
		 * limit the type of changes a user can make to a file. For example, see
		 * `canChangeCopyRequiresWriterPermission` or `canModifyContent`.
		 */
		canEdit?: boolean;

		/**
		 * Output only. Whether the current user can list the children of this folder. This
		 * is always false when the item is not a folder.
		 */
		canListChildren?: boolean;

		/**
		 * Output only. Whether the current user can modify the content of this file.
		 */
		canModifyContent?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use one of
		 * `canModifyEditorContentRestriction`, `canModifyOwnerContentRestriction` or
		 * `canRemoveContentRestriction`.
		 */
		canModifyContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions on
		 * the file which are editor restricted.
		 */
		canModifyEditorContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can modify the labels on the file.
		 */
		canModifyLabels?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions
		 * which are owner restricted.
		 */
		canModifyOwnerContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder outside
		 * of the shared drive. This is false when the item is not a folder. Only populated
		 * for items in shared drives.
		 */
		canMoveChildrenOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenOutOfDrive` instead.
		 */
		canMoveChildrenOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder within
		 * this drive. This is false when the item is not a folder. Note that a request to
		 * move the child may still fail depending on the current user's access to the
		 * child and to the destination folder.
		 */
		canMoveChildrenWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenWithinDrive` instead.
		 */
		canMoveChildrenWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemIntoTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item outside of this drive
		 * by changing its parent. Note that a request to change the parent of the item may
		 * still fail depending on the new parent that is being added.
		 */
		canMoveItemOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item within this drive. Note
		 * that a request to change the parent of the item may still fail depending on the
		 * new parent that is being added and the parent that is being removed.
		 */
		canMoveItemWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` instead.
		 */
		canMoveItemWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` or
		 * `canMoveItemOutOfDrive` instead.
		 */
		canMoveTeamDriveItem?: boolean;

		/**
		 * Output only. Whether the current user can read the shared drive to which this
		 * file belongs. Only populated for items in shared drives.
		 */
		canReadDrive?: boolean;

		/**
		 * Output only. Whether the current user can read the labels on the file.
		 */
		canReadLabels?: boolean;

		/**
		 * Output only. Whether the current user can read the revisions resource of this
		 * file. For a shared drive item, whether revisions of non-folder descendants of
		 * this item, or this item itself if it is not a folder, can be read.
		 */
		canReadRevisions?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canReadDrive` instead.
		 */
		canReadTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can remove children from this folder. This
		 * is always false when the item is not a folder. For a folder in a shared drive,
		 * use `canDeleteChildren` or `canTrashChildren` instead.
		 */
		canRemoveChildren?: boolean;

		/**
		 * Output only. Whether there is a content restriction on the file that can be
		 * removed by the current user.
		 */
		canRemoveContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can remove a parent from the item without
		 * adding another parent in the same request. Not populated for shared drive files.
		 */
		canRemoveMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can rename this file.
		 */
		canRename?: boolean;

		/**
		 * Output only. Whether the current user can modify the sharing settings for this
		 * file.
		 */
		canShare?: boolean;

		/**
		 * Output only. Whether the current user can move this file to trash.
		 */
		canTrash?: boolean;

		/**
		 * Output only. Whether the current user can trash children of this folder. This is
		 * false when the item is not a folder. Only populated for items in shared drives.
		 */
		canTrashChildren?: boolean;

		/**
		 * Output only. Whether the current user can restore this file from trash.
		 */
		canUntrash?: boolean;
	}

	/**
	 * Additional information about the content of the file. These fields are never
	 * populated in responses.
	 */
	export interface ContentHints {
		/**
		 * Text to be indexed for the file to improve fullText queries. This is limited to
		 * 128KB in length and may contain HTML elements.
		 */
		indexableText?: string;

		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		thumbnail?: ContentHints.Thumbnail;
	}

	export namespace ContentHints {
		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		export interface Thumbnail {
			/**
			 * The thumbnail data encoded with URL-safe Base64 (RFC 4648 section 5).
			 */
			image?: string;

			/**
			 * The MIME type of the thumbnail.
			 */
			mimeType?: string;
		}
	}

	/**
	 * A restriction for accessing the content of the file.
	 */
	export interface ContentRestriction {
		/**
		 * Whether the content restriction can only be modified or removed by a user who
		 * owns the file. For files in shared drives, any user with `organizer`
		 * capabilities can modify or remove this content restriction.
		 */
		ownerRestricted?: boolean;

		/**
		 * Whether the content of the file is read-only. If a file is read-only, a new
		 * revision of the file may not be added, comments may not be added or modified,
		 * and the title of the file may not be modified.
		 */
		readOnly?: boolean;

		/**
		 * Reason for why the content of the file is restricted. This is only mutable on
		 * requests that also set `readOnly=true`.
		 */
		reason?: string;

		/**
		 * Output only. The user who set the content restriction. Only populated if
		 * `readOnly` is true.
		 */
		restrictingUser?: AboutAPI.User;

		/**
		 * The time at which the content restriction was set (formatted RFC 3339
		 * timestamp). Only populated if readOnly is true.
		 */
		restrictionTime?: string;

		/**
		 * Output only. Whether the content restriction was applied by the system, for
		 * example due to an esignature. Users cannot modify or remove system restricted
		 * content restrictions.
		 */
		systemRestricted?: boolean;

		/**
		 * Output only. The type of the content restriction. Currently the only possible
		 * value is `globalContentRestriction`.
		 */
		type?: string;
	}

	/**
	 * Output only. Additional metadata about image media, if available.
	 */
	export interface ImageMediaMetadata {
		/**
		 * Output only. The aperture used to create the photo (f-number).
		 */
		aperture?: number;

		/**
		 * Output only. The make of the camera used to create the photo.
		 */
		cameraMake?: string;

		/**
		 * Output only. The model of the camera used to create the photo.
		 */
		cameraModel?: string;

		/**
		 * Output only. The color space of the photo.
		 */
		colorSpace?: string;

		/**
		 * Output only. The exposure bias of the photo (APEX value).
		 */
		exposureBias?: number;

		/**
		 * Output only. The exposure mode used to create the photo.
		 */
		exposureMode?: string;

		/**
		 * Output only. The length of the exposure, in seconds.
		 */
		exposureTime?: number;

		/**
		 * Output only. Whether a flash was used to create the photo.
		 */
		flashUsed?: boolean;

		/**
		 * Output only. The focal length used to create the photo, in millimeters.
		 */
		focalLength?: number;

		/**
		 * Output only. The height of the image in pixels.
		 */
		height?: number;

		/**
		 * Output only. The ISO speed used to create the photo.
		 */
		isoSpeed?: number;

		/**
		 * Output only. The lens used to create the photo.
		 */
		lens?: string;

		/**
		 * Output only. Geographic location information stored in the image.
		 */
		location?: ImageMediaMetadata.Location;

		/**
		 * Output only. The smallest f-number of the lens at the focal length used to
		 * create the photo (APEX value).
		 */
		maxApertureValue?: number;

		/**
		 * Output only. The metering mode used to create the photo.
		 */
		meteringMode?: string;

		/**
		 * Output only. The number of clockwise 90 degree rotations applied from the
		 * image's original orientation.
		 */
		rotation?: number;

		/**
		 * Output only. The type of sensor used to create the photo.
		 */
		sensor?: string;

		/**
		 * Output only. The distance to the subject of the photo, in meters.
		 */
		subjectDistance?: number;

		/**
		 * Output only. The date and time the photo was taken (EXIF DateTime).
		 */
		time?: string;

		/**
		 * Output only. The white balance mode used to create the photo.
		 */
		whiteBalance?: string;

		/**
		 * Output only. The width of the image in pixels.
		 */
		width?: number;
	}

	export namespace ImageMediaMetadata {
		/**
		 * Output only. Geographic location information stored in the image.
		 */
		export interface Location {
			/**
			 * Output only. The altitude stored in the image.
			 */
			altitude?: number;

			/**
			 * Output only. The latitude stored in the image.
			 */
			latitude?: number;

			/**
			 * Output only. The longitude stored in the image.
			 */
			longitude?: number;
		}
	}

	/**
	 * Output only. An overview of the labels on the file.
	 */
	export interface LabelInfo {
		/**
		 * Output only. The set of labels on the file as requested by the label IDs in the
		 * `includeLabels` parameter. By default, no labels are returned.
		 */
		labels?: Array<FilesAPI.Label>;
	}

	/**
	 * Contains details about the link URLs that clients are using to refer to this
	 * item.
	 */
	export interface LinkShareMetadata {
		/**
		 * Output only. Whether the file is eligible for security update.
		 */
		securityUpdateEligible?: boolean;

		/**
		 * Output only. Whether the security update is enabled for this file.
		 */
		securityUpdateEnabled?: boolean;
	}

	/**
	 * Shortcut file details. Only populated for shortcut files, which have the
	 * mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	export interface ShortcutDetails {
		/**
		 * The ID of the file that this shortcut points to.
		 */
		targetId?: string;

		/**
		 * Output only. The MIME type of the file that this shortcut points to. The value
		 * of this field is a snapshot of the target's MIME type, captured when the
		 * shortcut is created.
		 */
		targetMimeType?: string;

		/**
		 * Output only. The ResourceKey for the target file.
		 */
		targetResourceKey?: string;
	}

	/**
	 * Output only. Additional metadata about video media. This may not be available
	 * immediately upon upload.
	 */
	export interface VideoMediaMetadata {
		/**
		 * Output only. The duration of the video in milliseconds.
		 */
		durationMillis?: string;

		/**
		 * Output only. The height of the video in pixels.
		 */
		height?: number;

		/**
		 * Output only. The width of the video in pixels.
		 */
		width?: number;
	}
}

/**
 * Representation of label and label fields.
 */
export interface Label {
	/**
	 * The ID of the label.
	 */
	id?: string;

	/**
	 * A map of the fields on the label, keyed by the field's ID.
	 */
	fields?: Record<string, Label.Fields>;

	/**
	 * This is always drive#label
	 */
	kind?: string;

	/**
	 * The revision ID of the label.
	 */
	revisionId?: string;
}

export namespace Label {
	/**
	 * Representation of field, which is a typed key-value pair.
	 */
	export interface Fields {
		/**
		 * The identifier of this label field.
		 */
		id?: string;

		/**
		 * Only present if valueType is dateString. RFC 3339 formatted date: YYYY-MM-DD.
		 */
		dateString?: Array<string>;

		/**
		 * Only present if `valueType` is `integer`.
		 */
		integer?: Array<string>;

		/**
		 * This is always drive#labelField.
		 */
		kind?: string;

		/**
		 * Only present if `valueType` is `selection`
		 */
		selection?: Array<string>;

		/**
		 * Only present if `valueType` is `text`.
		 */
		text?: Array<string>;

		/**
		 * Only present if `valueType` is `user`.
		 */
		user?: Array<AboutAPI.User>;

		/**
		 * The field type. While new values may be supported in the future, the following
		 * are currently allowed: _ `dateString` _ `integer` _ `selection` _ `text` \*
		 * `user`
		 */
		valueType?: string;
	}
}

/**
 * A list of files.
 */
export interface FileListResponse {
	/**
	 * The list of files. If nextPageToken is populated, then this list may be
	 * incomplete and an additional page of results should be fetched.
	 */
	files?: Array<File>;

	/**
	 * Whether the search process was incomplete. If true, then some search results
	 * might be missing, since all documents were not searched. This can occur when
	 * searching multiple drives with the 'allDrives' corpora, but all corpora couldn't
	 * be searched. When this happens, it's suggested that clients narrow their query
	 * by choosing a different corpus such as 'user' or 'drive'.
	 */
	incompleteSearch?: boolean;

	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#fileList"`.
	 */
	kind?: string;

	/**
	 * The page token for the next page of files. This will be absent if the end of the
	 * files list has been reached. If the token is rejected for any reason, it should
	 * be discarded, and pagination should be restarted from the first page of results.
	 * The page token is typically valid for several hours. However, if new items are
	 * added or removed, your expected results might differ.
	 */
	nextPageToken?: string;
}

/**
 * A list of generated file IDs which can be provided in create requests.
 */
export interface FileGenerateIDsResponse {
	/**
	 * The IDs generated for the requesting user in the specified space.
	 */
	ids?: Array<string>;

	/**
	 * Identifies what kind of resource this is. Value: the fixed string
	 * `"drive#generatedIds"`.
	 */
	kind?: string;

	/**
	 * The type of file that can be created with these IDs.
	 */
	space?: string;
}

/**
 * A list of labels applied to a file.
 */
export interface FileListLabelsResponse {
	/**
	 * This is always drive#labelList
	 */
	kind?: string;

	/**
	 * The list of labels.
	 */
	labels?: Array<Label>;

	/**
	 * The page token for the next page of labels. This field will be absent if the end
	 * of the list has been reached. If the token is rejected for any reason, it should
	 * be discarded, and pagination should be restarted from the first page of results.
	 * The page token is typically valid for several hours. However, if new items are
	 * added or removed, your expected results might differ.
	 */
	nextPageToken?: string;
}

/**
 * Response to a ModifyLabels request. This contains only those labels which were
 * added or updated by the request.
 */
export interface FileModifyLabelsResponse {
	/**
	 * This is always drive#modifyLabelsResponse
	 */
	kind?: string;

	/**
	 * The list of labels which were added or updated by the request.
	 */
	modifiedLabels?: Array<Label>;
}

export interface FileCreateParams {
	/**
	 * Query param:
	 */
	$?: FileCreateParams._;

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
	 * Query param: Deprecated. Creating files in multiple folders is no longer
	 * supported.
	 */
	enforceSingleParent?: boolean;

	/**
	 * Query param: Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

	/**
	 * Query param: Whether to ignore the domain's default visibility settings for the
	 * created file. Domain administrators can choose to make all uploaded files
	 * visible to the domain by default; this parameter bypasses that behavior for the
	 * request. Permissions are still inherited from parent folders.
	 */
	ignoreDefaultVisibility?: boolean;

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
	 * Query param: Whether to set the 'keepForever' field in the new head revision.
	 * This is only applicable to files with binary content in Google Drive. Only 200
	 * revisions for the file can be kept forever. If the limit is reached, try
	 * deleting pinned revisions.
	 */
	keepRevisionForever?: boolean;

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
	 * Query param: A language hint for OCR processing during image import (ISO 639-1
	 * code).
	 */
	ocrLanguage?: string;

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
	 * Query param: Whether to use the uploaded content as indexable text.
	 */
	useContentAsIndexableText?: boolean;

	/**
	 * Body param: The ID of the file.
	 */
	id?: string;

	/**
	 * Body param: A collection of arbitrary key-value pairs which are private to the
	 * requesting app. Entries with null values are cleared in update and copy
	 * requests. These properties can only be retrieved using an authenticated request.
	 * An authenticated request uses an access token obtained with a OAuth 2 client ID.
	 * You cannot use an API key to retrieve private properties.
	 */
	appProperties?: Record<string, string>;

	/**
	 * Body param: Output only. Capabilities the current user has on this file. Each
	 * capability corresponds to a fine-grained action that a user may take.
	 */
	capabilities?: FileCreateParams.Capabilities;

	/**
	 * Body param: Additional information about the content of the file. These fields
	 * are never populated in responses.
	 */
	contentHints?: FileCreateParams.ContentHints;

	/**
	 * Body param: Restrictions for accessing the content of the file. Only populated
	 * if such a restriction exists.
	 */
	contentRestrictions?: Array<FileCreateParams.ContentRestriction>;

	/**
	 * Body param: Whether the options to copy, print, or download this file, should be
	 * disabled for readers and commenters.
	 */
	copyRequiresWriterPermission?: boolean;

	/**
	 * Body param: The time at which the file was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: A short description of the file.
	 */
	description?: string;

	/**
	 * Body param: Output only. ID of the shared drive the file resides in. Only
	 * populated for items in shared drives.
	 */
	driveId?: string;

	/**
	 * Body param: Output only. Whether the file has been explicitly trashed, as
	 * opposed to recursively trashed from a parent folder.
	 */
	explicitlyTrashed?: boolean;

	/**
	 * Body param: Output only. The final component of `fullFileExtension`. This is
	 * only available for files with binary content in Google Drive.
	 */
	fileExtension?: string;

	/**
	 * Body param: The color for a folder or a shortcut to a folder as an RGB hex
	 * string. The supported colors are published in the `folderColorPalette` field of
	 * the About resource. If an unsupported color is specified, the closest color in
	 * the palette is used instead.
	 */
	folderColorRgb?: string;

	/**
	 * Body param: Output only. The full file extension extracted from the `name`
	 * field. May contain multiple concatenated extensions, such as "tar.gz". This is
	 * only available for files with binary content in Google Drive. This is
	 * automatically updated when the `name` field changes, however it is not cleared
	 * if the new name does not contain a valid extension.
	 */
	fullFileExtension?: string;

	/**
	 * Body param: Output only. Whether there are permissions directly on this file.
	 * This field is only populated for items in shared drives.
	 */
	hasAugmentedPermissions?: boolean;

	/**
	 * Body param: Output only. Whether this file has a thumbnail. This does not
	 * indicate whether the requesting app has access to the thumbnail. To check
	 * access, look for the presence of the thumbnailLink field.
	 */
	hasThumbnail?: boolean;

	/**
	 * Body param: Output only. The ID of the file's head revision. This is currently
	 * only available for files with binary content in Google Drive.
	 */
	headRevisionId?: string;

	/**
	 * Body param: Output only. A static, unauthenticated link to the file's icon.
	 */
	iconLink?: string;

	/**
	 * Body param: Output only. Additional metadata about image media, if available.
	 */
	imageMediaMetadata?: FileCreateParams.ImageMediaMetadata;

	/**
	 * Body param: Output only. Whether the file was created or opened by the
	 * requesting app.
	 */
	isAppAuthorized?: boolean;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#file"`.
	 */
	kind?: string;

	/**
	 * Body param: Output only. An overview of the labels on the file.
	 */
	labelInfo?: FileCreateParams.LabelInfo;

	/**
	 * Body param: Output only. The last user to modify the file.
	 */
	lastModifyingUser?: AboutAPI.User;

	/**
	 * Body param: Contains details about the link URLs that clients are using to refer
	 * to this item.
	 */
	linkShareMetadata?: FileCreateParams.LinkShareMetadata;

	/**
	 * Body param: Output only. The MD5 checksum for the content of the file. This is
	 * only applicable to files with binary content in Google Drive.
	 */
	md5Checksum?: string;

	/**
	 * Body param: The MIME type of the file. Google Drive attempts to automatically
	 * detect an appropriate value from uploaded content, if no value is provided. The
	 * value cannot be changed unless a new revision is uploaded. If a file is created
	 * with a Google Doc MIME type, the uploaded content is imported, if possible. The
	 * supported import formats are published in the About resource.
	 */
	mimeType?: string;

	/**
	 * Body param: Output only. Whether the file has been modified by this user.
	 */
	modifiedByMe?: boolean;

	/**
	 * Body param: The last time the file was modified by the user (RFC 3339
	 * date-time).
	 */
	modifiedByMeTime?: string;

	/**
	 * Body param: he last time the file was modified by anyone (RFC 3339 date-time).
	 * Note that setting modifiedTime will also update modifiedByMeTime for the user.
	 */
	modifiedTime?: string;

	/**
	 * Body param: The name of the file. This is not necessarily unique within a
	 * folder. Note that for immutable items such as the top level folders of shared
	 * drives, My Drive root folder, and Application Data folder the name is constant.
	 */
	name?: string;

	/**
	 * Body param: The original filename of the uploaded content if available, or else
	 * the original value of the `name` field. This is only available for files with
	 * binary content in Google Drive.
	 */
	originalFilename?: string;

	/**
	 * Body param: Output only. Whether the user owns the file. Not populated for items
	 * in shared drives.
	 */
	ownedByMe?: boolean;

	/**
	 * Body param: Output only. The owner of this file. Only certain legacy files may
	 * have more than one owner. This field isn't populated for items in shared drives.
	 */
	owners?: Array<AboutAPI.User>;

	/**
	 * Body param: The IDs of the parent folders which contain the file. If not
	 * specified as part of a create request, the file is placed directly in the user's
	 * My Drive folder. If not specified as part of a copy request, the file inherits
	 * any discoverable parents of the source file. Update requests must use the
	 * `addParents` and `removeParents` parameters to modify the parents list.
	 */
	parents?: Array<string>;

	/**
	 * Body param: Output only. List of permission IDs for users with access to this
	 * file.
	 */
	permissionIds?: Array<string>;

	/**
	 * Body param: Output only. The full list of permissions for the file. This is only
	 * available if the requesting user can share the file. Not populated for items in
	 * shared drives.
	 */
	permissions?: Array<PermissionsAPI.Permission>;

	/**
	 * Body param: A collection of arbitrary key-value pairs which are visible to all
	 * apps. Entries with null values are cleared in update and copy requests.
	 */
	properties?: Record<string, string>;

	/**
	 * Body param: Output only. The number of storage quota bytes used by the file.
	 * This includes the head revision as well as previous revisions with `keepForever`
	 * enabled.
	 */
	quotaBytesUsed?: string;

	/**
	 * Body param: Output only. A key needed to access the item via a shared link.
	 */
	resourceKey?: string;

	/**
	 * Body param: Output only. The SHA1 checksum associated with this file, if
	 * available. This field is only populated for files with content stored in Google
	 * Drive; it is not populated for Docs Editors or shortcut files.
	 */
	sha1Checksum?: string;

	/**
	 * Body param: Output only. The SHA256 checksum associated with this file, if
	 * available. This field is only populated for files with content stored in Google
	 * Drive; it is not populated for Docs Editors or shortcut files.
	 */
	sha256Checksum?: string;

	/**
	 * Body param: Output only. Whether the file has been shared. Not populated for
	 * items in shared drives.
	 */
	shared?: boolean;

	/**
	 * Body param: The time at which the file was shared with the user, if applicable
	 * (RFC 3339 date-time).
	 */
	sharedWithMeTime?: string;

	/**
	 * Body param: Output only. The user who shared the file with the requesting user,
	 * if applicable.
	 */
	sharingUser?: AboutAPI.User;

	/**
	 * Body param: Shortcut file details. Only populated for shortcut files, which have
	 * the mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	shortcutDetails?: FileCreateParams.ShortcutDetails;

	/**
	 * Body param: Output only. Size in bytes of blobs and first party editor files.
	 * Won't be populated for files that have no size, like shortcuts and folders.
	 */
	size?: string;

	/**
	 * Body param: Output only. The list of spaces which contain the file. The
	 * currently supported values are 'drive', 'appDataFolder' and 'photos'.
	 */
	spaces?: Array<string>;

	/**
	 * Body param: Whether the user has starred the file.
	 */
	starred?: boolean;

	/**
	 * @deprecated Body param: Deprecated: Output only. Use `driveId` instead.
	 */
	teamDriveId?: string;

	/**
	 * Body param: Output only. A short-lived link to the file's thumbnail, if
	 * available. Typically lasts on the order of hours. Only populated when the
	 * requesting app can access the file's content. If the file isn't shared publicly,
	 * the URL returned in `Files.thumbnailLink` must be fetched using a credentialed
	 * request.
	 */
	thumbnailLink?: string;

	/**
	 * Body param: Output only. The thumbnail version for use in thumbnail cache
	 * invalidation.
	 */
	thumbnailVersion?: string;

	/**
	 * Body param: Whether the file has been trashed, either explicitly or from a
	 * trashed parent folder. Only the owner may trash a file, and other users cannot
	 * see files in the owner's trash.
	 */
	trashed?: boolean;

	/**
	 * Body param: The time that the item was trashed (RFC 3339 date-time). Only
	 * populated for items in shared drives.
	 */
	trashedTime?: string;

	/**
	 * Body param: Output only. If the file has been explicitly trashed, the user who
	 * trashed it. Only populated for items in shared drives.
	 */
	trashingUser?: AboutAPI.User;

	/**
	 * Body param: Output only. A monotonically increasing version number for the file.
	 * This reflects every change made to the file on the server, even those not
	 * visible to the user.
	 */
	version?: string;

	/**
	 * Body param: Output only. Additional metadata about video media. This may not be
	 * available immediately upon upload.
	 */
	videoMediaMetadata?: FileCreateParams.VideoMediaMetadata;

	/**
	 * Body param: Output only. Whether the file has been viewed by this user.
	 */
	viewedByMe?: boolean;

	/**
	 * Body param: The last time the file was viewed by the user (RFC 3339 date-time).
	 */
	viewedByMeTime?: string;

	/**
	 * @deprecated Body param: Deprecated: Use `copyRequiresWriterPermission` instead.
	 */
	viewersCanCopyContent?: boolean;

	/**
	 * Body param: Output only. A link for downloading the content of the file in a
	 * browser. This is only available for files with binary content in Google Drive.
	 */
	webContentLink?: string;

	/**
	 * Body param: Output only. A link for opening the file in a relevant Google editor
	 * or viewer in a browser.
	 */
	webViewLink?: string;

	/**
	 * Body param: Whether users with only `writer` permission can modify the file's
	 * permissions. Not populated for items in shared drives.
	 */
	writersCanShare?: boolean;
}

export namespace FileCreateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * Output only. Capabilities the current user has on this file. Each capability
	 * corresponds to a fine-grained action that a user may take.
	 */
	export interface Capabilities {
		/**
		 * Output only. Whether the current user is the pending owner of the file. Not
		 * populated for shared drive files.
		 */
		canAcceptOwnership?: boolean;

		/**
		 * Output only. Whether the current user can add children to this folder. This is
		 * always false when the item is not a folder.
		 */
		canAddChildren?: boolean;

		/**
		 * Output only. Whether the current user can add a folder from another drive
		 * (different shared drive or My Drive) to this folder. This is false when the item
		 * is not a folder. Only populated for items in shared drives.
		 */
		canAddFolderFromAnotherDrive?: boolean;

		/**
		 * Output only. Whether the current user can add a parent for the item without
		 * removing an existing parent in the same request. Not populated for shared drive
		 * files.
		 */
		canAddMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `copyRequiresWriterPermission` restriction of this file.
		 */
		canChangeCopyRequiresWriterPermission?: boolean;

		/**
		 * Output only. Whether the current user can change the securityUpdateEnabled field
		 * on link share metadata.
		 */
		canChangeSecurityUpdateEnabled?: boolean;

		/**
		 * @deprecated Deprecated: Output only.
		 */
		canChangeViewersCanCopyContent?: boolean;

		/**
		 * Output only. Whether the current user can comment on this file.
		 */
		canComment?: boolean;

		/**
		 * Output only. Whether the current user can copy this file. For an item in a
		 * shared drive, whether the current user can copy non-folder descendants of this
		 * item, or this item itself if it is not a folder.
		 */
		canCopy?: boolean;

		/**
		 * Output only. Whether the current user can delete this file.
		 */
		canDelete?: boolean;

		/**
		 * Output only. Whether the current user can delete children of this folder. This
		 * is false when the item is not a folder. Only populated for items in shared
		 * drives.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Output only. Whether the current user can download this file.
		 */
		canDownload?: boolean;

		/**
		 * Output only. Whether the current user can edit this file. Other factors may
		 * limit the type of changes a user can make to a file. For example, see
		 * `canChangeCopyRequiresWriterPermission` or `canModifyContent`.
		 */
		canEdit?: boolean;

		/**
		 * Output only. Whether the current user can list the children of this folder. This
		 * is always false when the item is not a folder.
		 */
		canListChildren?: boolean;

		/**
		 * Output only. Whether the current user can modify the content of this file.
		 */
		canModifyContent?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use one of
		 * `canModifyEditorContentRestriction`, `canModifyOwnerContentRestriction` or
		 * `canRemoveContentRestriction`.
		 */
		canModifyContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions on
		 * the file which are editor restricted.
		 */
		canModifyEditorContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can modify the labels on the file.
		 */
		canModifyLabels?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions
		 * which are owner restricted.
		 */
		canModifyOwnerContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder outside
		 * of the shared drive. This is false when the item is not a folder. Only populated
		 * for items in shared drives.
		 */
		canMoveChildrenOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenOutOfDrive` instead.
		 */
		canMoveChildrenOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder within
		 * this drive. This is false when the item is not a folder. Note that a request to
		 * move the child may still fail depending on the current user's access to the
		 * child and to the destination folder.
		 */
		canMoveChildrenWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenWithinDrive` instead.
		 */
		canMoveChildrenWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemIntoTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item outside of this drive
		 * by changing its parent. Note that a request to change the parent of the item may
		 * still fail depending on the new parent that is being added.
		 */
		canMoveItemOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item within this drive. Note
		 * that a request to change the parent of the item may still fail depending on the
		 * new parent that is being added and the parent that is being removed.
		 */
		canMoveItemWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` instead.
		 */
		canMoveItemWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` or
		 * `canMoveItemOutOfDrive` instead.
		 */
		canMoveTeamDriveItem?: boolean;

		/**
		 * Output only. Whether the current user can read the shared drive to which this
		 * file belongs. Only populated for items in shared drives.
		 */
		canReadDrive?: boolean;

		/**
		 * Output only. Whether the current user can read the labels on the file.
		 */
		canReadLabels?: boolean;

		/**
		 * Output only. Whether the current user can read the revisions resource of this
		 * file. For a shared drive item, whether revisions of non-folder descendants of
		 * this item, or this item itself if it is not a folder, can be read.
		 */
		canReadRevisions?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canReadDrive` instead.
		 */
		canReadTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can remove children from this folder. This
		 * is always false when the item is not a folder. For a folder in a shared drive,
		 * use `canDeleteChildren` or `canTrashChildren` instead.
		 */
		canRemoveChildren?: boolean;

		/**
		 * Output only. Whether there is a content restriction on the file that can be
		 * removed by the current user.
		 */
		canRemoveContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can remove a parent from the item without
		 * adding another parent in the same request. Not populated for shared drive files.
		 */
		canRemoveMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can rename this file.
		 */
		canRename?: boolean;

		/**
		 * Output only. Whether the current user can modify the sharing settings for this
		 * file.
		 */
		canShare?: boolean;

		/**
		 * Output only. Whether the current user can move this file to trash.
		 */
		canTrash?: boolean;

		/**
		 * Output only. Whether the current user can trash children of this folder. This is
		 * false when the item is not a folder. Only populated for items in shared drives.
		 */
		canTrashChildren?: boolean;

		/**
		 * Output only. Whether the current user can restore this file from trash.
		 */
		canUntrash?: boolean;
	}

	/**
	 * Additional information about the content of the file. These fields are never
	 * populated in responses.
	 */
	export interface ContentHints {
		/**
		 * Text to be indexed for the file to improve fullText queries. This is limited to
		 * 128KB in length and may contain HTML elements.
		 */
		indexableText?: string;

		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		thumbnail?: ContentHints.Thumbnail;
	}

	export namespace ContentHints {
		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		export interface Thumbnail {
			/**
			 * The thumbnail data encoded with URL-safe Base64 (RFC 4648 section 5).
			 */
			image?: string;

			/**
			 * The MIME type of the thumbnail.
			 */
			mimeType?: string;
		}
	}

	/**
	 * A restriction for accessing the content of the file.
	 */
	export interface ContentRestriction {
		/**
		 * Whether the content restriction can only be modified or removed by a user who
		 * owns the file. For files in shared drives, any user with `organizer`
		 * capabilities can modify or remove this content restriction.
		 */
		ownerRestricted?: boolean;

		/**
		 * Whether the content of the file is read-only. If a file is read-only, a new
		 * revision of the file may not be added, comments may not be added or modified,
		 * and the title of the file may not be modified.
		 */
		readOnly?: boolean;

		/**
		 * Reason for why the content of the file is restricted. This is only mutable on
		 * requests that also set `readOnly=true`.
		 */
		reason?: string;

		/**
		 * Output only. The user who set the content restriction. Only populated if
		 * `readOnly` is true.
		 */
		restrictingUser?: AboutAPI.User;

		/**
		 * The time at which the content restriction was set (formatted RFC 3339
		 * timestamp). Only populated if readOnly is true.
		 */
		restrictionTime?: string;

		/**
		 * Output only. Whether the content restriction was applied by the system, for
		 * example due to an esignature. Users cannot modify or remove system restricted
		 * content restrictions.
		 */
		systemRestricted?: boolean;

		/**
		 * Output only. The type of the content restriction. Currently the only possible
		 * value is `globalContentRestriction`.
		 */
		type?: string;
	}

	/**
	 * Output only. Additional metadata about image media, if available.
	 */
	export interface ImageMediaMetadata {
		/**
		 * Output only. The aperture used to create the photo (f-number).
		 */
		aperture?: number;

		/**
		 * Output only. The make of the camera used to create the photo.
		 */
		cameraMake?: string;

		/**
		 * Output only. The model of the camera used to create the photo.
		 */
		cameraModel?: string;

		/**
		 * Output only. The color space of the photo.
		 */
		colorSpace?: string;

		/**
		 * Output only. The exposure bias of the photo (APEX value).
		 */
		exposureBias?: number;

		/**
		 * Output only. The exposure mode used to create the photo.
		 */
		exposureMode?: string;

		/**
		 * Output only. The length of the exposure, in seconds.
		 */
		exposureTime?: number;

		/**
		 * Output only. Whether a flash was used to create the photo.
		 */
		flashUsed?: boolean;

		/**
		 * Output only. The focal length used to create the photo, in millimeters.
		 */
		focalLength?: number;

		/**
		 * Output only. The height of the image in pixels.
		 */
		height?: number;

		/**
		 * Output only. The ISO speed used to create the photo.
		 */
		isoSpeed?: number;

		/**
		 * Output only. The lens used to create the photo.
		 */
		lens?: string;

		/**
		 * Output only. Geographic location information stored in the image.
		 */
		location?: ImageMediaMetadata.Location;

		/**
		 * Output only. The smallest f-number of the lens at the focal length used to
		 * create the photo (APEX value).
		 */
		maxApertureValue?: number;

		/**
		 * Output only. The metering mode used to create the photo.
		 */
		meteringMode?: string;

		/**
		 * Output only. The number of clockwise 90 degree rotations applied from the
		 * image's original orientation.
		 */
		rotation?: number;

		/**
		 * Output only. The type of sensor used to create the photo.
		 */
		sensor?: string;

		/**
		 * Output only. The distance to the subject of the photo, in meters.
		 */
		subjectDistance?: number;

		/**
		 * Output only. The date and time the photo was taken (EXIF DateTime).
		 */
		time?: string;

		/**
		 * Output only. The white balance mode used to create the photo.
		 */
		whiteBalance?: string;

		/**
		 * Output only. The width of the image in pixels.
		 */
		width?: number;
	}

	export namespace ImageMediaMetadata {
		/**
		 * Output only. Geographic location information stored in the image.
		 */
		export interface Location {
			/**
			 * Output only. The altitude stored in the image.
			 */
			altitude?: number;

			/**
			 * Output only. The latitude stored in the image.
			 */
			latitude?: number;

			/**
			 * Output only. The longitude stored in the image.
			 */
			longitude?: number;
		}
	}

	/**
	 * Output only. An overview of the labels on the file.
	 */
	export interface LabelInfo {
		/**
		 * Output only. The set of labels on the file as requested by the label IDs in the
		 * `includeLabels` parameter. By default, no labels are returned.
		 */
		labels?: Array<FilesAPI.Label>;
	}

	/**
	 * Contains details about the link URLs that clients are using to refer to this
	 * item.
	 */
	export interface LinkShareMetadata {
		/**
		 * Output only. Whether the file is eligible for security update.
		 */
		securityUpdateEligible?: boolean;

		/**
		 * Output only. Whether the security update is enabled for this file.
		 */
		securityUpdateEnabled?: boolean;
	}

	/**
	 * Shortcut file details. Only populated for shortcut files, which have the
	 * mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	export interface ShortcutDetails {
		/**
		 * The ID of the file that this shortcut points to.
		 */
		targetId?: string;

		/**
		 * Output only. The MIME type of the file that this shortcut points to. The value
		 * of this field is a snapshot of the target's MIME type, captured when the
		 * shortcut is created.
		 */
		targetMimeType?: string;

		/**
		 * Output only. The ResourceKey for the target file.
		 */
		targetResourceKey?: string;
	}

	/**
	 * Output only. Additional metadata about video media. This may not be available
	 * immediately upon upload.
	 */
	export interface VideoMediaMetadata {
		/**
		 * Output only. The duration of the video in milliseconds.
		 */
		durationMillis?: string;

		/**
		 * Output only. The height of the video in pixels.
		 */
		height?: number;

		/**
		 * Output only. The width of the video in pixels.
		 */
		width?: number;
	}
}

export interface FileRetrieveParams {
	$?: FileRetrieveParams._;

	/**
	 * OAuth access token.
	 */
	access_token?: string;

	/**
	 * Whether the user is acknowledging the risk of downloading known malware or other
	 * abusive files. This is only applicable when alt=media.
	 */
	acknowledgeAbuse?: boolean;

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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace FileRetrieveParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface FileUpdateParams {
	/**
	 * Query param:
	 */
	$?: FileUpdateParams._;

	/**
	 * Query param: OAuth access token.
	 */
	access_token?: string;

	/**
	 * Query param: A comma-separated list of parent IDs to add.
	 */
	addParents?: string;

	/**
	 * Query param: Data format for response.
	 */
	alt?: "json" | "media" | "proto";

	/**
	 * Query param: JSONP
	 */
	callback?: string;

	/**
	 * Query param: Deprecated: Adding files to multiple folders is no longer
	 * supported. Use shortcuts instead.
	 */
	enforceSingleParent?: boolean;

	/**
	 * Query param: Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

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
	 * Query param: Whether to set the 'keepForever' field in the new head revision.
	 * This is only applicable to files with binary content in Google Drive. Only 200
	 * revisions for the file can be kept forever. If the limit is reached, try
	 * deleting pinned revisions.
	 */
	keepRevisionForever?: boolean;

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
	 * Query param: A language hint for OCR processing during image import (ISO 639-1
	 * code).
	 */
	ocrLanguage?: string;

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
	 * Query param: A comma-separated list of parent IDs to remove.
	 */
	removeParents?: string;

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
	 * Query param: Whether to use the uploaded content as indexable text.
	 */
	useContentAsIndexableText?: boolean;

	/**
	 * Body param: The ID of the file.
	 */
	id?: string;

	/**
	 * Body param: A collection of arbitrary key-value pairs which are private to the
	 * requesting app. Entries with null values are cleared in update and copy
	 * requests. These properties can only be retrieved using an authenticated request.
	 * An authenticated request uses an access token obtained with a OAuth 2 client ID.
	 * You cannot use an API key to retrieve private properties.
	 */
	appProperties?: Record<string, string>;

	/**
	 * Body param: Output only. Capabilities the current user has on this file. Each
	 * capability corresponds to a fine-grained action that a user may take.
	 */
	capabilities?: FileUpdateParams.Capabilities;

	/**
	 * Body param: Additional information about the content of the file. These fields
	 * are never populated in responses.
	 */
	contentHints?: FileUpdateParams.ContentHints;

	/**
	 * Body param: Restrictions for accessing the content of the file. Only populated
	 * if such a restriction exists.
	 */
	contentRestrictions?: Array<FileUpdateParams.ContentRestriction>;

	/**
	 * Body param: Whether the options to copy, print, or download this file, should be
	 * disabled for readers and commenters.
	 */
	copyRequiresWriterPermission?: boolean;

	/**
	 * Body param: The time at which the file was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: A short description of the file.
	 */
	description?: string;

	/**
	 * Body param: Output only. ID of the shared drive the file resides in. Only
	 * populated for items in shared drives.
	 */
	driveId?: string;

	/**
	 * Body param: Output only. Whether the file has been explicitly trashed, as
	 * opposed to recursively trashed from a parent folder.
	 */
	explicitlyTrashed?: boolean;

	/**
	 * Body param: Output only. The final component of `fullFileExtension`. This is
	 * only available for files with binary content in Google Drive.
	 */
	fileExtension?: string;

	/**
	 * Body param: The color for a folder or a shortcut to a folder as an RGB hex
	 * string. The supported colors are published in the `folderColorPalette` field of
	 * the About resource. If an unsupported color is specified, the closest color in
	 * the palette is used instead.
	 */
	folderColorRgb?: string;

	/**
	 * Body param: Output only. The full file extension extracted from the `name`
	 * field. May contain multiple concatenated extensions, such as "tar.gz". This is
	 * only available for files with binary content in Google Drive. This is
	 * automatically updated when the `name` field changes, however it is not cleared
	 * if the new name does not contain a valid extension.
	 */
	fullFileExtension?: string;

	/**
	 * Body param: Output only. Whether there are permissions directly on this file.
	 * This field is only populated for items in shared drives.
	 */
	hasAugmentedPermissions?: boolean;

	/**
	 * Body param: Output only. Whether this file has a thumbnail. This does not
	 * indicate whether the requesting app has access to the thumbnail. To check
	 * access, look for the presence of the thumbnailLink field.
	 */
	hasThumbnail?: boolean;

	/**
	 * Body param: Output only. The ID of the file's head revision. This is currently
	 * only available for files with binary content in Google Drive.
	 */
	headRevisionId?: string;

	/**
	 * Body param: Output only. A static, unauthenticated link to the file's icon.
	 */
	iconLink?: string;

	/**
	 * Body param: Output only. Additional metadata about image media, if available.
	 */
	imageMediaMetadata?: FileUpdateParams.ImageMediaMetadata;

	/**
	 * Body param: Output only. Whether the file was created or opened by the
	 * requesting app.
	 */
	isAppAuthorized?: boolean;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#file"`.
	 */
	kind?: string;

	/**
	 * Body param: Output only. An overview of the labels on the file.
	 */
	labelInfo?: FileUpdateParams.LabelInfo;

	/**
	 * Body param: Output only. The last user to modify the file.
	 */
	lastModifyingUser?: AboutAPI.User;

	/**
	 * Body param: Contains details about the link URLs that clients are using to refer
	 * to this item.
	 */
	linkShareMetadata?: FileUpdateParams.LinkShareMetadata;

	/**
	 * Body param: Output only. The MD5 checksum for the content of the file. This is
	 * only applicable to files with binary content in Google Drive.
	 */
	md5Checksum?: string;

	/**
	 * Body param: The MIME type of the file. Google Drive attempts to automatically
	 * detect an appropriate value from uploaded content, if no value is provided. The
	 * value cannot be changed unless a new revision is uploaded. If a file is created
	 * with a Google Doc MIME type, the uploaded content is imported, if possible. The
	 * supported import formats are published in the About resource.
	 */
	mimeType?: string;

	/**
	 * Body param: Output only. Whether the file has been modified by this user.
	 */
	modifiedByMe?: boolean;

	/**
	 * Body param: The last time the file was modified by the user (RFC 3339
	 * date-time).
	 */
	modifiedByMeTime?: string;

	/**
	 * Body param: he last time the file was modified by anyone (RFC 3339 date-time).
	 * Note that setting modifiedTime will also update modifiedByMeTime for the user.
	 */
	modifiedTime?: string;

	/**
	 * Body param: The name of the file. This is not necessarily unique within a
	 * folder. Note that for immutable items such as the top level folders of shared
	 * drives, My Drive root folder, and Application Data folder the name is constant.
	 */
	name?: string;

	/**
	 * Body param: The original filename of the uploaded content if available, or else
	 * the original value of the `name` field. This is only available for files with
	 * binary content in Google Drive.
	 */
	originalFilename?: string;

	/**
	 * Body param: Output only. Whether the user owns the file. Not populated for items
	 * in shared drives.
	 */
	ownedByMe?: boolean;

	/**
	 * Body param: Output only. The owner of this file. Only certain legacy files may
	 * have more than one owner. This field isn't populated for items in shared drives.
	 */
	owners?: Array<AboutAPI.User>;

	/**
	 * Body param: The IDs of the parent folders which contain the file. If not
	 * specified as part of a create request, the file is placed directly in the user's
	 * My Drive folder. If not specified as part of a copy request, the file inherits
	 * any discoverable parents of the source file. Update requests must use the
	 * `addParents` and `removeParents` parameters to modify the parents list.
	 */
	parents?: Array<string>;

	/**
	 * Body param: Output only. List of permission IDs for users with access to this
	 * file.
	 */
	permissionIds?: Array<string>;

	/**
	 * Body param: Output only. The full list of permissions for the file. This is only
	 * available if the requesting user can share the file. Not populated for items in
	 * shared drives.
	 */
	permissions?: Array<PermissionsAPI.Permission>;

	/**
	 * Body param: A collection of arbitrary key-value pairs which are visible to all
	 * apps. Entries with null values are cleared in update and copy requests.
	 */
	properties?: Record<string, string>;

	/**
	 * Body param: Output only. The number of storage quota bytes used by the file.
	 * This includes the head revision as well as previous revisions with `keepForever`
	 * enabled.
	 */
	quotaBytesUsed?: string;

	/**
	 * Body param: Output only. A key needed to access the item via a shared link.
	 */
	resourceKey?: string;

	/**
	 * Body param: Output only. The SHA1 checksum associated with this file, if
	 * available. This field is only populated for files with content stored in Google
	 * Drive; it is not populated for Docs Editors or shortcut files.
	 */
	sha1Checksum?: string;

	/**
	 * Body param: Output only. The SHA256 checksum associated with this file, if
	 * available. This field is only populated for files with content stored in Google
	 * Drive; it is not populated for Docs Editors or shortcut files.
	 */
	sha256Checksum?: string;

	/**
	 * Body param: Output only. Whether the file has been shared. Not populated for
	 * items in shared drives.
	 */
	shared?: boolean;

	/**
	 * Body param: The time at which the file was shared with the user, if applicable
	 * (RFC 3339 date-time).
	 */
	sharedWithMeTime?: string;

	/**
	 * Body param: Output only. The user who shared the file with the requesting user,
	 * if applicable.
	 */
	sharingUser?: AboutAPI.User;

	/**
	 * Body param: Shortcut file details. Only populated for shortcut files, which have
	 * the mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	shortcutDetails?: FileUpdateParams.ShortcutDetails;

	/**
	 * Body param: Output only. Size in bytes of blobs and first party editor files.
	 * Won't be populated for files that have no size, like shortcuts and folders.
	 */
	size?: string;

	/**
	 * Body param: Output only. The list of spaces which contain the file. The
	 * currently supported values are 'drive', 'appDataFolder' and 'photos'.
	 */
	spaces?: Array<string>;

	/**
	 * Body param: Whether the user has starred the file.
	 */
	starred?: boolean;

	/**
	 * @deprecated Body param: Deprecated: Output only. Use `driveId` instead.
	 */
	teamDriveId?: string;

	/**
	 * Body param: Output only. A short-lived link to the file's thumbnail, if
	 * available. Typically lasts on the order of hours. Only populated when the
	 * requesting app can access the file's content. If the file isn't shared publicly,
	 * the URL returned in `Files.thumbnailLink` must be fetched using a credentialed
	 * request.
	 */
	thumbnailLink?: string;

	/**
	 * Body param: Output only. The thumbnail version for use in thumbnail cache
	 * invalidation.
	 */
	thumbnailVersion?: string;

	/**
	 * Body param: Whether the file has been trashed, either explicitly or from a
	 * trashed parent folder. Only the owner may trash a file, and other users cannot
	 * see files in the owner's trash.
	 */
	trashed?: boolean;

	/**
	 * Body param: The time that the item was trashed (RFC 3339 date-time). Only
	 * populated for items in shared drives.
	 */
	trashedTime?: string;

	/**
	 * Body param: Output only. If the file has been explicitly trashed, the user who
	 * trashed it. Only populated for items in shared drives.
	 */
	trashingUser?: AboutAPI.User;

	/**
	 * Body param: Output only. A monotonically increasing version number for the file.
	 * This reflects every change made to the file on the server, even those not
	 * visible to the user.
	 */
	version?: string;

	/**
	 * Body param: Output only. Additional metadata about video media. This may not be
	 * available immediately upon upload.
	 */
	videoMediaMetadata?: FileUpdateParams.VideoMediaMetadata;

	/**
	 * Body param: Output only. Whether the file has been viewed by this user.
	 */
	viewedByMe?: boolean;

	/**
	 * Body param: The last time the file was viewed by the user (RFC 3339 date-time).
	 */
	viewedByMeTime?: string;

	/**
	 * @deprecated Body param: Deprecated: Use `copyRequiresWriterPermission` instead.
	 */
	viewersCanCopyContent?: boolean;

	/**
	 * Body param: Output only. A link for downloading the content of the file in a
	 * browser. This is only available for files with binary content in Google Drive.
	 */
	webContentLink?: string;

	/**
	 * Body param: Output only. A link for opening the file in a relevant Google editor
	 * or viewer in a browser.
	 */
	webViewLink?: string;

	/**
	 * Body param: Whether users with only `writer` permission can modify the file's
	 * permissions. Not populated for items in shared drives.
	 */
	writersCanShare?: boolean;
}

export namespace FileUpdateParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * Output only. Capabilities the current user has on this file. Each capability
	 * corresponds to a fine-grained action that a user may take.
	 */
	export interface Capabilities {
		/**
		 * Output only. Whether the current user is the pending owner of the file. Not
		 * populated for shared drive files.
		 */
		canAcceptOwnership?: boolean;

		/**
		 * Output only. Whether the current user can add children to this folder. This is
		 * always false when the item is not a folder.
		 */
		canAddChildren?: boolean;

		/**
		 * Output only. Whether the current user can add a folder from another drive
		 * (different shared drive or My Drive) to this folder. This is false when the item
		 * is not a folder. Only populated for items in shared drives.
		 */
		canAddFolderFromAnotherDrive?: boolean;

		/**
		 * Output only. Whether the current user can add a parent for the item without
		 * removing an existing parent in the same request. Not populated for shared drive
		 * files.
		 */
		canAddMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `copyRequiresWriterPermission` restriction of this file.
		 */
		canChangeCopyRequiresWriterPermission?: boolean;

		/**
		 * Output only. Whether the current user can change the securityUpdateEnabled field
		 * on link share metadata.
		 */
		canChangeSecurityUpdateEnabled?: boolean;

		/**
		 * @deprecated Deprecated: Output only.
		 */
		canChangeViewersCanCopyContent?: boolean;

		/**
		 * Output only. Whether the current user can comment on this file.
		 */
		canComment?: boolean;

		/**
		 * Output only. Whether the current user can copy this file. For an item in a
		 * shared drive, whether the current user can copy non-folder descendants of this
		 * item, or this item itself if it is not a folder.
		 */
		canCopy?: boolean;

		/**
		 * Output only. Whether the current user can delete this file.
		 */
		canDelete?: boolean;

		/**
		 * Output only. Whether the current user can delete children of this folder. This
		 * is false when the item is not a folder. Only populated for items in shared
		 * drives.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Output only. Whether the current user can download this file.
		 */
		canDownload?: boolean;

		/**
		 * Output only. Whether the current user can edit this file. Other factors may
		 * limit the type of changes a user can make to a file. For example, see
		 * `canChangeCopyRequiresWriterPermission` or `canModifyContent`.
		 */
		canEdit?: boolean;

		/**
		 * Output only. Whether the current user can list the children of this folder. This
		 * is always false when the item is not a folder.
		 */
		canListChildren?: boolean;

		/**
		 * Output only. Whether the current user can modify the content of this file.
		 */
		canModifyContent?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use one of
		 * `canModifyEditorContentRestriction`, `canModifyOwnerContentRestriction` or
		 * `canRemoveContentRestriction`.
		 */
		canModifyContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions on
		 * the file which are editor restricted.
		 */
		canModifyEditorContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can modify the labels on the file.
		 */
		canModifyLabels?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions
		 * which are owner restricted.
		 */
		canModifyOwnerContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder outside
		 * of the shared drive. This is false when the item is not a folder. Only populated
		 * for items in shared drives.
		 */
		canMoveChildrenOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenOutOfDrive` instead.
		 */
		canMoveChildrenOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder within
		 * this drive. This is false when the item is not a folder. Note that a request to
		 * move the child may still fail depending on the current user's access to the
		 * child and to the destination folder.
		 */
		canMoveChildrenWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenWithinDrive` instead.
		 */
		canMoveChildrenWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemIntoTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item outside of this drive
		 * by changing its parent. Note that a request to change the parent of the item may
		 * still fail depending on the new parent that is being added.
		 */
		canMoveItemOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item within this drive. Note
		 * that a request to change the parent of the item may still fail depending on the
		 * new parent that is being added and the parent that is being removed.
		 */
		canMoveItemWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` instead.
		 */
		canMoveItemWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` or
		 * `canMoveItemOutOfDrive` instead.
		 */
		canMoveTeamDriveItem?: boolean;

		/**
		 * Output only. Whether the current user can read the shared drive to which this
		 * file belongs. Only populated for items in shared drives.
		 */
		canReadDrive?: boolean;

		/**
		 * Output only. Whether the current user can read the labels on the file.
		 */
		canReadLabels?: boolean;

		/**
		 * Output only. Whether the current user can read the revisions resource of this
		 * file. For a shared drive item, whether revisions of non-folder descendants of
		 * this item, or this item itself if it is not a folder, can be read.
		 */
		canReadRevisions?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canReadDrive` instead.
		 */
		canReadTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can remove children from this folder. This
		 * is always false when the item is not a folder. For a folder in a shared drive,
		 * use `canDeleteChildren` or `canTrashChildren` instead.
		 */
		canRemoveChildren?: boolean;

		/**
		 * Output only. Whether there is a content restriction on the file that can be
		 * removed by the current user.
		 */
		canRemoveContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can remove a parent from the item without
		 * adding another parent in the same request. Not populated for shared drive files.
		 */
		canRemoveMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can rename this file.
		 */
		canRename?: boolean;

		/**
		 * Output only. Whether the current user can modify the sharing settings for this
		 * file.
		 */
		canShare?: boolean;

		/**
		 * Output only. Whether the current user can move this file to trash.
		 */
		canTrash?: boolean;

		/**
		 * Output only. Whether the current user can trash children of this folder. This is
		 * false when the item is not a folder. Only populated for items in shared drives.
		 */
		canTrashChildren?: boolean;

		/**
		 * Output only. Whether the current user can restore this file from trash.
		 */
		canUntrash?: boolean;
	}

	/**
	 * Additional information about the content of the file. These fields are never
	 * populated in responses.
	 */
	export interface ContentHints {
		/**
		 * Text to be indexed for the file to improve fullText queries. This is limited to
		 * 128KB in length and may contain HTML elements.
		 */
		indexableText?: string;

		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		thumbnail?: ContentHints.Thumbnail;
	}

	export namespace ContentHints {
		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		export interface Thumbnail {
			/**
			 * The thumbnail data encoded with URL-safe Base64 (RFC 4648 section 5).
			 */
			image?: string;

			/**
			 * The MIME type of the thumbnail.
			 */
			mimeType?: string;
		}
	}

	/**
	 * A restriction for accessing the content of the file.
	 */
	export interface ContentRestriction {
		/**
		 * Whether the content restriction can only be modified or removed by a user who
		 * owns the file. For files in shared drives, any user with `organizer`
		 * capabilities can modify or remove this content restriction.
		 */
		ownerRestricted?: boolean;

		/**
		 * Whether the content of the file is read-only. If a file is read-only, a new
		 * revision of the file may not be added, comments may not be added or modified,
		 * and the title of the file may not be modified.
		 */
		readOnly?: boolean;

		/**
		 * Reason for why the content of the file is restricted. This is only mutable on
		 * requests that also set `readOnly=true`.
		 */
		reason?: string;

		/**
		 * Output only. The user who set the content restriction. Only populated if
		 * `readOnly` is true.
		 */
		restrictingUser?: AboutAPI.User;

		/**
		 * The time at which the content restriction was set (formatted RFC 3339
		 * timestamp). Only populated if readOnly is true.
		 */
		restrictionTime?: string;

		/**
		 * Output only. Whether the content restriction was applied by the system, for
		 * example due to an esignature. Users cannot modify or remove system restricted
		 * content restrictions.
		 */
		systemRestricted?: boolean;

		/**
		 * Output only. The type of the content restriction. Currently the only possible
		 * value is `globalContentRestriction`.
		 */
		type?: string;
	}

	/**
	 * Output only. Additional metadata about image media, if available.
	 */
	export interface ImageMediaMetadata {
		/**
		 * Output only. The aperture used to create the photo (f-number).
		 */
		aperture?: number;

		/**
		 * Output only. The make of the camera used to create the photo.
		 */
		cameraMake?: string;

		/**
		 * Output only. The model of the camera used to create the photo.
		 */
		cameraModel?: string;

		/**
		 * Output only. The color space of the photo.
		 */
		colorSpace?: string;

		/**
		 * Output only. The exposure bias of the photo (APEX value).
		 */
		exposureBias?: number;

		/**
		 * Output only. The exposure mode used to create the photo.
		 */
		exposureMode?: string;

		/**
		 * Output only. The length of the exposure, in seconds.
		 */
		exposureTime?: number;

		/**
		 * Output only. Whether a flash was used to create the photo.
		 */
		flashUsed?: boolean;

		/**
		 * Output only. The focal length used to create the photo, in millimeters.
		 */
		focalLength?: number;

		/**
		 * Output only. The height of the image in pixels.
		 */
		height?: number;

		/**
		 * Output only. The ISO speed used to create the photo.
		 */
		isoSpeed?: number;

		/**
		 * Output only. The lens used to create the photo.
		 */
		lens?: string;

		/**
		 * Output only. Geographic location information stored in the image.
		 */
		location?: ImageMediaMetadata.Location;

		/**
		 * Output only. The smallest f-number of the lens at the focal length used to
		 * create the photo (APEX value).
		 */
		maxApertureValue?: number;

		/**
		 * Output only. The metering mode used to create the photo.
		 */
		meteringMode?: string;

		/**
		 * Output only. The number of clockwise 90 degree rotations applied from the
		 * image's original orientation.
		 */
		rotation?: number;

		/**
		 * Output only. The type of sensor used to create the photo.
		 */
		sensor?: string;

		/**
		 * Output only. The distance to the subject of the photo, in meters.
		 */
		subjectDistance?: number;

		/**
		 * Output only. The date and time the photo was taken (EXIF DateTime).
		 */
		time?: string;

		/**
		 * Output only. The white balance mode used to create the photo.
		 */
		whiteBalance?: string;

		/**
		 * Output only. The width of the image in pixels.
		 */
		width?: number;
	}

	export namespace ImageMediaMetadata {
		/**
		 * Output only. Geographic location information stored in the image.
		 */
		export interface Location {
			/**
			 * Output only. The altitude stored in the image.
			 */
			altitude?: number;

			/**
			 * Output only. The latitude stored in the image.
			 */
			latitude?: number;

			/**
			 * Output only. The longitude stored in the image.
			 */
			longitude?: number;
		}
	}

	/**
	 * Output only. An overview of the labels on the file.
	 */
	export interface LabelInfo {
		/**
		 * Output only. The set of labels on the file as requested by the label IDs in the
		 * `includeLabels` parameter. By default, no labels are returned.
		 */
		labels?: Array<FilesAPI.Label>;
	}

	/**
	 * Contains details about the link URLs that clients are using to refer to this
	 * item.
	 */
	export interface LinkShareMetadata {
		/**
		 * Output only. Whether the file is eligible for security update.
		 */
		securityUpdateEligible?: boolean;

		/**
		 * Output only. Whether the security update is enabled for this file.
		 */
		securityUpdateEnabled?: boolean;
	}

	/**
	 * Shortcut file details. Only populated for shortcut files, which have the
	 * mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	export interface ShortcutDetails {
		/**
		 * The ID of the file that this shortcut points to.
		 */
		targetId?: string;

		/**
		 * Output only. The MIME type of the file that this shortcut points to. The value
		 * of this field is a snapshot of the target's MIME type, captured when the
		 * shortcut is created.
		 */
		targetMimeType?: string;

		/**
		 * Output only. The ResourceKey for the target file.
		 */
		targetResourceKey?: string;
	}

	/**
	 * Output only. Additional metadata about video media. This may not be available
	 * immediately upon upload.
	 */
	export interface VideoMediaMetadata {
		/**
		 * Output only. The duration of the video in milliseconds.
		 */
		durationMillis?: string;

		/**
		 * Output only. The height of the video in pixels.
		 */
		height?: number;

		/**
		 * Output only. The width of the video in pixels.
		 */
		width?: number;
	}
}

export interface FileListParams {
	$?: FileListParams._;

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
	 * Bodies of items (files/documents) to which the query applies. Supported bodies
	 * are 'user', 'domain', 'drive', and 'allDrives'. Prefer 'user' or 'drive' to
	 * 'allDrives' for efficiency. By default, corpora is set to 'user'. However, this
	 * can change depending on the filter set through the 'q' parameter.
	 */
	corpora?: string;

	/**
	 * Deprecated: The source of files to list. Use 'corpora' instead.
	 */
	corpus?: "domain" | "user";

	/**
	 * ID of the shared drive to search.
	 */
	driveId?: string;

	/**
	 * Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

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
	 * A comma-separated list of sort keys. Valid keys are 'createdTime', 'folder',
	 * 'modifiedByMeTime', 'modifiedTime', 'name', 'name_natural', 'quotaBytesUsed',
	 * 'recency', 'sharedWithMeTime', 'starred', and 'viewedByMeTime'. Each key sorts
	 * ascending by default, but can be reversed with the 'desc' modifier. Example
	 * usage: ?orderBy=folder,modifiedTime desc,name.
	 */
	orderBy?: string;

	/**
	 * The maximum number of files to return per page. Partial or empty result pages
	 * are possible even before the end of the files list has been reached.
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
	 * A query for filtering the file results. See the "Search for files & folders"
	 * guide for supported syntax.
	 */
	q?: string;

	/**
	 * Available to use for quota purposes for server-side applications. Can be any
	 * arbitrary string assigned to a user, but should not exceed 40 characters.
	 */
	quotaUser?: string;

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

export namespace FileListParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface FileDeleteParams {
	$?: FileDeleteParams._;

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
	 * Deprecated: If an item is not in a shared drive and its last parent is deleted
	 * but the item itself is not, the item will be placed under its owner's root.
	 */
	enforceSingleParent?: boolean;

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
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace FileDeleteParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface FileCopyParams {
	/**
	 * Query param:
	 */
	$?: FileCopyParams._;

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
	 * Query param: Deprecated. Copying files into multiple folders is no longer
	 * supported. Use shortcuts instead.
	 */
	enforceSingleParent?: boolean;

	/**
	 * Query param: Selector specifying which fields to include in a partial response.
	 */
	fields?: string;

	/**
	 * Query param: Whether to ignore the domain's default visibility settings for the
	 * created file. Domain administrators can choose to make all uploaded files
	 * visible to the domain by default; this parameter bypasses that behavior for the
	 * request. Permissions are still inherited from parent folders.
	 */
	ignoreDefaultVisibility?: boolean;

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
	 * Query param: Whether to set the 'keepForever' field in the new head revision.
	 * This is only applicable to files with binary content in Google Drive. Only 200
	 * revisions for the file can be kept forever. If the limit is reached, try
	 * deleting pinned revisions.
	 */
	keepRevisionForever?: boolean;

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
	 * Query param: A language hint for OCR processing during image import (ISO 639-1
	 * code).
	 */
	ocrLanguage?: string;

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
	 * Body param: The ID of the file.
	 */
	id?: string;

	/**
	 * Body param: A collection of arbitrary key-value pairs which are private to the
	 * requesting app. Entries with null values are cleared in update and copy
	 * requests. These properties can only be retrieved using an authenticated request.
	 * An authenticated request uses an access token obtained with a OAuth 2 client ID.
	 * You cannot use an API key to retrieve private properties.
	 */
	appProperties?: Record<string, string>;

	/**
	 * Body param: Output only. Capabilities the current user has on this file. Each
	 * capability corresponds to a fine-grained action that a user may take.
	 */
	capabilities?: FileCopyParams.Capabilities;

	/**
	 * Body param: Additional information about the content of the file. These fields
	 * are never populated in responses.
	 */
	contentHints?: FileCopyParams.ContentHints;

	/**
	 * Body param: Restrictions for accessing the content of the file. Only populated
	 * if such a restriction exists.
	 */
	contentRestrictions?: Array<FileCopyParams.ContentRestriction>;

	/**
	 * Body param: Whether the options to copy, print, or download this file, should be
	 * disabled for readers and commenters.
	 */
	copyRequiresWriterPermission?: boolean;

	/**
	 * Body param: The time at which the file was created (RFC 3339 date-time).
	 */
	createdTime?: string;

	/**
	 * Body param: A short description of the file.
	 */
	description?: string;

	/**
	 * Body param: Output only. ID of the shared drive the file resides in. Only
	 * populated for items in shared drives.
	 */
	driveId?: string;

	/**
	 * Body param: Output only. Whether the file has been explicitly trashed, as
	 * opposed to recursively trashed from a parent folder.
	 */
	explicitlyTrashed?: boolean;

	/**
	 * Body param: Output only. The final component of `fullFileExtension`. This is
	 * only available for files with binary content in Google Drive.
	 */
	fileExtension?: string;

	/**
	 * Body param: The color for a folder or a shortcut to a folder as an RGB hex
	 * string. The supported colors are published in the `folderColorPalette` field of
	 * the About resource. If an unsupported color is specified, the closest color in
	 * the palette is used instead.
	 */
	folderColorRgb?: string;

	/**
	 * Body param: Output only. The full file extension extracted from the `name`
	 * field. May contain multiple concatenated extensions, such as "tar.gz". This is
	 * only available for files with binary content in Google Drive. This is
	 * automatically updated when the `name` field changes, however it is not cleared
	 * if the new name does not contain a valid extension.
	 */
	fullFileExtension?: string;

	/**
	 * Body param: Output only. Whether there are permissions directly on this file.
	 * This field is only populated for items in shared drives.
	 */
	hasAugmentedPermissions?: boolean;

	/**
	 * Body param: Output only. Whether this file has a thumbnail. This does not
	 * indicate whether the requesting app has access to the thumbnail. To check
	 * access, look for the presence of the thumbnailLink field.
	 */
	hasThumbnail?: boolean;

	/**
	 * Body param: Output only. The ID of the file's head revision. This is currently
	 * only available for files with binary content in Google Drive.
	 */
	headRevisionId?: string;

	/**
	 * Body param: Output only. A static, unauthenticated link to the file's icon.
	 */
	iconLink?: string;

	/**
	 * Body param: Output only. Additional metadata about image media, if available.
	 */
	imageMediaMetadata?: FileCopyParams.ImageMediaMetadata;

	/**
	 * Body param: Output only. Whether the file was created or opened by the
	 * requesting app.
	 */
	isAppAuthorized?: boolean;

	/**
	 * Body param: Output only. Identifies what kind of resource this is. Value: the
	 * fixed string `"drive#file"`.
	 */
	kind?: string;

	/**
	 * Body param: Output only. An overview of the labels on the file.
	 */
	labelInfo?: FileCopyParams.LabelInfo;

	/**
	 * Body param: Output only. The last user to modify the file.
	 */
	lastModifyingUser?: AboutAPI.User;

	/**
	 * Body param: Contains details about the link URLs that clients are using to refer
	 * to this item.
	 */
	linkShareMetadata?: FileCopyParams.LinkShareMetadata;

	/**
	 * Body param: Output only. The MD5 checksum for the content of the file. This is
	 * only applicable to files with binary content in Google Drive.
	 */
	md5Checksum?: string;

	/**
	 * Body param: The MIME type of the file. Google Drive attempts to automatically
	 * detect an appropriate value from uploaded content, if no value is provided. The
	 * value cannot be changed unless a new revision is uploaded. If a file is created
	 * with a Google Doc MIME type, the uploaded content is imported, if possible. The
	 * supported import formats are published in the About resource.
	 */
	mimeType?: string;

	/**
	 * Body param: Output only. Whether the file has been modified by this user.
	 */
	modifiedByMe?: boolean;

	/**
	 * Body param: The last time the file was modified by the user (RFC 3339
	 * date-time).
	 */
	modifiedByMeTime?: string;

	/**
	 * Body param: he last time the file was modified by anyone (RFC 3339 date-time).
	 * Note that setting modifiedTime will also update modifiedByMeTime for the user.
	 */
	modifiedTime?: string;

	/**
	 * Body param: The name of the file. This is not necessarily unique within a
	 * folder. Note that for immutable items such as the top level folders of shared
	 * drives, My Drive root folder, and Application Data folder the name is constant.
	 */
	name?: string;

	/**
	 * Body param: The original filename of the uploaded content if available, or else
	 * the original value of the `name` field. This is only available for files with
	 * binary content in Google Drive.
	 */
	originalFilename?: string;

	/**
	 * Body param: Output only. Whether the user owns the file. Not populated for items
	 * in shared drives.
	 */
	ownedByMe?: boolean;

	/**
	 * Body param: Output only. The owner of this file. Only certain legacy files may
	 * have more than one owner. This field isn't populated for items in shared drives.
	 */
	owners?: Array<AboutAPI.User>;

	/**
	 * Body param: The IDs of the parent folders which contain the file. If not
	 * specified as part of a create request, the file is placed directly in the user's
	 * My Drive folder. If not specified as part of a copy request, the file inherits
	 * any discoverable parents of the source file. Update requests must use the
	 * `addParents` and `removeParents` parameters to modify the parents list.
	 */
	parents?: Array<string>;

	/**
	 * Body param: Output only. List of permission IDs for users with access to this
	 * file.
	 */
	permissionIds?: Array<string>;

	/**
	 * Body param: Output only. The full list of permissions for the file. This is only
	 * available if the requesting user can share the file. Not populated for items in
	 * shared drives.
	 */
	permissions?: Array<PermissionsAPI.Permission>;

	/**
	 * Body param: A collection of arbitrary key-value pairs which are visible to all
	 * apps. Entries with null values are cleared in update and copy requests.
	 */
	properties?: Record<string, string>;

	/**
	 * Body param: Output only. The number of storage quota bytes used by the file.
	 * This includes the head revision as well as previous revisions with `keepForever`
	 * enabled.
	 */
	quotaBytesUsed?: string;

	/**
	 * Body param: Output only. A key needed to access the item via a shared link.
	 */
	resourceKey?: string;

	/**
	 * Body param: Output only. The SHA1 checksum associated with this file, if
	 * available. This field is only populated for files with content stored in Google
	 * Drive; it is not populated for Docs Editors or shortcut files.
	 */
	sha1Checksum?: string;

	/**
	 * Body param: Output only. The SHA256 checksum associated with this file, if
	 * available. This field is only populated for files with content stored in Google
	 * Drive; it is not populated for Docs Editors or shortcut files.
	 */
	sha256Checksum?: string;

	/**
	 * Body param: Output only. Whether the file has been shared. Not populated for
	 * items in shared drives.
	 */
	shared?: boolean;

	/**
	 * Body param: The time at which the file was shared with the user, if applicable
	 * (RFC 3339 date-time).
	 */
	sharedWithMeTime?: string;

	/**
	 * Body param: Output only. The user who shared the file with the requesting user,
	 * if applicable.
	 */
	sharingUser?: AboutAPI.User;

	/**
	 * Body param: Shortcut file details. Only populated for shortcut files, which have
	 * the mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	shortcutDetails?: FileCopyParams.ShortcutDetails;

	/**
	 * Body param: Output only. Size in bytes of blobs and first party editor files.
	 * Won't be populated for files that have no size, like shortcuts and folders.
	 */
	size?: string;

	/**
	 * Body param: Output only. The list of spaces which contain the file. The
	 * currently supported values are 'drive', 'appDataFolder' and 'photos'.
	 */
	spaces?: Array<string>;

	/**
	 * Body param: Whether the user has starred the file.
	 */
	starred?: boolean;

	/**
	 * @deprecated Body param: Deprecated: Output only. Use `driveId` instead.
	 */
	teamDriveId?: string;

	/**
	 * Body param: Output only. A short-lived link to the file's thumbnail, if
	 * available. Typically lasts on the order of hours. Only populated when the
	 * requesting app can access the file's content. If the file isn't shared publicly,
	 * the URL returned in `Files.thumbnailLink` must be fetched using a credentialed
	 * request.
	 */
	thumbnailLink?: string;

	/**
	 * Body param: Output only. The thumbnail version for use in thumbnail cache
	 * invalidation.
	 */
	thumbnailVersion?: string;

	/**
	 * Body param: Whether the file has been trashed, either explicitly or from a
	 * trashed parent folder. Only the owner may trash a file, and other users cannot
	 * see files in the owner's trash.
	 */
	trashed?: boolean;

	/**
	 * Body param: The time that the item was trashed (RFC 3339 date-time). Only
	 * populated for items in shared drives.
	 */
	trashedTime?: string;

	/**
	 * Body param: Output only. If the file has been explicitly trashed, the user who
	 * trashed it. Only populated for items in shared drives.
	 */
	trashingUser?: AboutAPI.User;

	/**
	 * Body param: Output only. A monotonically increasing version number for the file.
	 * This reflects every change made to the file on the server, even those not
	 * visible to the user.
	 */
	version?: string;

	/**
	 * Body param: Output only. Additional metadata about video media. This may not be
	 * available immediately upon upload.
	 */
	videoMediaMetadata?: FileCopyParams.VideoMediaMetadata;

	/**
	 * Body param: Output only. Whether the file has been viewed by this user.
	 */
	viewedByMe?: boolean;

	/**
	 * Body param: The last time the file was viewed by the user (RFC 3339 date-time).
	 */
	viewedByMeTime?: string;

	/**
	 * @deprecated Body param: Deprecated: Use `copyRequiresWriterPermission` instead.
	 */
	viewersCanCopyContent?: boolean;

	/**
	 * Body param: Output only. A link for downloading the content of the file in a
	 * browser. This is only available for files with binary content in Google Drive.
	 */
	webContentLink?: string;

	/**
	 * Body param: Output only. A link for opening the file in a relevant Google editor
	 * or viewer in a browser.
	 */
	webViewLink?: string;

	/**
	 * Body param: Whether users with only `writer` permission can modify the file's
	 * permissions. Not populated for items in shared drives.
	 */
	writersCanShare?: boolean;
}

export namespace FileCopyParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * Output only. Capabilities the current user has on this file. Each capability
	 * corresponds to a fine-grained action that a user may take.
	 */
	export interface Capabilities {
		/**
		 * Output only. Whether the current user is the pending owner of the file. Not
		 * populated for shared drive files.
		 */
		canAcceptOwnership?: boolean;

		/**
		 * Output only. Whether the current user can add children to this folder. This is
		 * always false when the item is not a folder.
		 */
		canAddChildren?: boolean;

		/**
		 * Output only. Whether the current user can add a folder from another drive
		 * (different shared drive or My Drive) to this folder. This is false when the item
		 * is not a folder. Only populated for items in shared drives.
		 */
		canAddFolderFromAnotherDrive?: boolean;

		/**
		 * Output only. Whether the current user can add a parent for the item without
		 * removing an existing parent in the same request. Not populated for shared drive
		 * files.
		 */
		canAddMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can change the
		 * `copyRequiresWriterPermission` restriction of this file.
		 */
		canChangeCopyRequiresWriterPermission?: boolean;

		/**
		 * Output only. Whether the current user can change the securityUpdateEnabled field
		 * on link share metadata.
		 */
		canChangeSecurityUpdateEnabled?: boolean;

		/**
		 * @deprecated Deprecated: Output only.
		 */
		canChangeViewersCanCopyContent?: boolean;

		/**
		 * Output only. Whether the current user can comment on this file.
		 */
		canComment?: boolean;

		/**
		 * Output only. Whether the current user can copy this file. For an item in a
		 * shared drive, whether the current user can copy non-folder descendants of this
		 * item, or this item itself if it is not a folder.
		 */
		canCopy?: boolean;

		/**
		 * Output only. Whether the current user can delete this file.
		 */
		canDelete?: boolean;

		/**
		 * Output only. Whether the current user can delete children of this folder. This
		 * is false when the item is not a folder. Only populated for items in shared
		 * drives.
		 */
		canDeleteChildren?: boolean;

		/**
		 * Output only. Whether the current user can download this file.
		 */
		canDownload?: boolean;

		/**
		 * Output only. Whether the current user can edit this file. Other factors may
		 * limit the type of changes a user can make to a file. For example, see
		 * `canChangeCopyRequiresWriterPermission` or `canModifyContent`.
		 */
		canEdit?: boolean;

		/**
		 * Output only. Whether the current user can list the children of this folder. This
		 * is always false when the item is not a folder.
		 */
		canListChildren?: boolean;

		/**
		 * Output only. Whether the current user can modify the content of this file.
		 */
		canModifyContent?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use one of
		 * `canModifyEditorContentRestriction`, `canModifyOwnerContentRestriction` or
		 * `canRemoveContentRestriction`.
		 */
		canModifyContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions on
		 * the file which are editor restricted.
		 */
		canModifyEditorContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can modify the labels on the file.
		 */
		canModifyLabels?: boolean;

		/**
		 * Output only. Whether the current user can add or modify content restrictions
		 * which are owner restricted.
		 */
		canModifyOwnerContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder outside
		 * of the shared drive. This is false when the item is not a folder. Only populated
		 * for items in shared drives.
		 */
		canMoveChildrenOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenOutOfDrive` instead.
		 */
		canMoveChildrenOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move children of this folder within
		 * this drive. This is false when the item is not a folder. Note that a request to
		 * move the child may still fail depending on the current user's access to the
		 * child and to the destination folder.
		 */
		canMoveChildrenWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveChildrenWithinDrive` instead.
		 */
		canMoveChildrenWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemIntoTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item outside of this drive
		 * by changing its parent. Note that a request to change the parent of the item may
		 * still fail depending on the new parent that is being added.
		 */
		canMoveItemOutOfDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemOutOfDrive` instead.
		 */
		canMoveItemOutOfTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can move this item within this drive. Note
		 * that a request to change the parent of the item may still fail depending on the
		 * new parent that is being added and the parent that is being removed.
		 */
		canMoveItemWithinDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` instead.
		 */
		canMoveItemWithinTeamDrive?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canMoveItemWithinDrive` or
		 * `canMoveItemOutOfDrive` instead.
		 */
		canMoveTeamDriveItem?: boolean;

		/**
		 * Output only. Whether the current user can read the shared drive to which this
		 * file belongs. Only populated for items in shared drives.
		 */
		canReadDrive?: boolean;

		/**
		 * Output only. Whether the current user can read the labels on the file.
		 */
		canReadLabels?: boolean;

		/**
		 * Output only. Whether the current user can read the revisions resource of this
		 * file. For a shared drive item, whether revisions of non-folder descendants of
		 * this item, or this item itself if it is not a folder, can be read.
		 */
		canReadRevisions?: boolean;

		/**
		 * @deprecated Deprecated: Output only. Use `canReadDrive` instead.
		 */
		canReadTeamDrive?: boolean;

		/**
		 * Output only. Whether the current user can remove children from this folder. This
		 * is always false when the item is not a folder. For a folder in a shared drive,
		 * use `canDeleteChildren` or `canTrashChildren` instead.
		 */
		canRemoveChildren?: boolean;

		/**
		 * Output only. Whether there is a content restriction on the file that can be
		 * removed by the current user.
		 */
		canRemoveContentRestriction?: boolean;

		/**
		 * Output only. Whether the current user can remove a parent from the item without
		 * adding another parent in the same request. Not populated for shared drive files.
		 */
		canRemoveMyDriveParent?: boolean;

		/**
		 * Output only. Whether the current user can rename this file.
		 */
		canRename?: boolean;

		/**
		 * Output only. Whether the current user can modify the sharing settings for this
		 * file.
		 */
		canShare?: boolean;

		/**
		 * Output only. Whether the current user can move this file to trash.
		 */
		canTrash?: boolean;

		/**
		 * Output only. Whether the current user can trash children of this folder. This is
		 * false when the item is not a folder. Only populated for items in shared drives.
		 */
		canTrashChildren?: boolean;

		/**
		 * Output only. Whether the current user can restore this file from trash.
		 */
		canUntrash?: boolean;
	}

	/**
	 * Additional information about the content of the file. These fields are never
	 * populated in responses.
	 */
	export interface ContentHints {
		/**
		 * Text to be indexed for the file to improve fullText queries. This is limited to
		 * 128KB in length and may contain HTML elements.
		 */
		indexableText?: string;

		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		thumbnail?: ContentHints.Thumbnail;
	}

	export namespace ContentHints {
		/**
		 * A thumbnail for the file. This will only be used if Google Drive cannot generate
		 * a standard thumbnail.
		 */
		export interface Thumbnail {
			/**
			 * The thumbnail data encoded with URL-safe Base64 (RFC 4648 section 5).
			 */
			image?: string;

			/**
			 * The MIME type of the thumbnail.
			 */
			mimeType?: string;
		}
	}

	/**
	 * A restriction for accessing the content of the file.
	 */
	export interface ContentRestriction {
		/**
		 * Whether the content restriction can only be modified or removed by a user who
		 * owns the file. For files in shared drives, any user with `organizer`
		 * capabilities can modify or remove this content restriction.
		 */
		ownerRestricted?: boolean;

		/**
		 * Whether the content of the file is read-only. If a file is read-only, a new
		 * revision of the file may not be added, comments may not be added or modified,
		 * and the title of the file may not be modified.
		 */
		readOnly?: boolean;

		/**
		 * Reason for why the content of the file is restricted. This is only mutable on
		 * requests that also set `readOnly=true`.
		 */
		reason?: string;

		/**
		 * Output only. The user who set the content restriction. Only populated if
		 * `readOnly` is true.
		 */
		restrictingUser?: AboutAPI.User;

		/**
		 * The time at which the content restriction was set (formatted RFC 3339
		 * timestamp). Only populated if readOnly is true.
		 */
		restrictionTime?: string;

		/**
		 * Output only. Whether the content restriction was applied by the system, for
		 * example due to an esignature. Users cannot modify or remove system restricted
		 * content restrictions.
		 */
		systemRestricted?: boolean;

		/**
		 * Output only. The type of the content restriction. Currently the only possible
		 * value is `globalContentRestriction`.
		 */
		type?: string;
	}

	/**
	 * Output only. Additional metadata about image media, if available.
	 */
	export interface ImageMediaMetadata {
		/**
		 * Output only. The aperture used to create the photo (f-number).
		 */
		aperture?: number;

		/**
		 * Output only. The make of the camera used to create the photo.
		 */
		cameraMake?: string;

		/**
		 * Output only. The model of the camera used to create the photo.
		 */
		cameraModel?: string;

		/**
		 * Output only. The color space of the photo.
		 */
		colorSpace?: string;

		/**
		 * Output only. The exposure bias of the photo (APEX value).
		 */
		exposureBias?: number;

		/**
		 * Output only. The exposure mode used to create the photo.
		 */
		exposureMode?: string;

		/**
		 * Output only. The length of the exposure, in seconds.
		 */
		exposureTime?: number;

		/**
		 * Output only. Whether a flash was used to create the photo.
		 */
		flashUsed?: boolean;

		/**
		 * Output only. The focal length used to create the photo, in millimeters.
		 */
		focalLength?: number;

		/**
		 * Output only. The height of the image in pixels.
		 */
		height?: number;

		/**
		 * Output only. The ISO speed used to create the photo.
		 */
		isoSpeed?: number;

		/**
		 * Output only. The lens used to create the photo.
		 */
		lens?: string;

		/**
		 * Output only. Geographic location information stored in the image.
		 */
		location?: ImageMediaMetadata.Location;

		/**
		 * Output only. The smallest f-number of the lens at the focal length used to
		 * create the photo (APEX value).
		 */
		maxApertureValue?: number;

		/**
		 * Output only. The metering mode used to create the photo.
		 */
		meteringMode?: string;

		/**
		 * Output only. The number of clockwise 90 degree rotations applied from the
		 * image's original orientation.
		 */
		rotation?: number;

		/**
		 * Output only. The type of sensor used to create the photo.
		 */
		sensor?: string;

		/**
		 * Output only. The distance to the subject of the photo, in meters.
		 */
		subjectDistance?: number;

		/**
		 * Output only. The date and time the photo was taken (EXIF DateTime).
		 */
		time?: string;

		/**
		 * Output only. The white balance mode used to create the photo.
		 */
		whiteBalance?: string;

		/**
		 * Output only. The width of the image in pixels.
		 */
		width?: number;
	}

	export namespace ImageMediaMetadata {
		/**
		 * Output only. Geographic location information stored in the image.
		 */
		export interface Location {
			/**
			 * Output only. The altitude stored in the image.
			 */
			altitude?: number;

			/**
			 * Output only. The latitude stored in the image.
			 */
			latitude?: number;

			/**
			 * Output only. The longitude stored in the image.
			 */
			longitude?: number;
		}
	}

	/**
	 * Output only. An overview of the labels on the file.
	 */
	export interface LabelInfo {
		/**
		 * Output only. The set of labels on the file as requested by the label IDs in the
		 * `includeLabels` parameter. By default, no labels are returned.
		 */
		labels?: Array<FilesAPI.Label>;
	}

	/**
	 * Contains details about the link URLs that clients are using to refer to this
	 * item.
	 */
	export interface LinkShareMetadata {
		/**
		 * Output only. Whether the file is eligible for security update.
		 */
		securityUpdateEligible?: boolean;

		/**
		 * Output only. Whether the security update is enabled for this file.
		 */
		securityUpdateEnabled?: boolean;
	}

	/**
	 * Shortcut file details. Only populated for shortcut files, which have the
	 * mimeType field set to `application/vnd.google-apps.shortcut`.
	 */
	export interface ShortcutDetails {
		/**
		 * The ID of the file that this shortcut points to.
		 */
		targetId?: string;

		/**
		 * Output only. The MIME type of the file that this shortcut points to. The value
		 * of this field is a snapshot of the target's MIME type, captured when the
		 * shortcut is created.
		 */
		targetMimeType?: string;

		/**
		 * Output only. The ResourceKey for the target file.
		 */
		targetResourceKey?: string;
	}

	/**
	 * Output only. Additional metadata about video media. This may not be available
	 * immediately upon upload.
	 */
	export interface VideoMediaMetadata {
		/**
		 * Output only. The duration of the video in milliseconds.
		 */
		durationMillis?: string;

		/**
		 * Output only. The height of the video in pixels.
		 */
		height?: number;

		/**
		 * Output only. The width of the video in pixels.
		 */
		width?: number;
	}
}

export interface FileDeleteTrashedParams {
	$?: FileDeleteTrashedParams._;

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
	 * If set, empties the trash of the provided shared drive.
	 */
	driveId?: string;

	/**
	 * Deprecated: If an item is not in a shared drive and its last parent is deleted
	 * but the item itself is not, the item will be placed under its owner's root.
	 */
	enforceSingleParent?: boolean;

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

export namespace FileDeleteTrashedParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface FileExportParams {
	/**
	 * Required. The MIME type of the format requested for this export.
	 */
	mimeType: string;

	$?: FileExportParams._;

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

export namespace FileExportParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface FileGenerateIDsParams {
	$?: FileGenerateIDsParams._;

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
	 * The number of IDs to return.
	 */
	count?: number;

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
	 * The space in which the IDs can be used to create new files. Supported values are
	 * 'drive' and 'appDataFolder'. (Default: 'drive')
	 */
	space?: string;

	/**
	 * The type of items which the IDs can be used for. Supported values are 'files'
	 * and 'shortcuts'. Note that 'shortcuts' are only supported in the `drive`
	 * 'space'. (Default: 'files')
	 */
	type?: string;

	/**
	 * Upload protocol for media (e.g. "raw", "multipart").
	 */
	upload_protocol?: string;

	/**
	 * Legacy upload protocol for media (e.g. "media", "multipart").
	 */
	uploadType?: string;
}

export namespace FileGenerateIDsParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface FileListLabelsParams {
	$?: FileListLabelsParams._;

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
	 * The maximum number of labels to return per page. When not set, defaults to 100.
	 */
	maxResults?: number;

	/**
	 * OAuth 2.0 token for the current user.
	 */
	oauth_token?: string;

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

export namespace FileListLabelsParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

export interface FileModifyLabelsParams {
	/**
	 * Query param:
	 */
	$?: FileModifyLabelsParams._;

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
	 * Body param: This is always drive#modifyLabelsRequest.
	 */
	kind?: string;

	/**
	 * Body param: The list of modifications to apply to the labels on the file.
	 */
	labelModifications?: Array<FileModifyLabelsParams.LabelModification>;
}

export namespace FileModifyLabelsParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}

	/**
	 * A modification to a label on a file. A LabelModification can be used to apply a
	 * label to a file, update an existing label on a file, or remove a label from a
	 * file.
	 */
	export interface LabelModification {
		/**
		 * The list of modifications to this label's fields.
		 */
		fieldModifications?: Array<LabelModification.FieldModification>;

		/**
		 * This is always drive#labelModification.
		 */
		kind?: string;

		/**
		 * The ID of the label to modify.
		 */
		labelId?: string;

		/**
		 * If true, the label will be removed from the file.
		 */
		removeLabel?: boolean;
	}

	export namespace LabelModification {
		/**
		 * A modification to a label's field.
		 */
		export interface FieldModification {
			/**
			 * The ID of the field to be modified.
			 */
			fieldId?: string;

			/**
			 * This is always drive#labelFieldModification.
			 */
			kind?: string;

			/**
			 * Replaces the value of a dateString Field with these new values. The string must
			 * be in the RFC 3339 full-date format: YYYY-MM-DD.
			 */
			setDateValues?: Array<string>;

			/**
			 * Replaces the value of an `integer` field with these new values.
			 */
			setIntegerValues?: Array<string>;

			/**
			 * Replaces a `selection` field with these new values.
			 */
			setSelectionValues?: Array<string>;

			/**
			 * Sets the value of a `text` field.
			 */
			setTextValues?: Array<string>;

			/**
			 * Replaces a `user` field with these new values. The values must be valid email
			 * addresses.
			 */
			setUserValues?: Array<string>;

			/**
			 * Unsets the values for this field.
			 */
			unsetValues?: boolean;
		}
	}
}

export interface FileWatchParams {
	/**
	 * Query param:
	 */
	$?: FileWatchParams._;

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

export namespace FileWatchParams {
	export interface _ {
		/**
		 * V1 error format.
		 */
		xgafv?: "1" | "2";
	}
}

Files.Comments = Comments;
Files.Permissions = Permissions;
Files.Revisions = Revisions;

export declare namespace Files {
	export type {
		File,
		Label,
		FileListResponse,
		FileGenerateIDsResponse,
		FileListLabelsResponse,
		FileModifyLabelsResponse,
		FileCreateParams,
		FileRetrieveParams,
		FileUpdateParams,
		FileListParams,
		FileDeleteParams,
		FileCopyParams,
		FileDeleteTrashedParams,
		FileExportParams,
		FileGenerateIDsParams,
		FileListLabelsParams,
		FileModifyLabelsParams,
		FileWatchParams,
	};

	export { Comments };
	export type {
		Comment,
		CommentListResponse,
		CommentCreateParams,
		CommentRetrieveParams,
		CommentUpdateParams,
		CommentListParams,
		CommentDeleteParams,
	};

	export { Permissions };
	export type {
		Permission,
		PermissionListResponse,
		PermissionCreateParams,
		PermissionRetrieveParams,
		PermissionUpdateParams,
		PermissionListParams,
		PermissionDeleteParams,
	};

	export { Revisions };
	export type {
		Revision,
		RevisionListResponse,
		RevisionRetrieveParams,
		RevisionUpdateParams,
		RevisionListParams,
		RevisionDeleteParams,
	};
}
