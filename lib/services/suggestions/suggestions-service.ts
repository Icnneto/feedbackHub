import * as SuggestionsDB from '@/lib/data-access/suggestions'
import { SuggestionWithRelations, ServiceResponse } from '@/lib/types';

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