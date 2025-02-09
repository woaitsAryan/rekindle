import { Button } from "@/components/ui/button";
import { signInWithGithub } from "@/server/auth/github";
import { signInWithGoogle } from "@/server/auth/google";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-white">
			<div className="text-center">
				<h1 className="font-gowun text-5xl text-[#023047] mb-4">
					Welcome Back
				</h1>
				<p className="text-muted-foreground font-inter">
					Sign in to continue your memory journey
				</p>
			</div>

			<div className="flex flex-col gap-4 w-full max-w-sm">
				<Button
					onClick={signInWithGoogle}
					className="bg-cyan-950 hover:bg-cyan-800 text-base rounded-sm py-6 font-inter"
				>
					Sign in with Google
				</Button>
				<Button
					onClick={signInWithGithub}
					variant="outline"
					className="text-base rounded-sm py-6 font-inter border-[#e3f2f9] hover:bg-[#e3f2f9]"
				>
					Sign in with GitHub
				</Button>
			</div>
		</div>
	);
}
