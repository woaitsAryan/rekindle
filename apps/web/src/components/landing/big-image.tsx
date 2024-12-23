import Image from "next/image";

export default function BigImage() {
	return (
		<div className="w-wrapper flex justify-center mx-auto">
			<Image
				src="/images/secondary-hero-img.webp"
				alt=""
				className="w-wrapper h-auto"
				width={1920}
				height={1080}
			/>
		</div>
	);
}
