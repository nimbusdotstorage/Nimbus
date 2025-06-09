import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
	return (
		<div className="flex min-h-svh w-full sm:items-center justify-center">
			<div className="size-full max-w-md sm:max-w-sm py-10 px-2">
				<ForgotPasswordForm />
			</div>
		</div>
	);
}
