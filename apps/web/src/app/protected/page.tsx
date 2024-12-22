import { createClient } from "@/lib/supabase/server";

export default async function PrivatePage() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	console.log(data, error);
	if (error || !data?.user) {
		return <>wtf</>;
	}

	return <p>Hello {data.user.id}</p>;
}
