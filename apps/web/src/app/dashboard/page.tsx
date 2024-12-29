import { createClient } from "@/lib/supabase/server";
import { getUserFromCookies } from "@/server/user";
import { redirect } from "next/navigation";
import ClientComponent from "./testing";
import { generateId } from "@/lib/id";

export default async function DashboardWrapper() {
	const supabase = await createClient();
	const user = await getUserFromCookies();
	const { data, error } = await supabase.auth.getSession();
	const id = generateId(20, "mem_");

	if (!user || error || !data.session) {
		redirect("/dashboard");
	}

	return (
		<main>
			<div>{JSON.stringify(user)}</div>
			<ClientComponent session={data.session} id = {id}/>
		</main>
	);
}
