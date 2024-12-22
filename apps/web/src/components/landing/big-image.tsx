import Image from "next/image";

export default function BigImage() {
	return (
		<div className="w-[85%] mx-auto">
			<Image
				src="https://web.archive.org/web/20240718070250im_/https://cdn.prod.website-files.com/65ddc8ecc04a25d5db8b12f9/65e76daff5a6ceb66619e635_Mask%20group%20(7).webp"
				alt=""
				width="1000"
				height="1000"
			/>
		</div>
	);
}
