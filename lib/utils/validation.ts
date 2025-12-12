import { z } from 'zod'

export const emailSchema = z.email({ error: 'Invalid email address' });

export const passwordSchema = z
    .string()
    .min(6, { error:'Password must be at least 6 characters' })
    .max(100, { error:'Password must be less than 100 characters' })

export const nameSchema = z
    .string()
    .min(2, { error:'Name is required' })
    .max(255)

export const signUpSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema
});

export const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, { error:'Password is required' })
});

// Validate data
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data)
};

export function safeValidate<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; error: Record<string, string[]> } {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data }
    }

    const flatErrors = z.flattenError(result.error)

    return { 
        success: false, 
        error: flatErrors.fieldErrors as Record<string, string[]> }
};

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
