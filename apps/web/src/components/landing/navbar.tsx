"use client";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import Logo from "../logo";

interface NavbarProps {
	navbarLinks: typeof NavbarConfig;
}

export default function Navbar(props: NavbarProps) {
	const pathname = usePathname();

	return (
		<nav className="flex flex-row fixed justify-between top-0 left-0 items-center w-full px-24 py-3 border border-b border-neutral-200 font-inter backdrop-blur-3xl">
			<Logo className="h-14 w-48" />
			<NavigationMenu>
				<NavigationMenuList className="font-medium gap-2">
					{props.navbarLinks.map((navbarLink) => (
						<NavigationMenuItem
							key={navbarLink.href}
							className={`${pathname === navbarLink.href && "border-b-2 border-blue-500 font-bold"} px-3 py-1.5 transition-all duration-200 hover:text-blue-500`}
						>
							<Link href={navbarLink.href} legacyBehavior passHref>
								<NavigationMenuLink className="">
									{navbarLink.name}
								</NavigationMenuLink>
							</Link>
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
	);
}

export const NavbarConfig = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "About",
		href: "/about",
	},
	{
		name: "How it works",
		href: "/how-it-works",
	},
	{
		name: "Partnerships",
		href: "/partnership",
	},
	{
		name: "Ask clara",
		href: "/clara",
	},
];
