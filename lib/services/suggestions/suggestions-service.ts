import * as SuggestionsDB from '@/lib/data-access/suggestions'
import { SuggestionWithRelations, ServiceResponse } from '@/lib/types';
import { suggestionCategorySchema, suggestionStatusSchema, validate } from '@/lib/utils/validation';
import { SuggestionCategory, SuggestionStatus } from '@prisma/client';

export async function createSuggestion(data: {
    title: string;
    description: string,
    authorId: string
}): Promise<ServiceResponse> {

    try {
        await SuggestionsDB.createSuggestion(data);

        return {
            success: true,
            message: 'New suggestions created successfully'
        }
    } catch (error) {
        console.error('Error in createSuggestion service', error);
        return {
            success: false,
            message: 'Error at creating new suggestion',
            error,
        }
    }
};

export async function getSuggestions(): Promise<ServiceResponse<SuggestionWithRelations[]>> {
    try {
        const suggestions = await SuggestionsDB.getAllSuggestions();

        return {
            success: true,
            message: 'Suggestions retrieved successfully',
            data: suggestions,
        }
    } catch (error) {
        console.error('Error in getSuggestions service', error);
        return {
            success: false,
            message: 'Error at accessing all suggestions',
            error,
        }
    }
};

export async function getSuggestionById(
    id: string
): Promise<ServiceResponse<SuggestionWithRelations | null>> {
    try {
        const suggestion = await SuggestionsDB.getSuggestionById(id);

        return {
            success: true,
            message: `Suggestion ${id} retrieved successfully`,
            data: suggestion
        }
    } catch (error) {
        console.error('Error in getSuggestionById service', error);
        return {
            success: false,
            message: `Error at accessing suggestion: ${id}`,
            error,
        }
    }
};

export async function updateSuggestionCategory(data: {
    id: string,
    category: string
}
): Promise<ServiceResponse> {

    try {
        const validateCategory = validate(suggestionCategorySchema, data.category) as SuggestionCategory;

        await SuggestionsDB.updateSuggestionCategory({
            id: data.id,
            category: validateCategory
        });

        return {
            success: true,
            message: `Suggestions category updated to ${validateCategory}`
        }

    } catch (error: any) {
        console.error('Error in updateSuggestionCategory service', error);

        if (error.name === 'ZodError') {
            return {
                success: false,
                message: 'Invalid category value',
                error
            }
        };

        return {
            success: false,
            message: `Error updating suggestion category`,
            error,
        }
    }
};

export async function updateSuggestionStatus(data: {
    id: string,
    status: string
}
): Promise<ServiceResponse> {

    try {
        const validateStatus = validate(suggestionStatusSchema, data.status) as SuggestionStatus;

        await SuggestionsDB.updateSuggestionStatus({
            id: data.id,
            status: validateStatus
        });

        return {
            success: true,
            message: `Suggestions status updated to ${validateStatus}`
        }

    } catch (error: any) {
        console.error('Error in updateSuggestionStatus service', error);

        if (error.name === 'ZodError') {
            return {
                success: false,
                message: 'Invalid status value',
                error
            }
        };

        return {
            success: false,
            message: `Error updating suggestion status`,
            error,
        }
    }
};

export async function deleteSuggestion(
    id: string
): Promise<ServiceResponse> {

    try {
        await SuggestionsDB.deleteSuggestionById(id);

        return {
            success: true,
            message: `Suggestion ${id} deleted successfully`
        }
    } catch (error: any) {
        console.error('Error in deleteSuggestion service', error);

        if (error.code === 'P2025') {
            return {
                success: false,
                message: `This suggestion was already deleted or does not exist`,
                error,
            }
        }

        return {
            success: false,
            message: `Error at deleting suggestion: ${id}`,
            error,
        }
    }
};