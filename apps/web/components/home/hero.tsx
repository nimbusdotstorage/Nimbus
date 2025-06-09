import { AnimatedGroup } from "@/components/ui/animated-group";
import { WaitlistForm } from "@/components/home/waitlist";
import GoogleDriveIcon from "@/web/public/googledrive";
import Header from "@/components/home/header";
import { WaitlistForm } from "./waitlist";
import Image from "next/image";
import { TextLoop } from "@/components/ui/text-loop";
import OneDriveIcon from "@/web/public/onedrive";
import ICloudIcon from "@/web/public/icloud";
import DropboxIcon from "@/web/public/dropbox";

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
		<div className="flex w-full flex-1 flex-col items-center justify-center gap-12 overflow-hidden px-4 py-40 md:gap-16">
			<Header />
			<AnimatedGroup variants={transitionVariants} className="w-full">
				<div className="flex flex-col gap-12 px-4 md:px-6">
					<div className="flex flex-col items-center justify-center gap-3 text-center md:gap-6">
						<h1 className=" inline-flex text-[2.5rem] leading-tight md:text-5xl lg:text-7xl gap-1.5 items-center font-semibold flex-col sm:flex-row justify-center">
							The open source
							<TextLoop
								transition={{
									type: "spring",
									stiffness: 900,
									damping: 95,
									mass: 5,
								}}
								variants={{
									initial: {
										y: 5,
										rotateX: 90,
										opacity: 0,
										filter: "blur(10px)",
									},
									animate: {
										y: 0,
										rotateX: 0,
										opacity: 1,
										filter: "blur(0px)",
									},
									exit: {
										y: -5,
										rotateX: -90,
										opacity: 0,
										filter: "blur(10px)",
									},
								}}
							>
								<GoogleDriveIcon className="inline size-12 md:size-14 lg:size-16.5 relative top-[-2px]" />
								<OneDriveIcon className="inline size-12 md:size-14 lg:size-16.5" />
								<DropboxIcon className="inline size-12 md:size-14 lg:size-16.5" />
								<ICloudIcon className="inline size-12 md:size-14 lg:size-16.5" />
							</TextLoop>
							alternative
						</h1>
						<p className="text-muted-foreground max-w-xl text-base md:text-xl">
							They&apos;re your files, you control them.
						</p>
					</div>

					<WaitlistForm />
				</div>
			</AnimatedGroup>

			<AnimatedGroup
				className="flex w-full justify-start sm:max-w-[300vw] sm:justify-center"
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
				<div className="ml-0 min-w-[300vw] sm:mx-auto sm:max-w-7xl sm:min-w-0 sm:translate-x-0">
					<Image
						src={HeroDark}
						alt="Hero"
						className="ml-0 hidden rounded-lg shadow-[0_0_20px_rgba(30,30,30,0.8)] sm:mx-auto dark:block"
						unoptimized
					/>
					<Image
						src={HeroLight}
						alt="Hero"
						className="ml-0 block rounded-lg shadow-[0_0_20px_rgba(30,30,30,0.2)] sm:mx-auto dark:hidden"
						unoptimized
					/>
				</div>
			</AnimatedGroup>
		</div>
	);
}
