import { generateId } from "@/lib/id";
import { getCustomerFromCookies, getCustomerSession } from "@/server/customer";
import { redirect } from "next/navigation";
import ClientComponent from "./testing";

export default async function DashboardWrapper() {
	const user = await getCustomerFromCookies();
	const session = await getCustomerSession();
	const id = generateId(20, "mem_");

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
