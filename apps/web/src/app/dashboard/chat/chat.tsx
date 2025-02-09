"use client";

import { env } from "@/env";
import { APIHeaders } from "@rekindle/api-schema";
import type { Session } from "@supabase/supabase-js";
import { useChat } from "ai/react";
import { toast } from "sonner";

interface ChatPageProps {
	session: Session;
	id: string;
}

export default function ChatPage(props: ChatPageProps) {
	const { messages, input, setInput, append } = useChat({
		api: `${env.NEXT_PUBLIC_BACKEND_URL}/chat`,
		headers: {
			[APIHeaders.SessionToken]: props.session.access_token,
		},
		id: props.id,
		body: { id: props.id },
		onError(error: Error) {
			toast.error(error.message);
		},
	});

	return (
		<div>
			<input
				value={input}
				onChange={(event) => {
					setInput(event.target.value);
				}}
				onKeyDown={async (event) => {
					if (event.key === "Enter") {
						append({ content: input, role: "user" });
					}
				}}
			/>

			{messages.map((message, index) => (
				<div key={index}>{message.content}</div>
			))}
		</div>
	);
}
