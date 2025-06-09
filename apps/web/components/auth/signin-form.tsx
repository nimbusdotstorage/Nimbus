"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import type { ComponentProps, ChangeEvent } from "react";
import { useSignIn } from "@/web/hooks/useAuth";
import { signInSchema, type SignInFormData } from "@/web/schemas";
import { AuthCard } from "./shared/auth-card";
import { SocialAuthButton } from "./shared/social-auth-button";
import { PasswordInput } from "./shared/password-input";
import { FieldError } from "@/web/components/ui/field-error";

export function SignInForm({ className, ...props }: ComponentProps<"div">) {
	const { isLoading, signInWithCredentials, signInWithGoogleProvider } = useSignIn();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: false,
		},
	});

	const passwordValue = watch("password");

	const onSubmit: SubmitHandler<SignInFormData> = async data => {
		await signInWithCredentials(data);
	};

	return (
		<AuthCard
			title="Welcome back to Nimbus.storage"
			description="You do the files, we store them."
			navigationType="signin"
			className={className}
			{...props}
		>
			<div className="flex flex-col gap-4">
				<SocialAuthButton provider="google" action="signin" onClick={signInWithGoogleProvider} disabled={isLoading} />

				<div className="text-center text-muted-foreground text-sm">OR</div>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-semibold text-muted-foreground">
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

					<div className="space-y-2">
						<Label htmlFor="password" className="text-sm font-semibold text-muted-foreground">
							Password
						</Label>
						<PasswordInput
							id="password"
							value={passwordValue}
							onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("password", e.target.value)}
							placeholder="Enter your password"
							autoComplete="current-password"
							aria-invalid={!!errors.password}
						/>
						<FieldError error={errors.password?.message} />
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="remember"
								{...register("remember")}
								onCheckedChange={checked => setValue("remember", !!checked)}
							/>
							<Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
								Remember me
							</Label>
						</div>
						<Link
							href="/forgot-password"
							className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
						>
							Forgot password?
						</Link>
					</div>

					<Button type="submit" className="w-full mt-2 cursor-pointer" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Signing in...
							</>
						) : (
							"Sign in"
						)}
					</Button>
				</form>
			</div>
		</AuthCard>
	);
}
