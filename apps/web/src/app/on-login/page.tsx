import { createClient } from "@/lib/supabase/server";
import { upsertUser } from "@/server/user";
import { redirect } from "next/navigation";

export default async function OnLogin() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	await upsertUser(data.user);

	redirect("/dashboard")
}
