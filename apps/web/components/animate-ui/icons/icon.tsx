"use client";

import { useAnimation, type SVGMotionProps, type AnimationControls, type Variants } from "motion/react";
import {
	createContext,
	useContext,
	useCallback,
	useEffect,
	useRef,
	useState,
	Children,
	cloneElement,
	type ReactElement,
	type ComponentType,
	type MouseEvent,
} from "react";

import { cn } from "@/web/lib/utils";

const staticAnimations = {
	path: {
		initial: { pathLength: 1, opacity: 1 },
		animate: {
			pathLength: [0.05, 1],
			opacity: [0, 1],
			transition: {
				duration: 0.8,
				ease: "easeInOut",
				opacity: { duration: 0.01 },
			},
		},
	} as Variants,
	"path-loop": {
		initial: { pathLength: 1, opacity: 1 },
		animate: {
			pathLength: [1, 0.05, 1],
			opacity: [1, 0, 1],
			transition: {
				duration: 1.6,
				ease: "easeInOut",
				opacity: { duration: 0.01 },
			},
		},
	} as Variants,
} as const;

type StaticAnimations = keyof typeof staticAnimations;
type TriggerProp<T = string> = boolean | StaticAnimations | T;

interface AnimateIconContextValue {
	controls: AnimationControls | undefined;
	animation: StaticAnimations | string;
	loop: boolean;
	loopDelay: number;
}

interface DefaultIconProps<T = string> {
	animate?: TriggerProp<T>;
	onAnimateChange?: (value: boolean, animation: StaticAnimations | string) => void;
	animateOnHover?: TriggerProp<T>;
	animateOnTap?: TriggerProp<T>;
	animation?: T | StaticAnimations;
	loop?: boolean;
	loopDelay?: number;
	onAnimateStart?: () => void;
	onAnimateEnd?: () => void;
}

interface AnimateIconProps<T = string> extends DefaultIconProps<T> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: ReactElement<any, any>;
}

interface IconProps<T>
	extends DefaultIconProps<T>,
		Omit<SVGMotionProps<SVGSVGElement>, "animate" | "onAnimationStart" | "onAnimationEnd"> {
	size?: number;
}

interface IconWrapperProps<T> extends IconProps<T> {
	icon: ComponentType<IconProps<T>>;
}

const AnimateIconContext = createContext<AnimateIconContextValue | null>(null);

function useAnimateIconContext() {
	const context = useContext(AnimateIconContext);
	if (!context)
		return {
			controls: undefined,
			animation: "default",
			loop: false,
			loopDelay: 0,
		};
	return context;
}

