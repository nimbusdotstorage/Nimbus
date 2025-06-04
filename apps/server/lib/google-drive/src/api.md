# About

Types:

- <code><a href="./src/resources/about.ts">User</a></code>
- <code><a href="./src/resources/about.ts">AboutRetrieveResponse</a></code>

Methods:

- <code title="get /about">client.about.<a href="./src/resources/about.ts">retrieve</a>({ ...params }) -> AboutRetrieveResponse</code>

# Apps

Types:

- <code><a href="./src/resources/apps.ts">App</a></code>
- <code><a href="./src/resources/apps.ts">AppListResponse</a></code>

Methods:

- <code title="get /apps/{appId}">client.apps.<a href="./src/resources/apps.ts">retrieve</a>(appID, { ...params }) -> App</code>
- <code title="get /apps">client.apps.<a href="./src/resources/apps.ts">list</a>({ ...params }) -> AppListResponse</code>

# Changes

Types:

- <code><a href="./src/resources/changes.ts">Channel</a></code>
- <code><a href="./src/resources/changes.ts">ChangeListResponse</a></code>
- <code><a href="./src/resources/changes.ts">ChangeGetStartPageTokenResponse</a></code>

Methods:

- <code title="get /changes">client.changes.<a href="./src/resources/changes.ts">list</a>({ ...params }) -> ChangeListResponse</code>
- <code title="get /changes/startPageToken">client.changes.<a href="./src/resources/changes.ts">getStartPageToken</a>({ ...params }) -> ChangeGetStartPageTokenResponse</code>
- <code title="post /changes/watch">client.changes.<a href="./src/resources/changes.ts">subscribe</a>({ ...params }) -> Channel</code>

# Channels

Methods:

- <code title="post /channels/stop">client.channels.<a href="./src/resources/channels.ts">stopWatching</a>({ ...params }) -> void</code>

# Drives

Types:

- <code><a href="./src/resources/drives.ts">Drive</a></code>
- <code><a href="./src/resources/drives.ts">DriveListResponse</a></code>

Methods:

- <code title="post /drives">client.drives.<a href="./src/resources/drives.ts">create</a>({ ...params }) -> Drive</code>
- <code title="get /drives/{driveId}">client.drives.<a href="./src/resources/drives.ts">retrieve</a>(driveID, { ...params }) -> Drive</code>
- <code title="patch /drives/{driveId}">client.drives.<a href="./src/resources/drives.ts">update</a>(driveID, { ...params }) -> Drive</code>
- <code title="get /drives">client.drives.<a href="./src/resources/drives.ts">list</a>({ ...params }) -> DriveListResponse</code>
- <code title="delete /drives/{driveId}">client.drives.<a href="./src/resources/drives.ts">delete</a>(driveID, { ...params }) -> void</code>
- <code title="post /drives/{driveId}/hide">client.drives.<a href="./src/resources/drives.ts">hide</a>(driveID, { ...params }) -> Drive</code>
- <code title="post /drives/{driveId}/unhide">client.drives.<a href="./src/resources/drives.ts">unhide</a>(driveID, { ...params }) -> Drive</code>

# Files

Types:

- <code><a href="./src/resources/files/files.ts">File</a></code>
- <code><a href="./src/resources/files/files.ts">Label</a></code>
- <code><a href="./src/resources/files/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileGenerateIDsResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileListLabelsResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileModifyLabelsResponse</a></code>

Methods:

- <code title="post /files">client.files.<a href="./src/resources/files/files.ts">create</a>({ ...params }) -> File</code>
- <code title="get /files/{fileId}">client.files.<a href="./src/resources/files/files.ts">retrieve</a>(fileID, { ...params }) -> File</code>
- <code title="patch /files/{fileId}">client.files.<a href="./src/resources/files/files.ts">update</a>(fileID, { ...params }) -> File</code>
- <code title="get /files">client.files.<a href="./src/resources/files/files.ts">list</a>({ ...params }) -> FileListResponse</code>
- <code title="delete /files/{fileId}">client.files.<a href="./src/resources/files/files.ts">delete</a>(fileID, { ...params }) -> void</code>
- <code title="post /files/{fileId}/copy">client.files.<a href="./src/resources/files/files.ts">copy</a>(fileID, { ...params }) -> File</code>
- <code title="delete /files/trash">client.files.<a href="./src/resources/files/files.ts">deleteTrashed</a>({ ...params }) -> void</code>
- <code title="get /files/{fileId}/export">client.files.<a href="./src/resources/files/files.ts">export</a>(fileID, { ...params }) -> void</code>
- <code title="get /files/generateIds">client.files.<a href="./src/resources/files/files.ts">generateIDs</a>({ ...params }) -> FileGenerateIDsResponse</code>
- <code title="get /files/{fileId}/listLabels">client.files.<a href="./src/resources/files/files.ts">listLabels</a>(fileID, { ...params }) -> FileListLabelsResponse</code>
- <code title="post /files/{fileId}/modifyLabels">client.files.<a href="./src/resources/files/files.ts">modifyLabels</a>(fileID, { ...params }) -> FileModifyLabelsResponse</code>
- <code title="post /files/{fileId}/watch">client.files.<a href="./src/resources/files/files.ts">watch</a>(fileID, { ...params }) -> Channel</code>

## Comments

Types:

- <code><a href="./src/resources/files/comments/comments.ts">Comment</a></code>
- <code><a href="./src/resources/files/comments/comments.ts">CommentListResponse</a></code>

Methods:

