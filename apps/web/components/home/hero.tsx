import HeroDark from "@/web/public/images/hero-dark.png";
import HeroLight from "@/web/public/images/hero-light.png";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { WaitlistForm } from "@/components/home/waitlist";
import GoogleDriveIcon from "@/web/public/googledrive";
import Header from "@/components/home/header";
import Image from "next/image";

const transitionVariants = {
	item: {
		hidden: {
			opacity: 0,
			filter: "blur(12px)",
			y: 12,
		},
		visible: {
			opacity: 1,
			filter: "blur(0px)",
			y: 0,
			transition: {
				type: "spring",
				bounce: 0.3,
				duration: 1.5,
			},
		},
	},
};

export default function Hero() {
	return (
		<div className="flex flex-1 justify-center items-center w-full flex-col gap-12 overflow-hidden md:gap-16 py-40 px-4">
			<Header />
			<AnimatedGroup variants={transitionVariants} className="w-full">
				<div className="flex flex-col gap-12 px-4 md:px-6">
					<div className="flex flex-col items-center justify-center gap-3 text-center md:gap-6">
						<h1 className=" inline-flex text-[2.5rem] leading-tight md:text-5xl lg:text-7xl gap-1.5 items-center font-semibold flex-col sm:flex-row">
							The open source <GoogleDriveIcon className="inline size-12 md:size-14 lg:size-16.5" /> alternative
						</h1>
						<p className="max-w-xl text-base text-muted-foreground md:text-xl">
							They&apos;re your files, you control them.
						</p>
					</div>

					<WaitlistForm />
				</div>
			</AnimatedGroup>

			<AnimatedGroup
				className="w-full sm:max-w-[300vw] flex justify-start sm:justify-center"
				variants={{
					container: {
						visible: {
							transition: {
								staggerChildren: 0.05,
								delayChildren: 0.25,
							},
						},
					},
					...transitionVariants,
				}}
			>
				<div className="ml-0 sm:mx-auto min-w-[300vw] sm:max-w-7xl sm:min-w-0 sm:translate-x-0">
					<Image
						src={HeroDark}
						alt="Hero"
						className="hidden rounded-lg dark:block shadow-[0_0_20px_rgba(30,30,30,0.8)] sm:mx-auto ml-0"
						unoptimized
					/>
					<Image
						src={HeroLight}
						alt="Hero"
						className="block rounded-lg dark:hidden shadow-[0_0_20px_rgba(30,30,30,0.2)] sm:mx-auto ml-0"
						unoptimized
					/>
				</div>
			</AnimatedGroup>
		</div>
	);
}
