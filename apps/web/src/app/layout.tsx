import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { gowunBatang, inter, quicksand } from "@/lib/fonts";

export const metadata: Metadata = {
	title: "Rekindle",
	description: "Rekindle",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${quicksand.variable} ${gowunBatang.variable} ${inter.variable} antialiased`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