- <code title="post /files/{fileId}/comments">client.files.comments.<a href="./src/resources/files/comments/comments.ts">create</a>(fileID, { ...params }) -> Comment</code>
- <code title="get /files/{fileId}/comments/{commentId}">client.files.comments.<a href="./src/resources/files/comments/comments.ts">retrieve</a>(commentID, { ...params }) -> Comment</code>
- <code title="patch /files/{fileId}/comments/{commentId}">client.files.comments.<a href="./src/resources/files/comments/comments.ts">update</a>(commentID, { ...params }) -> Comment</code>
- <code title="get /files/{fileId}/comments">client.files.comments.<a href="./src/resources/files/comments/comments.ts">list</a>(fileID, { ...params }) -> CommentListResponse</code>
- <code title="delete /files/{fileId}/comments/{commentId}">client.files.comments.<a href="./src/resources/files/comments/comments.ts">delete</a>(commentID, { ...params }) -> void</code>

### Replies

Types:

- <code><a href="./src/resources/files/comments/replies.ts">Reply</a></code>
- <code><a href="./src/resources/files/comments/replies.ts">ReplyListResponse</a></code>

Methods:

- <code title="post /files/{fileId}/comments/{commentId}/replies">client.files.comments.replies.<a href="./src/resources/files/comments/replies.ts">create</a>(commentID, { ...params }) -> Reply</code>
- <code title="get /files/{fileId}/comments/{commentId}/replies/{replyId}">client.files.comments.replies.<a href="./src/resources/files/comments/replies.ts">retrieve</a>(replyID, { ...params }) -> Reply</code>
- <code title="patch /files/{fileId}/comments/{commentId}/replies/{replyId}">client.files.comments.replies.<a href="./src/resources/files/comments/replies.ts">update</a>(replyID, { ...params }) -> Reply</code>
- <code title="get /files/{fileId}/comments/{commentId}/replies">client.files.comments.replies.<a href="./src/resources/files/comments/replies.ts">list</a>(commentID, { ...params }) -> ReplyListResponse</code>
- <code title="delete /files/{fileId}/comments/{commentId}/replies/{replyId}">client.files.comments.replies.<a href="./src/resources/files/comments/replies.ts">delete</a>(replyID, { ...params }) -> void</code>

## Permissions

Types:

- <code><a href="./src/resources/files/permissions.ts">Permission</a></code>
- <code><a href="./src/resources/files/permissions.ts">PermissionListResponse</a></code>

Methods:

- <code title="post /files/{fileId}/permissions">client.files.permissions.<a href="./src/resources/files/permissions.ts">create</a>(fileID, { ...params }) -> Permission</code>
- <code title="get /files/{fileId}/permissions/{permissionId}">client.files.permissions.<a href="./src/resources/files/permissions.ts">retrieve</a>(permissionID, { ...params }) -> Permission</code>
- <code title="patch /files/{fileId}/permissions/{permissionId}">client.files.permissions.<a href="./src/resources/files/permissions.ts">update</a>(permissionID, { ...params }) -> Permission</code>
- <code title="get /files/{fileId}/permissions">client.files.permissions.<a href="./src/resources/files/permissions.ts">list</a>(fileID, { ...params }) -> PermissionListResponse</code>
- <code title="delete /files/{fileId}/permissions/{permissionId}">client.files.permissions.<a href="./src/resources/files/permissions.ts">delete</a>(permissionID, { ...params }) -> void</code>

## Revisions

Types:

- <code><a href="./src/resources/files/revisions.ts">Revision</a></code>
- <code><a href="./src/resources/files/revisions.ts">RevisionListResponse</a></code>

Methods:

- <code title="get /files/{fileId}/revisions/{revisionId}">client.files.revisions.<a href="./src/resources/files/revisions.ts">retrieve</a>(revisionID, { ...params }) -> Revision</code>
- <code title="patch /files/{fileId}/revisions/{revisionId}">client.files.revisions.<a href="./src/resources/files/revisions.ts">update</a>(revisionID, { ...params }) -> Revision</code>
- <code title="get /files/{fileId}/revisions">client.files.revisions.<a href="./src/resources/files/revisions.ts">list</a>(fileID, { ...params }) -> RevisionListResponse</code>
- <code title="delete /files/{fileId}/revisions/{revisionId}">client.files.revisions.<a href="./src/resources/files/revisions.ts">delete</a>(revisionID, { ...params }) -> void</code>

# Teamdrives

Types:

- <code><a href="./src/resources/teamdrives.ts">TeamDrive</a></code>
- <code><a href="./src/resources/teamdrives.ts">TeamdriveListResponse</a></code>

Methods:

- <code title="post /teamdrives">client.teamdrives.<a href="./src/resources/teamdrives.ts">create</a>({ ...params }) -> TeamDrive</code>
- <code title="get /teamdrives/{teamDriveId}">client.teamdrives.<a href="./src/resources/teamdrives.ts">retrieve</a>(teamDriveID, { ...params }) -> TeamDrive</code>
- <code title="patch /teamdrives/{teamDriveId}">client.teamdrives.<a href="./src/resources/teamdrives.ts">update</a>(teamDriveID, { ...params }) -> TeamDrive</code>
- <code title="get /teamdrives">client.teamdrives.<a href="./src/resources/teamdrives.ts">list</a>({ ...params }) -> TeamdriveListResponse</code>
- <code title="delete /teamdrives/{teamDriveId}">client.teamdrives.<a href="./src/resources/teamdrives.ts">delete</a>(teamDriveID, { ...params }) -> void</code>
