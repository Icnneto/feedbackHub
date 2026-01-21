import { SuggestionCategory, SuggestionStatus } from '@prisma/client';
import { z } from 'zod'

export const emailSchema = z.email({ error: 'Invalid email address' });
export const idSchema = z.string({ error: 'Invalid id string' });
export const userIdSchema = z.string({ error: 'Invalid id string' });
export const suggestionIdSchema = z.string({ error: 'Invalid id string' });

export const passwordSchema = z
    .string()
    .min(6, { error: 'Password must be at least 6 characters' })
    .max(100, { error: 'Password must be less than 100 characters' })

export const nameSchema = z
    .string()
    .min(2, { error: 'Name is required' })
    .max(255)

export const signUpSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema
});

export const suggestionCategorySchema = z.enum(
    Object.values(SuggestionCategory) as [string, ...string[]]
);

export const suggestionStatusSchema = z.enum(
    Object.values(SuggestionStatus) as [string, ...string[]]
);

export const createSuggestionSchema = z.object({
    title: z.string({ error: 'Invalid title string' }),
    description: z.string({ error: 'Invalid description string' }),
    authorId: z.string({ error: 'Invalid authorId string' }),
    category: suggestionCategorySchema.optional(),
    status: suggestionStatusSchema.optional()
});

export const updateSuggestionSchema = z.object({
    id: idSchema,
    title: z.string({ error: 'Invalid title string' }),
    description: z.string({ error: 'Invalid description string' }),
    category: suggestionCategorySchema.optional(),
    status: suggestionStatusSchema.optional()
})

export const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, { error: 'Password is required' })
});

export const resetPasswordSchema = z.object({
    email: emailSchema
});

export const changePasswordSchema = z.object({
    password: passwordSchema
});

export const getUserByEmailSchema = z.object({
    email: emailSchema
});

export const checkIdSchema = z.object({
    id: idSchema
});

export const updateSuggestionCategorySchema = z.object({
    id: idSchema,
    category: suggestionCategorySchema
});

export const updateSuggestionStatusSchema = z.object({
    id: idSchema,
    status: suggestionStatusSchema
});

export const toggleVoteSchema = z.object({
    userId: userIdSchema,
    suggestionId: suggestionIdSchema
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
        error: flatErrors.fieldErrors as Record<string, string[]>
    }
};

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
