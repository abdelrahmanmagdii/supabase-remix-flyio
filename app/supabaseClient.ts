import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lsmaidgdcufbngbiutoo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbWFpZGdkY3VmYm5nYml1dG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODMzNjQsImV4cCI6MjAzNzg1OTM2NH0.KR5Dqn880JhNAqTiPy1w1qE78gAePccHAyPimaP59WI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
