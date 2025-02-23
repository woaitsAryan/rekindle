"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CustomerWithAllIncludes } from "@rekindle/db/types";
import { CalendarIcon, Mail, User } from "lucide-react";
import React from "react";

interface DashboardClientProps {
	customer: CustomerWithAllIncludes;
}

export default function CustomerDashboard(props: DashboardClientProps) {
	const customer = props.customer;
	console.log(customer.createdAt)
	return (
		<div className="container mx-auto py-10">
			<Card className="w-full max-w-3xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Welcome, {customer.metadata.full_name}!
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarImage
								src={customer.metadata.avatar_url}
								alt={customer.metadata.full_name}
							/>
							<AvatarFallback>
								{customer.metadata.full_name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-lg font-semibold">
								{customer.metadata.full_name}
							</p>
							<p className="text-muted-foreground">{customer.email}</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Card className="shadow-sm">
							<CardHeader>
								<CardTitle className="text-lg font-semibold">
									Account Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<User className="w-4 h-4 text-muted-foreground" />
										<span>ID:</span>
										<span className="font-medium">{customer.id}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Mail className="w-4 h-4 text-muted-foreground" />
										<span>Email:</span>
										<span className="font-medium">{customer.email}</span>
									</div>
									<div className="flex items-center space-x-2">
										<CalendarIcon className="w-4 h-4 text-muted-foreground" />
										<span>Created At:</span>
										<span className="font-medium">
											{new Date(customer.createdAt).toLocaleDateString()}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="shadow-sm">
							<CardHeader>
								<CardTitle className="text-lg font-semibold">
									Plan Details
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<span>Plan:</span>
										<Badge>{customer.billedPlan.name}</Badge>
									</div>
									<div className="flex items-center space-x-2">
										<span>Usage Limit:</span>
										<span className="font-medium">
											{customer.billedPlan.usageLimit}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
