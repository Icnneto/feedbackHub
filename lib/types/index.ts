import { Prisma } from "@prisma/client";

export type SuggestionWithRelations = Prisma.SuggestionGetPayload<{
    include: {
        votes: true,
        author: {
            select: { name: true }
        }
    }
}>;

export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        suggestions: true,
        votes: true
    }
}>;

export type UserWithStats = Prisma.UserGetPayload<{
    include: {
        _count: {
            select: { suggestions: true, votes: true }
        }
    }
}>;