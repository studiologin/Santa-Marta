import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in environment.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function initializeSocialLinks() {
    console.log('--- Initializing Social Links ---');
    
    try {
        // Check if social_links key already exists
        const { data: existing, error: fetchError } = await supabase
            .from('site_settings')
            .select('*')
            .eq('key', 'social_links')
            .maybeSingle();

        if (fetchError) {
            console.error('Error fetching site_settings:', fetchError);
            return;
        }

        const initialValue = {
            instagram: 'https://www.instagram.com/santamartaengenharia/',
            linkedin: 'https://www.linkedin.com/company/santa-marta-engenharia/',
            facebook: ''
        };

        if (!existing) {
            console.log('Key "social_links" not found. Creating...');
            const { error: insertError } = await supabase
                .from('site_settings')
                .insert([
                    { key: 'social_links', value: initialValue }
                ]);

            if (insertError) {
                console.error('Error inserting social_links:', insertError);
            } else {
                console.log('Social links initialized successfully.');
            }
        } else {
            console.log('Key "social_links" already exists. Updating with default values for Santa Marta...');
            const { error: updateError } = await supabase
                .from('site_settings')
                .update({ value: initialValue })
                .eq('key', 'social_links');

            if (updateError) {
                console.error('Error updating social_links:', updateError);
            } else {
                console.log('Social links updated successfully.');
            }
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

initializeSocialLinks();
