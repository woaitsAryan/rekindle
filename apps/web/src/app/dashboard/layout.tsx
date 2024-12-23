import { Sidebar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex h-screen flex-col items-center bg-[#ffffff]">
			<div className={"flex-1 w-full h-full flex items-stretch justify-start"}>
				{<Sidebar />}
				<div className={"grid w-full grid-rows-[auto_1fr]"}>
					<TopBar />
					<div className="overflow-hidden bg-[#f4f4f5] rounded border">
						{children}
					</div>
				</div>
			</div>
		</main>
	);
}
