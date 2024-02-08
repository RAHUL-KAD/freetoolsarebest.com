// import { createClient } from '@supabase/supabase-js';

// const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''

// const client = createClient(supabase_url, supabase_key);

// const supabase = () => client;

// export default supabase;


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseKey)