import { createClient } from "@/lib/supabase/server";
import { getUserFromCookies } from "@/server/user";
import { redirect } from "next/navigation";

export default async function DashboardWrapper() {
	const user = await getUserFromCookies();

	if (!user) {
		redirect("/dashboard");
	}

	return <>{JSON.stringify(user)}</>;
}
