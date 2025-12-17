'use server'
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signUpSchema, signInSchema, safeValidate, changePasswordSchema, resetPasswordSchema } from '@/lib/utils/validation'
import { signInWithEmail, signUpNewUser, signOut, sendPasswordResetEmail, changePassword } from '@/lib/services/auth/auth-service';
import { ServiceResponse } from '@/lib/types';

export async function signupAction(formData: FormData): Promise<ServiceResponse | void> {
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const validation = safeValidate(signUpSchema, data);

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const supabase = await createClient();
    const result = await signUpNewUser(
        supabase,
        validation.data.email,
        validation.data.password,
        validation.data.name
    );

    if (!result.success) {

        return {
            success: result.success,
            message: result.message,
            error: result.error
        };
    };

    redirect('/auth/verify-email')

};

export async function loginAction(formData: FormData): Promise<ServiceResponse | void> {
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const validation = safeValidate(signInSchema, data);

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const supabase = await createClient();
    const result = await signInWithEmail(
        supabase,
        validation.data.email,
        validation.data.password,
    );

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    }

    redirect('/dashboard')

};

export async function logoutAction(): Promise<ServiceResponse | void> {

    const supabase = await createClient();
    const result = await signOut(supabase);

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    }

    redirect('/')
};

export async function resetPasswordAction(formData: FormData): Promise<ServiceResponse | void> {
    const data = {
        email: formData.get('email')
    };

    const validation = safeValidate(resetPasswordSchema, data);

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    };

    const supabase = await createClient();
    const result = await sendPasswordResetEmail(
        supabase,
        validation.data.email
    );

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    }

    return {
        success: true,
        message: result.message
    }

};

export async function changePasswordAction(formData: FormData): Promise<ServiceResponse | void> {
    const data = {
        password: formData.get('password')
    };

    const validation = safeValidate(changePasswordSchema, data);

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    };

    const supabase = await createClient();
    const result = await changePassword(
        supabase,
        validation.data.password
    );

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    }

    return {
        success: true,
        message: result.message
    }

};