"use client";

import { useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import type { ComponentProps } from "react";

interface PasswordInputProps extends Omit<ComponentProps<typeof Input>, "type"> {
	value?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<div className="relative">
			<Input type={isVisible ? "text" : "password"} className={className} {...props} />
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent disabled:pointer-events-none "
				onClick={toggleVisibility}
				aria-label={isVisible ? "Hide password" : "Show password"}
			>
				{isVisible ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
			</Button>
		</div>
	);
}