function AnimateIcon({
	animate,
	onAnimateChange,
	animateOnHover,
	animateOnTap,
	animation = "default",
	loop = false,
	loopDelay = 0,
	onAnimateStart,
	onAnimateEnd,
	children,
}: AnimateIconProps) {
	const controls = useAnimation();
	const [localAnimate, setLocalAnimate] = useState(!!animate);
	const currentAnimation = useRef(animation);

	const startAnimation = useCallback(
		(trigger: TriggerProp) => {
			currentAnimation.current = typeof trigger === "string" ? trigger : animation;
			setLocalAnimate(true);
		},
		[animation]
	);

	const stopAnimation = useCallback(() => {
		setLocalAnimate(false);
	}, []);

	useEffect(() => {
		currentAnimation.current = typeof animate === "string" ? animate : animation;
		setLocalAnimate(!!animate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [animate]);

	useEffect(() => onAnimateChange?.(localAnimate, currentAnimation.current), [localAnimate, onAnimateChange]);

	useEffect(() => {
		if (localAnimate) onAnimateStart?.();
		void controls.start(localAnimate ? "animate" : "initial").then(() => {
			if (localAnimate) onAnimateEnd?.();
		});
	}, [localAnimate, controls, onAnimateStart, onAnimateEnd]);

	const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
		if (animateOnHover) startAnimation(animateOnHover);
		children.props?.onMouseEnter?.(e);
	};
	const handleMouseLeave = (e: MouseEvent) => {
		if (animateOnHover || animateOnTap) stopAnimation();
		children.props?.onMouseLeave?.(e);
	};
	const handlePointerDown = (e: PointerEvent) => {
		if (animateOnTap) startAnimation(animateOnTap);
		children.props?.onPointerDown?.(e);
	};
	const handlePointerUp = (e: PointerEvent) => {
		if (animateOnTap) stopAnimation();
		children.props?.onPointerUp?.(e);
	};

	const child = Children.only(children);
	const cloned = cloneElement(child, {
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		onPointerDown: handlePointerDown,
		onPointerUp: handlePointerUp,
	});

	return (
		<AnimateIconContext.Provider
			value={{
				controls,
				animation: currentAnimation.current,
				loop,
				loopDelay,
			}}
		>
			{cloned}
		</AnimateIconContext.Provider>
	);
}

const pathClassName = "[&_[stroke-dasharray='1px_1px']]:![stroke-dasharray:1px_0px]";

function IconWrapper<T extends string>({
	size = 28,
	animation: animationProp,
	animate,
	onAnimateChange,
	animateOnHover = false,
	animateOnTap = false,
	icon: IconComponent,
	loop = false,
	loopDelay = 0,
	onAnimateStart,
	onAnimateEnd,
	className,
	...props
}: IconWrapperProps<T>) {
	const context = useContext(AnimateIconContext);

	if (context) {
		const { controls, animation: parentAnimation, loop: parentLoop, loopDelay: parentLoopDelay } = context;
		const animationToUse = animationProp ?? parentAnimation;
		const loopToUse = loop || parentLoop;
		const loopDelayToUse = loopDelay || parentLoopDelay;

		return (
			<AnimateIconContext.Provider
				value={{
					controls,
					animation: animationToUse,
					loop: loopToUse,
					loopDelay: loopDelayToUse,
				}}
			>
				<IconComponent
					size={size}
					className={cn(className, (animationToUse === "path" || animationToUse === "path-loop") && pathClassName)}
					{...props}
				/>
			</AnimateIconContext.Provider>
		);
	}

	if (animate !== undefined || onAnimateChange !== undefined || animateOnHover || animateOnTap || animationProp) {
		return (
			<AnimateIcon
				animate={animate}
				onAnimateChange={onAnimateChange}
				animateOnHover={animateOnHover}
				animateOnTap={animateOnTap}
				animation={animationProp}
				loop={loop}
				loopDelay={loopDelay}
				onAnimateStart={onAnimateStart}
				onAnimateEnd={onAnimateEnd}
			>
				<IconComponent
					size={size}
					className={cn(className, (animationProp === "path" || animationProp === "path-loop") && pathClassName)}
					{...props}
				/>
			</AnimateIcon>
		);
	}

	return (
		<IconComponent
			size={size}
			className={cn(className, (animationProp === "path" || animationProp === "path-loop") && pathClassName)}
			{...props}
		/>
	);
}

function getVariants<V extends { default: T; [key: string]: T }, T extends Record<string, Variants>>(animations: V): T {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { animation: animationType, loop, loopDelay } = useAnimateIconContext();
	let result: T;

	if (animationType in staticAnimations) {
		const variant = staticAnimations[animationType as StaticAnimations];
		result = {} as T;
		for (const key in animations.default) {
			if ((animationType === "path" || animationType === "path-loop") && key.includes("group")) continue;
			result[key] = variant as T[Extract<keyof T, string>];
		}
	} else {
		result = (animations[animationType as keyof V] as T) ?? animations.default;
	}

	if (loop) {
		for (const key in result) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const state = result[key] as any;
			const transition = state.animate?.transition;
			if (!transition) continue;

			const hasNestedKeys = Object.values(transition).some(
				v => typeof v === "object" && v !== null && ("ease" in v || "duration" in v || "times" in v)
			);

			if (hasNestedKeys) {
				for (const prop in transition) {
					const subTrans = transition[prop];
					if (typeof subTrans === "object" && subTrans !== null) {
						transition[prop] = {
							...subTrans,
							repeat: Infinity,
							repeatType: "loop",
							repeatDelay: loopDelay,
						};
					}
				}
			} else {
				state.animate.transition = {
					...transition,
					repeat: Infinity,
					repeatType: "loop",
					repeatDelay: loopDelay,
				};
			}
		}
	}

	return result;
}

export {
	pathClassName,
	staticAnimations,
	AnimateIcon,
	IconWrapper,
	useAnimateIconContext,
	getVariants,
	type IconProps,
	type IconWrapperProps,
	type AnimateIconProps,
	type AnimateIconContextValue,
};
