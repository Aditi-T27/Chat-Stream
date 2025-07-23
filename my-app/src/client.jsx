
import { createClient } from '@supabase/supabase-js'
//secure in .env as done in backend, this is only for referral while initial testing
const supabaseUrl = ''
const supabaseKey = ''
export const supabase = createClient(supabaseUrl, supabaseKey)
