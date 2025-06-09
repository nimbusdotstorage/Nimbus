"use client";

import { cn } from "@/web/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { signIn } from "@/packages/auth/src/auth-client";
import type { ComponentProps } from "react";
import { Google } from "@/components/icons/google";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-0", className)} {...props}>
			<Card className="py-8 gap-6">
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
				<Link href="/terms" className="underline underline-offset-4 cursor-pointer">
					terms of service
				</Link>
				.
			</div>
		</div>
	);
}
