import { Facebook, Linkedin, MailIcon } from "lucide-react";
import Logo from "../logo";
import Link from "next/link";
export default function Footer() {
	return (
		<footer className="bg-cyan-950 text-white py-12">
			<div id="--footer-wrapper" className="w-wrapper mx-auto flex justify-between">
				<section className="w-1/2 flex flex-col gap-8 items-start">
					<Logo className="h-12 w-auto invert grayscale" />
					<h3 className="text-5xl font-gowun leading-[4rem]">Connect with us on Linkedin, or get in touch via email.</h3>
					<div className="flex items-center gap-3">
					{socialContent.map((social,_idx) => <Link href={social.link} className="w-16 h-16 rounded-lg border-[1px] border-[#8ecae6] flex items-center justify-center p-0 group hover:bg-[#8ecae6] transition-all duration-200 ease-linear" key={_idx}>
						<social.Icon  size={20} className="text-[#8ecae6] scale-110  group-hover:text-[#083344]" />
					</Link>)}
					</div>
				</section>
			</div>
		</footer>
	);
}

export const socialContent = [
	{
		name:"facebook",
		Icon: Facebook,
		link:"",
	},
	{
		name:"linkedin",
		Icon: Linkedin,
		link:"",
	},
	{
		name:"gmail",
		Icon: MailIcon,
		link:"",
	}
]