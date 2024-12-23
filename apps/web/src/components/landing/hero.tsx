import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<section className="flex flex-row justify-between h-screen max-h-[1000px] pt-24 font-inter w-wrapper max-w-maxw mx-auto">
			<div className="flex flex-col flex-1 gap-8 pt-24 w-1/2">
				<h1 className="font-gowun text-6xl font-normal leading-tight">
					Preserve precious&nbsp;
					<span className="relative inline-block">
						memories
						<Image src="/images/blue-circle.svg" alt="" width={300} height={200} className="absolute -top-1 left-0 scale-105"/>
					</span>{" "}
					with your digital life journal
				</h1>
				<div className="flex flex-col gap-4 w-[80%]">
					<h3 className="font-normal text-base text-muted-foreground">
						In just a few minutes, start capturing your life story in a safe,
						supportive space designed for those living with Alzheimer&apos;s and
						Dementia
					</h3>
					<div className="flex flex-row gap-4">
						<Button className="bg-cyan-950 hover:bg-cyan-800 text-base rounded-sm min-w-48 py-7">
							Start writing
						</Button>
						<Button variant="outline" className="text-lg py-7 min-w-48 rounded-sm ">
							Learn more
						</Button>
					</div>
				</div>
			</div>
			<section id="--hero-img" className="w-1/2 flex items-center justify-end">
			<Image
				src="/images/hero-img.webp"
				alt=""
				width={1100}
				height={700}
				className="w-4/5 h-auto"
			/>
			</section>
		</section>
	);
}
