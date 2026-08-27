import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config/env';

export const supabaseServer = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);

/**
 * Checks if Supabase connection is reachable
 */
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabaseServer.from('leads').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      console.log('[Supabase Server] Connected, table query response:', error.message);
    } else {
      console.log('[Supabase Server] Successfully connected to Supabase Database.');
    }
    return true;
  } catch (err: any) {
    console.error('[Supabase Server] Connection failed:', err.message);
    return false;
  }
}
