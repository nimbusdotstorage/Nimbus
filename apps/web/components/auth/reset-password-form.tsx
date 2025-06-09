"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, ArrowLeft, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useResetPassword } from "@/web/hooks/useAuth";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/web/schemas";
import { FieldError } from "@/web/components/ui/field-error";
import { useState } from "react";

export function ResetPasswordForm({ ...props }: ComponentProps<"div">) {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");
	const token = searchParams.get("token");
	const { isLoading, resetPassword } = useResetPassword();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<ResetPasswordFormData> = async data => {
		if (!token) {
			throw new Error("Reset token is missing");
		}
		await resetPassword(data, token);
	};

	if (error === "invalid_token" || !token) {
		return (
			<div className="flex flex-col gap-0 size-full items-center justify-center select-none" {...props}>
				<Card className="gap-6 w-full max-w-md pb-0">
					<CardHeader className="overflow-x-hidden">
						<div className="flex flex-row justify-start items-center -mx-6 border-b">
							<Button className="px-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
								<Link href="/">
									<ArrowLeft />
									Back
								</Link>
							</Button>
						</div>
						<div className="gap-2 pt-6">
							<CardTitle className="text-center text-lg md:text-xl">Invalid Reset Link</CardTitle>
							<CardDescription className="text-center text-xs md:text-sm">
								This password reset link is invalid or has expired.
							</CardDescription>
						</div>
					</CardHeader>

					<CardContent className="px-6">
						<p className="text-center text-muted-foreground">Please request a new password reset link to continue.</p>
					</CardContent>

					<CardFooter className="px-6 py-4">
						<Button asChild className="w-full">
							<Link href="/forgot-password">Request New Reset Link</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-0 size-full items-center justify-center select-none" {...props}>
			<Card className="gap-6 w-full max-w-md pb-0">
				<CardHeader className="overflow-x-hidden">
					<div className="flex flex-row justify-start items-center -mx-6 border-b">
						<Button className="px-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
							<Link href="/">
								<ArrowLeft />
								Back
							</Link>
						</Button>
					</div>
					<div className="gap-2 pt-6">
						<CardTitle className="text-center text-lg md:text-xl">Reset Password</CardTitle>
						<CardDescription className="text-center text-xs md:text-sm">Enter your new password below.</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="px-6">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<Label htmlFor="password" className="text-sm font-semibold">
									New Password
								</Label>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								>
									{isPasswordVisible ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
								</Button>
							</div>
							<Input
								id="password"
								type={isPasswordVisible ? "text" : "password"}
								placeholder="Enter your new password"
								className="shadow-md"
								{...register("password")}
								aria-invalid={!!errors.password}
								autoComplete="new-password"
							/>
							<FieldError error={errors.password?.message} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword" className="text-sm font-semibold">
								Confirm Password
							</Label>
							<Input
								id="confirmPassword"
								type={isPasswordVisible ? "text" : "password"}
								placeholder="Confirm your new password"
								className="shadow-md"
								{...register("confirmPassword")}
								aria-invalid={!!errors.confirmPassword}
								autoComplete="new-password"
							/>
							<FieldError error={errors.confirmPassword?.message} />
						</div>

						<Button type="submit" className="w-full mt-2 cursor-pointer" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Resetting password...
								</>
							) : (
								"Reset Password"
							)}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="px-6 py-4">
					<p className="text-center w-full text-sm text-neutral-600">
						By continuing, you agree to our{" "}
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
