// components/user-session-provider.tsx (Client Component)
"use client";

import type { Session, User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useUserStore } from "./user.store";

export function UserSessionProvider({
	initialUser,
	initialSession,
	children,
}: {
	initialUser: User;
	initialSession: Session;
	children: React.ReactNode;
}) {
	useEffect(() => {
		useUserStore.setState({
			user: initialUser,
			session: initialSession,
		});
	}, [initialUser, initialSession]);

	return <>{children}</>;
}
