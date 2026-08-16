import { createClient } from '@supabase/supabase-js'

const DEFAULT_SUPABASE_URL = 'https://knwneggzbirqrixhuuyj.supabase.co'
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud25lZ2d6YmlycXJpeGh1dXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MjI2NTUsImV4cCI6MjEwMjI5ODY1NX0.ymxdyPsuQ9F9o7YZSJ_nDB0m9G4DCW1vyN27nnrVS-8'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
