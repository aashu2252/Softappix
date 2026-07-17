import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase_project_url') || supabaseUrl.includes('placeholder')) {
  console.warn(
    'Supabase configuration: Environment variables VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY are missing or set to placeholder values. ' +
    'Please set these values in your .env file to enable live database features.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url-please-setup-env.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)
