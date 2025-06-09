"use client";

import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type SocialProvider = "google";
type AuthAction = "signin" | "signup";

interface SocialAuthButtonProps extends Omit<ComponentProps<typeof Button>, "children" | "variant" | "type"> {
	provider: SocialProvider;
	action: AuthAction;
}

const providerConfig = {
	google: {
		icon: Google,
		name: "Google",
	},
} as const;

export function SocialAuthButton({ provider, action, ...props }: SocialAuthButtonProps) {
	const config = providerConfig[provider];
	const IconComponent = config.icon;

	const getActionText = () => {
		return action === "signin" ? `Sign in with ${config.name}` : `Continue with ${config.name}`;
	};

	return (
		<Button
			variant="outline"
			type="button"
			className="w-full cursor-pointer justify-between shadow-lg shadow-blue-600/10 transition-all duration-300 hover:shadow-blue-600/20"
			{...props}
		>
			<IconComponent />
			{getActionText()}
			<div className="w-[0.98em]" />
		</Button>
	);
}
