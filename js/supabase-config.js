/* FESTORA Supabase public client configuration.
   Replace both placeholders with your Supabase Project URL and anon/public key.
   Never put a service_role key in this file or anywhere in browser code. */
(function () {
  'use strict';
  const SUPABASE_URL = 'https://acqnasbhnbjcqntqvcfl.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_107S36vHsX29bbPCUQjKlw_-9OlkpAe';

  if (!window.supabase || !SUPABASE_URL.startsWith('https://') ||
      SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('FESTORA Supabase is not configured yet. Add your project URL and anon key in js/supabase-config.js.');
    return;
  }

  window.FestoraSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
})();
