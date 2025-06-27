export interface File {
	id: string;
	name: string;
	// TODO: (string or number): determine how Google, OneDrive, etc format their size and how to convert them. a string that represent bytes might make sense
	size: string | null;
	// TODO: (format): determine how Google, OneDrive, etc format their dates
	creationDate: string | null;
	modificationDate: string | null;
}
