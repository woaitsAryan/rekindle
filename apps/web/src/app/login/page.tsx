"use client";

import { Button } from "@/components/ui/button";
import { signInWithGithub } from "@/server/auth/github";
import { signInWithGoogle } from "@/server/auth/google";

export default function LoginPage() {
	return (
		<div>
			<Button onClick={signInWithGithub}>Sign in with github</Button>
			<Button onClick={signInWithGoogle}>Sign in with google</Button>
		</div>
	);
}
