import { generateId } from "@/lib/id";
import { createClient } from "@/lib/supabase/server";
import { getUserFromCookies, getUserSession } from "@/server/user";
import { redirect } from "next/navigation";
import ClientComponent from "./testing";
import { getAllMemories } from "@/server/memory";

export default async function DashboardWrapper() {
	const user = await getUserFromCookies();
	const session = await getUserSession();
	const id = generateId(20, "mem_");

	const wtf = await getAllMemories()

	if (!user || !session) {
		redirect("/dashboard");
	}

	return (
		<main>
			<div>{JSON.stringify(user)}</div>
			<ClientComponent session={session} id={id} />
		</main>
	);
}
