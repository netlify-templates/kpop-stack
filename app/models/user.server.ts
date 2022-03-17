import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js';

export type User = { id: string, email: string }
export type Password = { password: string }

// Abstract this away
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const {user} = await supabase.auth.signUp({
        email,
        password: hashedPassword
    });

    // get the user profile after created
    const {data: profile} = await getProfileByEmail(user?.email);

    return profile;
}

export async function createProfile(id, email) {
    const {data} = await supabase
    .from("profile")
    .insert([{id, email}])

    return data
}

export async function getProfileByEmail(email: string) {
    return await supabase
    .from("profiles")
    .select("email, id")
    .eq("email", email)
    .single();
}
