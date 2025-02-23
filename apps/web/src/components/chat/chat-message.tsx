// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import type { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { Bot, UserIcon } from "lucide-react";
import { ChatMessageActions } from "./chat-message-actions";
import { MemoizedReactMarkdown } from "./markdown";

export interface ChatMessageProps {
	message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
	return (
		<div
			className={cn("group relative mb-4 flex items-start md:-ml-12")}
			{...props}
		>
			<div
				className={cn(
					"flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
					message.role === "user"
						? "bg-background"
						: "bg-primary text-primary-foreground",
				)}
			>
				{message.role === "user" ? <UserIcon /> : <Bot />}
			</div>
			<div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
				<MemoizedReactMarkdown
					className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
					remarkPlugins={[remarkGfm, remarkMath]}
					components={{
						p({ children }) {
							return <p className="mb-2 last:mb-0">{children}</p>;
						},

					}}
				>
					{message.content}
				</MemoizedReactMarkdown>
				<ChatMessageActions message={message} />
			</div>
		</div>
	);
}
