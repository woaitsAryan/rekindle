"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { Search } from "lucide-react";
import { getMemoryByEmotion } from "@/server/memory";
import type { Memory } from "@rekindle/db/types";
export default function MemoriesPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [memories, setMemories] = useState<Memory[]>([]); // Replace 'any' with your memory type

	const searchMemories = async () => {
		const memories = await getMemoryByEmotion(searchQuery);
		setMemories(memories.data);
	};

	return (
		<div className="min-h-screen bg-white p-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="font-gowun text-5xl text-[#023047] mb-4">
						Your Memories
					</h1>
					<p className="text-muted-foreground font-inter">
						Search through your emotional journey
					</p>
				</div>

				<div className="flex gap-4 mb-12">
					<Input
						placeholder="Search memories (e.g., 'Show me days where I felt joyful')"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="font-inter"
						onKeyDown={(e) => e.key === "Enter" && searchMemories()}
					/>
					<Button
						onClick={searchMemories}
						className="bg-cyan-950 hover:bg-cyan-800 font-inter"
					>
						<Search className="mr-2 h-4 w-4" />
						Search
					</Button>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{memories.map((memory, index) => (
						<Card
							key={index}
							className="border-[#e3f2f9] hover:bg-[#e3f2f9]/20 transition-colors"
						>
							<CardHeader>
								<CardTitle className="font-inter text-[#023047]">
									{new Date(memory.createdAt).toLocaleDateString()}
								</CardTitle>
								<CardDescription className="font-inter">
									Feeling: {memory.emotions.join(", ")}
								</CardDescription>
							</CardHeader>
							{/* @ts-ignore */}
							<CardContent className="font-inter">{memory.messages[0].content}</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
