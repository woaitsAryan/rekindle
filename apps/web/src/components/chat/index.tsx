"use client";

import { env } from "@/env";
import { APIHeaders } from "@rekindle/api-schema";
import type { Session } from "@supabase/supabase-js";
import { type Message, useChat } from "ai/react";
import { toast } from "sonner";
import { ChatList } from "./chat-list";
import { ChatPanel } from "./chat-panel";
import { ChatScrollAnchor } from "./chat-scroll-anchor";
import { EmptyScreen } from "./empty-screen";

export interface ChatProps extends React.ComponentProps<"div"> {
	initialMessages?: Message[];
	id: string;
	session: Session;
}

export function Chat(props: ChatProps) {
	const { messages, append, reload, stop, isLoading, input, setInput } =
		useChat({
			api: `${env.NEXT_PUBLIC_BACKEND_URL}/chat`,
			initialMessages: props.initialMessages,
			id: props.id,
			headers: {
				[APIHeaders.SessionToken]: props.session.access_token,
			},
			body: { id: props.id },
			onError(error: Error) {
				toast.error(error.message);
			},
		});

	return (
		<div className="flex flex-col bg-background h-full w-full justify-between">
			<div className="bg-background my-12">
				{messages.length ? (
					<>
						<ChatList messages={messages} />
						<ChatScrollAnchor trackVisibility={isLoading} />
					</>
				) : (
					<EmptyScreen setInput={setInput} />
				)}
			</div>
			<ChatPanel
				id={props.id}
				isLoading={isLoading}
				stop={stop}
				append={append}
				reload={reload}
				messages={messages}
				input={input}
				setInput={setInput}
			/>
		</div>
	);
}
