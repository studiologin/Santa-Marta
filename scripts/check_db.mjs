import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDatabase() {
    console.log('--- Checking Database Tables ---');
    try {
        // Query pg_tables to see public tables
        const { data, error } = await supabase.rpc('get_tables_count'); // This might fail if RPC not exists
        
        // Alternative: raw query via SQL
        const { data: tables, error: tablesError } = await supabase
            .from('site_settings')
            .select('*')
            .limit(1);

        if (tablesError && tablesError.code === 'PGRST116') {
             console.log('Site Settings table exists but is empty.');
        } else if (tablesError && tablesError.code === '42P01') {
             console.log('Site Settings table does NOT exist.');
        } else {
            console.log('Site Settings row found:', tables);
        }

    } catch (err) {
        console.error('Error connecting to Supabase:', err);
    }
}

checkDatabase();
