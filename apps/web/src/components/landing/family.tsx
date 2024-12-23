import { Button } from "../ui/button";
import Image from "next/image";
interface FamilyProps {
	familyPoints: typeof familyContent;
}

export default function Family(props: FamilyProps) {
	return (
		<section className="flex flex-col gap-4 items-center w-wrapper mx-auto">
			<h1 className="text-5xl font-gowun text-[#023047]">Rekindle for Family Members</h1>
			<h3 className="text-lg -mt-2 font-gowun font-semibold">
				Supporting your loved one's memory journey
			</h3>
			<div className="flex flex-row gap-6 mt-4">
				{props.familyPoints.map((point,_index) => (
					<div className="flex-1 border-[3px] border-[#e3f2f9] rounded-sm first:rounded-tl-[2.5rem] last:rounded-br-[2.5rem] p-12 font-inter font-medium text-lg text-gray-600" key={point.title}>
						<Image src={`/images/icon${_index+1}.png`} alt={point.title} width={60} height={60} className="w-12 mb-4 opacity-80"/>
						<span>{point.title}</span>
					</div>
				))}
			</div>
			<Button className="w-fit mt-4 px-16 text-lg bg-cyan-950 py-7 rounded-sm font-medium">
				Begin your story
			</Button>
		</section>
	);
}

export const familyContent = [
	{
		title: "Family access to shared memories",
	},
	{
		title: "Progress insights and activity updates",
	},
	{
		title: "Tools to help prompt and preserve family stories",
	},
	{
		title: "Secure family sharing options",
	},
];
