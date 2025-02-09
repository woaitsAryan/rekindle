import { generateId } from "@/lib/id";
import { getCustomerFromCookies, getCustomerSession } from "@/server/customer";
import { redirect } from "next/navigation";
import CustomerDashboard from "./dashboard";

export default async function DashboardWrapper() {
	const customer = await getCustomerFromCookies(true);

	if (!customer) {
		redirect("/login");
	}

	return <CustomerDashboard customer={customer} />;
}
