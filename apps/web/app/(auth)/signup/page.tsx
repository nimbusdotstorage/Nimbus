import { SignupForm } from "@/components/signup-form";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full sm:items-center justify-center">
			<div className="size-full max-w-md sm:max-w-sm py-10 px-2">
				<SignupForm />
		</div>
		</div>
	);
}
