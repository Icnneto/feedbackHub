import * as SuggestionsDB from '@/lib/data-access/suggestions'
import { SuggestionWithRelations, ServiceResponse } from '@/lib/types';
import { SuggestionCategory, SuggestionStatus } from '@prisma/client';

export async function createSuggestion(data: {
    title: string;
    description: string;
    authorId: string;
    category?: SuggestionCategory;
    status?: SuggestionStatus;
}): Promise<ServiceResponse> {

    try {
        await SuggestionsDB.createSuggestion(data);

        return {
            success: true,
            message: 'New suggestion created successfully'
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

export async function updateSuggestion(data: {
    id: string;
    title: string;
    description: string;
    category?: SuggestionCategory;
    status?: SuggestionStatus;
}): Promise<ServiceResponse> {

    try {
        const suggestionExists = await SuggestionsDB.getSuggestionById(data.id)

        if (!suggestionExists) {
            return {
                success: false,
                message: 'Suggestion does not exist in database',
            }
        }

        await SuggestionsDB.updateSuggestion(data);

        return {
            success: true,
            message: `Suggestion updated successfully`
        }
    } catch (error: any) {

        console.error('Error in updateSuggestion service', error);

        return {
            success: false,
            message: `Error updating suggestion`,
            error,
        }
    }
}


export async function updateSuggestionCategory(data: {
    id: string,
    category: SuggestionCategory
}): Promise<ServiceResponse> {

    try {

        const suggestionExists = await SuggestionsDB.getSuggestionById(data.id)

        if (!suggestionExists) {
            return {
                success: false,
                message: 'Suggestion does not exist in database',
            }
        }

        await SuggestionsDB.updateSuggestionCategory({
            id: data.id,
            category: data.category
        });

        return {
            success: true,
            message: `Suggestion category updated to ${data.category}`
        }

    } catch (error: any) {
        console.error('Error in updateSuggestionCategory service', error);

        return {
            success: false,
            message: `Error updating suggestion category`,
            error,
        }
    }
};

export async function updateSuggestionStatus(data: {
    id: string,
    status: SuggestionStatus
}): Promise<ServiceResponse> {

    try {
        const suggestionExists = await SuggestionsDB.getSuggestionById(data.id)

        if (!suggestionExists) {
            return {
                success: false,
                message: 'Suggestion does not exist in database',
            }
        }

        await SuggestionsDB.updateSuggestionStatus({
            id: data.id,
            status: data.status
        });

        return {
            success: true,
            message: `Suggestion status updated to ${data.status}`
        }

    } catch (error: any) {
        console.error('Error in updateSuggestionStatus service', error);

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
            message: `Suggestion deleted successfully`
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
            message: `Error at deleting suggestion`,
            error,
        }
    }
};