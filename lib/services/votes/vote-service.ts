import * as VotesDB from '@/lib/data-access/votes';
import { ServiceResponse } from '@/lib/types';

export async function toggleVote(data: {
    userId: string,
    suggestionId: string
}): Promise<ServiceResponse> {
    try {
        const voteExists = await VotesDB.getVoteByUserAndSuggestion(data)

        if (!voteExists) {
            await VotesDB.createVote(data)

            return {
                success: true,
                message: `User ${data.userId}, succesfully voted on ${data.suggestionId}`,
                action: 'added'
            }
        }

        await VotesDB.deleteVote(data)

        return {
            success: true,
            message: `User ${data.userId}, succesfully removed vote on ${data.suggestionId}`,
            action: 'removed'
        }

    } catch (error) {
        console.error('Error in toggleVote service', error);
        return {
            success: false,
            message: 'Error at toggle service',
            error,
        }
    }
}