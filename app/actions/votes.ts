'use server'
import { toggleVote } from "@/lib/services/votes/vote-service";
import { ServiceResponse } from "@/lib/types";
import { safeValidate, toggleVoteSchema } from "@/lib/utils/validation";

export async function toggleVoteAction(data: {
    userId: string,
    suggestionId: string
}): Promise<ServiceResponse> {

    const validation = safeValidate(toggleVoteSchema, data);

    if (!validation.success) {
        return {
            success: false,
            message: 'Validation failed',
            error: validation.error
        }
    }

    const result = await toggleVote(data);

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
        action: result.action
    }
}