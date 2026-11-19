import { createClient } from "@supabase/supabase-js";

// Publishable (client-side) key — safe to ship in the browser. Data is protected by row-level security.
const url = import.meta.env.VITE_SUPABASE_URL ?? "https://qqlusijewdmwtgwlbktn.supabase.co";
const key = import.meta.env.VITE_SUPABASE_KEY ?? "sb_publishable_0x_6DNCbL_Kczf3Tu4yQJg_YuZnYqhD";

export const supabase = createClient(url, key);
