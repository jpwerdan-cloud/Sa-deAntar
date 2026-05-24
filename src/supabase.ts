import { createClient } from '@supabase/supabase-js';

// Supabase Configuration from the user's setup panel
// We use import.meta.env for standard Vite applications, but provide the verified credentials as immediate fallbacks
// so the preview is pre-connected and works instantly.
const SUPABASE_URL = 
  (import.meta as any).env?.VITE_SUPABASE_URL || 
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL || 
  "https://mqisedvacfrstqlxrjcx.supabase.co";

const SUPABASE_ANON_KEY = 
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 
  (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || 
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  "sb_publishable_u0CIcm46djY6s9av6qvIpg_9i-24H0I";

// Initialize the Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Helper to upload a real browser File to a Supabase Storage bucket.
 * Bucket name defaults to 'photos' or 'images'.
 * 
 * @param file The HTML5 File object from <input type="file" />
 * @param bucket Name of the Supabase Storage Bucket (e.g., 'photos')
 * @returns Object with { publicUrl, error } or throws error
 */
export async function uploadImageToSupabase(file: File, bucket = 'photos') {
  try {
    // 1. Generate a unique filename to prevent collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // 2. Upload file to storage bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // 3. Get public download URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      publicUrl: urlData.publicUrl,
      filePath: filePath,
      error: null
    };
  } catch (error: any) {
    console.error('Error during Supabase Storage upload:', error);
    return {
      publicUrl: null,
      filePath: null,
      error: error.message || 'Erro inesperado ao fazer upload'
    };
  }
}

/**
 * Helper to insert a photo record in a Supabase metadata table if the user wants DB persistence.
 * Table Name: 'gallery_photos' (or similar)
 */
export async function savePhotoMetadataToSupabase(photoMetadata: {
  title_pt: string;
  title_en: string;
  title_es: string;
  image_url: string;
  operation: number;
  subcategory: string;
  tags: string[];
  photographer: string;
  year: number;
}) {
  try {
    const { data, error } = await supabase
      .from('gallery_photos')
      .insert([photoMetadata])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error saving metadata to Supabase DB:', error);
    return { data: null, error: error.message || 'Erro ao persistir no banco de dados' };
  }
}

/**
 * Helper to fetch files from a Supabase Storage bucket.
 * 
 * @param bucket Name of the storage bucket (e.g., 'photos')
 * @param folder Folder inside the bucket (e.g. 'uploads' or '')
 * @returns Array of public URLs with metadata, or empty array
 */
export async function fetchImagesFromSupabaseBucket(bucket = 'photos', folder = '') {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'desc' }
      });

    if (error) {
      throw error;
    }

    if (!data) return [];

    // Map listed files to their public URLs
    return data
      .filter(file => file.name !== '.emptyFolderPlaceholder')
      .map(file => {
        const filePath = folder ? `${folder}/${file.name}` : file.name;
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return {
          name: file.name,
          publicUrl: urlData.publicUrl,
          created_at: file.created_at,
          metadata: file.metadata
        };
      });
  } catch (error) {
    console.error('Error listing assets from Supabase Storage:', error);
    return [];
  }
}

