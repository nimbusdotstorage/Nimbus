import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="bg-background flex h-screen w-full flex-col items-center justify-center p-4 text-center">
			<h1 className="text-foreground text-4xl font-bold">404 - Page Not Found</h1>
			<p className="text-muted-foreground mt-4 mb-6 text-lg">
				The page you&apos;re looking for doesn&apos;t exist or has been moved.
			</p>
			<Button asChild>
				<Link href="/">Go back home</Link>
			</Button>
		</div>
	);
}
