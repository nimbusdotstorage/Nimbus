"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useForgotPassword } from "@/web/hooks/useAuth";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/web/schemas";
import { FieldError } from "@/web/components/ui/field-error";

export function ForgotPasswordForm({ ...props }: ComponentProps<"div">) {
	const { isLoading, sendResetEmail } = useForgotPassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit: SubmitHandler<ForgotPasswordFormData> = async data => {
		await sendResetEmail(data);
	};

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
						<CardTitle className="text-center text-lg md:text-xl">Reset your password</CardTitle>
						<CardDescription className="text-center text-xs md:text-sm">
							Enter your email to receive a password reset link.
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="px-6">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-semibold">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="example@0.email"
								className="shadow-md"
								{...register("email")}
								aria-invalid={!!errors.email}
								autoComplete="email"
							/>
							<FieldError error={errors.email?.message} />
						</div>

						<Button type="submit" className="w-full mt-2 cursor-pointer" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Sending reset link...
								</>
							) : (
								"Send Reset Link"
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
