import { Chat } from "@/components/chat";
import { generateId } from "@/lib/id";
import { getCustomerSession } from "@/server/customer";
import { redirect } from "next/navigation";
import ChatPage from "./chat";

export default async function ChatOuter() {
	const session = await getCustomerSession();

	if (!session) {
		redirect("/");
	}

	const id = generateId(20, "mem_");

	return <Chat session={session} id={id} />;
}
