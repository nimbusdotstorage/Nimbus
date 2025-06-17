import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import useContributors from "@/hooks/useContributors";
import { Github, GitCommit } from "lucide-react";
import Link from "next/link";

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
	const { isPending, error, data } = useContributors();

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

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-7 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{sortedContributors.map(contributor => (
						<Card
							key={contributor.id}
							className="group border-border/50 bg-card/50 hover:shadow-primary/5 relative flex aspect-square flex-col overflow-hidden shadow-sm backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm"
						>
							<div className="absolute inset-0 flex items-center justify-center opacity-2 transition-opacity duration-300 ease-out group-hover:opacity-3">
								<Github className="text-foreground h-40 w-40" />
							</div>

							<div className="from-primary/3 absolute inset-0 bg-gradient-to-b via-transparent to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

							<div className="relative z-10 flex h-full flex-col">
								<div className="flex flex-1 flex-col items-center justify-center p-5 text-center">
									<div className="relative mb-4">
										<div className="from-primary/10 to-primary/3 absolute inset-0 rounded-full bg-gradient-to-r blur-sm transition-all duration-300 ease-out group-hover:blur-md" />
										<Avatar className="ring-border group-hover:ring-primary/20 relative h-16 w-16 ring-1 transition-all duration-300 ease-out">
											<AvatarImage src={contributor.avatar_url} alt={contributor.login} />
											<AvatarFallback className="from-primary/10 to-primary/3 text-primary-foreground bg-gradient-to-br text-sm font-bold">
												{contributor.login.slice(0, 2).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</div>

									<div className="flex min-h-[4rem] flex-col justify-center">
										<Link href={contributor.html_url}>
											<CardTitle className="text-foreground hover:text-primary/70 line-clamp-2 text-base leading-tight font-bold break-words hyphens-auto underline drop-shadow-sm transition-colors duration-300 ease-out">
												{contributor.login}
											</CardTitle>
										</Link>
										<CardDescription className="text-muted-foreground mt-1 text-sm">Contributor</CardDescription>
									</div>
								</div>

								<div className="flex flex-col items-center gap-3 p-4">
									<div className="relative bottom-3 flex items-center gap-3">
										<div className="bg-primary/10 group-hover:bg-primary/15 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ease-out">
											<GitCommit className="text-primary h-5 w-5" />
										</div>
										<span className="text-foreground text-xl font-semibold">{contributor.contributions}</span>
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
						className="text-primary hover:text-primary/70 ml-2 font-semibold transition-colors duration-300 ease-out hover:underline"
					>
						Join us on GitHub
					</a>
				</p>
			</div>
		</div>
	);
}
