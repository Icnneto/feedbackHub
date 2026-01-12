import { AuthTokenResponsePassword, AuthResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database";
import { ServiceResponse } from "@/lib/types";

/**
 * TODO
 * - register NEXT_PUBLIC_URL in Allow List at Supabase(Authentication > URL Configuration > Redirect URLs)
 */


export async function signUpNewUser(
    supabase: SupabaseClient<Database>,
    email: string,
    password: string,
    name: string,
): Promise<ServiceResponse<AuthResponse["data"]>> {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // emailRedirectTo: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/auth/callback?next=/dashboard`,
            data: { 
                username: name 
            }
        }
    });

    if (error) {
        if (error.message.toLowerCase().includes('already registered')) {
            return {
                success: false,
                message: 'Email already registered',
                error,
            }
        }

        return {
            success: false,
            message: 'Error at creating user',
            error,
        }
    }

    return {
        success: true,
        message: 'User signedUp with success!',
        data: data
    }

}

export async function signInWithEmail(
    supabase: SupabaseClient<Database>,
    email: string,
    password: string
): Promise<ServiceResponse<AuthTokenResponsePassword["data"]>> {

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
            return {
                success: false,
                message: 'Email not confirmed. Check your mailbox and confirms your e-mail before logging in',
                error,
            }
        }

        return {
            success: false,
            message: 'Email or password incorrect',
            error,
        }
    }

    return {
        success: true,
        message: 'User logged in with success!',
        data: data
    }
};

export async function signOut(
    supabase: SupabaseClient<Database>
): Promise<ServiceResponse> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return {
            success: false,
            message: 'Error at logout',
            error,
        }
    }

    return {
        success: true,
        message: 'LoggedOut successfully'
    }
};

export async function sendPasswordResetEmail(
    supabase: SupabaseClient<Database>,
    email: string
): Promise<ServiceResponse> {

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/update-password`,
    });

    if (error) {
        return {
            success: false,
            message: 'Error at redirecting',
            error,
        }
    }

    return {
        success: true,
        message: 'Redirected to reset password page successfully',
    }
}

export async function changePassword(
    supabase: SupabaseClient<Database>,
    password: string,
): Promise<ServiceResponse> {
    const { error } = await supabase.auth.updateUser({
        password
    });

    if (error) {
        return {
            success: false,
            message: 'Error at setting new password',
            error,
        }
    }

    return {
        success: true,
        message: 'Password updated successfully',
    }
}