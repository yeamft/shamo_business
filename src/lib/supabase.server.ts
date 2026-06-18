import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ikxrzzdrnnruhgqykmde.supabase.co";
const supabaseServiceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlreHJ6emRybm5ydWhncXlrbWRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTc3OTA4OCwiZXhwIjoyMDk3MzU1MDg4fQ.qeEOBh4OgmYePko-nCMbX0Vz9gfZ9EpOXQvClvIqM4w";

export function getSupabaseServerClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}