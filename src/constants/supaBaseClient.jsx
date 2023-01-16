import { createClient } from "@supabase/supabase-js"


const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL

export const supabase = createClient (supabaseAnonKey,supabaseUrl)