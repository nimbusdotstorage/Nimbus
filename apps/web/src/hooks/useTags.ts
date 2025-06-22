import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientEnv } from "@/lib/env/client-env";
import axios, { type AxiosError } from "axios";
import type { Tag } from "@/lib/types";
import { toast } from "sonner";

const TAGS_QUERY_KEY = "tags";

export function useTags() {
	const queryClient = useQueryClient();

	const {
		data: tags,
		isLoading,
		error,
	} = useQuery<Tag[]>({
		queryKey: [TAGS_QUERY_KEY],
		queryFn: getTags,
	});

	const createTagMutation = useMutation({
		mutationFn: createTag,
		onSuccess: newTag => {
			toast.success("Tag created successfully");
			// update data locally with the new tag
			queryClient.setQueryData<Tag[]>([TAGS_QUERY_KEY], (oldData = []) => {
				const addRecursive = (tags: Tag[]): Tag[] => {
					return tags.map(tag => {
						if (tag.id === newTag.parentId) {
							return { ...tag, children: [...(tag.children || []), newTag] };
						}
						if (tag.children) {
							return { ...tag, children: addRecursive(tag.children) };
						}
						return tag;
					});
				};
				if (newTag.parentId) {
					return addRecursive(oldData);
				}
				return [...oldData, newTag];
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(error.response?.data?.message || "Failed to create tag");
		},
	});

	const updateTagMutation = useMutation({
		mutationFn: updateTag,
		onSuccess: () => {
			toast.success("Tag updated successfully");
			// invalidate the tags query => new request will be automatically sent to update data
			return queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_KEY] });
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(error.response?.data?.message || "Failed to update tag");
		},
	});

	const deleteTagMutation = useMutation({
		mutationFn: deleteTag,
		onSuccess: (_, deletedId) => {
			toast.success("Tag deleted successfully");
			// remove the tag from the local data
			queryClient.setQueryData<Tag[]>([TAGS_QUERY_KEY], (oldData = []) => {
				const removeRecursive = (tags: Tag[], idToRemove: string): Tag[] => {
					return tags
						.filter(tag => tag.id !== idToRemove)
						.map(tag => {
							if (tag.children && tag.children.length > 0) {
								return { ...tag, children: removeRecursive(tag.children, idToRemove) };
							}
							return tag;
						});
				};
				return removeRecursive(oldData, deletedId);
			});
		},
		onError: (error: AxiosError<{ message: string }>) => {
			toast.error(error.response?.data?.message || "Failed to delete tag");
		},
	});

	return {
		tags: tags ?? [],
		isLoading,
		error,
		createTag: createTagMutation.mutate,
		updateTag: updateTagMutation.mutate,
		deleteTag: deleteTagMutation.mutate,
	};
}

async function getTags(): Promise<Tag[]> {
	const response = await axios.get(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/tags`, {
		withCredentials: true,
	});
	return response.data.data;
}

async function createTag(data: { name: string; color: string; parentId?: string }): Promise<Tag> {
	const response = await axios.post(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/tags`, data, {
		withCredentials: true,
	});
	return response.data.data;
}

async function updateTag({
	id,
	...data
}: {
	id: string;
	name?: string;
	color?: string;
	parentId?: string;
}): Promise<Tag> {
	const response = await axios.put(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/tags/${id}`, data, {
		withCredentials: true,
	});
	return response.data.data;
}

async function deleteTag(id: string): Promise<void> {
	await axios.delete(`${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/tags/${id}`, {
		withCredentials: true,
	});
}
