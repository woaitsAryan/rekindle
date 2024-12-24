import type { User } from "@supabase/supabase-js";
import type { Context } from "hono";
import { supabase } from "../config/client";

export async function handleTest(c: Context){
	const um = c.var.user as User

	return c.json({"this": "testing"})
}