"use client";

import { cn } from "@/web/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useState, type ComponentProps } from "react";
import { Google } from "@/components/icons/google";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeClosed, Loader2, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { SegmentedProgress } from "@/components/ui/segmented-progress";
import { signUpWithEmail, signInWithGoogle } from "@repo/auth/methods";
import Image from "next/image";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

const signupSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Please enter a valid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(100, "Password must be less than 100 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number"),
		confirmPassword: z.string(),
		image: z.instanceof(File).optional(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type SignupFormData = z.infer<typeof signupSchema>;

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlEmail = searchParams.get("email");
	const [showPasswordAndTos, setShowPasswordAndTos] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		trigger,
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			email: urlEmail ?? "",
			firstName: "",
			lastName: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setValue("image", file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleContinue = async () => {
		const isValid = await trigger(["firstName", "lastName", "email"]);
		if (isValid) {
			setShowPasswordAndTos(true);
		}
	};

	const handleGoBack = () => {
		setShowPasswordAndTos(false);
	};

	const onSubmit = async (data: SignupFormData) => {
		try {
			await signUpWithEmail(`${data.firstName} ${data.lastName}`, data.email, data.password);

			// If there's an image, update the user's profile
			if (data.image) {
				try {
					const _imageBase64 = await convertImageToBase64(data.image);
					console.log(_imageBase64);
					// TODO: Add API endpoint to update user profile image
					toast.info("Profile image upload will be supported soon!");
				} catch (error) {
					console.error("Failed to process image:", error);
					toast.error("Couldn't upload profile picture. You can add it later in your account settings.");
				}
			}

			toast.success("Account created successfully! Welcome to Nimbus");
			router.push("/app");
		} catch (error) {
			if (error instanceof Error) {
				if (error.message.toLowerCase().includes("exists")) {
					toast.error("An account with this email already exists. Please sign in instead.");
				} else if (error.message.toLowerCase().includes("password")) {
					toast.error("Password doesn't meet requirements. Please check and try again.");
				} else {
					toast.error(error.message);
				}
			} else {
				toast.error("Unable to create your account. Please try again later.");
			}
		}
	};

	return (
		<div className={cn("flex flex-col gap-0 size-full items-center justify-center select-none", className)} {...props}>
			<Card className="gap-6 w-full max-w-md pb-0">
				<CardHeader className="overflow-x-hidden">
					<div className="flex flex-row justify-start items-center -mx-6 border-b">
						<Button className="px-6 py-6 rounded-none font-semibold cursor-pointer" variant="link" asChild>
							<Link href={`/signin`}>
								<ArrowLeft className="mr-2" />
								Log In
							</Link>
						</Button>
					</div>
					<SegmentedProgress segments={2} value={showPasswordAndTos ? 2 : 1} />
					<div className="gap-2 pt-6">
						<CardTitle className="text-center text-lg md:text-xl">Sign up for Nimbus.storage</CardTitle>
						<CardDescription className="text-center text-xs md:text-sm">
							{!showPasswordAndTos ? "Let's create your Nimbus storage account" : "Let's secure your account"}
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent className="px-6">
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
						{!showPasswordAndTos && (
							<>
								<Button
									variant="outline"
									type="button"
									className="w-full justify-between shadow-lg transition-all duration-250 shadow-blue-600/10 hover:shadow-blue-600/20"
									onClick={signInWithGoogle}
									disabled={isSubmitting}
								>
									<Google />
									Continue with Google
									<div className="w-[0.98em]" />
								</Button>

								<div className="text-center text-muted-foreground text-sm">OR</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-2">
										<Label htmlFor="firstName">First name</Label>
										<Input
											id="firstName"
											placeholder="John"
											className="shadow-md"
											{...register("firstName")}
											aria-invalid={!!errors.firstName}
										/>
										{errors.firstName && <span className="text-sm text-destructive">{errors.firstName.message}</span>}
									</div>
									<div className="grid gap-2">
										<Label htmlFor="lastName">Last name</Label>
										<Input
											id="lastName"
											placeholder="Doe"
											className="shadow-md"
											{...register("lastName")}
											aria-invalid={!!errors.lastName}
										/>
										{errors.lastName && <span className="text-sm text-destructive">{errors.lastName.message}</span>}
									</div>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="example@email.com"
										className="shadow-md"
										{...register("email")}
										aria-invalid={!!errors.email}
									/>
									{errors.email && <span className="text-sm text-destructive">{errors.email.message}</span>}
								</div>

								<div className="grid gap-2">
									<Label htmlFor="image">Profile Image (optional)</Label>
									<div className="flex items-end gap-4">
										{imagePreview && (
											<div className="relative w-16 h-16 rounded-sm overflow-hidden">
												<Image src={imagePreview} alt="Profile preview" layout="fill" objectFit="cover" />
											</div>
										)}
										<div className="flex items-center gap-2 w-full">
											<Input
												id="image"
												type="file"
												accept="image/*"
												onChange={handleImageChange}
												className="w-full shadow-md"
											/>
											{imagePreview && (
												<X
													className="cursor-pointer"
													onClick={() => {
														setValue("image", undefined);
														setImagePreview(null);
													}}
												/>
											)}
										</div>
									</div>
								</div>

								<Button
									type="button"
									className="w-full cursor-pointer font-semibold"
									onClick={handleContinue}
									disabled={isSubmitting}
								>
									{isSubmitting ? <Loader2 className="animate-spin" /> : "Continue"}
								</Button>
							</>
						)}

						{showPasswordAndTos && (
							<>
								<div className="flex flex-col gap-4">
									<div className="flex flex-col gap-2">
										<div className="flex justify-between items-center">
											<Label htmlFor="password">Password</Label>
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
											className="shadow-md"
											placeholder="Enter your password"
											{...register("password")}
											aria-invalid={!!errors.password}
										/>
										{errors.password && <span className="text-sm text-destructive">{errors.password.message}</span>}
									</div>

									<div className="flex flex-col gap-2">
										<Label htmlFor="confirmPassword">Confirm Password</Label>
										<Input
											id="confirmPassword"
											type={isPasswordVisible ? "text" : "password"}
											className="shadow-md"
											placeholder="Confirm your password"
											{...register("confirmPassword")}
											aria-invalid={!!errors.confirmPassword}
										/>
										{errors.confirmPassword && (
											<span className="text-sm text-destructive">{errors.confirmPassword.message}</span>
										)}
									</div>

									<div className="flex gap-4 mt-2">
										<Button type="button" variant="outline" onClick={handleGoBack} disabled={isSubmitting}>
											<ArrowLeft className="mr-2 h-4 w-4" />
											Back
										</Button>
										<Button type="submit" className="flex-1" disabled={isSubmitting}>
											{isSubmitting ? <Loader2 className="animate-spin" /> : "Create Account"}
										</Button>
									</div>
								</div>
							</>
						)}
					</form>
				</CardContent>

				<CardFooter className="px-6 py-4">
					<p className="text-center w-full text-sm text-neutral-600">
						By signing up, you agree to our{" "}
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
