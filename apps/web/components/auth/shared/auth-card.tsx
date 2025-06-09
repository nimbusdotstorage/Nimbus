"use client";

import { cn } from "lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentProps, ReactNode } from "react";

interface AuthCardProps extends ComponentProps<"div"> {
	title: string;
	description: string;
	navigationType: "signin" | "signup";
	children: ReactNode;
}

export function AuthCard({ title, description, navigationType, children, className, ...props }: AuthCardProps) {
	const oppositeAction = navigationType === "signin" ? "signup" : "signin";
	const oppositeActionText = navigationType === "signin" ? "Sign up" : "Log In";

	return (
		<div className={cn("flex flex-col gap-0 size-full items-center justify-center select-none", className)} {...props}>
			<Card className="gap-6 w-full max-w-md pb-0">
				<CardHeader className="overflow-x-hidden">
					<div className="flex flex-row justify-between items-center -mx-6 border-b">
						<Button className="px-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
							<Link href="/">
								<ArrowLeft />
								Back
							</Link>
						</Button>
						<Button className="px-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
							<Link href={`/${oppositeAction}`}>
								{oppositeActionText}
								<ArrowRight />
							</Link>
						</Button>
					</div>
					<div className="gap-2 pt-6">
						<CardTitle className="text-center text-lg md:text-xl">{title}</CardTitle>
						<CardDescription className="text-center text-xs md:text-sm">{description}</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="px-6">{children}</CardContent>

				<CardFooter className="px-6 py-4">
					<p className="text-center w-full text-sm text-neutral-600">
						By {navigationType === "signin" ? "signing in" : "signing up"}, you agree to our{" "}
						<Link href="/terms" className="underline underline-offset-4 cursor-pointer whitespace-nowrap">
							terms of service
						</Link>
						.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
