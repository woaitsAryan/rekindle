"use client";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import Logo from "../logo";
import { toast } from "sonner";

interface NavbarProps {
	navbarLinks: typeof NavbarConfig;
}

export default function Navbar(props: NavbarProps) {
	const pathname = usePathname();

	const handleNavClick = (
		e: React.MouseEvent,
		navbarLink: (typeof NavbarConfig)[0]
	) => {
		if (!navbarLink.implemented) {
			e.preventDefault();
			toast.error("This feature is not yet available.", {
				description: "We are working on it!",
			});
			return
		}

		redirect(navbarLink.href);
	};

	return (
		<div
			className="w-full fixed top-0 left-0 flex justify-center bg-white border border-b border-neutral-200 z-[100] "
			id="--nav-wrapper"
		>
			<nav className="flex flex-row max-w-maxw  justify-between  items-center w-wrapper py-3   font-inter bg-white">
				<Logo className="h-12 w-auto" />
				<NavigationMenu>
					<NavigationMenuList className="font-medium gap-2">
						{props.navbarLinks.map((navbarLink) => (
							<NavigationMenuItem
								key={navbarLink.href}
								className={`${
									pathname === navbarLink.href &&
									"border-b-2 border-blue-500 font-bold"
								} px-3 py-1.5 transition-all duration-200 hover:text-blue-500`}
							>
								<button
									onClick={(e) => handleNavClick(e, navbarLink)}
									type="button"
									className="cursor-pointer"
								>
									<NavigationMenuLink className="">
										{navbarLink.name}
									</NavigationMenuLink>
								</button>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
				<Link
					href="/login"
					className="text-white bg-cyan-950 font-semibold text-base rounded-sm px-6 py-2 transition-all duration-200 hover:bg-cyan-900 hover:scale-105"
				>
					Sign up
				</Link>
			</nav>
		</div>
	);
}

export const NavbarConfig = [
	{
		name: "Home",
		href: "/",
		implemented: true,
	},
	{
		name: "About",
		href: "/about",
		implemented: false,
	},
	{
		name: "How it works",
		href: "/how-it-works",
		implemented: false,
	},
	{
		name: "Partnerships",
		href: "/partnership",
		implemented: false,
	},
	{
		name: "Ask rekindle",
		href: "/rekindle",
		implemented: false,
	},
];
