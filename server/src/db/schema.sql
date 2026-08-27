-- =================================================================
-- SHORAI DATABASE SCHEMA & SUPABASE TABLES
-- =================================================================

-- 1. LEADS TABLE (Institutional Consultation Requests)
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    contact TEXT NOT NULL,
    school_name TEXT,
    purpose TEXT DEFAULT 'Schedule Institutional Consultation',
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'converted')),
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    synced_to_google_sheet BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public insert of leads (from frontend contact forms)
CREATE POLICY "Allow public insert into leads" 
ON public.leads 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow select to anon/authenticated for admin dashboard
CREATE POLICY "Allow select leads" 
ON public.leads 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- 2. SITE CONTENT TABLE (Dynamic Component Text & Settings)
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY DEFAULT 'main',
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read site_content" 
ON public.site_content 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow public upsert site_content" 
ON public.site_content 
FOR ALL 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- 3. BLOG POSTS TABLE (Research Publications & Articles)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT DEFAULT 'Mr. Sandip',
    author_role TEXT DEFAULT 'Founding Director & Strategy Lead',
    cover_image TEXT,
    category TEXT DEFAULT 'NEP 2020 & Policy',
    read_time TEXT DEFAULT '6 min read',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read blog_posts" 
ON public.blog_posts 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow admin edit blog_posts" 
ON public.blog_posts 
FOR ALL 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- 4. GALLERY ITEMS TABLE (Campus Photo Vault)
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Robotics & AI Smart Class',
    image_url TEXT NOT NULL,
    badge TEXT DEFAULT 'CURATED',
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read gallery_items" 
ON public.gallery_items 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow admin edit gallery_items" 
ON public.gallery_items 
FOR ALL 
TO anon, authenticated 
USING (true)
WITH CHECK (true);

-- 5. STORAGE BUCKETS (Run in SQL or create via Storage tab)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('shorai-media', 'shorai-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('shorai-gallery', 'shorai-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Public Storage Access Policies
CREATE POLICY "Public media access" 
ON storage.objects 
FOR SELECT 
TO anon, authenticated 
USING (bucket_id IN ('shorai-media', 'shorai-gallery'));

CREATE POLICY "Public media upload" 
ON storage.objects 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (bucket_id IN ('shorai-media', 'shorai-gallery'));
