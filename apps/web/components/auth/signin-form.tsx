"use client";

import { cn } from "@/web/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { signInWithGoogle, signInWithEmail } from "@repo/auth/methods";
import { useState, type ComponentProps } from "react";
import { Google } from "../icons/google";
import { Input } from "../ui/input";
import { ArrowLeft, ArrowRight, Eye, EyeClosed, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signinSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	remember: z.boolean(),
});

type SigninFormData = z.infer<typeof signinSchema>;

export function SignInForm({ className, ...props }: ComponentProps<"div">) {
	const router = useRouter();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SigninFormData>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: true,
		},
	});

	const onSubmit: SubmitHandler<SigninFormData> = async data => {
		try {
			await signInWithEmail(data.email, data.password, data.remember);
			toast.success("Successfully signed in! Redirecting...");
			router.push("/app");
		} catch (error) {
			if (error instanceof Error && error.message.toLowerCase().includes("auth")) {
				toast.error("Invalid credentials. Please check your email and password.");
			} else {
				toast.error("Unable to sign in at the moment. Please try again later.");
			}
		}
	};

	return (
		<div className={cn("flex flex-col gap-0 size-full items-center justify-center select-none", className)} {...props}>
			<Card className="gap-6 w-full pb-0">
				<CardHeader>
					<div className="flex flex-row justify-between items-center -mx-6 border-b gap-0">
						<Button className="pl-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
							<Link href={`/`}>
								<ArrowLeft />
								Go back
							</Link>
						</Button>
						<Button className="pr-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
							<Link href={`/signup`}>
								Sign Up
								<ArrowRight />
							</Link>
						</Button>
					</div>
					<div className="gap-2 pt-6">
						<CardTitle className="text-center text-lg md:text-xl">Welcome back to Nimbus.storage</CardTitle>
						<CardDescription className="text-center">You do the files, we store them.</CardDescription>
					</div>
				</CardHeader>
				<CardContent className="px-0">
					<div className="flex flex-col gap-4 px-4 pb-6">
						<div
							className={cn(
								"flex-col w-full justify-center items-center p-3 border rounded-md bg-orange-400/40",
								"hidden" // Hide notice
							)}
						>
							<div className="font-semibold">Notice:</div>
							<div>We are currently experiencing increased usage. Some logins may be throttled.</div>
						</div>

						<Button
							variant="outline"
							type="button"
							className="w-full justify-between shadow-lg transition-all duration-250 shadow-blue-600/10 hover:shadow-blue-600/20"
							onClick={signInWithGoogle}
							disabled={isSubmitting}
						>
							<Google />
							Sign in with Google
							<div className="w-[0.98em]" />
						</Button>

						<div className="text-center text-muted-foreground text-sm">OR</div>

						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
							<div className="flex flex-col gap-0.5 w-full">
								<div className="font-semibold text-sm text-muted-foreground pl-1">Email</div>
								<Input
									placeholder="example@0.email"
									type="email"
									className="placeholder:text-sm shadow-md"
									{...register("email")}
									aria-invalid={!!errors.email}
									autoComplete="email"
								/>
								{errors.email && <span className="text-sm text-destructive pl-1">{errors.email.message}</span>}
							</div>

							<div className="flex flex-col gap-0.5 w-full">
								<div className="font-semibold text-sm text-muted-foreground pl-1">Password</div>
								<div className="flex flex-row gap-2 items-center">
									<Input
										placeholder="password"
										type={isPasswordVisible ? "text" : "password"}
										className="text-2xl tracking-wider text-primary/75 placeholder:text-muted-foreground placeholder:tracking-normal placeholder:text-sm shadow-md flex-grow"
										{...register("password")}
										aria-invalid={!!errors.password}
										autoComplete="current-password"
									/>
									<Button
										variant="outline"
										size="icon"
										type="button"
										onClick={() => setIsPasswordVisible(!isPasswordVisible)}
										className="shrink-0"
									>
										{!isPasswordVisible ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</Button>
								</div>
								{errors.password && <span className="text-sm text-destructive pl-1">{errors.password.message}</span>}
							</div>

							<div className="w-full mt-1">
								<Button type="submit" className="w-full cursor-pointer font-semibold" disabled={isSubmitting}>
									{isSubmitting ? <Loader2 className="animate-spin" /> : "Sign in"}
								</Button>
								<div className="flex flex-row w-full justify-end items-center pt-1 pr-1">
									<Link
										href="/password-reset"
										className="whitespace-nowrap transition duration-200 text-muted-foreground hover:text-primary text-sm"
									>
										Reset password
									</Link>
								</div>
							</div>
						</form>
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
