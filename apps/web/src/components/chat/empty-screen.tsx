import type { UseChatHelpers } from "ai/react";

import { AlignRightIcon } from "lucide-react";
import { Button } from "../ui/button";

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
	return (
		<div className="mx-auto max-w-2xl px-4 font-gowun">
			<div className="bg-background rounded-lg border p-8">
				<h1 className="mb-2 text-lg font-semibold">Welcome to rekindle.</h1>
				<p className="text-muted-foreground leading-normal">
					Tell us about your day
				</p>
			</div>
		</div>
	);
}
