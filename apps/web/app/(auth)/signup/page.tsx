import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
	return (
		<div className="flex min-h-svh w-full justify-center sm:items-center">
			<div className="size-full max-w-md px-2 py-10 sm:max-w-sm">
				<SignupForm />
			</div>
		</div>
	);
}
