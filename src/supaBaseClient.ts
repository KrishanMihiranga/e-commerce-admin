import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://ncachimzcruqvdlenrpa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jYWNoaW16Y3J1cXZkbGVucnBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NTkyODgsImV4cCI6MjA1NzQzNTI4OH0.VZDrK4DQyTRbTI7Lad5A_UMfh1IZ0ehfGQ6_xMNurLQ'

export const supabase = createClient(supabaseUrl, supabaseKey);