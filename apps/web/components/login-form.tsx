"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "@/packages/auth/src/auth-client";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";
import { Google } from "./icons/google";
import { cn } from "@/web/lib/utils";
import Link from "next/link";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-0", className)} {...props}>
			<Card className="gap-6 py-8">
				<CardHeader className="gap-2">
					<CardTitle className="text-center">Login to experience Nimbus</CardTitle>
					<CardDescription className="text-center">Your data just got better. </CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						<Button variant="outline" className="w-full" onClick={signIn}>
							<Google />
							Login with Google
						</Button>
					</div>
				</CardContent>
			</Card>
			<div className="mt-4 text-center text-sm text-neutral-600">
				By signing in, you agree to our{" "}
				<Link href="/terms" className="underline underline-offset-4">
					terms of service
				</Link>
				.
			</div>
		</div>
	);
}
