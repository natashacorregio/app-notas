import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jawsakjpxwbkbrbyejxa.supabase.co'

const supabaseKey = 'sb_publishable_4KxXliAixfjilcjOviysiA_0-AyZeIN'

export const supabase = createClient(supabaseUrl, supabaseKey)