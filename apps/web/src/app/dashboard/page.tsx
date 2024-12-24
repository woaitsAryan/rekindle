import { createClient } from "@/lib/supabase/server";
import { getUserFromCookies } from "@/server/user";
import { redirect } from "next/navigation";
import ClientComponent from "./testing";

export default async function DashboardWrapper() {
	const user = await getUserFromCookies();

	if (!user) {
		redirect("/dashboard");
	}

	return (
		<main>
			<div>{JSON.stringify(user)}</div>
			<ClientComponent/>
		</main>
	);
}
