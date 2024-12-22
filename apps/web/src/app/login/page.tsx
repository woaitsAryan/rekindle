"use client";

import { Button } from "@/components/ui/button";
import { signInWithGithub } from "@/server/auth/github";

export default function LoginPage() {
	return (
		<div>
			<Button onClick={signInWithGithub}>Sign in with github</Button>
		</div>
	);
}
