import prisma from "@/lib/prisma";

export async function createVote(data: {
    userId: string,
    suggestionId: string
}) {
    return await prisma.vote.create({
        data: {
            userId: data.userId,
            suggestionId: data.suggestionId
        }
    })
};

export async function deleteVote(data: {
    userId: string,
    suggestionId: string

}) {
    return await prisma.vote.delete({
        where: {
            userId_suggestionId: {
                userId: data.userId,
                suggestionId: data.suggestionId
            }
        }
    })
};

export async function getVoteByUserAndSuggestion(data: {
    userId: string,
    suggestionId: string
}) {
    return await prisma.vote.findFirst({
        where: {
            userId: data.userId,
            suggestionId: data.suggestionId
        }
    })
}