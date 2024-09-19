import { createBrowserClient } from "@supabase/ssr";
import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';


export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );


const client = postgres(process.env.SUPABASE_URI!)
export const db = drizzle(client)