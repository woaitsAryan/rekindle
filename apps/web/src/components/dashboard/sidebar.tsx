"use client";

import { useUserStore } from "@/lib/contexts/user.store";
import { cn } from "@/lib/utils";
import { Drama, HeartOff, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
	link: {
		link: string;
		icon: React.ComponentType<{ className?: string }>;
		title: string;
	};
	pathname?: string | null;
}

function SidebarLink({ link, pathname }: SidebarLinkProps) {
	return (
		<Link href={link.link} key={link.link}>
			<button
				className={cn(
					"flex items-center space-x-3 w-full mb-2 p-3 hover:bg-[#e3f2f9] transition-colors rounded-sm text-[#023047]",
					pathname?.includes(link.link) && "bg-[#e3f2f9] font-medium",
				)}
				type="button"
			>
				<div className="flex items-center justify-center transition-colors">
					<link.icon className="h-5 w-5" />
				</div>
				<span className="text-base font-inter">{link.title}</span>
			</button>
		</Link>
	);
}

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="sticky inset-y-0 left-0 top-0 z-10 hidden flex-col sm:flex bg-white w-64 border-r border-[#e3f2f9]">
			<nav className="flex flex-col p-6">
				<Link href="/" className="h-16 transition-all flex items-center mb-8">
					{/* <Image width={130} height={20} src={"/logo.png"} alt="Logo" /> */}
				</Link>

				<div className="space-y-2">
					{sidebarLinks.map((link, index) => (
						<SidebarLink
							link={link}
							key={link.link + index}
							pathname={pathname}
						/>
					))}
				</div>
			</nav>
		</aside>
	);
}

export type SidebarLink = {
	title: string;
	icon: LucideIcon;
	link: string;

	external?: boolean;
};

export const sidebarLinks: SidebarLink[] = [
	{
		title: "Dashboard",
		icon: Drama,
		link: "/dashboard",
	},
	{
		title: "Chat",
		icon: Drama,
		link: "/dashboard/chat",
	},
	{
		title: "Memories",
		icon: HeartOff,
		link: "/memories",
	},
];
