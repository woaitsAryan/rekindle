// stores/user-store.ts
import type { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStore = {
	user: User | null;
	session: Session | null;
	setUser: (user: User) => void;
	setSession: (session: Session) => void;
};

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	session: null,
	setUser: (user) => set({ user }),
	setSession: (session) => set({ session }),
}));
