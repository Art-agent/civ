import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL //|| "https://ojiexlauowxkofiryaqh.supabase.co"; //bad faith stuff here but just to check
console.log(supabaseUrl)
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_API_KEY //|| "sb_publishable__-M8nRgjnDHBpe9P83Q1AQ_Rrxa_wCu"; //bad faith here as well
console.log(supabaseKey)

export const supabase = createClient(supabaseUrl!, supabaseKey!);