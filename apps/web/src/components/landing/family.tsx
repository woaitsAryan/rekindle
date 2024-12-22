import { Button } from "../ui/button";

interface FamilyProps {
	familyPoints: typeof familyContent;
}

export default function Family(props: FamilyProps) {
	return (
		<section className="flex flex-col gap-4 mt-20 items-center w-[85%] mx-auto">
			<h1 className="text-5xl font-gowun">Rekindle for Family Members</h1>
			<h3 className="text-lg font-gowun font-semibold">
				Supporting your loved one's memory journey
			</h3>
			<div className="flex flex-row">
				{props.familyPoints.map((point) => (
					<div className="flex-1" key={point.title}>
						{point.title}
					</div>
				))}
			</div>
			<Button className="w-fit mt-4 px-16 py-6 text-lg bg-cyan-950">
				Being your story
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
