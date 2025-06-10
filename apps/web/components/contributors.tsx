import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useContributors from "../hooks/useContributors";
import { Github, GitCommit } from "lucide-react";

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
		<div className="w-full max-w-none space-y-8 px-4 sm:px-6 lg:px-8">
			<div className="mt-5 space-y-4 text-center">
				<h2 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
					Our Contributors
				</h2>
				<p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl">
					Meet the amazing people who make Nimbus possible
				</p>
			</div>

			<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{sortedContributors.map(contributor => (
					<Card
						key={contributor.id}
						className="group flex aspect-square flex-col border-white/20 bg-white/10 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-2xl"
					>
						<CardHeader className="flex-shrink-0 pt-4 pb-2 text-center">
							<div className="flex flex-col items-center gap-2">
								<Avatar className="ring-primary/20 group-hover:ring-primary/40 h-10 w-10 flex-shrink-0 ring-2 transition-all duration-300">
									<AvatarImage src={contributor.avatar_url} alt={contributor.login} />
									<AvatarFallback className="bg-primary/10 text-xs font-semibold">
										{contributor.login.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="flex h-12 w-full flex-col justify-center px-1">
									<CardTitle className="line-clamp-2 text-sm leading-tight font-semibold break-words hyphens-auto">
										{contributor.login}
									</CardTitle>
									<CardDescription className="mt-0.5 line-clamp-1 text-xs">
										{contributor.type === "User" ? "Contributor" : contributor.type}
									</CardDescription>
								</div>
							</div>
						</CardHeader>

						<CardContent className="flex flex-grow flex-col justify-between space-y-3 pt-0 pb-4 text-center">
							<div className="flex items-center justify-center gap-1">
								<GitCommit className="text-muted-foreground h-3 w-3" />
								<span className="text-xs font-semibold">{contributor.contributions}</span>
							</div>

							<a
								href={contributor.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary group/link mx-auto mt-auto inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-white/10"
								title={`View ${contributor.login}'s GitHub profile`}
							>
								<Github className="h-4 w-4" />
							</a>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="mb-5 pt-6 text-center">
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
