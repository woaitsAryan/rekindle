"use client";
import { createClient } from "@/lib/supabase/client";
import { DramaIcon, HeartOff } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { toast } from "sonner";
import { MobileSidebar } from "./mobile-sidebar";
import Logo from "../logo";

function pathNameToTitle(pathname: string | null): {
	title: string;
	icon?: React.ReactNode;
} {
	let title = "Dashboard";
	let icon = undefined;
	const iconProps = { className: "w-3.5 h-3.5 text-muted-foreground" };

	if (!pathname) return { title };

	switch (true) {
		case /^\/tone\/ironic$/.test(pathname):
			title = "Ironic";
			icon = <DramaIcon {...iconProps} />;
			break;

		case /^\/tone\/offensive$/.test(pathname):
			title = "Offensive";
			icon = <HeartOff {...iconProps} />;
			break;
		default:
			break;
	}
	return { title, icon };
}

function TopBar() {
	const pathname = usePathname();
	const { title, icon } = pathNameToTitle(pathname);
	const supabase = createClient();

	const handleSignOut = async () => {
		await supabase.auth.signOut();

		toast.info("Signed out successfully");

		redirect("/");
	};

	return (
		<div className="flex items-center h-16 w-full bg-white border-b border-[#e3f2f9]">
			<div className="px-6 sm:hidden">
				<MobileSidebar />
			</div>
			<nav className="flex flex-row items-center w-full px-6 justify-around">
				<div className="flex items-center space-x-3">
					<div className="text-[#023047]">{icon}</div>
					<h1 className="text-lg font-medium font-inter text-[#023047]">
						{title}
					</h1>
				</div>
				<button type="submit" onClick={handleSignOut}>
					Sign out
				</button>
			</nav>
		</div>
	);
}

export { TopBar };
