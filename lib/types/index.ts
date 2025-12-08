import { Prisma } from "@prisma/client";

export type SuggestionWithRelations = Prisma.SuggestionGetPayload<{
    include: {
        votes: true,
        author: {
            select: { name: true }
        }
    }
}>;