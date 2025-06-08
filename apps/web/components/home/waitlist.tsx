"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/web/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import NumberFlow from "@number-flow/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { GitHub } from "@/components/icons/github";

const formSchema = z.object({
	email: z.string().email(),
});

// this is a copy of Analogs waitlist component with some changes
// https://github.com/analogdotnow/Analog/blob/main/apps/web/src/components/sections/home/waitlist-form.tsx
type FormSchema = z.infer<typeof formSchema>;

// API functions for Hono backend
async function getWaitlistCount(): Promise<{ count: number }> {
	return fetch("/api/waitlist/count").then(res => {
		if (!res.ok) {
			throw new Error("Failed to get waitlist count");
		}
		return res.json();
	});
}

async function joinWaitlist(email: string): Promise<void> {
	const response = await fetch("/api/waitlist/join", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	});
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.error || "Failed to join waitlist");
	}
}

const LOCAL_STORAGE_KEY = "waitlist_count";
const CACHE_DURATION = 2 * 60 * 60 * 1000;

function useWaitlistCount() {
	const queryClient = useQueryClient();
	const [success, setSuccess] = useState(false);

	const query = useQuery({
		queryKey: ["waitlist", "count"],
		queryFn: async () => {
			// Try to get cached data from localStorage
			const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
			if (cachedData) {
				try {
					const { count, timestamp } = JSON.parse(cachedData);
					const isExpired = Date.now() - timestamp > CACHE_DURATION;

					// If cache is still valid, return the cached count
					if (!isExpired) {
						return { count };
					}
				} catch (e) {
					// If there's an error parsing the cache, continue to fetch fresh data
					console.error("Error parsing waitlist cache:", e);
				}
			}

			// If no cache or cache is expired, fetch fresh data
			const data = await getWaitlistCount();

			// set localStorage with fresh data
			localStorage.setItem(
				LOCAL_STORAGE_KEY,
				JSON.stringify({
					count: data.count,
					timestamp: Date.now(),
				})
			);

			return data;
		},
		staleTime: CACHE_DURATION, // Mark as stale after cache duration
		gcTime: CACHE_DURATION * 2, // Keep in cache for double the duration
	});

	const { mutate } = useMutation({
		mutationFn: (email: string) => joinWaitlist(email),
		onSuccess: () => {
			setSuccess(true);
			const newCount = (query.data?.count ?? 0) + 1;
			queryClient.setQueryData(["waitlist", "count"], { count: newCount });
			// set localStorage with the new count
			localStorage.setItem(
				LOCAL_STORAGE_KEY,
				JSON.stringify({
					count: newCount,
					timestamp: Date.now(),
				})
			);
		},
		onError: error => {
			const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
			toast.error(errorMessage);
		},
	});

	return { count: query.data?.count ?? 0, mutate, success };
}

interface WaitlistFormProps {
	className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps) {
	const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const waitlist = useWaitlistCount();

	function handleJoinWaitlist({ email }: FormSchema) {
		waitlist.mutate(email);
	}

	return (
		<div className={cn("mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-3", className)}>
			{waitlist.success ? (
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<p className="text-xl font-semibold">Welcome to the waitlist! 🎉</p>
					<p className="text-base text-muted-foreground">
						We&apos;ll let you know when we&#39;re ready to show you what we&#39;ve been working on.
					</p>
				</div>
			) : (
				<form
					className="mx-auto flex w-full max-w-lg flex-col gap-3 sm:flex-row"
					onSubmit={handleSubmit(handleJoinWaitlist)}
				>
					<Input
						placeholder="example@0.email"
						className="h-11 w-full rounded-lg bg-white px-4 text-base font-medium outline outline-neutral-200 placeholder:font-medium placeholder:text-muted-foreground md:text-base"
						{...register("email")}
					/>
					<Button
						className="h-11 w-full pr-3 pl-4 text-base sm:w-fit rounded-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000 before:ease-in-out"
						type="submit"
					>
						Join Waitlist
					</Button>
				</form>
			)}
			<div className="relative flex flex-row items-center justify-center gap-3">
				<span className="text-sm text-orange-500 sm:text-base dark:text-orange-400">
					<NumberFlow value={waitlist.count} /> people already joined the waitlist
				</span>
				<Button variant="ghost" asChild>
					<a href="https://github.com/nimbusdotstorage/Nimbus" target="_blank" rel="noopener noreferrer">
						<GitHub />
					</a>
				</Button>
			</div>
		</div>
	);
}
