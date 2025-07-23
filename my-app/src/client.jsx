
import { createClient } from '@supabase/supabase-js'
//secure in .env as done in backend, this is only for referral while initial testing
const supabaseUrl = 'https://keoheimljchataqydfya.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlb2hlaW1samNoYXRhcXlkZnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDgyMTMsImV4cCI6MjA1ODkyNDIxM30.RY77O-V815C0VR3VOV7HX2f4SAacRye_RsveZVyPcaA'
export const supabase = createClient(supabaseUrl, supabaseKey)
