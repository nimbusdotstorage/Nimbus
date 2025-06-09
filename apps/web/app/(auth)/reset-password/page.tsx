import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

function ResetPasswordContent() {
	return (
		<div className="flex min-h-svh w-full sm:items-center justify-center">
			<div className="size-full max-w-md sm:max-w-sm py-10 px-2">
				<ResetPasswordForm />
			</div>
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense>
			<ResetPasswordContent />
		</Suspense>
	);
}
