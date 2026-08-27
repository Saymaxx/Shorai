import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lyxwbkbehnlqychblifz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_MnAyQM4EC1gTdNS1Oe2SdQ_D-d0E3Zp';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload an image to Supabase Storage Bucket
 * @param file File object to upload
 * @param bucket Name of the bucket (default: 'shorai-media')
 * @returns Public CDN URL of the uploaded image
 */
export async function uploadImageToSupabase(
  file: File,
  bucket: string = 'shorai-media'
): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('[Supabase Storage] Upload error:', uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    console.error('[Supabase Storage] Unexpected error:', err);
    return { url: null, error: err.message || 'Image upload failed' };
  }
}
