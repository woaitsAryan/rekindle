import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/topbar";
import { UserSessionProvider } from "@/lib/contexts/user.hydrate";
import { getSupabaseUser } from "@/server/auth/user";
import { getCustomer, getCustomerSession } from "@/server/customer";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getCustomerSession();
	const user = await getSupabaseUser();

	if (!session || !user) {
		redirect("/login");
	}

	return (
		<main className="flex h-screen flex-col items-center bg-[#ffffff]">
			<UserSessionProvider initialSession={session} initialUser={user}>
				<div
					className={"flex-1 w-full h-full flex items-stretch justify-start"}
				>
					{<Sidebar />}
					<div className={"grid w-full grid-rows-[auto_1fr]"}>
						<TopBar />
						<div className="bg-[#f4f4f5] rounded border">{children}</div>
					</div>
				</div>
			</UserSessionProvider>
		</main>
	);
}
