import prisma from "@/lib/prisma";
import { Suggestion, SuggestionCategory, SuggestionStatus } from "@prisma/client";
import { SuggestionWithRelations } from "../types";

// CREATE
export async function createSuggestion(data: {
    title: string;
    description: string;
    authorId: string;
    category?: SuggestionCategory;
    status?: SuggestionStatus;
}) {
    return await prisma.suggestion.create({
        data: {
            title: data.title,
            description: data.description,
            authorId: data.authorId,
            ...(data.category && { category: data.category }),
            ...(data.status && { status: data.status }),
        },
    })
};

// READ
export async function getAllSuggestions(): Promise<SuggestionWithRelations[]> {
    const suggestions = await prisma.suggestion.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            votes: true,
            author: {
                select: {
                    name: true
                },
            },
        },
    });

    return suggestions;
};

export async function getSuggestionById(id: string): Promise<SuggestionWithRelations | null> {
    return await prisma.suggestion.findUnique({
        where: { id },
        include: {
            votes: true,
            author: {
                select: {
                    name: true
                },
            },
        }
    })
}

// PUT
export async function updateSuggestionCategory(data: {
    id: string,
    category: SuggestionCategory
}): Promise<Suggestion> {
    return await prisma.suggestion.update({
        where: {
            id: data.id
        },
        data: {
            category: data.category
        }
    })
}

export async function updateSuggestionStatus(data: {
    id: string,
    status: SuggestionStatus
}): Promise<Suggestion> {
    return await prisma.suggestion.update({
        where: {
            id: data.id
        },
        data: {
            status: data.status
        }
    })
}

// DELETE
export async function deleteSuggestionById(id: string) {
    return await prisma.suggestion.delete({
        where: { id },
    })
}
