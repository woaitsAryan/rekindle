import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<section className="flex flex-row justify-around min-h-screen pt-28 font-inter">
			<div className="w-2/5 flex flex-col gap-8 pt-24 ml-6">
				<h1 className="font-gowun text-6xl font-normal leading-tight">
					<span className="-z-10">Preserve precious -</span>
					<span className="bg-blue-circle bg-no-repeat bg-[length:150%_1.6em] bg-[center_60%] inline-block relative px-1">
						memories
					</span>{" "}
					with your digital life journal
				</h1>
				<div className="flex flex-col gap-4">
					<h3 className="font-normal text-lg">
						In just a few minutes, start capturing your life story in a safe,
						supportive space designed for those living with Alzheimer&apos;s and
						Dementia
					</h3>
					<div className="flex flex-row gap-3">
						<Button className="bg-cyan-950 hover:bg-cyan-800">
							Start writing
						</Button>
						<Button variant="outline">Learn more</Button>
					</div>
				</div>
			</div>
			<Image
				src="https://web.archive.org/web/20240718070151im_/https://cdn.prod.website-files.com/65ddc8ecc04a25d5db8b12f9/65ddcca0702c4d6be142b6da_Image%20(1)-p-1080.webp"
				alt=""
				width={600}
				height={400}
			/>
		</section>
	);
}
