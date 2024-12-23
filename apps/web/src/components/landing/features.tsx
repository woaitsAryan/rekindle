interface FeaturesProps {
	featureCards: typeof featuresContent;
}

export default function Features(props: FeaturesProps) {
	return (
		<section className="flex flex-col gap-6 w-wrapper mx-auto">
			<h1 className="text-5xl font-gowun text-center w-[70%] mx-auto leading-tight font-normal">
				A compassionate memory companion, designed for your journey
			</h1>
			<div className="flex flex-col mx-auto gap-6">
				<div className="flex flex-row gap-6">
					{props.featureCards.slice(0, 2).map((card) => (
						<div
							className="flex flex-col gap-6 bg-[#e3f2f9] p-8 py-12 flex-1 rounded-sm first:rounded-tl-[2.5rem] text-black/80"
							key={card.title}
						>
							<h3 className="text-2xl font-semibold font-inter">
								{card.title}
							</h3>
							<div className="font-normal">{card.description}</div>
						</div>
					))}
				</div>
				<div className="flex flex-row gap-6">
					{props.featureCards.slice(2).map((card) => (
						<div
							className="flex flex-col gap-6 bg-[#e3f2f9] p-8 py-12 flex-1 rounded-sm last:rounded-br-[2.5rem] text-black/80"
							key={card.title}
						>
							<h3 className="text-2xl font-semibold font-inter">
								{card.title}
							</h3>
							<div className="font-normal">{card.description}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export const featuresContent = [
	{
		title: "It's Personal",
		description:
			"Your journal adapts to you, making it easy to record memories and feelings at your own pace. Express yourself freely with our specially designed interface that puts you in control.",
	},
	{
		title: "It's Supportive",
		description:
			"Gentle prompts and memory cues help you recall and write about meaningful moments. Our caring system provides emotional support when you need it.",
	},
	{
		title: "It's Comprehensive",
		description:
			"More than just a diary - Rekindle helps organize memories by themes, emotions, and time periods, making it easy to revisit cherished moments.",
	},
	{
		title: "It's Secure",
		description:
			"Your memories are safely preserved and easily accessible to you and your chosen loved ones. Everything is private and protected.",
	},
	{
		title: "It's Interactive",
		description:
			"Connect with your stories through guided reflection tools, mood-based navigation, and gentle memory exercises.",
	},
];
