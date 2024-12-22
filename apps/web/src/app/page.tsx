import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Navbar, { NavbarConfig } from "@/components/navbar";

export default function Home() {
	return (
		<div className="font-bold">
			<Navbar navbarLinks={NavbarConfig} />
			<Hero />
			<Features />
		</div>
	);
}
