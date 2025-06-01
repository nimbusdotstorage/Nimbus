"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
	// Create a new QueryClient instance for each session with better configuration
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 5 * 60 * 1000, // 5 minutes
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
