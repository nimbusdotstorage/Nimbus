import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
	return (
		<div className="flex min-h-svh w-full sm:items-center justify-center">
			<div className="size-full max-w-md sm:max-w-sm py-10 px-2">
				<SignupForm />
			</div>
		</div>
	);
}
