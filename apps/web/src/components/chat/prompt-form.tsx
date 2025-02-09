import type { UseChatHelpers } from "ai/react";
import * as React from "react";
import Textarea from "react-textarea-autosize";

import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { ArrowBigDown } from "lucide-react";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export interface PromptProps
	extends Pick<UseChatHelpers, "input" | "setInput"> {
	onSubmit: (value: string) => Promise<void>;
	isLoading: boolean;
}

export function PromptForm({
	onSubmit,
	input,
	setInput,
	isLoading,
}: PromptProps) {
	const { formRef, onKeyDown } = useEnterSubmit();
	const inputRef = React.useRef<HTMLTextAreaElement>(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				if (!input?.trim()) {
					return;
				}
				setInput("");
				await onSubmit(input);
			}}
			ref={formRef}
		>
			<TooltipProvider>
				<div className="bg-background relative flex max-h-60 w-full grow flex-col overflow-hidden pr-8 sm:rounded-md sm:border sm:pr-12">
					<Textarea
						ref={inputRef}
						tabIndex={0}
						onKeyDown={onKeyDown}
						rows={1}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Send a message..."
						spellCheck={false}
						className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
					/>
					<div className="absolute right-0 top-4 sm:right-4">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="submit"
									size="icon"
									disabled={isLoading || input === ""}
								>
									<ArrowBigDown />
									<span className="sr-only">Send message</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Send message</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</TooltipProvider>
		</form>
	);
}
