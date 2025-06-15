import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn, getInitials } from "@/lib/utils";

const iconvVariants = cva("rounded-full border flex items-center justify-center", {
	variants: {
		size: {
			default: "!size-8 min-w-8 rounded-full",
			sm: "!size-10 min-w-10 rounded-full",
			lg: "!size-12 min-w-12 rounded-full",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

interface ProfileProps extends VariantProps<typeof iconvVariants> {
	className?: string;
	url: string | null;
	name: string;
}

const Profile = ({ className, url, name, size }: ProfileProps) => {
	const initials = getInitials(name);

	return (
		<Avatar className={cn(iconvVariants({ size }), className)}>
			<AvatarImage src={url as string} />
			<AvatarFallback className="rounded-md bg-gray-100 text-sm font-semibold text-gray-500">{initials}</AvatarFallback>
		</Avatar>
	);
};

export default Profile;
