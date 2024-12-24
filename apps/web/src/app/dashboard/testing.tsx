"use client"

import { Button } from "@/components/ui/button"
import { makeRequest } from "@/server/dashboard"

export default function ClientComponent(){
	const handleClick = () => {
		console.log("HEy")
		makeRequest()
	}
	
	return <div>
		<Button onClick={handleClick}>
			Hello world
		</Button>
	</div>
}