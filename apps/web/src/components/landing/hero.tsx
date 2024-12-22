import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<section className="flex flex-row justify-around min-h-screen pt-24 font-inter w-[85%] mx-auto">
			<div className="flex flex-col flex-1 gap-8 pt-24">
				<h1 className="font-gowun text-6xl font-normal leading-tight">
					Preserve precious
					<span className="bg-blue-circle bg-no-repeat bg-[length:150%_1.6em] bg-[center_60%] inline-block relative px-1">
						memories
					</span>{" "}
					with your digital life journal
				</h1>
				<div className="flex flex-col gap-4 w-[80%]">
					<h3 className="font-normal text-xl">
						In just a few minutes, start capturing your life story in a safe,
						supportive space designed for those living with Alzheimer&apos;s and
						Dementia
					</h3>
					<div className="flex flex-row gap-4">
						<Button className="bg-cyan-950 hover:bg-cyan-800 text-lg p-6">
							Start writing
						</Button>
						<Button variant="outline" className="text-lg p-6">
							Learn more
						</Button>
					</div>
				</div>
			</div>
			<Image
				src="https://web.archive.org/web/20240718070151im_/https://cdn.prod.website-files.com/65ddc8ecc04a25d5db8b12f9/65ddcca0702c4d6be142b6da_Image%20(1)-p-1080.webp"
				alt=""
				width={550}
				height={350}
				className="flex-1"
			/>
		</section>
	);
}
