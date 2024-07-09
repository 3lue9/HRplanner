import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://refctsbzuhtipgaovorf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZmN0c2J6dWh0aXBnYW92b3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1NDE3MzEsImV4cCI6MjAzNjExNzczMX0._7ft6GQigjmLbws3xDjN-c_f-RCX3TL0mOK5Pk0OOTA'

export const supabase = createClient(supabaseUrl, supabaseKey)
