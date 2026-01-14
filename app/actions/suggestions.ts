'use server'
import { createSuggestion, getSuggestionById, getSuggestions, updateSuggestionCategory, updateSuggestionStatus, deleteSuggestion } from "@/lib/services/suggestions/suggestions-service"
import { checkIdSchema, createSuggestionSchema, safeValidate, updateSuggestionCategorySchema, updateSuggestionStatusSchema } from "@/lib/utils/validation"
import { ServiceResponse, SuggestionWithRelations } from "@/lib/types"
import { SuggestionCategory, SuggestionStatus } from "@prisma/client"

export async function createSuggestionAction(formData: FormData): Promise<ServiceResponse> {
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        authorId: formData.get('authorId'),
        category: formData.get('category') || undefined,
        status: formData.get('status') || undefined
    };

    const validation = safeValidate(createSuggestionSchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await createSuggestion({
        title: validation.data.title,
        description: validation.data.description,
        authorId: validation.data.authorId,
        category: validation.data.category as SuggestionCategory | undefined,
        status: validation.data.status as SuggestionStatus | undefined
    });

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

export async function getSuggestionsAction(): Promise<ServiceResponse<SuggestionWithRelations[]>> {

    const result = await getSuggestions();

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    }

    return {
        success: true,
        message: result.message,
        data: result.data
    }
};

export async function getSuggestionByIdAction(formData: FormData): Promise<ServiceResponse<SuggestionWithRelations | null>> {
    const data = {
        id: formData.get('id'),
    };

    const validation = safeValidate(checkIdSchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await getSuggestionById(validation.data.id);

    if (!result.success) {
        return {
            success: false,
            message: result.message,
            error: result.error
        }
    }

    return {
        success: true,
        message: result.message,
        data: result.data
    }
};

export async function updateSuggestionCategoryAction(formData: FormData): Promise<ServiceResponse> {
    const data = {
        id: formData.get('id'),
        category: formData.get('category')
    };

    const validation = safeValidate(updateSuggestionCategorySchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await updateSuggestionCategory({
        id: validation.data.id,
        category: validation.data.category as SuggestionCategory
    });

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

export async function updateSuggestionStatusAction(formData: FormData): Promise<ServiceResponse> {
    const data = {
        id: formData.get('id'),
        status: formData.get('status')
    };

    const validation = safeValidate(updateSuggestionStatusSchema, data)

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await updateSuggestionStatus({
        id: validation.data.id,
        status: validation.data.status as SuggestionStatus
    });

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

export async function deleteSuggestionAction(id: string): Promise<ServiceResponse> {

    const validation = safeValidate(checkIdSchema, { id })

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await deleteSuggestion(validation.data.id);

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