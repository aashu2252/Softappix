-- Supabase Database Schema for SoftAppix Portfolio & Dashboard

-- 1. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    message TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow insert policy for anyone (anonymous public users)
CREATE POLICY "Allow public insert to contact_submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Allow select/delete only for authenticated users (admins)
CREATE POLICY "Allow authenticated select to contact_submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated delete to contact_submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated 
USING (true);


-- 2. CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS public.case_studies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    company TEXT NOT NULL,
    hook TEXT NOT NULL,
    challenge TEXT,
    solution TEXT,
    key_feature TEXT,
    tech_used TEXT[] NOT NULL,
    outcome TEXT NOT NULL,
    tag TEXT NOT NULL,
    link TEXT,
    image_url TEXT,
    lead_increase TEXT,
    bounce_rate TEXT,
    seo_ranking TEXT,
    organic_traffic TEXT
);

-- Enable RLS
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Allow public select policy for everyone
CREATE POLICY "Allow public select to case_studies" 
ON public.case_studies 
FOR SELECT 
USING (true);

-- Allow all operations for authenticated users (admins)
CREATE POLICY "Allow authenticated write to case_studies" 
ON public.case_studies 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);


-- 3. INSERT SEED DATA FOR CASE STUDIES
INSERT INTO public.case_studies (
    company, hook, challenge, solution, key_feature, tech_used, outcome, tag, link, image_url, lead_increase, bounce_rate, seo_ranking, organic_traffic
) VALUES 
(
    'Alacrity Enterprises',
    'B2B Industrial Wholesale & Export Platform',
    'Establishing a professional wholesale web presence to capture global B2B leads and showcase reliability.',
    'Developed a high-conversion showcase website using semantic HTML, custom CSS, and vanilla JS (Tailwind).',
    'Responsive product catalog grid, category tabs, and contact form integration.',
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    'Developed a high-conversion wholesale showcase website using HTML, CSS, and vanilla JS to display their industrial tape catalogs and electrical goods globally.',
    'Web Development',
    'https://alacrityenterprises.com',
    'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80', -- Initial UI design placeholder
    '↑ 300%',
    '↓ 80%',
    NULL,
    NULL
),
(
    'Global Tech Industries',
    'Industrial Maintenance & B2B Service Platform',
    'Developing a global-standard service portal to highlight B2B maintenance operations and support services.',
    'Built a clean, modern B2B portal using semantic HTML, custom CSS, and vanilla JS (Tailwind).',
    'Complete industrial service listing, technical evaluation showcase, and response optimization.',
    ARRAY['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    'Built a clean, modern B2B portal using HTML, CSS, and vanilla JS to highlight their technical maintenance operations and support services.',
    'Digital Strategy',
    'https://globaltechinds.com',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', -- Initial UI design placeholder
    NULL,
    NULL,
    'Top 3',
    '↑ 200%'
) ON CONFLICT DO NOTHING;
