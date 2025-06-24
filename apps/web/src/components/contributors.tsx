import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { GitHub } from "@/components/icons/github";
import { useQuery } from "@tanstack/react-query";
import { GitCommit } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Contributor {
	login: string;
	id: number;
	avatar_url: string;
	contributions: number;
	html_url: string;
	type: string;
	site_admin: boolean;
}

export default function Contributors() {
	const { isPending, error, data } = useQuery({
		queryKey: ["contributorsData"],
		queryFn: async () => {
			const response = await axios.get("https://api.github.com/repos/nimbusdotstorage/Nimbus/contributors", {
				headers: {
					"User-Agent": "Nimbus",
				},
			});
			return response.data;
		},
	});

	if (isPending) {
		return (
			<div className="flex min-h-[400px] w-full items-center justify-center">
				<div className="flex items-center justify-center gap-3">
					<div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
					<span className="text-muted-foreground text-lg">Loading contributors...</span>
				</div>
			</div>
		);
	}

	if (error) {
		console.error(error);
		return (
			<div className="flex min-h-[400px] w-full items-center justify-center px-4">
				<div className="space-y-3 text-center">
					<p className="text-destructive text-lg font-medium">Failed to load contributors</p>
					<p className="text-muted-foreground">Please try again later</p>
				</div>
			</div>
		);
	}

	const contributors = data as Contributor[];

	if (!contributors || contributors.length === 0) {
		return (
			<div className="flex min-h-[400px] w-full items-center justify-center px-4">
				<p className="text-muted-foreground text-lg">No contributors found</p>
			</div>
		);
	}

	const sortedContributors = [...contributors].sort((a, b) => b.contributions - a.contributions);

	return (
		<div className="flex min-h-screen w-full flex-col pt-20">
			<div className="flex-1 space-y-8 px-4 sm:px-6 lg:px-8">
				<div className="space-y-4 text-center">
					<h2 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
						Our Contributors
					</h2>
					<p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl">
						Meet the amazing people who make Nimbus possible
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{sortedContributors.map(contributor => (
						<Card
							key={contributor.id}
							className="group border-border/50 bg-card/50 hover:shadow-primary/20 relative flex min-h-[280px] flex-col overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:aspect-square sm:min-h-0"
						>
							<div className="absolute inset-0 flex items-center justify-center opacity-5 transition-opacity duration-300 group-hover:opacity-10">
								<GitHub variant="outline" className="text-foreground h-32 w-32 sm:h-40 sm:w-40" />
							</div>

							<div className="from-primary/10 absolute inset-0 bg-gradient-to-b via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							<div className="relative z-10 flex h-full flex-col">
								<div className="flex flex-1 flex-col items-center justify-center p-4 text-center sm:p-5">
									<div className="relative mb-3 sm:mb-4">
										<div className="from-primary/30 to-primary/10 absolute inset-0 rounded-full bg-gradient-to-r blur-md transition-all duration-300 group-hover:blur-lg" />
										<Avatar className="ring-border group-hover:ring-primary/40 relative h-12 w-12 ring-2 transition-all duration-300 sm:h-16 sm:w-16">
											<AvatarImage src={contributor.avatar_url} alt={contributor.login} />
											<AvatarFallback className="from-primary/20 to-primary/10 text-primary-foreground bg-gradient-to-br text-xs font-bold sm:text-sm">
												{contributor.login.slice(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</div>

									<div className="flex min-h-[3rem] flex-col justify-center sm:min-h-[4rem]">
										<Link href={contributor.html_url}>
											<CardTitle className="text-foreground hover:text-primary line-clamp-2 text-sm leading-tight font-bold break-words hyphens-auto underline drop-shadow-sm transition-colors sm:text-base">
												{contributor.login}
											</CardTitle>
										</Link>
										<CardDescription className="text-muted-foreground mt-1 text-xs sm:text-sm">
											Contributor
										</CardDescription>
									</div>
								</div>

								<div className="mt-auto flex flex-col items-center gap-2 p-3 pb-6 sm:relative sm:bottom-2 sm:gap-3 sm:p-4 sm:pb-8 md:relative md:bottom-2 md:pb-10 lg:relative lg:bottom-3 lg:pb-12 xl:pb-14 2xl:pb-16">
									<div className="flex items-center gap-2 sm:gap-3">
										<div className="bg-primary/20 flex h-6 w-6 items-center justify-center rounded-full sm:h-8 sm:w-8">
											<GitCommit className="text-primary h-3 w-3 sm:h-5 sm:w-5" />
										</div>
										<span className="text-foreground text-base font-semibold sm:text-xl">
											{contributor.contributions}
										</span>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>

			<div className="border-border/50 bg-background/50 mt-auto border-t px-4 py-6 text-center backdrop-blur-sm sm:px-6 lg:px-8">
				<p className="text-muted-foreground text-base sm:text-lg">
					Want to contribute?
					<a
						href="https://github.com/nimbusdotstorage/Nimbus"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:text-primary/80 ml-2 font-semibold transition-colors hover:underline"
					>
						Join us on GitHub
					</a>
				</p>
			</div>
		</div>
	);
}
