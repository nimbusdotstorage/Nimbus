"use client";

import { cn } from "@/web/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { signInGoogle } from "@/packages/auth/src/auth-client";
import type { ComponentProps } from "react";
import { Google } from "./icons/google";
import { Input } from "./ui/input";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-0 size-full items-center justify-center select-none", className)} {...props}>
			<Card className="gap-6 w-full pb-0">
				<CardHeader>
          <div className="flex flex-row justify-between items-center -mx-6 border-b gap-0">
            <Button className="pl-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
              <Link href={`/`}>
                <ArrowLeft/>
                Go back
              </Link>
            </Button>
            <Button className="pr-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
              <Link href={`/signup`}>
                Sign Up
                <ArrowRight/>
              </Link>
            </Button>
          </div>
          <div className="gap-2 pt-6">
            <CardTitle className="text-center whitespace-nowrap overflow-none">Welcome back to Nimbus.storage</CardTitle>
            <CardDescription className="text-center">You do the files, we store them. </CardDescription> {/* Made this slogan up, hope you like it */}
          </div>
				</CardHeader>
				<CardContent className="px-0">
					<div className="flex flex-col gap-4 px-4 pb-6">
            {/* log in with Google */}
						<Button variant="outline" className="w-full justify-between shadow-lg transition-all duration-250 shadow-blue-600/10 hover:shadow-blue-600/20" onClick={signInGoogle}>
              <Google />
							Log in with Google
              <div className="w-[0.98em]" /> {/* For Text centering */}
						</Button>
            <div className="text-center text-muted-foreground text-sm">OR</div>
            {/* login with email */}
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex flex-col gap-0.5 w-full">
                <div className="font-semibold text-sm text-muted-foreground pl-1">Email</div>
                <Input placeholder="example@0.email" type="email" className="placeholder:text-sm shadow-md"/>
              </div>
              <div className="flex flex-col gap-0.5 w-full">
                <div className="font-semibold text-sm text-muted-foreground pl-1">Password</div>
                {/* WHY IS INPUT PLACEHOLDER MISALIGNED??? TODO: fix */}
                <Input placeholder="password" type="password" className="text-2xl tracking-wider text-primary/75 placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-sm shadow-md"/>
              </div>
              <div className="w-full mt-1">
                <Button className="w-full cursor-pointer font-semibold">Log in</Button>
                <div className="flex flex-row w-full justify-end items-center pt-1 pr-1">
                  <Link href="/reset" className="whitespace-nowrap transition duration-200 text-muted-foreground hover:text-primary text-sm">
                    Reset password
                  </Link>
                </div>
              </div>
            </div>
          </div>
				</CardContent>
			</Card>
			<div className="mt-4 text-center text-sm text-neutral-600">
				By signing in, you agree to our{" "}
				<Link href="/terms" className="underline underline-offset-4 cursor-pointer whitespace-nowrap">
					terms of service
				</Link>
				.
			</div>
		</div>
	);
}
