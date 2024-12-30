import BigImage from "@/components/landing/big-image";
import Family, { familyContent } from "@/components/landing/family";
import Features, { featuresContent } from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar, { NavbarConfig } from "@/components/landing/navbar";

export default function Home() {
	return (
		<div className="flex flex-col w-full max-w-maxw mx-auto gap-28">
			<Navbar navbarLinks={NavbarConfig} />
			<Hero />
			<Features featureCards={featuresContent} />
			<BigImage />
			<Family familyPoints={familyContent} />
			<Footer />
		</div>
	);
}
