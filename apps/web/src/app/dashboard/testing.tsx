"use client";

import { env } from "@/env";
import type { Session } from "@supabase/supabase-js";
import { useChat } from "ai/react";
import { useState } from "react";

interface ClientComponentProps {
	session: Session;
	id: string;
}

export default function ClientComponent(props: ClientComponentProps) {
	const { messages, input, setInput, append } = useChat({
		api: "http://localhost:8000/chat",
		headers: {
			authorization: props.session.access_token,
		},
		id: props.id,
		body: { id: props.id },
		async onError(props) {
			console.log("wtf", props);
		},
		async onResponse(wtf) {
			console.log("sigh", wtf);
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
